# Introduction
This package is a simple fluentd/fluent-bit transport for the pino logging library using `@fluent-org/logger`.

# Usage
The fluent logger requires a prefix or a tag. This library currently only allows the use of prefix. One can also add the options from the `@fluent-org/logger` `FluentClient` class;
```ts
import { pino } from 'pino';
import { TransportOptions } from '@lukadriel/pino-fluent';

const transport = pino.transport<TransportOptions>({
    target: '@lukadriel/pino-fluent',
    options: {
        prefix: 'my.app',
    },
});
const logger = pino(transport);
logger.info('Hello from app');
```