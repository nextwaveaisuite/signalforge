import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "./db";

// SECRET used for signing tokens
const SECRET = process.env.JWT_SECRET || "signalforge-dev-secret";

// -------------------------
// PASSWORD HELPERS
// -------------------------
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// -------------------------
// JWT HELPERS
// -------------------------
export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch {
    return null;
  }
}

// -------------------------
// FIND USER
// -------------------------
export function findUserByEmail(email: string) {
  return db.users.find((u) => u.email === email);
}

export function findUserById(id: string) {
  return db.users.find((u) => u.id === id);
}
