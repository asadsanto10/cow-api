"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_middleware_1 = __importDefault(require("./app/middlewares/globalError/globalErrorHandler.middleware"));
const router_1 = __importDefault(require("./app/routes/router"));
const connect_1 = __importDefault(require("./db/connect"));
const rejectionHandel_1 = require("./rejectionHandel/rejectionHandel");
let server;
const app = (0, express_1.default)();
// server port
const port = process.env.PORT || 5005;
(0, rejectionHandel_1.uncaughtException)();
// database require
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(0, connect_1.default)();
// parser
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// console.log(app.get('env'));
// route
const base = '/api/v1';
app.use(base, router_1.default);
// global error
app.use(globalErrorHandler_middleware_1.default);
// eslint-disable-next-line prefer-const
server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// unhandled rejection
(0, rejectionHandel_1.unhandledRejection)(server);
// sigTerm detection
(0, rejectionHandel_1.sigTerm)(server);
exports.default = app;
