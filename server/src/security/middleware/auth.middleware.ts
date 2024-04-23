import jwt from "jsonwebtoken";
import { Response } from "express";
import AuthRequest from "../models/auth-request.model";
import JwtPayload from "../models/jwt-payload.model";

export function verifyToken(req: AuthRequest, res: Response, next: Function) {
  var token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    token = token.substring(7);
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function verifyResetToken(
  req: AuthRequest,
  res: Response,
  next: Function
) {
  var token = req.headers["auth-reset-token"] as string;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    token = token.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.PASSWORD_RESET_KEY
    ) as JwtPayload;
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function verifyEmailToken(
  req: AuthRequest,
  res: Response,
  next: Function
) {
  var token = req.headers["auth-verify-token"] as string;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    token = token.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.VERIFY_EMAIL_KEY
    ) as JwtPayload;
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
