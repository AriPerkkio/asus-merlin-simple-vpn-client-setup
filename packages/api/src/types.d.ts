export type VPNType = 'WAN' | 'VPN';

export type ConnectionState =
    | 'CONNECTED'
    | 'CONNECTING'
    | 'DISCONNECTED'
    | 'DISCONNECTING'
    // TODO handle error case
    | 'UNKNOWN';

export type ErrorType =
    | 'ERROR_MAX_CONCURRENT_CLIENTS'
    | 'ERROR_CLIENT_NOT_DISCONNECTED'
    | 'ERROR_CLIENT_NOT_CONNECTED'
    | 'ERROR_CLIENT_ACTIVATION_TIMEOUT'
    | 'ERROR_CLIENT_DEACTIVATION_TIMEOUT';

interface Client {
    name: string;
    ip: string;
    target: string;
    type: VPNType | string;
}

export interface VPNClient {
    id: number;
    name: string;
    state: ConnectionState;
    clients: Client[];
    error?: ErrorType;
}

export interface IPAddressInfo {
    ip: string;
    dns: string[];
}

interface Configuration {
    host: string;
    port: number;
    username: string;
}

interface SSHConfiguration extends Configuration {
    privateKey: Buffer;
}
