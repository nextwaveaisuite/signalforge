type User = {
  id: string;
  email: string;
  passwordHash: string;
  plan: "free" | "pro";
};

export const db = {
  users: [] as User[],
};
