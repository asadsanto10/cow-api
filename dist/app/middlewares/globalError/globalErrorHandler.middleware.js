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
    if (error?.name === 'ValidationError') {
        const validationError = (0, validationErrorHandler_1.default)(error);
        statusCode = validationError?.statusCode;
        message = validationError?.message;
        errorMessage = validationError?.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const zodError = (0, zodErrorHandler_1.default)(error);
        statusCode = zodError?.statusCode;
        message = zodError?.message;
        errorMessage = zodError?.errorMessage;
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessage = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorMessage = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        status: false,
        message,
        errorMessage,
        stack: config_1.default.nodeENV !== 'production' ? error?.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
