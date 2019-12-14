export enum Type {
    WAN,
    VPN,
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
    state: string;
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
