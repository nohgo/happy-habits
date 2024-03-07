"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.habitsRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
// Global Config
exports.habitsRouter = express_1.default.Router();
exports.habitsRouter.use(express_1.default.json());
// Test GET
// habitsRouter.get("/", async (_req: Request, res: Response) => {
//   try {
//     const habits = await collections.habits.find({ id: 123 }).toArray();
//     res.status(200).send(habits);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
//# sourceMappingURL=habits.route.js.map