import { useReducer, useEffect } from 'react';

interface SubsriberOptions<StateType extends object> {
    shouldUpdate?: (previousState: StateType, newState: StateType) => boolean;
    reducer?: (previousState: StateType, action: any) => StateType;
    initialState?: StateType;
}

interface Subscriber<StateType extends object = {}>
    extends SubsriberOptions<StateType> {
    render: React.Dispatch<void>;
}

type StateUpdater<StateType> = (value: StateType) => void;
type UseGlobalStateOutput<State> = [
    State,
    StateUpdater<{ [PartOfState in keyof State]?: State[PartOfState] }>
];

const defaultCompare = <StateType>(): boolean => true;
const updateSubscriber = <StateType extends object>(
    previousState: StateType,
    newState: StateType
): ((subscriber: Subscriber) => void) => (subsriber): void => {
    const { render, shouldUpdate }: Subscriber = subsriber || {};

    if ((shouldUpdate || defaultCompare)(previousState, newState)) {
        render();
    }
};

const createGlobalState = () => {
    let state = {};
    let stateInitialized = false;
    const subscribers: Subscriber<any>[] = [];

    const setState: StateUpdater<object> = (value: object) => {
        const previousState = { ...state };
        state = { ...state, ...value };

        subscribers.forEach(updateSubscriber(previousState, state));
    };

    const useGlobalState = <StateType extends object>(
        options?: SubsriberOptions<StateType>
    ): UseGlobalStateOutput<StateType> => {
        const [, render] = useReducer(s => !s, true);
        const { initialState, shouldUpdate } = options || {};

        if (!stateInitialized && initialState) {
            stateInitialized = true;
            setState(initialState);
        }

        useEffect(() => {
            const subscriber = { render, shouldUpdate };
            subscribers.push(subscriber);

            return (): void => {
                subscribers.splice(subscribers.indexOf(subscriber), 1);
            };
        }, []); // eslint-disable-line

        return [state as StateType, setState];
    };

    return useGlobalState;
};

export const useGlobalState = createGlobalState();
