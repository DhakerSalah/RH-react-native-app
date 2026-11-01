import { Alert, ScrollView, Text, View } from "react-native";

import {
  Button,
  Card,
  PageTitle,
  money,
  styles as uiStyles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { colors, spacing } from "../../src/theme";

export default function PayslipsScreen() {
  const { payslips } = useApp();

  return (
    <ScrollView
      style={uiStyles.screen}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      <PageTitle
        title="My payslips"
        subtitle="Your monthly salary statements."
      />

      {payslips.map((payslip) => (
        <Card key={payslip.id}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "800",
                }}
              >
                {payslip.month} {payslip.year}
              </Text>

              <Text
                style={{
                  color: colors.textMuted,
                  fontSize: 12,
                  marginTop: spacing.xs,
                }}
              >
                Net salary
              </Text>
            </View>

            <Text
              style={{
                color: colors.primary,
                fontWeight: "900",
                fontSize: 19,
              }}
            >
              {money(payslip.netPay)}
            </Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: colors.border,
              marginVertical: spacing.lg,
            }}
          />

          <View style={styles.row}>
            <Text style={styles.detailLabel}>Base salary</Text>
            <Text style={styles.detailValue}>{money(payslip.baseSalary)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.detailLabel}>Bonus</Text>
            <Text style={styles.detailValue}>{money(payslip.bonus)}</Text>
          </View>

          <View style={[styles.row, { marginBottom: spacing.lg }]}>
            <Text style={styles.detailLabel}>Deductions</Text>
            <Text style={styles.detailValue}>{money(payslip.deductions)}</Text>
          </View>

          <Button
            title="View statement"
            variant="secondary"
            onPress={() =>
              Alert.alert(
                "Payslip preview",
                `${payslip.month} ${payslip.year}\n\n` +
                  `Base salary: ${money(payslip.baseSalary)}\n` +
                  `Bonus: ${money(payslip.bonus)}\n` +
                  `Deductions: ${money(payslip.deductions)}\n\n` +
                  `Net salary: ${money(payslip.netPay)}\n\n` +
                  "Demo data only. No official PDF is attached.",
              )
            }
          />
        </Card>
      ))}

      {payslips.length === 0 && (
        <Text style={{ color: colors.textMuted }}>
          No payslips available yet.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = {
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: spacing.sm,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  detailValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700" as const,
  },
};
