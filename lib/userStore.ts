import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data/users.json");

// Load the JSON
function loadData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { users: {} };
  }
}

// Save the JSON
function saveData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Get plan
export function getUserPlan(customerId: string): "free" | "pro" {
  const data = loadData();
  return data.users?.[customerId]?.plan || "free";
}

// Set plan
export function setUserPlan(customerId: string, plan: "free" | "pro") {
  const data = loadData();
  data.users[customerId] = { plan };
  saveData(data);
}
