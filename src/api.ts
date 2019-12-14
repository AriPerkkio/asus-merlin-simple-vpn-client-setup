import SSHClient from './ssh-client';
import { parseState, parseClients } from './nvram-parser';
import { VPNClient } from './types';

class Api {
    ssh: SSHClient;

    constructor() {
        this.ssh = new SSHClient();
    }

    async getVpnClients(): Promise<VPNClient[]> {
        const clients = [];

        for (const id of [1, 2, 3, 4, 5]) {
            clients.push(await this.getVpnClientInfo(id));
        }

        return clients;
    }

    async getVpnClientInfo(id: number): Promise<VPNClient> {
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
}

export default new Api();
