import { v4 as uuid } from 'uuid';
import {
    VPNClient,
    IPAddressInfo,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';
import mockData from 'mock-data';

const delay = (): Promise<void> => new Promise(r => setTimeout(r, 2000));

class Api {
    /**
     * Get list of VPN clients
     */
    async getVPNClients(): Promise<VPNClient[]> {
        await delay();

        return mockData.vpnClients as VPNClient[];
    }

    /**
     * Activate given VPN client
     * @param id VPN client ID
     */
    async activateVPNClient(id: number): Promise<VPNClient> {
        await delay();

        const client = mockData.vpnClients.find(
            _client => _client.id === id
        ) as VPNClient;

        return { ...client, state: 'CONNECTED' };
    }

    /**
     * Deactivate given VPN client
     * @param id VPN client ID
     */
    async deactivateVPNClient(id: number): Promise<VPNClient> {
        await delay();

        const client = mockData.vpnClients.find(
            _client => _client.id === id
        ) as VPNClient;

        return { ...client, state: 'DISCONNECTED' };
    }

    /**
     * Get IP address of the router
     */
    async getRouterIP(): Promise<IPAddressInfo> {
        await delay();

        return mockData.routerIpAddress;
    }

    /**
     * Get IP address of the server
     */
    async getServerIP(): Promise<IPAddressInfo> {
        await delay();

        return mockData.serverIpAddress;
    }

    /**
     * Get IP address of the client
     */
    async getClientIP(): Promise<string> {
        return fetch('https://ipv4.ipleak.net/json')
            .then(response => response.json())
            .then(json => json.ip);
    }

    /**
     * Get DNS address of the client
     * TODO re-use server's implementation
     */
    async getClientDNS(): Promise<string[]> {
        const dnsResults: { [key: string]: boolean } = {};

        // https://gist.github.com/AriPerkkio/25a37745b30aeceef311bc7f2446b28d
        for (let i = 0; i < 5; i++) {
            const hash = uuid().replace(/-/g, '');
            const time = new Date().getTime();

            await Promise.all(
                [1, 2, 3, 4, 5].map(index => {
                    const prefix = index.toString().repeat(8);
                    const url = `https://${prefix}${hash}.ipleak.net/dnsdetect/?_=${time}`;

                    return fetch(url)
                        .then(response => response.text())
                        .then(dns => (dnsResults[dns] = true));
                })
            );
        }

        return Object.keys(dnsResults);
    }
}

export default new Api();
