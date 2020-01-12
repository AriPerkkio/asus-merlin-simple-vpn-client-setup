import { VPNClient } from 'asus-merlin-simple-vpn-client-setup-api/src/types';

const JSON_HEADERS = { headers: { Accept: 'application/json' } };

class Api {
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
}

export default new Api();
