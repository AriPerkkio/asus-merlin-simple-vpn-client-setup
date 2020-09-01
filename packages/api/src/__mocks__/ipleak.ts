import { setupServer } from 'msw/node';
import { rest } from 'msw';

import * as mockData from '__mocks__/data';

let clientDnsCounter = 0;

export default setupServer(
    rest.get('*.ipleak.net/dnsdetect', (req, res, ctx) => {
        const index = clientDnsCounter % 2 === 0 ? 0 : 1;
        clientDnsCounter++;

        return res(ctx.text(mockData.serverIpAddress.dns[index]));
    }),

    rest.get('https://ipv4.ipleak.net/json', (req, res, ctx) => {
        return res(ctx.json({ ip: mockData.serverIpAddress.ip }));
    })
);
