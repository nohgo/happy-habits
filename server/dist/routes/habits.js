"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db = require("../db/conn");
const router = express.Router();
router.get("/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    let collection = await db.collection("restaurants");
    let results = await collection.find({})
      .limit(50)
      .toArray();
      */
    res.json({ message: "hello" });
}));
exports.default = router;
//# sourceMappingURL=habits.js.map