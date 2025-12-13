export type User = {
  id: string;
  email: string;
  plan: "free" | "pro";
};

export const db = {
  users: [] as User[]
};
