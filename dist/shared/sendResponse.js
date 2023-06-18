"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (response, data) => {
    response.status(data.statusCode).json({
        statusCode: data.statusCode,
        status: data.status,
        message: data.message || null,
        data: data.data,
        meta: data.meta,
    });
};
exports.default = sendResponse;
