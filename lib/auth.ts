import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "signalforge-secret";
const COOKIE_NAME = "signalforge_token";

export type User = {
  id: string;
  email: string;
  password_hash: string;
  plan: "free" | "pro";
};

/* ---------------- TOKEN ---------------- */

export function generateToken(user: { id: string; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
  };
}

export function getUserEmailFromCookie(): string | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded.email;
  } catch {
    return null;
  }
}

/* ---------------- PASSWORD ---------------- */

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash);
}

/* ---------------- DB HELPERS ---------------- */

export async function findUserByEmail(email: string): Promise<User | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data || null;
}
