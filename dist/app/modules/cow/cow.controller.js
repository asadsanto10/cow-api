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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCowById = exports.updateCowById = exports.getCowById = exports.getAllCows = exports.createCow = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cow_service_1 = require("./cow.service");
const cow_variable_1 = require("./cow.variable");
const createCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield cow_service_1.cowService.createCow(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'Cow created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCow = createCow;
const getAllCows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageOtions = (0, pick_1.default)(req.query, cow_variable_1.paginationField);
        const filter = (0, pick_1.default)(req.query, cow_variable_1.cowFilterField);
        const result = yield cow_service_1.cowService.getAllCows(pageOtions, filter);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: 'success',
            message: 'Cows fetch successfully',
            data: result.data,
            meta: result.meta,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCows = getAllCows;
const getCowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cow_service_1.cowService.getCowById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'Cow fetched successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCowById = getCowById;
const updateCowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = yield cow_service_1.cowService.updateCowById(id, updateData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'Cow updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCowById = updateCowById;
const deleteCowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cow_service_1.cowService.deleteCowById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'Cow deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCowById = deleteCowById;
