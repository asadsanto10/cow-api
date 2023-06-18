"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const cow_model_1 = require("./cow.model");
const cow_variable_1 = require("./cow.variable");
const createCow = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.create(userData);
    if (!result) {
        throw new Error('Failed to create new cows');
    }
    return result;
});
const getAllCows = (pageOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pagination_helper_1.default)(pageOptions);
    const page = options.page;
    const limit = options.limit;
    const skip = options.skip;
    const sortCondition = {};
    const { sortBy, sortOrder } = options;
    const { minPrice, maxPrice, searchTerm } = filter, filterData = __rest(filter, ["minPrice", "maxPrice", "searchTerm"]);
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
            price: Object.assign({}, priceFilter),
        });
    }
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const queryCondition = query.length > 0 ? { $and: query } : {};
    const result = yield cow_model_1.Cow.find(queryCondition).sort(sortCondition).skip(skip).limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(queryCondition);
    return {
        data: result,
        meta: {
            page,
            limit,
            total,
        },
    };
});
const getCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.find({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
const updateCowById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.cowService = { createCow, getAllCows, getCowById, updateCowById, deleteCowById };
