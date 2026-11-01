import React, { useState } from "react";
import { Alert, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { Badge, Button, Card, PageTitle, colors, styles } from "../../src/components/ui";
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";

export default function MyLeaveScreen() {
  const { leaveBalance, leaveRequests, addLeaveRequest } = useApp();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("Annual leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("1");
  const [reason, setReason] = useState("");
  const ownRequests = leaveRequests.filter((item) => item.employeeId === DEMO_EMPLOYEE_ID);

  const submit = () => {
    const count = Number(days);
    if (!startDate.trim() || !endDate.trim() || !reason.trim() || !Number.isInteger(count) || count < 1) {
      Alert.alert("Check your request", "Enter start date, end date, a valid number of days and a reason.");
      return;
    }
    if (type === "Annual leave" && count > leaveBalance) {
      Alert.alert("Not enough leave balance", `You have ${leaveBalance} annual leave days remaining.`);
      return;
    }
    addLeaveRequest({ type, startDate: startDate.trim(), endDate: endDate.trim(), days: count, reason: reason.trim() });
    setVisible(false); setStartDate(""); setEndDate(""); setDays("1"); setReason("");
    Alert.alert("Request submitted", "Your leave request has been sent to HR.");
  };

  return (
    <View style={styles.screen}>
      <PageTitle title="My leave" subtitle="Check your balance and leave history." />
      <Card style={{ backgroundColor: colors.navy, borderColor: colors.navy }}>
        <Text style={{ color: "#C7D3E8", fontSize: 12 }}>ANNUAL LEAVE BALANCE</Text>
        <Text style={{ color: colors.white, fontSize: 34, fontWeight: "900", marginTop: 6 }}>{leaveBalance} days</Text>
        <Text style={{ color: "#C7D3E8", fontSize: 12, marginTop: 3 }}>Available in this demo account</Text>
      </Card>
      <View style={{ marginBottom: 15 }}><Button title="+ New leave request" onPress={() => setVisible(true)} /></View>
      <Text style={{ color: colors.navy, fontSize: 16, fontWeight: "800", marginBottom: 12 }}>Request history</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ownRequests.map((request) => (
          <Card key={request.id}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}><Text style={{ color: colors.navy, fontWeight: "800" }}>{request.type}</Text><Badge value={request.status} /></View>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 7 }}>{request.startDate} → {request.endDate}</Text>
            <Text style={{ color: colors.teal, fontSize: 12, fontWeight: "700", marginTop: 6 }}>{request.days} day(s)</Text>
            <Text style={{ color: colors.text, fontSize: 12, marginTop: 7 }}>{request.reason}</Text>
          </Card>
        ))}
        {ownRequests.length === 0 && <Text style={{ color: colors.muted }}>You have no leave requests yet.</Text>}
      </ScrollView>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "#0007", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22 }}>
            <Text style={{ color: colors.navy, fontSize: 20, fontWeight: "800", marginBottom: 16 }}>New leave request</Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 7 }}>Leave type</Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 13 }}>
              {(["Annual leave", "Sick leave"] as const).map((item) => <Text key={item} onPress={() => setType(item)} style={{ borderRadius: 18, paddingVertical: 9, paddingHorizontal: 12, overflow: "hidden", backgroundColor: type === item ? colors.navy : colors.white, color: type === item ? colors.white : colors.muted, fontWeight: "700", fontSize: 12 }}>{item}</Text>)}
            </View>
            {[{ label: "Start date (YYYY-MM-DD)", value: startDate, set: setStartDate, hint: "2026-11-10" }, { label: "End date (YYYY-MM-DD)", value: endDate, set: setEndDate, hint: "2026-11-12" }, { label: "Number of days", value: days, set: setDays, hint: "3", numeric: true }, { label: "Reason", value: reason, set: setReason, hint: "Family event" }].map((field) => (
              <View key={field.label}><Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>{field.label}</Text><TextInput value={field.value} onChangeText={field.set} placeholder={field.hint} placeholderTextColor={colors.muted} keyboardType={field.numeric ? "number-pad" : "default"} style={styles.input} /></View>
            ))}
            <View style={{ flexDirection: "row", gap: 10 }}><View style={{ flex: 1 }}><Button title="Cancel" variant="secondary" onPress={() => setVisible(false)} /></View><View style={{ flex: 1 }}><Button title="Submit request" onPress={submit} /></View></View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
