import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

// Ensure file exists
export function ensureUserStore() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({ users: {} }, null, 2));
  }
}

export function setUserPlan(customerId: string, plan: "free" | "pro") {
  ensureUserStore();
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  json.users[customerId] = { plan };

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
}

export function getUserPlan(customerId: string): "free" | "pro" {
  ensureUserStore();
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  return json.users[customerId]?.plan ?? "free";
}
