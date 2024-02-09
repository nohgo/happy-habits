/*
import "./loadEnvironment.ts";
import habits from "./routes/habits.ts";
import express from "express";
*/
require("./loadEnvironment");
const habits = require("./routes/habits");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use("/habits", habits);
app.use(express.json());
// required stuff
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
/*
app.get("/api", async (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});
*/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
//# sourceMappingURL=server.js.map