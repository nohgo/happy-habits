import "./load-environment";
import habitsRouter from "./routes/habits.route";
import { authRouter } from "./security/routes/auth.route";
import express from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./database/database.connect";

const port = process.env.PORT || 3001;

const app = express();
const apiRouter = express.Router();
app.use(express.json());

// required stuff
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

try {
  connectDB(process.env.DB_NAME);

  apiRouter.use("/auth", authRouter);
  apiRouter.use("/habits", habitsRouter);
  app.use("/api", apiRouter);

  app.listen({ port }, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
} catch (error) {
  console.error(error);
  disconnectDB();
  process.exit();
}
