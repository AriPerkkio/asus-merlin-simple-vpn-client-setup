import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';

import SSHClient from 'clients/ssh-client';
import IPLeakClient from 'clients/ipleak-client';
import { parseState, parseClients } from 'utils/nvram-parser';
import * as NVRAM_COMMANDS from 'constants/nvram-commands';
import { VPNClient, ErrorType, IPAddressInfo } from 'types';

const MAX_ACTIVE_CLIENTS = 3;
const POLL_INTERVAL_MS = 2000;
const POLL_COUNT = 10;

const waitPollInterval = (): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));

class Api {
    private sshClient: SSHClient;
    private ipLeakClient: IPLeakClient;

    constructor() {
        this.sshClient = new SSHClient();
        this.ipLeakClient = new IPLeakClient(fetch, uuid);
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
     * Get IP address of the router
     */
    public async getRouterIP(): Promise<IPAddressInfo> {
        const [ip, dns1, dns2] = await this.sshClient.execute(
            NVRAM_COMMANDS.GET_ROUTER_IP,
            NVRAM_COMMANDS.GET_ROUTER_DNS_PRIMARY,
            NVRAM_COMMANDS.GET_ROUTER_DNS_SECONDARY
        );

        return {
            ip,
            dns: [dns1, dns2].filter(Boolean),
        };
    }

    /**
     * Get IP address of the server
     */
    public async getServerIP(): Promise<IPAddressInfo> {
        return this.ipLeakClient.getIPAddressInfo();
    }

    /**
     * Activate given VPN client
     * @param id VPN client's ID
     */
    public async activeClient(id: number): Promise<ErrorType | VPNClient> {
        const countOfActiveClients = await this.getCountOfActiveClients();

        if (countOfActiveClients >= MAX_ACTIVE_CLIENTS) {
            return 'ERROR_MAX_CONCURRENT_CLIENTS';
        }

        const { state } = await this.getVpnClientInfo(id);

        if (state !== 'DISCONNECTED') {
            return 'ERROR_CLIENT_NOT_DISCONNECTED';
        }

        await this.sshClient.execute(NVRAM_COMMANDS.ACTIVATE_VPN_CLIENT(id));

        for (let i = 0; i < POLL_COUNT; i++) {
            await waitPollInterval();
            const info = await this.getVpnClientInfo(id);

            if (info.state === 'CONNECTED') {
                return info;
            }
        }

        return 'ERROR_CLIENT_DEACTIVATION_TIMEOUT';
    }

    /**
     * Deactivate given VPN client
     * @param id VPN client's ID
     */
    public async deactivateClient(id: number): Promise<ErrorType | VPNClient> {
        const { state } = await this.getVpnClientInfo(id);

        if (state !== 'CONNECTED') {
            return 'ERROR_CLIENT_NOT_CONNECTED';
        }

        await this.sshClient.execute(NVRAM_COMMANDS.DEACTIVATE_VPN_CLIENT(id));

        for (let i = 0; i < POLL_COUNT; i++) {
            await waitPollInterval();
            const info = await this.getVpnClientInfo(id);

            if (info.state === 'DISCONNECTED') {
                return info;
            }
        }

        return 'ERROR_CLIENT_DEACTIVATION_TIMEOUT';
    }

    private async getVpnClientInfo(id: number): Promise<VPNClient> {
        const [name, state, clients] = await this.sshClient.execute(
            NVRAM_COMMANDS.GET_VPN_CLIENTS_DESCRIPTION(id),
            NVRAM_COMMANDS.GET_VPN_CLIENTS_STATE(id),
            NVRAM_COMMANDS.GET_VPN_CLIENTS_DEVICES(id)
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

        return clients.filter(client => client.state === 'CONNECTED').length;
    }
}

export default new Api();
