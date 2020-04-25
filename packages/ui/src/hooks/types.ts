import { MutableRefObject } from 'react';
import { BaseActionType, ClientsState } from 'reducers/types';

export type ReducerType<StateType> = (
    previousState: StateType,
    action: BaseActionType
) => StateType;

export interface SubsriberOptions<StateType extends object> {
    stateRootId?: string;
    shouldUpdate?: ShouldUpdateType<StateType>;
    initialState?: StateType;
    reducer?: ReducerType<StateType>;
}

export interface Subscriber<StateType extends object = {}> {
    render: React.Dispatch<void>;
    shouldUpdate?: MutableRefObject<ShouldUpdateType<StateType> | undefined>;
}

type ShouldUpdateType<StateType> = (
    previousState: StateType,
    newState: StateType
) => boolean;

export type StateUpdate<StateType> =
    | { [PartOfState in keyof StateType]?: StateType[PartOfState] }
    | BaseActionType;

export type StateUpdater<StateType> = (value: StateUpdate<StateType>) => void;

export type UseGlobalStateOutput<StateType> = [
    StateType,
    StateUpdater<StateType>
];

export interface UseClientsOutput extends ClientsState {
    activateClient: (id: number) => void;
    deactivateClient: (id: number) => void;
}
