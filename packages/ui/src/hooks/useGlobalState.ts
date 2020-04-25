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

const defaultCompare = (): boolean => true;
const updateSubscriber = <StateType>(
    previousState: StateType,
    newState: StateType
): ((subscriber: Subscriber) => void) => (subsriber): void => {
    const { render, shouldUpdate }: Subscriber = subsriber || {};
    const _shouldUpdate =
        (shouldUpdate && shouldUpdate.current) || defaultCompare;

    if (_shouldUpdate(previousState, newState)) {
        render();
    }
};

const state: { [key: string]: any } = {};
const stateInitialized: { [key: string]: boolean } = {};
const subscribers: { [key: string]: Subscriber<any>[] } = {};

const createSetState = <StateType>(
    reducer: ReducerType<StateType> | undefined,
    stateRootId: string
): StateUpdater<StateType> => (value: StateUpdate<StateType>): void => {
    const stateRoot = state[stateRootId] || {};
    const previousState = { ...stateRoot } as StateType;

    const newState = reducer
        ? reducer(previousState, value as BaseActionType)
        : { ...previousState, ...value };

    state[stateRootId] = newState;

    subscribers[stateRootId].forEach(updateSubscriber(previousState, newState));
};

export const useGlobalState = <StateType extends object>(
    options?: SubsriberOptions<StateType>
): UseGlobalStateOutput<StateType> => {
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
