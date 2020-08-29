import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

function renderApp() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('./mocks/browser');
    worker.start().then(() => renderApp());
} else {
    renderApp();
}
