import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  email: string;
  passwordHash: string;
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

/**
 * Used by /api/auth/me to know what cookie/header name to read.
 * If your me route uses cookies, keep this stable.
 */
export function getTokenName(): string {
  return "signalforge_token";
}

/* -------------------------
   PASSWORD HELPERS
------------------------- */

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

/* -------------------------
   TOKEN HELPERS
------------------------- */

export function generateToken(user: { id: string; email: string }): string {
  const secret = requireEnv("JWT_SECRET");
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "7d",
  });
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
   IMPORTANT: This is synchronous on purpose so
   routes that forgot `await` still compile.
------------------------- */

export function findUserByEmail(email: string): AuthUser | null {
  // ✅ Temporary single-user stub (so auth routes compile)
  // You can later replace with a real DB lookup.
  const tempPassword = "nextwave2025"; // change anytime
  const passwordHash = hashPassword(tempPassword);

  return {
    id: "temp-user-id",
    email,
    passwordHash,
  };
}
