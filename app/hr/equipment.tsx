import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { Badge, Card, PageTitle, SectionTitle, colors, styles } from "../../src/components/ui";

export default function EquipmentScreen() {
  const { equipment } = useApp();
  const available = equipment.filter((item) => item.status === "Available").length;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 25 }}>
      <PageTitle title="Company equipment" subtitle="A simple overview of company assets." />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <Card style={{ flex: 1 }}><Text style={{ color: colors.muted, fontSize: 12 }}>Total assets</Text><Text style={{ color: colors.navy, fontSize: 27, fontWeight: "900", marginTop: 6 }}>{equipment.length}</Text></Card>
        <Card style={{ flex: 1 }}><Text style={{ color: colors.muted, fontSize: 12 }}>Available</Text><Text style={{ color: colors.teal, fontSize: 27, fontWeight: "900", marginTop: 6 }}>{available}</Text></Card>
      </View>
      <SectionTitle title="Equipment inventory" />
      {equipment.map((item) => (
        <Card key={item.id} style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: colors.blueBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
            <Text style={{ fontSize: 19 }}>{item.category === "Laptop" ? "💻" : item.category === "Phone" ? "📱" : "🖥️"}</Text>
          </View>
          <View style={{ flex: 1 }}><Text style={{ color: colors.navy, fontWeight: "800" }}>{item.name}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>{item.category} · {item.assignedTo}</Text></View>
          <Badge value={item.status} />
        </Card>
      ))}
    </ScrollView>
  );
}
