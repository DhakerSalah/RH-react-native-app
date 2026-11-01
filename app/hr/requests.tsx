import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { Badge, Button, Card, PageTitle, colors, styles } from "../../src/components/ui";
import { RequestStatus } from "../../src/types";

const filters = ["All", "Pending", "Approved", "Rejected"] as const;
type Filter = typeof filters[number];

export default function RequestsScreen() {
  const { leaveRequests, updateLeaveStatus } = useApp();
  const [filter, setFilter] = useState<Filter>("All");
  const items = leaveRequests.filter((item) => filter === "All" || item.status === filter);

  const update = (id: string, status: RequestStatus, employeeName: string) => {
    Alert.alert(`${status} leave?`, `${status === "Approved" ? "Approve" : "Reject"} ${employeeName}'s request?`, [
      { text: "Cancel", style: "cancel" },
      { text: status, style: status === "Rejected" ? "destructive" : "default", onPress: () => updateLeaveStatus(id, status) },
    ]);
  };

  return (
    <View style={styles.screen}>
      <PageTitle title="Leave requests" subtitle="Review employee time-off requests." />
      <View style={{ flexDirection: "row", gap: 7, marginBottom: 15 }}>
        {filters.map((item) => <Text key={item} onPress={() => setFilter(item)} style={{ overflow: "hidden", borderRadius: 18, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: filter === item ? colors.navy : colors.white, color: filter === item ? colors.white : colors.muted, fontWeight: "700", fontSize: 12 }}>{item}</Text>)}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((request) => (
          <Card key={request.id}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.navy, fontWeight: "800", fontSize: 15, flex: 1 }}>{request.employeeName}</Text>
              <Badge value={request.status} />
            </View>
            <Text style={{ color: colors.teal, fontSize: 12, fontWeight: "700", marginTop: 9 }}>{request.type} · {request.days} day{request.days === 1 ? "" : "s"}</Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 5 }}>{request.startDate} → {request.endDate}</Text>
            <Text style={{ color: colors.text, fontSize: 13, marginTop: 9 }}>{request.reason}</Text>
            {request.status === "Pending" && <View style={{ flexDirection: "row", gap: 9, marginTop: 14 }}>
              <View style={{ flex: 1 }}><Button title="Reject" variant="danger" onPress={() => update(request.id, "Rejected", request.employeeName)} /></View>
              <View style={{ flex: 1 }}><Button title="Approve" onPress={() => update(request.id, "Approved", request.employeeName)} /></View>
            </View>}
          </Card>
        ))}
        {items.length === 0 && <Text style={{ color: colors.muted, textAlign: "center", marginTop: 25 }}>No requests in this filter.</Text>}
      </ScrollView>
    </View>
  );
}
