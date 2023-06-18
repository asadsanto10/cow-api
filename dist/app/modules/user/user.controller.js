"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await user_service_1.userService.createUser(data);
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
};
exports.createUser = createUser;
const getAllUsers = async (req, res, next) => {
    try {
        const result = await user_service_1.userService.getAllUser();
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
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await user_service_1.userService.getUserById(id);
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
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await user_service_1.userService.updateUserById(id, updateData);
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
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await user_service_1.userService.deleteUser(id);
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
};
exports.deleteUser = deleteUser;
