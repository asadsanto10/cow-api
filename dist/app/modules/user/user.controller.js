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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield user_service_1.userService.createUser(data);
        // res.status(200).json({ status: 'success', data: result });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'user create successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUser();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'user fetched successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_service_1.userService.getUserById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'user fetched successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = yield user_service_1.userService.updateUserById(id, updateData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'user updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_service_1.userService.deleteUser(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            status: true,
            message: 'user deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
