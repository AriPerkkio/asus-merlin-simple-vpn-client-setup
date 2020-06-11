import { v4 as uuid } from 'uuid';
import {
    VPNClient,
    IPAddressInfo,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';
import IPLeakClient from 'asus-merlin-simple-vpn-client-setup-api/src/ipleak-client';

const JSON_HEADERS = { headers: { Accept: 'application/json' } };

class Api {
    private ipLeakClient: IPLeakClient;

    constructor() {
        this.ipLeakClient = new IPLeakClient(fetch, uuid);
    }

    /**
     * Get list of VPN clients
     */
    async getVPNClients(): Promise<VPNClient[]> {
        return fetch('/api/vpn-clients', JSON_HEADERS).then(response =>
            response.json()
        );
    }

    /**
     * Activate given VPN client
     * @param id VPN client ID
     */
    async activateVPNClient(id: number): Promise<string> {
        return fetch(`/api/vpn-clients/${id}/activate`).then(response =>
            response.json()
        );
    }

    /**
     * Deactivate given VPN client
     * @param id VPN client ID
     */
    async deactivateVPNClient(id: number): Promise<string> {
        return fetch(`/api/vpn-clients/${id}/deactivate`).then(response =>
            response.json()
        );
    }

    /**
     * Get IP address of the router
     */
    async getRouterIP(): Promise<IPAddressInfo> {
        return fetch('/api/router-ip-address').then(response =>
            response.json()
        );
    }

    /**
     * Get IP address of the server
     */
    async getServerIP(): Promise<IPAddressInfo> {
        return fetch('/api/server-ip-address').then(response =>
            response.json()
        );
    }

    /**
     * Get IP address info of the client
     */
    async getClientIPInfo(): Promise<IPAddressInfo> {
        return this.ipLeakClient.getIPAddressInfo();
    }
}

export default new Api();
