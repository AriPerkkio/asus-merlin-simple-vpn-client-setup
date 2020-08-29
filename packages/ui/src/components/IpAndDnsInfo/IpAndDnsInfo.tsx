import React from 'react';

import { useRouterIpInfo } from 'hooks/useRouterIpInfo';
import { useServerIpInfo } from 'hooks/useServerIpInfo';
import { useClientIpInfo } from 'hooks/useClientIpInfo';
import { IpInfoState } from 'reducers/types';

const BASE_CLASS = 'ip-and-dns-info';

const IpAndDnsInfo: React.FC = () => (
    <section className={BASE_CLASS}>
        <header className={`${BASE_CLASS}-header`}>
            <h2>IP and DNS</h2>
        </header>

        <RouterIpInfo />
        <ServerIpInfo />
        <ClientIpInfo />
    </section>
);

const RouterIpInfo: React.FC = () => {
    const { ipInfo, isLoading, error } = useRouterIpInfo();

    return (
        <>
            <p className={`${BASE_CLASS}-name`}>Router:</p>
            <IpInfo ipInfo={ipInfo} isLoading={isLoading} error={error} />
        </>
    );
};

const ServerIpInfo: React.FC = () => {
    const { ipInfo, isLoading, error } = useServerIpInfo();

    return (
        <>
            <p className={`${BASE_CLASS}-name`}>Server:</p>
            <IpInfo ipInfo={ipInfo} isLoading={isLoading} error={error} />
        </>
    );
};

const ClientIpInfo: React.FC = () => {
    const { ipInfo, isLoading, error } = useClientIpInfo();

    return (
        <>
            <p className={`${BASE_CLASS}-name`}>Client:</p>
            <IpInfo ipInfo={ipInfo} isLoading={isLoading} error={error} />
        </>
    );
};

const IpInfo: React.FC<IpInfoState> = ({
    isLoading,
    error,
    ipInfo,
}: IpInfoState) => {
    if (isLoading) {
        return (
            <p className={`${BASE_CLASS}--loading`} role='status'>
                Loading...
            </p>
        );
    }

    if (error) {
        return (
            <p className={`${BASE_CLASS}--error`} role='alert'>
                Failure
            </p>
        );
    }

    const { ip, dns } = ipInfo || {};

    return (
        <dl className={`${BASE_CLASS}-list`}>
            <dt>IP</dt>
            <dd>{ip}</dd>

            <dt>DNS</dt>
            <dd>
                {(dns || []).map((singleDns, key) => (
                    <div key={key}>{singleDns}</div>
                ))}
            </dd>
        </dl>
    );
};

export default IpAndDnsInfo;
