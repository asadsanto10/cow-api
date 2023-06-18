"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
/* eslint-disable no-param-reassign */
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const createUser = async (userData) => {
    const user = await user_model_1.User.create(userData);
    if (!user) {
        throw new Error('Failed to create user');
    }
    return user;
};
const getAllUser = async () => {
    const result = await user_model_1.User.find({}, {
        password: 0,
        __v: 0,
    });
    return result;
};
const getUserById = async (id) => {
    const result = await user_model_1.User.find({
        _id: new mongoose_1.default.Types.ObjectId(id),
    }, {
        password: 0,
        __v: 0,
    });
    return result;
};
const updateUserById = async (id, payload) => {
    const result = await user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        projection: { password: 0, __v: 0 },
    });
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.User.findByIdAndDelete(id);
    return result;
};
exports.userService = { createUser, getAllUser, getUserById, updateUserById, deleteUser };
