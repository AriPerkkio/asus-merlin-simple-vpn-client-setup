import SSHClient from './ssh-client';
import { parseState, parseClients } from './nvram-parser';
import { VPNClient, ConnectionState, ErrorType } from './types';

const MAX_ACTIVE_CLIENTS = 3;

class Api {
    private ssh: SSHClient;

    constructor() {
        this.ssh = new SSHClient();
    }

    /**
     * Get current VPN clients
     */
    public async getVpnClients(): Promise<VPNClient[]> {
        const clients = [];

        for (const id of [1, 2, 3, 4, 5]) {
            clients.push(await this.getVpnClientInfo(id));
        }

        return clients;
    }

    /**
     * Activate given VPN client
     * @param id VPN client's ID
     */
    public async activeClient(id: number): Promise<ErrorType | string> {
        const countOfActiveClients = await this.getCountOfActiveClients();

        if (countOfActiveClients >= MAX_ACTIVE_CLIENTS) {
            return ErrorType.ERROR_MAX_CONCURRENT_CLIENTS;
        }

        const { state } = await this.getVpnClientInfo(id);

        if (state !== ConnectionState.DISCONNECTED) {
            return ErrorType.ERROR_CLIENT_NOT_DISCONNECTED;
        }

        const [result] = await this.ssh.execute(`service start_vpnclient${id}`);

        return result;
    }

    /**
     * Deactivate given VPN client
     * @param id VPN client's ID
     */
    public async deactivateClient(id: number): Promise<ErrorType | string> {
        const { state } = await this.getVpnClientInfo(id);

        if (state !== ConnectionState.CONNECTED) {
            return ErrorType.ERROR_CLIENT_NOT_CONNECTED;
        }

        const [result] = await this.ssh.execute(`service stop_vpnclient${id}`);

        return result;
    }

    private async getVpnClientInfo(id: number): Promise<VPNClient> {
        const [name, state, clients] = await this.ssh.execute(
            `nvram get vpn_client${id}_desc`,
            `nvram get vpn_client${id}_state`,
            `nvram get vpn_client${id}_clientlist`
        );

        return {
            id,
            name,
            state: parseState(state),
            clients: parseClients(clients),
        };
    }

    private async getCountOfActiveClients(): Promise<number> {
        const clients = await this.getVpnClients();

        return clients.filter(
            client => client.state === ConnectionState.CONNECTED
        ).length;
    }
}

export default new Api();
