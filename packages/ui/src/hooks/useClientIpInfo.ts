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

        Api.getClientIPInfo()
            .then(ipInfo => dispatch({ ...ON_IP_INFO_LOAD_SUCCESS, ipInfo }))
            .catch(error => dispatch({ ...ON_IP_INFO_LOAD_FAILURE, error }));
    }, [dispatch]);

    return state;
};
