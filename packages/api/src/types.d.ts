export enum Type {
    WAN,
    VPN,
}

export const enum ConnectionState {
    CONNECTED = 'CONNECTED',
    CONNECTING = 'CONNECTING',
    DISCONNECTED = 'DISCONNECTED',
    UNKNOWN = 'UNKNOWN',
}

export const enum ErrorType {
    ERROR_MAX_CONCURRENT_CLIENTS = 'ERROR_MAX_CONCURRENT_CLIENTS',
    ERROR_CLIENT_NOT_DISCONNECTED = 'ERROR_CLIENT_NOT_DISCONNECTED',
    ERROR_CLIENT_NOT_CONNECTED = 'ERROR_CLIENT_NOT_CONNECTED',
    ERROR_CLIENT_ACTIVATION_TIMEOUT = 'ERROR_CLIENT_ACTIVATION_TIMEOUT',
    ERROR_CLIENT_DEACTIVATION_TIMEOUT = 'ERROR_CLIENT_DEACTIVATION_TIMEOUT',
}

interface Client {
    name: string;
    ip: string;
    target: string;
    type: Type | string;
}

interface VPNClient {
    id: number;
    name: string;
    state: ConnectionState;
    clients: Client[];
}

interface Configuration {
    host: string;
    port: number;
    username: string;
}

interface SSHConfiguration extends Configuration {
    privateKey: Buffer;
}
