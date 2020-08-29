import { VPNClient, IPAddressInfo } from '@api/types';

export const vpnClients: VPNClient[] = [
    {
        id: 1,
        name: 'Client Number One',
        state: 'DISCONNECTED',
        clients: [
            {
                name: 'Device One',
                ip: '192.168.1.10',
                target: '0.0.0.0',
                type: 'VPN',
            },
        ],
    },
    {
        id: 2,
        name: 'Client Number Two, Extended Name',
        state: 'DISCONNECTED',
        clients: [
            {
                name: 'Device One',
                ip: '192.168.1.10',
                target: '0.0.0.0',
                type: 'VPN',
            },
        ],
    },
    {
        id: 3,
        name: 'Third Client',
        state: 'DISCONNECTED',
        clients: [
            {
                name: 'Device One',
                ip: '192.168.1.10',
                target: '0.0.0.0',
                type: 'VPN',
            },
        ],
    },
    {
        id: 4,
        name: 'Fourth Client, Extended name',
        state: 'CONNECTED',
        clients: [
            {
                name: 'Device Number Two',
                ip: '192.168.1.11',
                target: '0.0.0.0',
                type: 'VPN',
            },
        ],
    },
    {
        id: 5,
        name: 'Client Number Five',
        state: 'CONNECTED',
        clients: [
            {
                name: 'All IPs',
                ip: '192.168.1.2/24',
                target: '0.0.0.0',
                type: 'VPN',
            },
            {
                name: 'Device number three',
                ip: '192.168.1.12',
                target: '0.0.0.0',
                type: 'WAN',
            },
            {
                name: 'Device number four',
                ip: '192.168.1.13',
                target: '0.0.0.0',
                type: 'WAN',
            },
            {
                name: 'Device number five',
                ip: '192.168.1.14',
                target: '0.0.0.0',
                type: 'WAN',
            },
        ],
    },
];

export const routerIpAddress: IPAddressInfo = {
    ip: '11.11.111.111',
    dns: ['22.22.222.222', '33.33.333.333'],
};

export const serverIpAddress: IPAddressInfo = {
    ip: '44.44.444.444',
    dns: ['55.55.555.555', '66.66.666.666'],
};

export const clientIpAddress: IPAddressInfo = {
    ip: '77.77.777.777',
    dns: ['88.88.888.888', '99.99.999.999'],
};
