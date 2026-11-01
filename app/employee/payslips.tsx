import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { Button, Card, PageTitle, colors, money, styles } from "../../src/components/ui";

export default function PayslipsScreen() {
  const { payslips } = useApp();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 25 }}>
      <PageTitle title="My payslips" subtitle="Your monthly salary statements." />
      {payslips.map((payslip) => (
        <Card key={payslip.id}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View><Text style={{ color: colors.navy, fontSize: 16, fontWeight: "800" }}>{payslip.month} {payslip.year}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>Net salary</Text></View>
            <Text style={{ color: colors.teal, fontWeight: "900", fontSize: 19 }}>{money(payslip.netPay)}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 14 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}><Text style={{ color: colors.muted, fontSize: 12 }}>Base salary</Text><Text style={{ color: colors.text, fontSize: 12, fontWeight: "700" }}>{money(payslip.baseSalary)}</Text></View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}><Text style={{ color: colors.muted, fontSize: 12 }}>Bonus</Text><Text style={{ color: colors.text, fontSize: 12, fontWeight: "700" }}>{money(payslip.bonus)}</Text></View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}><Text style={{ color: colors.muted, fontSize: 12 }}>Deductions</Text><Text style={{ color: colors.text, fontSize: 12, fontWeight: "700" }}>{money(payslip.deductions)}</Text></View>
          <Button title="View statement" variant="secondary" onPress={() => Alert.alert("Payslip preview", `${payslip.month} ${payslip.year}\n\nBase salary: ${money(payslip.baseSalary)}\nBonus: ${money(payslip.bonus)}\nDeductions: ${money(payslip.deductions)}\n\nNet salary: ${money(payslip.netPay)}\n\nDemo data only. No official PDF is attached.`)} />
        </Card>
      ))}
    </ScrollView>
  );
}
