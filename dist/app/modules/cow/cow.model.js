"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_variable_1 = require("./cow.variable");
const cowSchema = new mongoose_1.Schema({
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    price: { type: 'number', required: true },
    location: { type: 'string', required: true, enum: cow_variable_1.location },
    breed: { type: 'string', required: true, enum: cow_variable_1.cowBreed },
    weight: { type: 'number', required: true },
    label: { type: 'string', required: true },
    category: { type: 'string', required: true, enum: cow_variable_1.cowCategory },
    seller: { type: 'string', required: true },
}, { timestamps: true });
exports.Cow = (0, mongoose_1.model)('Cows', cowSchema);
