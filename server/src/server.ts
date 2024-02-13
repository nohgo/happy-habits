import "./loadEnvironment";
import { habitsRouter } from "./routes/habits.route";
import { connectToDatabase } from "./services/database.service";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// required stuff
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

connectToDatabase()
  .then(() => {
    app.use("/habits", habitsRouter);

    app.listen({ PORT }, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
