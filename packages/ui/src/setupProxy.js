/* eslint-disable */
const proxy = require('http-proxy-middleware');
const mockData = require('./mock-data.json');

module.exports = app => {
    app.use('/api/vpn-clients/:id/activate', (req, res) => {
        const { id } = req.params;
        console.log(`Activate ${id}`);
        setTimeout(() => res.json(mockData), 2000);
    });

    app.use('/api/vpn-clients/:id/deactivate', (req, res) => {
        const { id } = req.params;
        console.log(`Deactivate ${id}`);
        setTimeout(() => res.json(mockData), 2000);
    });

    app.use('/api/vpn-clients', (req, res) =>
        setTimeout(() => res.json(mockData), 2000)
    );
};
