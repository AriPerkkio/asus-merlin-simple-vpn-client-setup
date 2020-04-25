import React from 'react';

import IpAndDnsInfo from 'components/IpAndDnsInfo';
import ClientList from 'components/ClientList';

const App: React.FC = () => (
    <>
        <header className='app-header'>
            <h1>Asus Merlin Simple VPN Client setup</h1>
        </header>

        <main className='app-content'>
            <IpAndDnsInfo />
            <ClientList />
        </main>
    </>
);

export default App;
