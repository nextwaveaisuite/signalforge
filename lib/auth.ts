import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

type User = {
  id: string;
  email: string;
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

/* -------------------------
   PASSWORD HELPERS
------------------------- */

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/* -------------------------
   TOKEN HELPERS
------------------------- */

export function generateToken(user: User): string {
  const secret = requireEnv("JWT_SECRET");
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    const secret = requireEnv("JWT_SECRET");
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}

/* -------------------------
   TEMP USER LOOKUP (STUB)
   Phase 1 — NO DATABASE
------------------------- */

export async function findUserByEmail(email: string): Promise<User | null> {
  // 🔥 TEMP USER — allows auth routes to compile
  return {
    id: "temp-user-id",
    email,
  };
}
