const express = require("express");
const db = require("../db/conn.ts");
/*
import express from "express";
import db from "../db/conn.ts";
*/
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/todos", async (req: any, res: any) => {
  let collection = await db.collection("restaurants");
  let results = await collection.find({"name": true})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});
