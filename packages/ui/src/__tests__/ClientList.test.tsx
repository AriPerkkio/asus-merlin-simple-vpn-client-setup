import React from 'react';
import userEvent from '@testing-library/user-event';
import {
    cleanup,
    render,
    screen,
    waitFor,
    within,
} from '@testing-library/react';

import ClientList from 'components/ClientList';
import * as mockData from 'mocks/mock-data';
import { mockApiError } from '__test-helpers__';
import { VPNClient } from '@api/types';

async function waitForLoadersToFinish() {
    screen.getByText('Loading...');

    // Wait for loader to disapper
    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
}

describe('ClientList', () => {
    beforeEach(async () => {
        render(<ClientList />);

        await waitForLoadersToFinish();
    });

    test("user should see section's header", () => {
        const header = screen.getByRole('heading');

        expect(header).toHaveTextContent('VPN Clients');
        expect(header.tagName).toMatch(/h2/i);
    });

    test('user should see error when VPN clients fail to load', async () => {
        await cleanup();
        mockApiError('/api/vpn-clients');

        render(<ClientList />);
        await waitForLoadersToFinish();

        expect(screen.getByRole('alert')).toHaveTextContent('Error:');
    });

    test('user should see VPN clients', () => {
        mockData.vpnClients.forEach(vpnClient => {
            const listItem = within(
                screen.getByText(vpnClient.name).parentElement as HTMLElement
            );

            // State should be visible
            listItem.getByText(vpnClient.state);

            // VPN Clients' devices/clients should be visible in a list
            const devicesList = within(listItem.getByRole('list'));
            vpnClient.clients.forEach(client => {
                const row = within(
                    devicesList.getByText(client.name)
                        .parentElement as HTMLElement
                );

                // Attributes of client should be visible
                expect(
                    row.getByText('Name').nextElementSibling
                ).toHaveTextContent(client.name);

                expect(
                    row.getByText('IP').nextElementSibling
                ).toHaveTextContent(client.ip);

                expect(
                    row.getByText('Target').nextElementSibling
                ).toHaveTextContent(client.target);

                expect(
                    row.getByText('Type').nextElementSibling
                ).toHaveTextContent(client.type);
            });
        });
    });

    test('user should be able to activate a VPN client', async () => {
        const client = mockData.vpnClients.find(
            c => c.state === 'DISCONNECTED'
        ) as VPNClient;

        const row = within(
            screen.getByText(client.name).parentElement as HTMLElement
        );

        // Click activate button
        userEvent.click(row.getByText('Activate'));

        // Loading indicator should appear
        await row.findByText('...');
        row.getByText('CONNECTING');

        // Button should change text to Deactivate
        await row.findByText('Deactivate');

        // Connection should change
        row.getByText('CONNECTED');
    });

    test('user should be able to deactivate a VPN client', async () => {
        const client = mockData.vpnClients.find(
            c => c.state === 'CONNECTED'
        ) as VPNClient;

        const row = within(
            screen.getByText(client.name).parentElement as HTMLElement
        );

        // Click deactivate button
        userEvent.click(row.getByText('Deactivate'));

        // Loading indicator should appear
        await row.findByText('...');
        row.getByText('DISCONNECTING');

        // Button should change text to Activate
        await row.findByText('Activate');

        // Connection should change
        row.getByText('DISCONNECTED');
    });

    // TODO: Error handling has not been implemented
    test.todo('user should see error when VPN client activation fails');
    test.todo('user should see error when VPN client deactivation fails');
});
