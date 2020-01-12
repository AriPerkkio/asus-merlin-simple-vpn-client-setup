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
const updateSubscriber = <StateType extends object>(
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

let state = {};
let stateInitialized = false;
const subscribers: Subscriber<any>[] = [];

const createSetState = <StateType>(
    reducer: ReducerType<StateType> | undefined
): StateUpdater<StateType> => (value: StateUpdate<StateType>): void => {
    const previousState = { ...state } as StateType;
    state = reducer
        ? reducer(previousState, value as BaseActionType)
        : { ...state, ...value };

    subscribers.forEach(updateSubscriber(previousState, state));
};

export const useGlobalState = <StateType extends object>(
    options?: SubsriberOptions<StateType>
): UseGlobalStateOutput<StateType> => {
    const [, render] = useReducer(s => !s, true);
    const { initialState, shouldUpdate, reducer } = options || {};
    const latestShouldUpdate = useUpdatedRef(shouldUpdate);

    const setState = useMemo(() => createSetState(reducer), [reducer]);

    if (!stateInitialized && initialState) {
        stateInitialized = true;
        createSetState(undefined)(initialState);
    }

    useEffect(() => {
        const subscriber: Subscriber<StateType> = {
            render,
            shouldUpdate: latestShouldUpdate,
        };
        subscribers.push(subscriber);

        return (): void => {
            subscribers.splice(subscribers.indexOf(subscriber), 1);
        };
    }, [latestShouldUpdate]);

    return [state as StateType, setState];
};
