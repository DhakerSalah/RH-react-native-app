import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import {
  Badge,
  Button,
  Card,
  PageTitle,
  SectionTitle,
  colors,
  money,
  styles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card style={{ flex: 1, marginBottom: 0 }}>
      <Text style={{ color: colors.muted, fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: colors.navy,
          fontSize: 26,
          fontWeight: "900",
          marginTop: 7,
        }}
      >
        {value}
      </Text>
      <Text style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>
        {note}
      </Text>
    </Card>
  );
}

export default function HRDashboard() {
  const { employees, leaveRequests, equipment } = useApp();
  const pending = leaveRequests.filter(
    (item) => item.status === "Pending",
  ).length;
  const assigned = equipment.filter(
    (item) => item.status === "Assigned",
  ).length;
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 25 }}
    >
      <PageTitle
        title="Good morning 👋"
        subtitle="Here's what's happening in your company."
      />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Metric
          label="Employees"
          value={String(employees.length)}
          note="In your directory"
        />
        <Metric
          label="Pending leaves"
          value={String(pending)}
          note="Need your attention"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 22 }}>
        <Metric
          label="Equipment"
          value={String(equipment.length)}
          note={`${assigned} currently assigned`}
        />
        <Metric label="Payroll" value={money(2850)} note="Demo net salary" />
      </View>
      <SectionTitle title="Needs your attention" />
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{ color: colors.navy, fontWeight: "800", fontSize: 15 }}
            >
              {pending} leave request{pending === 1 ? "" : "s"} waiting
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
              Review and respond to employee requests.
            </Text>
          </View>
          <Button title="Review" onPress={() => router.push("/hr/requests")} />
        </View>
      </Card>
      <SectionTitle title="Recent employees" />
      {employees.slice(0, 3).map((employee) => (
        <Card
          key={employee.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: colors.blueBg,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Text style={{ color: colors.blue, fontWeight: "800" }}>
              {employee.name
                .split(" ")
                .map((part: any) => part[0])
                .slice(0, 2)
                .join("")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.navy, fontWeight: "700" }}>
              {employee.name}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>
              {employee.position}
            </Text>
          </View>
          <Badge value={employee.status} />
        </Card>
      ))}
    </ScrollView>
  );
}
