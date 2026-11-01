import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useApp } from "../../src/context/AppContext";
import { Button, Card, PageTitle, colors, styles } from "../../src/components/ui";
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";

export default function ProfileScreen() {
  const { employees } = useApp();
  const employee = employees.find((item) => item.id === DEMO_EMPLOYEE_ID)!;
  const rows = [
    ["Full name", employee.name], ["Email", employee.email], ["Department", employee.department], ["Position", employee.position], ["Employee ID", employee.id], ["Employment status", employee.status],
  ];
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 25 }}>
      <PageTitle title="My profile" subtitle="Your professional information." />
      <Card style={{ alignItems: "center", paddingVertical: 24 }}>
        <View style={{ width: 76, height: 76, borderRadius: 25, backgroundColor: colors.blueBg, alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Text style={{ color: colors.blue, fontSize: 25, fontWeight: "900" }}>{employee.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</Text></View>
        <Text style={{ color: colors.navy, fontSize: 19, fontWeight: "900" }}>{employee.name}</Text>
        <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>{employee.position}</Text>
      </Card>
      <Card>
        {rows.map(([label, value], index) => <View key={label} style={{ paddingVertical: 12, borderBottomWidth: index === rows.length - 1 ? 0 : 1, borderBottomColor: colors.border }}><Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text><Text style={{ color: colors.navy, fontSize: 14, fontWeight: "700", marginTop: 4 }}>{value}</Text></View>)}
      </Card>
      <Button title="Switch role / Sign out" variant="secondary" onPress={() => Alert.alert("Leave employee space?", "Return to the demo role selection screen?", [{ text: "Cancel", style: "cancel" }, { text: "Continue", onPress: () => router.replace("/") }])} />
    </ScrollView>
  );
}
