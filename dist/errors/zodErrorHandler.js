"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (error) => {
    const errors = error.issues.map((issue) => ({
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
    }));
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessage: errors,
    };
};
exports.default = zodErrorHandler;
