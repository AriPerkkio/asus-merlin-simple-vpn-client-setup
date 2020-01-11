import { useEffect } from 'react';

import Api from 'api';
import { useGlobalState } from './useGlobalState';
import reducer, { initialState } from 'reducers/vpn-clients';
import { ClientsState } from 'reducers/types';

export const useClients = (): ClientsState => {
    const [state, setState] = useGlobalState<ClientsState>({
        reducer,
        initialState,
    });

    useEffect(() => {
        setState({ isLoading: true });

        Api.getVPNClients()
            .then(clients => setState({ clients, isLoading: false }))
            .catch(error => setState({ error, isLoading: false }));
    }, [setState]);

    return state;
};
