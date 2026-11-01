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
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";

export default function EmployeeHome() {
  const { employees, leaveBalance, leaveRequests, payslips } = useApp();
  const employee = employees.find((item) => item.id === DEMO_EMPLOYEE_ID)!;
  const ownRequests = leaveRequests.filter(
    (item) => item.employeeId === DEMO_EMPLOYEE_ID,
  );
  const latestPayslip = payslips[0];
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 25 }}
    >
      <PageTitle
        title={`Hello, ${employee.name.split(" ")[0]} 👋`}
        subtitle="Here is your personal space."
      />
      <Card style={{ backgroundColor: colors.navy, borderColor: colors.navy }}>
        <Text style={{ color: "#C7D3E8", fontSize: 12 }}>
          AVAILABLE ANNUAL LEAVE
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "baseline", marginTop: 8 }}
        >
          <Text
            style={{ color: colors.white, fontSize: 38, fontWeight: "900" }}
          >
            {leaveBalance}
          </Text>
          <Text style={{ color: "#C7D3E8", marginLeft: 8 }}>
            days remaining
          </Text>
        </View>
        <View style={{ marginTop: 15, alignSelf: "flex-start" }}>
          <Button
            title="Request leave"
            onPress={() => router.push("/employee/leave")}
          />
        </View>
      </Card>
      <SectionTitle title="Latest payslip" />
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{ color: colors.navy, fontSize: 16, fontWeight: "800" }}
            >
              {latestPayslip.month} {latestPayslip.year}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
              Net salary
            </Text>
          </View>
          <Text style={{ color: colors.teal, fontSize: 20, fontWeight: "900" }}>
            {money(latestPayslip.netPay)}
          </Text>
        </View>
        <View style={{ marginTop: 14 }}>
          <Button
            title="View payslips"
            variant="secondary"
            onPress={() => router.push("/employee/payslips")}
          />
        </View>
      </Card>
      <SectionTitle title="My recent leave requests" />
      {ownRequests.slice(0, 3).map((request) => (
        <Card
          key={request.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ color: colors.navy, fontWeight: "700" }}>
              {request.type}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
              {request.startDate} · {request.days} day(s)
            </Text>
          </View>
          <Badge value={request.status} />
        </Card>
      ))}
    </ScrollView>
  );
}
