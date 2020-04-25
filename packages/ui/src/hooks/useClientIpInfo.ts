import { useEffect } from 'react';

import Api from 'api';
import { useGlobalState } from './useGlobalState';
import reducer, { initialState } from 'reducers/ip-info';
import {
    IpInfoState,
    ON_IP_INFO_LOAD_SUCCESS,
    ON_IP_INFO_LOAD_FAILURE,
    ON_IP_INFO_LOAD_START,
} from 'reducers/types';

export const useClientIpInfo = (): IpInfoState => {
    const [state, dispatch] = useGlobalState<IpInfoState>({
        stateRootId: 'clientIpInfo',
        reducer,
        initialState,
    });

    useEffect(() => {
        dispatch(ON_IP_INFO_LOAD_START);

        Promise.all([Api.getClientIP(), Api.getClientDNS()])
            .then(([ip, dns]) =>
                dispatch({ ...ON_IP_INFO_LOAD_SUCCESS, ipInfo: { ip, dns } })
            )
            .catch(error => dispatch({ ...ON_IP_INFO_LOAD_FAILURE, error }));
    }, [dispatch]);

    return state;
};
