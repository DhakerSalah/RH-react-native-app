import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import {
  Badge,
  Button,
  Card,
  PageTitle,
  SectionTitle,
  money,
  styles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";
import { colors, spacing } from "../../src/theme";

export default function EmployeeHome() {
  const { employees, leaveBalance, leaveRequests, payslips } = useApp();

  const employee = employees.find((item) => item.id === DEMO_EMPLOYEE_ID);

  const ownRequests = leaveRequests.filter(
    (item) => item.employeeId === DEMO_EMPLOYEE_ID,
  );

  const latestPayslip = payslips[0];

  if (!employee) {
    return (
      <View style={styles.screen}>
        <Text style={{ color: colors.textMuted }}>
          Employee information not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      <PageTitle
        title={`Hello, ${employee.name.split(" ")[0]} 👋`}
        subtitle="Here is your personal space."
      />

      {/* Leave balance */}
      <Card
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }}
      >
        <Text style={{ color: colors.surfaceSecondary, fontSize: 12 }}>
          AVAILABLE ANNUAL LEAVE
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: spacing.sm,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 38,
              fontWeight: "900",
            }}
          >
            {leaveBalance}
          </Text>

          <Text
            style={{
              color: colors.surfaceSecondary,
              marginLeft: spacing.sm,
            }}
          >
            days remaining
          </Text>
        </View>

        <View
          style={{
            marginTop: spacing.lg,
            alignSelf: "flex-start",
          }}
        >
          <Button
            title="Request leave"
            onPress={() => router.push("/employee/leave")}
          />
        </View>
      </Card>

      {/* Latest payslip */}
      <SectionTitle title="Latest payslip" />

      <Card>
        {latestPayslip ? (
          <>
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
                  {latestPayslip.month} {latestPayslip.year}
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
                  fontSize: 20,
                  fontWeight: "900",
                }}
              >
                {money(latestPayslip.netPay)}
              </Text>
            </View>

            <View style={{ marginTop: spacing.lg }}>
              <Button
                title="View payslips"
                variant="secondary"
                onPress={() => router.push("/employee/payslips")}
              />
            </View>
          </>
        ) : (
          <Text style={{ color: colors.textMuted }}>
            No payslips available yet.
          </Text>
        )}
      </Card>

      {/* Recent leave requests */}
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
            <Text
              style={{
                color: colors.text,
                fontWeight: "700",
              }}
            >
              {request.type}
            </Text>

            <Text
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginTop: spacing.xs,
              }}
            >
              {request.startDate} · {request.days} day(s)
            </Text>
          </View>

          <Badge value={request.status} />
        </Card>
      ))}

      {ownRequests.length === 0 && (
        <Text style={{ color: colors.textMuted }}>
          You have no leave requests yet.
        </Text>
      )}
    </ScrollView>
  );
}
