"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const cow_route_1 = require("../modules/cow/cow.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
router.get('/health', (_req, res) => {
    res.json({ message: 'All ok' });
});
router.use(user_route_1.userRoutes);
router.use('/cows', cow_route_1.cowRoutes);
// not found route
router.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: false,
        message: 'Route not found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'API not found!',
            },
        ],
    });
    next();
});
exports.default = router;
