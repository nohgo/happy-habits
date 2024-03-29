import jwt from "jsonwebtoken";
import { Response } from "express";
import AuthRequest from "../models/auth-request.model";
import JwtPayload from "../models/jwt-payload.model";

function verifyToken(req: AuthRequest, res: Response, next: Function) {
  var token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    token = token.substring(7);
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
