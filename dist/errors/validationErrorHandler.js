"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationErrorHandler = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessage: errors,
    };
};
exports.default = validationErrorHandler;
