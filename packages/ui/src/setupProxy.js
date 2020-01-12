const proxy = require('http-proxy-middleware');
const mockData = require('./mock-data.json');

const USE_MOCK_API = false;

module.exports = app => {
    if (USE_MOCK_API) {
        app.use('/api/vpn-clients/:id/activate', (req, res) => {
            const { id } = req.params;
            console.log(`Activate ${id}`);
            const client = mockData.find(_client => _client.id == id);

            setTimeout(() => res.json({ ...client, state: 'CONNECTED' }), 3000);
        });

        app.use('/api/vpn-clients/:id/deactivate', (req, res) => {
            const { id } = req.params;
            console.log(`Deactivate ${id}`);
            const client = mockData.find(_client => _client.id == id);

            setTimeout(
                () => res.json({ ...client, state: 'DISCONNECTED' }),
                3000
            );
        });

        app.use('/api/vpn-clients', (req, res) =>
            setTimeout(() => res.json(mockData), 2000)
        );
    } else {
        app.use(
            '/api',
            proxy({
                target: 'http://localhost:3001',
                logLevel: 'debug',
            })
        );
    }
};
