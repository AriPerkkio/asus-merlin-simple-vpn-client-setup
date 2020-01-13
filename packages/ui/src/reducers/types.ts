import {
    VPNClient,
    ErrorType,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';

export const ON_CLIENTS_LOAD_START = { type: 'ON_CLIENTS_LOAD_START' };
export const ON_CLIENTS_LOAD_SUCCESS = { type: 'ON_CLIENTS_LOAD_SUCCESS' };
export const ON_CLIENTS_LOAD_FAILURE = { type: 'ON_CLIENTS_LOAD_FAILURE' };

export const ON_CLIENT_ACTIVATION_START = { type: 'ON_CLIENT_ACTIVATION_START' }; // prettier-ignore
export const ON_CLIENT_ACTIVATION_SUCCESS = { type: 'ON_CLIENT_ACTIVATION_SUCCESS' }; // prettier-ignore
export const ON_CLIENT_ACTIVATION_FAILURE = { type: 'ON_CLIENT_ACTIVATION_FAILURE' }; // prettier-ignore

export const ON_CLIENT_DEACTIVATION_START = { type: 'ON_CLIENT_DEACTIVATION_START' }; // prettier-ignore
export const ON_CLIENT_DEACTIVATION_SUCCESS = { type: 'ON_CLIENT_DEACTIVATION_SUCCESS' }; // prettier-ignore
export const ON_CLIENT_DEACTIVATION_FAILURE = { type: 'ON_CLIENT_DEACTIVATION_FAILURE' }; // prettier-ignore

export type BaseActionType = {
    type: string;
    [key: string]: any;
};

export interface ClientsLoadStartAction extends BaseActionType {
    type: typeof ON_CLIENTS_LOAD_START.type;
}

export interface ClientsLoadSuccessAction extends BaseActionType {
    type: typeof ON_CLIENTS_LOAD_SUCCESS.type;
    clients: VPNClient[];
}

export interface ClientsLoadErrorAction extends BaseActionType {
    type: typeof ON_CLIENTS_LOAD_FAILURE.type;
    error: ErrorType;
}

export interface ClientActivationStartAction extends BaseActionType {
    type: typeof ON_CLIENT_ACTIVATION_START.type;
    id: number;
}

export interface ClientActivationSuccessAction extends BaseActionType {
    type: typeof ON_CLIENT_ACTIVATION_SUCCESS.type;
    client: VPNClient;
}

export interface ClientActivationErrorAction extends BaseActionType {
    type: typeof ON_CLIENT_ACTIVATION_FAILURE.type;
    error: ErrorType;
    id: number;
}

export interface ClientDeactivationStartAction extends BaseActionType {
    type: typeof ON_CLIENT_DEACTIVATION_START.type;
    id: number;
}

export interface ClientDeactivationSuccessAction extends BaseActionType {
    type: typeof ON_CLIENT_DEACTIVATION_SUCCESS.type;
    client: VPNClient;
}

export interface ClientDeactivationErrorAction extends BaseActionType {
    type: typeof ON_CLIENT_DEACTIVATION_FAILURE.type;
    error: ErrorType;
    id: number;
}

export type ClientsActionTypes =
    | ClientsLoadStartAction
    | ClientsLoadSuccessAction
    | ClientsLoadErrorAction
    | ClientActivationStartAction
    | ClientActivationSuccessAction
    | ClientActivationErrorAction
    | ClientDeactivationStartAction
    | ClientDeactivationSuccessAction
    | ClientDeactivationErrorAction;

export interface ClientsState {
    isLoading: boolean;
    error: ErrorType | null;
    clients: VPNClient[];
}
