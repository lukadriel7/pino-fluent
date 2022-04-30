import build from 'pino-abstract-transport';
import { FluentClient, FluentClientOptions } from '@fluent-org/logger';

export interface TransportOptions extends FluentClientOptions {
    prefix: string;
}

export default async function (opts: TransportOptions) {
    // SonicBoom is necessary to avoid loops with the main thread.
    // It is the same of pino.destination().
    const { prefix, ...options } = opts;
    const fluent = new FluentClient(prefix, options);
    if (opts && opts.disableAutoconnect) {
        await fluent.connect();
    }
    return build(async function (source) {
        for await (const obj of source) {
            fluent.emit(obj);
        }
    });
}
