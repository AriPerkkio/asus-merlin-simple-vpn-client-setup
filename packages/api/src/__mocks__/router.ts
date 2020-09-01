import { Server } from 'ssh2';

import { parseConfiguration } from 'utils/configuration-parser';
import { GET_VPN_CLIENTS_STATE } from 'constants/nvram-commands';
import responses from '__mocks__/router-responses.json';

type Command = keyof typeof responses;
const state = JSON.parse(JSON.stringify(responses));

const configuration = parseConfiguration();

const router = new Server({ hostKeys: [configuration.privateKey] }, client => {
    client
        .on('authentication', function (ctx) {
            const user = Buffer.from(ctx.username).toString();

            if (user === configuration.username) {
                ctx.accept();
            } else {
                console.log('Rejecting invalid user', user);
                ctx.reject();
            }
        })
        .on('ready', function () {
            client.on('session', function (accept) {
                const session = accept();

                session.once('exec', function (accept, _, info) {
                    const commands: Command[] = info.command.split('\n');
                    const stream = accept();

                    commands.forEach(command => {
                        const isStart = /start_vpnclient/.test(command);
                        const isStop = /stop_vpnclient/.test(command);
                        const [id] = command.match(/\d/) as string[];

                        if (isStart) {
                            state[GET_VPN_CLIENTS_STATE(parseInt(id))] = '2';
                        } else if (isStop) {
                            state[GET_VPN_CLIENTS_STATE(parseInt(id))] = '0';
                        } else {
                            stream.write(state[command]);
                        }
                    });

                    stream.exit(0);
                    stream.end();
                });
            });
        });
});

router.listen = router.listen.bind(
    router,
    configuration.port,
    configuration.host
);

export default router;
