import fs from 'fs';
import path from 'path';

import { SSHConfiguration } from 'types';

export function parseConfiguration(): SSHConfiguration {
    const { privateKey, config } = readFiles();

    const sshConfig: { [key: string]: string } = config
        .toString()
        .split('\n')
        .reduce((conf, row) => {
            const [key, value] = row.split('=');

            return { ...conf, [key]: value };
        }, {});

    return {
        username: sshConfig.USERNAME,
        host: sshConfig.HOST,
        port: parseInt(sshConfig.PORT),
        privateKey,
    };
}

function readFiles(): { privateKey: Buffer; config: Buffer } {
    const isTestOrDev =
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test';

    const root = path.resolve(isTestOrDev ? './src/__mocks__/mock-' : './');

    return {
        privateKey: fs.readFileSync(`${root}ssh-key`),
        config: fs.readFileSync(`${root}ssh-config`),
    };
}
