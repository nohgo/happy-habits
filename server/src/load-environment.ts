import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

function generateSecretKey(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

dotenv.config();

if (!process.env.SECRET_KEY) {
  const secretKey = generateSecretKey(32);
  fs.appendFileSync(
    path.join(__dirname + "/../", ".env"),
    `SECRET_KEY=${secretKey}\n`
  );
}

if (!process.env.DAY_MS) {
  fs.appendFileSync(path.join(__dirname + "/../", ".env"), `DAY_MS=86400000\n`);
}