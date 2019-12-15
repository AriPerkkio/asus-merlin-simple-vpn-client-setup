import { Client } from './types';

export const parseState = (state: string | null): string => {
    if (state == null || state === '') return 'ERROR';

    switch (state.toString()) {
        case '0':
            return 'DISCONNECTED';
        case '2':
            return 'CONNECTED';
        default:
            return `TODO MAP STATE ${state.toString}`;
    }
};

const CLIENT_REGEX = new RegExp(
    [
        '<',
        '(?<name>([sA-Za-z].*?))',
        '>',
        '(?<ip>([0-9./]*))',
        '>',
        '(?<target>([0-9.]*))',
        '>',
        '(?<type>(VPN|WAN))',
    ].join(''),
    'g'
);

export const parseClients = (clientText: string | null): Client[] => {
    const matches = (clientText || '').matchAll(CLIENT_REGEX);
    const clients: Client[] = [];

    for (const match of matches) {
        const { groups } = match || {};
        const { name, ip, target, type } = groups || {};

        clients.push({
            name,
            ip,
            target,
            type,
        });
    }

    return clients;
};
