import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET!;

export type UserPlan = "free" | "pro";

/* ---------------- PASSWORD ---------------- */

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/* ---------------- JWT ---------------- */

export function generateToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
  };
}

/* ---------------- COOKIE HELPERS ---------------- */

export function setAuthCookie(token: string) {
  cookies().set("sf_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
}

export function getUserEmailFromCookie(): string | null {
  const token = cookies().get("sf_token")?.value;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded.email;
  } catch {
    return null;
  }
}

/* ---------------- DATABASE HELPERS ---------------- */

export async function findUserByEmail(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}
