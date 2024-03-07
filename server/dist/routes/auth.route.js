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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
exports.authRouter = express_1.default.Router();
exports.authRouter.use(express_1.default.json());
exports.authRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield database_service_1.collections.users.findOne({
            username: username,
            password: password,
        });
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
                user: username,
                pass: password,
            });
        }
        else {
            res.status(200).json({ message: "Login successful", user });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
    }
}));
//# sourceMappingURL=auth.route.js.map