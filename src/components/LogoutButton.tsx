import { useState } from "react";

import { ActivityIndicator, Alert, Pressable, Text } from "react-native";

import { useAuth } from "../auth/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await logout();
          } catch {
            Alert.alert("Error", "Unable to logout. Please try again.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <Pressable
      onPress={handleLogout}
      disabled={loading}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#176B63" />
      ) : (
        <Text
          style={{
            color: "#DC2626",
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      )}
    </Pressable>
  );
}
