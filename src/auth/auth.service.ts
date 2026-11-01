import * as SecureStore from "expo-secure-store";
import { User } from "../types";

const SESSION_KEY = "ressourci_user_session";

interface DemoAccount extends User {
  password: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "1",
    name: "HR Administrator",
    email: "hr@ressourci.com",
    password: "hr123456",
    role: "hr",
    department: "Human Resources",
    position: "HR Manager",
    status: "Active",
  },
  {
    id: "emp-1",
    name: "Dhaker Salah",
    email: "dhaker@ressourci.com",
    password: "emp123456",
    role: "employee",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
  },
];
// Authenticate user using static accounts
export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const account = DEMO_ACCOUNTS.find(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase() &&
      user.password === password,
  );

  if (!account) {
    throw new Error("Invalid email or password.");
  }

  const { password: _, ...user } = account;

  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user));

  return user;
};

// Restore logged-in user
export const getCurrentUser = async (): Promise<User | null> => {
  const session = await SecureStore.getItemAsync(SESSION_KEY);

  if (!session) return null;

  try {
    const user = JSON.parse(session) as User;

    if (!user.id || !user.email || !["hr", "employee"].includes(user.role)) {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return null;
    }

    return user;
  } catch {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    return null;
  }
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};
