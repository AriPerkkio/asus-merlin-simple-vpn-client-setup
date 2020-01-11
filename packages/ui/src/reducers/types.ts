import {
    VPNClient,
    ErrorType,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';

export const ON_CLIENTS_LOAD = 'ON_CLIENTS_LOAD';
export const ON_CLIENTS_SUCCESS = 'ON_CLIENTS_SUCCESS';
export const ON_CLIENTS_ERROR = 'ON_CLIENTS_ERROR';

interface ClientsLoadAction {
    type: typeof ON_CLIENTS_LOAD;
}

interface ClientsSuccessAction {
    type: typeof ON_CLIENTS_SUCCESS;
    clients: VPNClient[];
}

interface ClientsErrorAction {
    type: typeof ON_CLIENTS_ERROR;
    error: ErrorType;
}

export type ClientsActionTypes =
    | ClientsLoadAction
    | ClientsSuccessAction
    | ClientsErrorAction;

export interface ClientsState {
    isLoading: boolean;
    error: ErrorType | null;
    clients: VPNClient[];
}
