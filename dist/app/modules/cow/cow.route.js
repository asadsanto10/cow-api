"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest/validateRequest");
const cow_controller_1 = require("./cow.controller");
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(cow_validation_1.cowValidation.createCowZodSchema), cow_controller_1.createCow);
router.get('/:id', cow_controller_1.getCowById);
router.patch('/:id', (0, validateRequest_1.validateRequest)(cow_validation_1.cowValidation.updateCowZodSchema), cow_controller_1.updateCowById);
router.delete('/:id', cow_controller_1.deleteCowById);
router.get('/', cow_controller_1.getAllCows);
exports.cowRoutes = router;
