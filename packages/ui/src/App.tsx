import React from 'react';

import ClientList from 'components/ClientList';

const App: React.FC = () => (
    <>
        <header className='app-header'>
            <h1>VPN Client setup</h1>
        </header>

        <main className='app-content'>
            <ClientList />
        </main>
    </>
);

export default App;
