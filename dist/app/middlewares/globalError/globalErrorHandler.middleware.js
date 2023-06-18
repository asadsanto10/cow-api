"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../../config"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const validationErrorHandler_1 = __importDefault(require("../../../errors/validationErrorHandler"));
const zodErrorHandler_1 = __importDefault(require("../../../errors/zodErrorHandler"));
const globalErrorHandler = (error, req, res, next) => {
    // variable.nodeENV === 'production'
    // 	? console.log(error)
    // 	: console.log(`Global error handler:::: ${error}`);
    console.log(error);
    let statusCode = 500;
    let message = 'something went wrong!';
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const validationError = (0, validationErrorHandler_1.default)(error);
        statusCode = validationError === null || validationError === void 0 ? void 0 : validationError.statusCode;
        message = validationError === null || validationError === void 0 ? void 0 : validationError.message;
        errorMessage = validationError === null || validationError === void 0 ? void 0 : validationError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const zodError = (0, zodErrorHandler_1.default)(error);
        statusCode = zodError === null || zodError === void 0 ? void 0 : zodError.statusCode;
        message = zodError === null || zodError === void 0 ? void 0 : zodError.message;
        errorMessage = zodError === null || zodError === void 0 ? void 0 : zodError.errorMessage;
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        status: false,
        message,
        errorMessage,
        stack: config_1.default.nodeENV !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
