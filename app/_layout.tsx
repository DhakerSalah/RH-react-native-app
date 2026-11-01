import { AppProvider } from "@/context/AppContext";
import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppProvider>
    </AuthProvider>
  );
}
