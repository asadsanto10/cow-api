"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sigTerm = exports.unhandledRejection = exports.uncaughtException = void 0;
const uncaughtException = () => {
    process.on('uncaughtException', (error) => {
        console.log('uncaughtException is detected::: ', error);
        process.exit(1);
    });
};
exports.uncaughtException = uncaughtException;
const unhandledRejection = (server) => {
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                console.log('Unhandled rejection is detected::::: ', error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
};
exports.unhandledRejection = unhandledRejection;
const sigTerm = (server) => {
    process.on('SIGTERM', () => {
        console.log('SIGTERM is received...');
        if (server) {
            server.close();
        }
    });
};
exports.sigTerm = sigTerm;
