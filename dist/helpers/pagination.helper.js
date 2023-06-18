"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculatePagination = (pageOptions) => {
    const page = Number(pageOptions.page || 1);
    const limit = Number(pageOptions.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = pageOptions.sortBy || 'createdAt';
    const sortOrder = pageOptions.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = calculatePagination;
