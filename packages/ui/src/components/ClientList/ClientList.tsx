import React from 'react';
import classNames from 'classnames';

import { useClients } from 'hooks/useClients';
import {
    VPNClient,
    Client,
    ConnectionState,
} from 'asus-merlin-simple-vpn-client-setup-api/src/types';

const BASE_CLASS = 'client-list';

const ClientList: React.FC = () => {
    const {
        clients,
        isLoading,
        error,
        activateClient,
        deactivateClient,
    } = useClients();

    return (
        <section className={BASE_CLASS}>
            <header className={`${BASE_CLASS}-header`}>
                <h2>VPN Clients</h2>
            </header>

            {isLoading && (
                <div className={`${BASE_CLASS}--loading`} role='alert'>
                    Loading
                </div>
            )}

            {error && (
                <div className={`${BASE_CLASS}--error`} role='alert'>
                    Error:
                    <div>{error.toString()}</div>
                </div>
            )}

            <ul>
                {clients.map(client => (
                    <ClientListItem
                        key={client.id}
                        {...client}
                        onActivate={activateClient}
                        onDeactivate={deactivateClient}
                    />
                ))}
            </ul>
        </section>
    );
};

interface ClientListItemProps extends VPNClient {
    onActivate: (id: number) => void;
    onDeactivate: (id: number) => void;
}

const ClientListItem: React.FC<ClientListItemProps> = ({
    id,
    name,
    state,
    clients,
    onActivate,
    onDeactivate,
}: ClientListItemProps) => {
    const isActivated = state === ('CONNECTED' as ConnectionState);
    const isLoading = state === 'CONNECTING' || state === 'DISCONNECTING';

    const buttonText = isActivated ? 'Deactivate' : 'Activate';
    const onClick = isActivated ? onDeactivate : onActivate;

    return (
        <li key={id} className={`${BASE_CLASS}-item`}>
            <span className={`${BASE_CLASS}-item-name`}>{name}</span>
            <span
                className={classNames(
                    `${BASE_CLASS}-item-state`,
                    `${BASE_CLASS}-item-state--${
                        isActivated ? 'connected' : 'disconnected'
                    }`,
                    isLoading && `${BASE_CLASS}-item-state--loading`
                )}>
                {state}
            </span>
            <button
                disabled={isLoading}
                onClick={(): void => {
                    onClick(id);
                }}
                className={`${BASE_CLASS}-item-toggle`}>
                {isLoading ? '...' : buttonText}
            </button>

            <div className={`${BASE_CLASS}-item-devices`}>
                <ul>{clients.map(DeviceSetup)}</ul>
            </div>
        </li>
    );
};

const DeviceSetup: React.FC<Client> = ({ name, ip, target, type }: Client) => (
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