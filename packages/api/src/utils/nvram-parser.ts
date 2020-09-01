import { Client, ConnectionState } from 'types';

// Status code mapping: https://github.com/RMerl/asuswrt-merlin/blob/9f14d213d07fa36da459424a699bfe85f15b2286/release/src/router/www/Advanced_VPNStatus.asp#L136
export const parseState = (state: string | null): ConnectionState => {
    if (state == null || state === '') return 'UNKNOWN';

    switch (state.toString()) {
        case '0':
            return 'DISCONNECTED';
        case '1':
            return 'CONNECTING';
        case '2':
            return 'CONNECTED';
        default:
            console.warn(`No value for connection state ${state} known.`);
            return 'UNKNOWN';
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
