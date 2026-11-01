import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, radius, spacing } from "../theme";

export { colors };

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text style={styles.pageTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const backgroundColor =
    variant === "primary"
      ? colors.primary
      : variant === "danger"
        ? colors.dangerLight
        : colors.surface;

  const color =
    variant === "primary"
      ? colors.white
      : variant === "danger"
        ? colors.danger
        : colors.text;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
        variant !== "primary" && {
          borderWidth: 1,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={{ color, fontWeight: "700", fontSize: 14 }}>{title}</Text>
    </Pressable>
  );
}

export function Badge({ value }: { value: string }) {
  const backgroundColor =
    value === "Approved" || value === "Active" || value === "Assigned"
      ? colors.successLight
      : value === "Rejected" || value === "Inactive" || value === "Maintenance"
        ? colors.dangerLight
        : value === "Available"
          ? colors.infoLight
          : colors.warningLight;

  const color =
    backgroundColor === colors.successLight
      ? colors.success
      : backgroundColor === colors.dangerLight
        ? colors.danger
        : backgroundColor === colors.infoLight
          ? colors.info
          : colors.warning;

  return (
    <View style={styles.badge}>
      <Text style={{ color, fontSize: 11, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{title}</Text>
      {!!action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },

  pageTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },

  button: {
    minHeight: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.md,
  },

  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceSecondary,
  },

  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  sectionTitleText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
  },

  sectionAction: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
});

export function money(amount: number) {
  return `${amount.toLocaleString("en-US")} TND`;
}
