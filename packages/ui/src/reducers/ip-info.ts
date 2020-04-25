import {
    IpInfoState,
    IpInfoActionTypes,
    ON_IP_INFO_LOAD_START,
    ON_IP_INFO_LOAD_SUCCESS,
    ON_IP_INFO_LOAD_FAILURE,
} from './types';

export const initialState: IpInfoState = {
    ipInfo: null,
    isLoading: false,
    error: null,
};

export default function reducer(
    state: IpInfoState,
    action: IpInfoActionTypes
): IpInfoState {
    switch (action.type) {
        case ON_IP_INFO_LOAD_START.type:
            return { ...state, isLoading: true };

        case ON_IP_INFO_LOAD_SUCCESS.type:
            const { ipInfo } = action;

            return { ...state, ipInfo, isLoading: false };

        case ON_IP_INFO_LOAD_FAILURE.type:
            const { error } = action;

            return { ...state, error, isLoading: false };

        default:
            return state;
    }
}
