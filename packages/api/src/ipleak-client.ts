import { IPAddressInfo } from './types';

// Generic fetcher type acceping node-fetch and lib.dom/fetch
type Fetcher = <T = {}>(
    url: string
) => Promise<{
    json: () => Promise<T>;
    text: () => Promise<string>;
}>;

export default class IPLeakClient {
    private fetcher: Fetcher;
    private idGenerator: () => string;

    constructor(fetcher: Fetcher, idGenerator: () => string) {
        this.fetcher = fetcher;
        this.idGenerator = idGenerator;
    }

    public async getIPAddressInfo(): Promise<IPAddressInfo> {
        const [ip, dns] = await Promise.all([
            this.getIPAddress(),
            this.getDNS(),
        ]);

        return { ip, dns };
    }

    private async getIPAddress(): Promise<string> {
        return this.fetcher<IPAddressInfo>('https://ipv4.ipleak.net/json')
            .then(response => response.json())
            .then(json => json.ip);
    }

    private async getDNS(): Promise<string[]> {
        const dnsResults: { [key: string]: boolean } = {};

        // https://gist.github.com/AriPerkkio/25a37745b30aeceef311bc7f2446b28d
        for (let i = 0; i < 5; i++) {
            const hash = this.idGenerator().replace(/-/g, '');
            const time = new Date().getTime();

            await Promise.all(
                [1, 2, 3, 4, 5].map(index => {
                    const prefix = index.toString().repeat(8);
                    const url = `https://${prefix}${hash}.ipleak.net/dnsdetect/?_=${time}`;

                    return this.fetcher(url)
                        .then(response => response.text())
                        .then(dns => (dnsResults[dns] = true));
                })
            );
        }

        return Object.keys(dnsResults);
    }
}
