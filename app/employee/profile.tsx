import { router } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";

import { useAuth } from "../../src/auth/useAuth";
import { Button, Card, PageTitle, styles } from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";
import { colors, radius, spacing } from "../../src/theme";

export default function ProfileScreen() {
  const { employees } = useApp();
  const { logout } = useAuth();

  const employee = employees.find((item) => item.id === DEMO_EMPLOYEE_ID);

  if (!employee) {
    return (
      <View style={styles.screen}>
        <Text style={{ color: colors.textMuted }}>
          Employee information not found.
        </Text>
      </View>
    );
  }

  const rows = [
    ["Full name", employee.name],
    ["Email", employee.email],
    ["Department", employee.department],
    ["Position", employee.position],
    ["Employee ID", employee.id],
    ["Employment status", employee.status],
  ];

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)/login");
          } catch (error) {
            Alert.alert("Error", "Unable to sign out. Please try again.");
          }
        },
      },
    ]);
  };

  const initials = employee.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      <PageTitle title="My profile" subtitle="Your professional information." />

      {/* Profile header */}
      <Card
        style={{
          alignItems: "center",
          paddingVertical: spacing.xxl,
        }}
      >
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: radius.xl,
            backgroundColor: colors.infoLight,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing.md,
          }}
        >
          <Text
            style={{
              color: colors.info,
              fontSize: 25,
              fontWeight: "900",
            }}
          >
            {initials}
          </Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 19,
            fontWeight: "900",
          }}
        >
          {employee.name}
        </Text>

        <Text
          style={{
            color: colors.textMuted,
            fontSize: 12,
            marginTop: spacing.xs,
          }}
        >
          {employee.position}
        </Text>
      </Card>

      {/* Employee information */}
      <Card>
        {rows.map(([label, value], index) => (
          <View
            key={label}
            style={{
              paddingVertical: spacing.md,
              borderBottomWidth: index === rows.length - 1 ? 0 : 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 11,
              }}
            >
              {label}
            </Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 14,
                fontWeight: "700",
                marginTop: spacing.xs,
              }}
            >
              {value}
            </Text>
          </View>
        ))}
      </Card>

      <Button title="Sign out" variant="secondary" onPress={handleLogout} />
    </ScrollView>
  );
}
