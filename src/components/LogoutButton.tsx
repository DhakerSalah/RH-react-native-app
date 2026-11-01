import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text } from "react-native";

import { useAuth } from "../auth/useAuth";
import { colors, spacing } from "../theme";

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
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.sm,
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <Text
          style={{
            color: colors.danger,
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      )}
    </Pressable>
  );
}
