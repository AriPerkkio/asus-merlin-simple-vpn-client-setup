import {
    ClientsState,
    ClientsAction,
    ON_CLIENTS_LOAD_START,
    ON_CLIENTS_LOAD_SUCCESS,
    ON_CLIENTS_LOAD_FAILURE,
    ON_CLIENT_ACTIVATION_START,
    ON_CLIENT_ACTIVATION_SUCCESS,
    ON_CLIENT_ACTIVATION_FAILURE,
    ON_CLIENT_DEACTIVATION_START,
    ON_CLIENT_DEACTIVATION_SUCCESS,
    ON_CLIENT_DEACTIVATION_FAILURE,
} from './types';
import { ConnectionState } from '@api/types';

export const initialState: ClientsState = {
    clients: [],
    isLoading: false,
    error: null,
};

export default function reducer(
    state: ClientsState,
    action: ClientsAction
): ClientsState {
    switch (action.type) {
        case ON_CLIENTS_LOAD_START.type:
            return { ...state, isLoading: true };

        case ON_CLIENTS_LOAD_SUCCESS.type: {
            const { clients } = action;

            return { ...state, clients, isLoading: false };
        }

        case ON_CLIENTS_LOAD_FAILURE.type: {
            const { error } = action;

            return { ...state, error, isLoading: false };
        }

        case ON_CLIENT_ACTIVATION_START.type: {
            const { id } = action;
            const clients = state.clients.map(client => ({
                ...client,
                state:
                    client.id === id
                        ? ('CONNECTING' as ConnectionState)
                        : client.state,
            }));

            return { ...state, clients };
        }

        case ON_CLIENT_ACTIVATION_SUCCESS.type: {
            const { client } = action;
            const clients = state.clients.map(_client =>
                _client.id === client.id ? client : _client
            );

            return { ...state, clients };
        }

        case ON_CLIENT_ACTIVATION_FAILURE.type: {
            const { error, id } = action;
            const clients = state.clients.map(client => ({
                ...client,
                error: client.id === id ? error : client.error,
            }));

            return { ...state, clients };
        }

        case ON_CLIENT_DEACTIVATION_START.type: {
            const { id } = action;
            const clients = state.clients.map(client => ({
                ...client,
                state:
                    client.id === id
                        ? ('DISCONNECTING' as ConnectionState)
                        : client.state,
            }));

            return { ...state, clients };
        }

        // https://github.com/AriPerkkio/asus-merlin-simple-vpn-client-setup/issues/1
        case ON_CLIENT_DEACTIVATION_SUCCESS.type: {
            const { client } = action;
            const clients = state.clients.map(_client2 =>
                _client2.id === client.id ? client : _client2
            );

            return { ...state, clients };
        }

        case ON_CLIENT_DEACTIVATION_FAILURE.type: {
            const { error, id } = action;
            const clients = state.clients.map(client => ({
                ...client,
                error: client.id === id ? error : client.error,
            }));

            return { ...state, clients };
        }

        default:
            return state;
    }
}
