"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const user_variable_1 = require("./user.variable");
const userSchema = new mongoose_1.Schema({
    phoneNumber: { type: 'string', required: true, unique: true },
    role: { type: 'string', required: true, enum: user_variable_1.userRole },
    password: { type: 'string', required: true },
    name: {
        firstName: { type: 'string', required: true },
        lastName: { type: 'string', required: true },
    },
    address: { type: 'string', required: true },
    budget: { type: 'number', required: true },
    income: { type: 'number', required: true },
}, { timestamps: true });
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
    const isExist = await this.$model('Users').findOne({
        phoneNumber: this.phoneNumber,
    });
    if (isExist) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, 'Phone number is already exists!');
    }
    next();
});
exports.User = (0, mongoose_1.model)('Users', userSchema);
