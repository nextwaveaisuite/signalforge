import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  plan: "free" | "pro";
};

export const db: { users: User[] } = {
  users: [],
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/* ----------------------------------------
   PASSWORD
---------------------------------------- */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash);
}

/* ----------------------------------------
   USER HELPERS
---------------------------------------- */
export async function findUserByEmail(email: string) {
  return db.users.find((u) => u.email === email);
}

/* ----------------------------------------
   TOKEN
---------------------------------------- */
export function generateToken(user: { id: string; email: string }) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
  };
}
