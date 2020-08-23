import { VPNClient, ErrorType, IPAddressInfo } from '@api/types';

export const ON_CLIENTS_LOAD_START = { type: 'ON_CLIENTS_LOAD_START' } as const; // prettier-ignore
export const ON_CLIENTS_LOAD_SUCCESS = { type: 'ON_CLIENTS_LOAD_SUCCESS' } as const; // prettier-ignore
export const ON_CLIENTS_LOAD_FAILURE = { type: 'ON_CLIENTS_LOAD_FAILURE' } as const; // prettier-ignore

export const ON_CLIENT_ACTIVATION_START = { type: 'ON_CLIENT_ACTIVATION_START' } as const; // prettier-ignore
export const ON_CLIENT_ACTIVATION_SUCCESS = { type: 'ON_CLIENT_ACTIVATION_SUCCESS' } as const; // prettier-ignore
export const ON_CLIENT_ACTIVATION_FAILURE = { type: 'ON_CLIENT_ACTIVATION_FAILURE' } as const; // prettier-ignore

export const ON_CLIENT_DEACTIVATION_START = { type: 'ON_CLIENT_DEACTIVATION_START' } as const; // prettier-ignore
export const ON_CLIENT_DEACTIVATION_SUCCESS = { type: 'ON_CLIENT_DEACTIVATION_SUCCESS' } as const; // prettier-ignore
export const ON_CLIENT_DEACTIVATION_FAILURE = { type: 'ON_CLIENT_DEACTIVATION_FAILURE' } as const; // prettier-ignore

export const ON_IP_INFO_LOAD_START = { type: 'ON_IP_INFO_LOAD_START' } as const; // prettier-ignore
export const ON_IP_INFO_LOAD_SUCCESS = { type: 'ON_IP_INFO_LOAD_SUCCESS' } as const; // prettier-ignore
export const ON_IP_INFO_LOAD_FAILURE = { type: 'ON_IP_INFO_LOAD_FAILURE' } as const; // prettier-ignore

export type BaseActionType = { type: string };

export type ClientsLoadAction =
    | { type: typeof ON_CLIENTS_LOAD_START.type }
    | { type: typeof ON_CLIENTS_LOAD_SUCCESS.type; clients: VPNClient[] }
    | { type: typeof ON_CLIENTS_LOAD_FAILURE.type; error: ErrorType };

export type ClientActivationAction =
    | { type: typeof ON_CLIENT_ACTIVATION_START.type; id: number }
    | { type: typeof ON_CLIENT_ACTIVATION_SUCCESS.type; client: VPNClient }
    | {
          type: typeof ON_CLIENT_ACTIVATION_FAILURE.type;
          error: ErrorType;
          id: number;
      };

export type ClientDeactivationAction =
    | { type: typeof ON_CLIENT_DEACTIVATION_START.type; id: number }
    | { type: typeof ON_CLIENT_DEACTIVATION_SUCCESS.type; client: VPNClient }
    | {
          type: typeof ON_CLIENT_DEACTIVATION_FAILURE.type;
          error: ErrorType;
          id: number;
      };

export type ClientsAction =
    | ClientsLoadAction
    | ClientActivationAction
    | ClientDeactivationAction;

export type IpInfoLoadAction =
    | { type: typeof ON_IP_INFO_LOAD_START.type }
    | { type: typeof ON_IP_INFO_LOAD_SUCCESS.type; ipInfo: IPAddressInfo }
    | { type: typeof ON_IP_INFO_LOAD_FAILURE.type; error: ErrorType };

export interface ClientsState {
    isLoading: boolean;
    error: ErrorType | null;
    clients: VPNClient[];
}

export interface IpInfoState {
    isLoading: boolean;
    error: ErrorType | null;
    ipInfo: IPAddressInfo | null;
}
