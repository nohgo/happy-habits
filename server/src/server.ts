/*
import "./loadEnvironment.ts";
import todos from "./routes/todos.ts";
import express from "express";
*/
require("./loadEnvironment.ts");
const todos = require("./routes/todos.ts");
const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();
app.use("/todos", todos);

// required stuff
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/api", (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
