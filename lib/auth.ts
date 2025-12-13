import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const TOKEN_NAME = "sf_token";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: object): string {
  const secret = requireEnv("JWT_SECRET");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    const secret = requireEnv("JWT_SECRET");
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}

export function getTokenName() {
  return TOKEN_NAME;
}
