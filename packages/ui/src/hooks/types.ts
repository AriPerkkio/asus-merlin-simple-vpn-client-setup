import { MutableRefObject } from 'react';

import { ClientsState } from 'reducers/types';

export type ReducerType<StateType, ActionTypes> = (
    previousState: StateType,
    action: ActionTypes
) => StateType;

export interface SubsriberOptions<StateType, ActionTypes> {
    stateRootId?: string;
    shouldUpdate?: ShouldUpdateType<StateType>;
    initialState?: StateType;
    reducer?: ReducerType<StateType, ActionTypes>;
}

export interface Subscriber<StateType> {
    render: React.Dispatch<void>;
    shouldUpdate?: MutableRefObject<ShouldUpdateType<StateType> | undefined>;
}

type ShouldUpdateType<StateType> = (
    previousState: StateType,
    newState: StateType
) => boolean;

export type StateUpdate<StateType, ActionTypes> =
    | { [PartOfState in keyof StateType]?: StateType[PartOfState] }
    | ActionTypes;

export type StateUpdater<StateType, ActionTypes> = (
    value: StateUpdate<StateType, ActionTypes>
) => void;

export type UseGlobalStateOutput<StateType, ActionTypes> = [
    StateType,
    StateUpdater<StateType, ActionTypes>
];

export interface UseClientsOutput extends ClientsState {
    activateClient: (id: number) => void;
    deactivateClient: (id: number) => void;
}
