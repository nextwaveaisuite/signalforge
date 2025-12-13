import { cookies } from "next/headers";

export function getUserEmailFromCookie(): string | null {
  const cookieStore = cookies();
  const email = cookieStore.get("sf_email")?.value;
  return email || null;
}

export function setUserEmailCookie(email: string) {
  cookies().set("sf_email", email, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}
