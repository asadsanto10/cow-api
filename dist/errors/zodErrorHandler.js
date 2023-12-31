"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (error) => {
    const errors = error.issues.map((issue) => ({
        path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
        message: issue === null || issue === void 0 ? void 0 : issue.message,
    }));
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessage: errors,
    };
};
exports.default = zodErrorHandler;
