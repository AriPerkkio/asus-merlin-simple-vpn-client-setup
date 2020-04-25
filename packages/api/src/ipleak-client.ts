import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';

import { IPAddressInfo } from './types';

// TODO implement with dependency injection for sharing functionality with UI
export default class IPLeakClient {
    public async getIPAddressInfo(): Promise<IPAddressInfo> {
        const [ip, dns] = await Promise.all([
            this.getIPAddress(),
            this.getDNS(),
        ]);

        return { ip, dns };
    }

    private async getIPAddress(): Promise<string> {
        return fetch('https://ipv4.ipleak.net/json')
            .then(response => response.json())
            .then(json => json.ip);
    }

    private async getDNS(): Promise<string[]> {
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
