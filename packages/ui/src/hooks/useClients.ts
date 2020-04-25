import { useEffect } from 'react';

import Api from 'api';
import { useGlobalState } from './useGlobalState';
import reducer, { initialState } from 'reducers/vpn-clients';
import {
    ClientsState,
    ON_CLIENTS_LOAD_START,
    ON_CLIENTS_LOAD_SUCCESS,
    ON_CLIENTS_LOAD_FAILURE,
    ON_CLIENT_ACTIVATION_START,
    ON_CLIENT_ACTIVATION_SUCCESS,
    ON_CLIENT_ACTIVATION_FAILURE,
    ON_CLIENT_DEACTIVATION_START,
    ON_CLIENT_DEACTIVATION_SUCCESS,
    ON_CLIENT_DEACTIVATION_FAILURE,
} from 'reducers/types';
import { UseClientsOutput } from './types';

export const useClients = (): UseClientsOutput => {
    const [state, dispatch] = useGlobalState<ClientsState>({
        stateRootId: 'vpnClients',
        reducer,
        initialState,
    });

    useEffect(() => {
        dispatch(ON_CLIENTS_LOAD_START);

        Api.getVPNClients()
            .then(clients => dispatch({ ...ON_CLIENTS_LOAD_SUCCESS, clients }))
            .catch(error => dispatch({ ...ON_CLIENTS_LOAD_FAILURE, error }));
    }, [dispatch]);

    const activateClient = (id: number): void => {
        dispatch({ ...ON_CLIENT_ACTIVATION_START, id });

        Api.activateVPNClient(id)
            .then(client =>
                dispatch({ ...ON_CLIENT_ACTIVATION_SUCCESS, client })
            )
            .catch(error =>
                dispatch({ ...ON_CLIENT_ACTIVATION_FAILURE, error, id })
            );
    };

    const deactivateClient = (id: number): void => {
        dispatch({ ...ON_CLIENT_DEACTIVATION_START, id });

        Api.deactivateVPNClient(id)
            .then(client =>
                dispatch({ ...ON_CLIENT_DEACTIVATION_SUCCESS, client })
            )
            .catch(error =>
                dispatch({ ...ON_CLIENT_DEACTIVATION_FAILURE, error, id })
            );
    };

    return { ...state, activateClient, deactivateClient };
};
