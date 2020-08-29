import { rest, response as originalRes } from 'msw';

import { res } from './res';
import * as mockData from 'mocks/mock-data';

let clientDnsCounter = 0;

export const handlers = [
    rest.get('*.ipleak.net/dnsdetect', (req, _, ctx) => {
        const index = clientDnsCounter % 2 === 0 ? 0 : 1;
        clientDnsCounter++;

        return originalRes(ctx.text(mockData.clientIpAddress.dns[index]));
    }),

    rest.get('https://ipv4.ipleak.net/json', (req, _, ctx) => {
        return res(ctx.json({ ip: mockData.clientIpAddress.ip }));
    }),

    rest.get('/api/router-ip-address', (req, _, ctx) => {
        return res(ctx.json(mockData.routerIpAddress));
    }),

    rest.get('/api/server-ip-address', (req, _, ctx) => {
        return res(ctx.json(mockData.serverIpAddress));
    }),

    rest.get('/api/vpn-clients', (req, _, ctx) => {
        return res(ctx.json(mockData.vpnClients));
    }),

    rest.get('/api/vpn-clients/:id/activate', (req, _, ctx) => {
        const { id } = req.params;
        const client = mockData.vpnClients.find(c => c.id == id);

        return res(ctx.json({ ...client, state: 'CONNECTED' }));
    }),

    rest.get('/api/vpn-clients/:id/deactivate', (req, _, ctx) => {
        const { id } = req.params;
        const client = mockData.vpnClients.find(c => c.id == id);

        return res(ctx.json({ ...client, state: 'DISCONNECTED' }));
    }),
];
