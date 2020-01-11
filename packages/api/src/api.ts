import SSHClient from './ssh-client';
import { parseState, parseClients } from './nvram-parser';
import { VPNClient, ConnectionState, ErrorType } from './types';

const MAX_ACTIVE_CLIENTS = 3;
const POLL_INTERVAL_MS = 2000;
const POLL_COUNT = 10;

const waitPollInterval = (): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));

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
    public async activeClient(id: number): Promise<ErrorType | VPNClient> {
        const countOfActiveClients = await this.getCountOfActiveClients();

        if (countOfActiveClients >= MAX_ACTIVE_CLIENTS) {
            return ErrorType.ERROR_MAX_CONCURRENT_CLIENTS;
        }

        const { state } = await this.getVpnClientInfo(id);

        if (state !== ConnectionState.DISCONNECTED) {
            return ErrorType.ERROR_CLIENT_NOT_DISCONNECTED;
        }

        await this.ssh.execute(`service start_vpnclient${id}`);

        for (let i = 0; i < POLL_COUNT; i++) {
            await waitPollInterval();
            const info = await this.getVpnClientInfo(id);

            if (info.state === ConnectionState.CONNECTED) {
                return info;
            }
        }

        return ErrorType.ERROR_CLIENT_DEACTIVATION_TIMEOUT;
    }

    /**
     * Deactivate given VPN client
     * @param id VPN client's ID
     */
    public async deactivateClient(id: number): Promise<ErrorType | VPNClient> {
        const { state } = await this.getVpnClientInfo(id);

        if (state !== ConnectionState.CONNECTED) {
            return ErrorType.ERROR_CLIENT_NOT_CONNECTED;
        }

        await this.ssh.execute(`service stop_vpnclient${id}`);

        for (let i = 0; i < POLL_COUNT; i++) {
            await waitPollInterval();
            const info = await this.getVpnClientInfo(id);

            if (info.state === ConnectionState.DISCONNECTED) {
                return info;
            }
        }

        return ErrorType.ERROR_CLIENT_DEACTIVATION_TIMEOUT;
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
