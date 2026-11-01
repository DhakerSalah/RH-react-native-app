import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Badge,
  Button,
  Card,
  PageTitle,
  styles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { DEMO_EMPLOYEE_ID } from "../../src/data/mockData";
import { colors, radius, spacing } from "../../src/theme";

export default function MyLeaveScreen() {
  const { leaveBalance, leaveRequests, addLeaveRequest } = useApp();

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("Annual leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("1");
  const [reason, setReason] = useState("");

  const ownRequests = leaveRequests.filter(
    (item) => item.employeeId === DEMO_EMPLOYEE_ID,
  );

  const closeModal = () => {
    setVisible(false);
  };

  const submit = () => {
    const count = Number(days);

    if (
      !startDate.trim() ||
      !endDate.trim() ||
      !reason.trim() ||
      !Number.isInteger(count) ||
      count < 1
    ) {
      Alert.alert(
        "Check your request",
        "Enter start date, end date, a valid number of days and a reason.",
      );
      return;
    }

    if (type === "Annual leave" && count > leaveBalance) {
      Alert.alert(
        "Not enough leave balance",
        `You have ${leaveBalance} annual leave days remaining.`,
      );
      return;
    }

    addLeaveRequest({
      type,
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      days: count,
      reason: reason.trim(),
    });

    setVisible(false);
    setStartDate("");
    setEndDate("");
    setDays("1");
    setReason("");
    setType("Annual leave");

    Alert.alert("Request submitted", "Your leave request has been sent to HR.");
  };

  return (
    <View style={styles.screen}>
      <PageTitle
        title="My leave"
        subtitle="Check your balance and leave history."
      />

      {/* Leave balance */}
      <Card
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }}
      >
        <Text style={{ color: colors.surfaceSecondary, fontSize: 12 }}>
          ANNUAL LEAVE BALANCE
        </Text>

        <Text
          style={{
            color: colors.white,
            fontSize: 34,
            fontWeight: "900",
            marginTop: spacing.sm,
          }}
        >
          {leaveBalance} days
        </Text>

        <Text
          style={{
            color: colors.surfaceSecondary,
            fontSize: 12,
            marginTop: spacing.xs,
          }}
        >
          Available in this demo account
        </Text>
      </Card>

      <View style={{ marginBottom: spacing.lg }}>
        <Button title="+ New leave request" onPress={() => setVisible(true)} />
      </View>

      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontWeight: "800",
          marginBottom: spacing.md,
        }}
      >
        Request history
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ownRequests.map((request) => (
          <Card key={request.id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "800",
                }}
              >
                {request.type}
              </Text>

              <Badge value={request.status} />
            </View>

            <Text
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginTop: spacing.sm,
              }}
            >
              {request.startDate} → {request.endDate}
            </Text>

            <Text
              style={{
                color: colors.primary,
                fontSize: 12,
                fontWeight: "700",
                marginTop: spacing.xs,
              }}
            >
              {request.days} day(s)
            </Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                marginTop: spacing.sm,
              }}
            >
              {request.reason}
            </Text>
          </Card>
        ))}

        {ownRequests.length === 0 && (
          <Text style={{ color: colors.textMuted }}>
            You have no leave requests yet.
          </Text>
        )}
      </ScrollView>

      {/* New leave request modal */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#0007",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              padding: spacing.xl,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "800",
                marginBottom: spacing.lg,
              }}
            >
              New leave request
            </Text>

            <Text
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginBottom: spacing.sm,
              }}
            >
              Leave type
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: spacing.sm,
                marginBottom: spacing.md,
              }}
            >
              {(["Annual leave", "Sick leave"] as const).map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setType(item)}
                  style={{
                    borderRadius: radius.full,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    backgroundColor:
                      type === item ? colors.secondary : colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: type === item ? colors.white : colors.textMuted,
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              value={startDate}
              onChangeText={setStartDate}
              placeholder="Start date (YYYY-MM-DD)"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />

            <TextInput
              value={endDate}
              onChangeText={setEndDate}
              placeholder="End date (YYYY-MM-DD)"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />

            <TextInput
              value={days}
              onChangeText={setDays}
              placeholder="Number of days"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              style={styles.input}
            />

            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Reason"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />

            <View
              style={{
                flexDirection: "row",
                gap: spacing.sm,
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={closeModal}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Button title="Submit request" onPress={submit} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
