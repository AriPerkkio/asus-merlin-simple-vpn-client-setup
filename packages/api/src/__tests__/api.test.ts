import request from 'supertest';

import { app } from 'index';
import { VPNClient } from 'types';
import * as mockData from '__mocks__/data';

describe('API', () => {
    test('GET /api/router-ip-address', done => {
        request(app)
            .get('/api/router-ip-address')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toEqual(mockData.routerIpAddress);
            })
            .expect(200, done);
    });

    test('GET /api/server-ip-address', done => {
        request(app)
            .get('/api/server-ip-address')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body.ip).toEqual(mockData.serverIpAddress.ip);

                // Order of DNS queries is random
                expect(res.body.dns).toContain(mockData.serverIpAddress.dns[0]);
                expect(res.body.dns).toContain(mockData.serverIpAddress.dns[1]);
            })
            .expect(200, done);
    });

    test('GET /api/vpn-clients', done => {
        request(app)
            .get('/api/vpn-clients')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toEqual(mockData.vpnClients);
            })
            .expect(200, done);
    });

    test('GET /api/vpn-clients/{id}/activate', done => {
        const vpnClient = mockData.vpnClients.find(
            c => c.state === 'DISCONNECTED'
        ) as VPNClient;

        request(app)
            .get(`/api/vpn-clients/${vpnClient.id}/activate`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toEqual({
                    ...vpnClient,
                    state: 'CONNECTED',
                });
            })
            .expect(200, done);
    });

    test('GET /api/vpn-clients/{id}/deactivate', done => {
        const vpnClient = mockData.vpnClients.find(
            c => c.state === 'CONNECTED'
        ) as VPNClient;

        request(app)
            .get(`/api/vpn-clients/${vpnClient.id}/deactivate`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).toEqual({
                    ...vpnClient,
                    state: 'DISCONNECTED',
                });
            })
            .expect(200, done);
    });
});
