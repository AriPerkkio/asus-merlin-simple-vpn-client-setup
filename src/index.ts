import express from 'express';
import Api from './api';

const app = express();
const port = 3000;

app.get('/vpn-clients', async (req, res) => {
    const clients = await Api.getVpnClients();

    return res.json(clients);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
