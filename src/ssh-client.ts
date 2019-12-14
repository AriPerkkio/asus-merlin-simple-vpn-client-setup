import { Client } from 'ssh2';
import fs from 'fs';
import config from 'config';
import { SSHConfiguration } from './types';

const newlineRegex = /\n/g;

export default class SshClient {
    configuration: SSHConfiguration;

    constructor() {
        this.configuration = {
            ...config,
            privateKey: fs.readFileSync('./ssh-key'),
        };
    }

    execute(...commands: string[]): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const connection = new Client();
            const results: string[] = [];

            connection
                .on('ready', () => {
                    connection.exec(commands.join('\n'), (err, stream) => {
                        if (err) reject(err);

                        stream
                            .on('close', () => {
                                connection.end();
                                resolve(results);
                            })
                            .on('data', (data: string) =>
                                results.push(this.parseResult(data))
                            )
                            .stderr.on('data', reject);
                    });
                })
                .connect(this.configuration);
        });
    }

    parseResult(result: string): string {
        return result.toString().replace(newlineRegex, '');
    }
}
