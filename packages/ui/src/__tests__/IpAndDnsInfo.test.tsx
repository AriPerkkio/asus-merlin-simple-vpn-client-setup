import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import IpAndDnsInfo from 'components/IpAndDnsInfo';
import * as mockData from 'mocks/mock-data';
import { getListByTitle, mockApiError, getNextToTitle } from '__test-helpers__';

async function waitForLoadersToFinish() {
    // All three loaders should appear
    const loaders = screen.getAllByText('Loading...');
    expect(loaders).toHaveLength(3);

    // Wait for loaders to disapper
    await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
}

describe('IP and DNS info', () => {
    beforeEach(async () => {
        render(<IpAndDnsInfo />);
        await waitForLoadersToFinish();
    });

    test("user should see section's header", () => {
        const header = screen.getByRole('heading');

        expect(header).toHaveTextContent('IP and DNS');
        expect(header.tagName).toMatch(/h2/i);
    });

    test("user should see router's IP and DNS info", () => {
        const { getByText } = getListByTitle('Router:');

        getByText(mockData.routerIpAddress.ip);
        getByText(mockData.routerIpAddress.dns[0]);
        getByText(mockData.routerIpAddress.dns[1]);
    });

    test("user should see server's IP and DNS info", () => {
        const { getByText } = getListByTitle('Server:');

        getByText(mockData.serverIpAddress.ip);
        getByText(mockData.serverIpAddress.dns[0]);
        getByText(mockData.serverIpAddress.dns[1]);
    });

    test("user should see client's IP and DNS info", () => {
        const { getByText } = getListByTitle('Client:');

        getByText(mockData.clientIpAddress.ip);
        getByText(mockData.clientIpAddress.dns[0]);
        getByText(mockData.clientIpAddress.dns[1]);
    });

    test("user should see router's error alers", async () => {
        cleanup();
        mockApiError('/api/router-ip-address');

        render(<IpAndDnsInfo />);
        await waitForLoadersToFinish();

        const { getByText } = getNextToTitle('Router:');
        getByText('Failure');
    });

    test("user should see server's error alers", async () => {
        cleanup();
        mockApiError('/api/server-ip-address');

        render(<IpAndDnsInfo />);
        await waitForLoadersToFinish();

        const { getByText } = getNextToTitle('Server:');
        getByText('Failure');
    });

    test("user should see client's error alers", async () => {
        cleanup();
        mockApiError('https://*.ipleak.net/*');

        render(<IpAndDnsInfo />);
        await waitForLoadersToFinish();

        const { getByText } = getNextToTitle('Client:');
        getByText('Failure');
    });
});
