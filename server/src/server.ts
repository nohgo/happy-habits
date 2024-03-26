import "./load-environment";
import habitsRouter from "./routes/habits.route";
import { authRouter } from "./security/routes/auth.route";
import express from "express";
import cors from "cors";

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// required stuff
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

try {
  app.use("/auth", authRouter);
  app.use("/habits", habitsRouter);

  app.listen({ port }, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Database connection failed", error);
  process.exit();
}
