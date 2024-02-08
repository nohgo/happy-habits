const express = require("express");
const db = require("../db/conn");
const router = express.Router();
router.get("/habits", async (req, res) => {
    /*
    let collection = await db.collection("restaurants");
    let results = await collection.find({})
      .limit(50)
      .toArray();
      */
    res.json({ message: "hello" });
});
export default router;
