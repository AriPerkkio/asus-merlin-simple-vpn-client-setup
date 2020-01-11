import {
    ClientsState,
    ClientsActionTypes,
    ON_CLIENTS_LOAD,
    ON_CLIENTS_SUCCESS,
    ON_CLIENTS_ERROR,
} from './types';

export const initialState: ClientsState = {
    clients: [],
    isLoading: false,
    error: null,
};

export default function reducer(
    state: ClientsState,
    action: ClientsActionTypes
): ClientsState {
    switch (action.type) {
        case ON_CLIENTS_LOAD:
            return {
                ...state,
                isLoading: true,
            };
        case ON_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: action.clients,
            };
        case ON_CLIENTS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}
