import React, { useEffect, useState } from 'react';

import Api from 'api';
import {
    VPNClient,
    Client,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';

const BASE_CLASS = 'client-list';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<VPNClient[]>([]);

    useEffect(() => {
        Api.getVPNClients().then(setClients);
    }, []);

    return (
        <section className={BASE_CLASS}>
            <header className={`${BASE_CLASS}-header`}>
                <h2>VPN Clients</h2>
            </header>

            <ul>{clients.map(ClientListItem)}</ul>
        </section>
    );
};

const ClientListItem = ({ id, name, state, clients }: VPNClient) => {
    const isActivated = state === 'CONNECTED'; // ConnectionState.CONNECTED: Cannot access ambient const enums -error

    const buttonText = isActivated ? 'Deactivate' : 'Activate';
    const onClick = isActivated
        ? Api.deactivateVPNClient
        : Api.activateVPNClient;

    return (
        <li key={id} className={`${BASE_CLASS}-item`}>
            <span className={`${BASE_CLASS}-item-name`}>{name}</span>
            <span
                className={`${BASE_CLASS}-item-state ${BASE_CLASS}-item-state--${
                    isActivated ? 'connected' : 'disconnected'
                }`}>
                {state}
            </span>
            <button
                onClick={() => onClick(id)}
                className={`${BASE_CLASS}-item-toggle`}>
                {buttonText}
            </button>

            <div className={`${BASE_CLASS}-item-devices`}>
                <ul>{clients.map(DeviceSetup)}</ul>
            </div>
        </li>
    );
};

const DeviceSetup = ({ name, ip, target, type }: Client) => (
    <li key={ip}>
        <dl className={`${BASE_CLASS}-item-devices-list`}>
            <dd>Name</dd>
            <dt>{name}</dt>

            <dd>IP</dd>
            <dt>{ip}</dt>

            <dd>Target</dd>
            <dt>{target}</dt>

            <dd>Type</dd>
            <dt>{type}</dt>
        </dl>
    </li>
);

export default ClientList;
