import express from 'express';
import Api from './api';

const app = express();
const port = 3001;

const validateId = (id: number): { error: string } | undefined => {
    if (id < 1 || 5 < id) {
        return { error: `Id (${id}) out of range` };
    }
};

/**
 * Get list of VPN clients and their states
 */
app.get('/vpn-clients', (req, res) => {
    Api.getVpnClients()
        .then(clients => res.json(clients))
        .catch(error => res.status(500).json(error));
});

/**
 * Activate given VPN client
 */
app.get('/vpn-clients/:id/activate', (req, res) => {
    const id: number = parseInt(req.params.id);
    const validationErrors = validateId(id);

    if (validationErrors) {
        return res.status(400).json(validationErrors);
    }

    Api.activeClient(id)
        .then(state => res.json(state))
        .catch(error => res.status(500).json(error));
});

/**
 * Deactivate given VPN client
 */
app.get('/vpn-clients/:id/deactivate', (req, res) => {
    const id: number = parseInt(req.params.id);
    const errors = validateId(id);

    if (errors) {
        return res.status(400).json(errors);
    }

    Api.deactivateClient(id)
        .then(state => res.json(state))
        .catch(error => res.status(500).json(error));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
