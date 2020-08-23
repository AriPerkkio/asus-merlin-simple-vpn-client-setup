import { useReducer, useEffect, useMemo } from 'react';

import {
    SubsriberOptions,
    Subscriber,
    StateUpdater,
    UseGlobalStateOutput,
    ReducerType,
    StateUpdate,
} from './types';
import { useUpdatedRef } from './useUpdatedRef';
import { BaseActionType } from 'reducers/types';

// Support dynamic states
/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultCompare = (): boolean => true;
const updateSubscriber = <StateType>(
    previousState: StateType,
    newState: StateType
): ((subscriber: Subscriber<StateType>) => void) => (subsriber): void => {
    const { render, shouldUpdate } = subsriber || {};
    const _shouldUpdate =
        (shouldUpdate && shouldUpdate.current) || defaultCompare;

    if (_shouldUpdate(previousState, newState)) {
        render();
    }
};

const state: { [key: string]: any } = {};
const stateInitialized: { [key: string]: boolean } = {};
const subscribers: { [key: string]: Subscriber<any>[] } = {};

const createSetState = <StateType, ActionTypes>(
    reducer: ReducerType<StateType, ActionTypes> | undefined,
    stateRootId: string
): StateUpdater<StateType, ActionTypes> => (
    value: StateUpdate<StateType, ActionTypes> | ActionTypes
): void => {
    const stateRoot = state[stateRootId] || {};
    const previousState = { ...stateRoot } as StateType;

    const newState = reducer
        ? reducer(previousState, value as ActionTypes)
        : { ...previousState, ...value };

    state[stateRootId] = newState;

    subscribers[stateRootId].forEach(updateSubscriber(previousState, newState));
};

export const useGlobalState = <StateType, ActionTypes extends BaseActionType>(
    options?: SubsriberOptions<StateType, ActionTypes>
): UseGlobalStateOutput<StateType, ActionTypes> => {
    const [, render] = useReducer(s => !s, true);
    const { initialState, shouldUpdate, reducer } = options || {};
    const stateRootId = (options || {}).stateRootId || 'root';

    const latestShouldUpdate = useUpdatedRef(shouldUpdate);

    const setState = useMemo(() => createSetState(reducer, stateRootId), [
        reducer,
        stateRootId,
    ]);

    if (!subscribers[stateRootId]) {
        subscribers[stateRootId] = [];
    }

    if (!stateInitialized[stateRootId] && initialState) {
        stateInitialized[stateRootId] = true;
        createSetState(undefined, stateRootId)(initialState);
    }

    useEffect(() => {
        const subscriber: Subscriber<StateType> = {
            render,
            shouldUpdate: latestShouldUpdate,
        };
        subscribers[stateRootId].push(subscriber);

        return (): void => {
            subscribers[stateRootId].splice(
                subscribers[stateRootId].indexOf(subscriber),
                1
            );
        };
    }, [latestShouldUpdate, stateRootId]);

    return [state[stateRootId] as StateType, setState];
};
