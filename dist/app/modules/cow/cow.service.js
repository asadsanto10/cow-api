"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const cow_model_1 = require("./cow.model");
const cow_variable_1 = require("./cow.variable");
const createCow = async (userData) => {
    const result = await cow_model_1.Cow.create(userData);
    if (!result) {
        throw new Error('Failed to create new cows');
    }
    return result;
};
const getAllCows = async (pageOptions, filter) => {
    const options = (0, pagination_helper_1.default)(pageOptions);
    const page = options.page;
    const limit = options.limit;
    const skip = options.skip;
    const sortCondition = {};
    const { sortBy, sortOrder } = options;
    const { minPrice, maxPrice, searchTerm, ...filterData } = filter;
    const query = [];
    const priceFilter = {};
    if (searchTerm) {
        query.push({
            $or: cow_variable_1.cowSearchTerm.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        query.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (minPrice) {
        priceFilter.$gte = Number(minPrice);
    }
    if (maxPrice) {
        priceFilter.$lte = Number(maxPrice);
    }
    if (Object.keys(priceFilter).length) {
        query.push({
            price: { ...priceFilter },
        });
    }
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const queryCondition = query.length > 0 ? { $and: query } : {};
    const result = await cow_model_1.Cow.find(queryCondition).sort(sortCondition).skip(skip).limit(limit);
    const total = await cow_model_1.Cow.countDocuments(queryCondition);
    return {
        data: result,
        meta: {
            page,
            limit,
            total,
        },
    };
};
const getCowById = async (id) => {
    const result = await cow_model_1.Cow.find({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
};
const updateCowById = async (id, payload) => {
    const result = await cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteCowById = async (id) => {
    const result = await cow_model_1.Cow.findByIdAndDelete(id);
    return result;
};
exports.cowService = { createCow, getAllCows, getCowById, updateCowById, deleteCowById };
