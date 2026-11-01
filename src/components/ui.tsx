import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

export const colors = {
  navy: "#172B4D",
  teal: "#159985",
  background: "#F4F7FB",
  white: "#FFFFFF",
  text: "#172B4D",
  muted: "#748199",
  border: "#E5EAF1",
  green: "#16865D",
  greenBg: "#E7F6EF",
  orange: "#B96A10",
  orangeBg: "#FFF3DF",
  red: "#B93D45",
  redBg: "#FCEAEC",
  blue: "#3869C8",
  blueBg: "#EAF0FF",
};

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.pageTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function Button({ title, onPress, variant = "primary", disabled = false }: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const backgroundColor = variant === "primary" ? colors.teal : variant === "danger" ? colors.redBg : colors.white;
  const color = variant === "primary" ? colors.white : variant === "danger" ? colors.red : colors.text;
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [
      styles.button, { backgroundColor, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 },
      variant !== "primary" && { borderWidth: 1, borderColor: colors.border },
    ]}>
      <Text style={{ color, fontWeight: "700", fontSize: 14 }}>{title}</Text>
    </Pressable>
  );
}

export function Badge({ value }: { value: string }) {
  const backgroundColor = value === "Approved" || value === "Active" || value === "Assigned"
    ? colors.greenBg
    : value === "Rejected" || value === "Inactive" || value === "Maintenance"
      ? colors.redBg
      : value === "Available" ? colors.blueBg : colors.orangeBg;
  const color = backgroundColor === colors.greenBg ? colors.green
    : backgroundColor === colors.redBg ? colors.red
      : backgroundColor === colors.blueBg ? colors.blue : colors.orange;
  return <View style={{ backgroundColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
    <Text style={{ color, fontSize: 11, fontWeight: "700" }}>{value}</Text>
  </View>;
}

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <Text style={{ color: colors.text, fontWeight: "800", fontSize: 16 }}>{title}</Text>
    {!!action && <Text style={{ color: colors.teal, fontSize: 12, fontWeight: "700" }}>{action}</Text>}
  </View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20 },
  pageTitle: { color: colors.text, fontSize: 25, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  label: { color: colors.muted, fontSize: 12, fontWeight: "600", marginBottom: 6 },
  button: { minHeight: 44, borderRadius: 12, paddingHorizontal: 16, alignItems: "center", justifyContent: "center" },
  input: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, color: colors.text, fontSize: 14, marginBottom: 13 },
});

export function money(amount: number) {
  return `${amount.toLocaleString("en-US")} TND`;
}
