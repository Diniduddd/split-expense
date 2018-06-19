let pino = require('pino');

class Logger {
    constructor() {
        const isDev = process.env.NODE_ENV === 'development';

        this.logger = pino({
            name: 'main',
            prettyPrint: isDev,
            level: isDev? 'trace': 'warn',
        });
    }

    trace(message) {
        this.logger.trace(message);
    }

    debug(message) {
        this.logger.debug(message);
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }

    fatal(message) {
        this.logger.fatal(message);
    }
}

export default new Logger();
