"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnvironment");
const habits_route_1 = require("./routes/habits.route");
const database_service_1 = require("./services/database.service");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// required stuff
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/habits", habits_route_1.habitsRouter);
    app.listen({ PORT }, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=server.js.map