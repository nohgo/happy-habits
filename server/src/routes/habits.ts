const express = require("express");
const db = require("../db/conn");
/*
import express from "express";
import db from "../db/conn.ts";
*/
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/habits", async (req: any, res: any) => {
    /*
    let collection = await db.collection("restaurants");
    let results = await collection.find({})
      .limit(50)
      .toArray();
      */
    res.json({ message: "hello" });
  });

export default router;