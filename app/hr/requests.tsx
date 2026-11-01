import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import {
  Badge,
  Button,
  Card,
  PageTitle,
  colors,
  styles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { radius, spacing } from "../../src/theme";
import { RequestStatus } from "../../src/types";

const filters = ["All", "Pending", "Approved", "Rejected"] as const;

type Filter = (typeof filters)[number];

export default function RequestsScreen() {
  const { leaveRequests, updateLeaveStatus } = useApp();

  const [filter, setFilter] = useState<Filter>("All");

  const items = leaveRequests.filter(
    (item) => filter === "All" || item.status === filter,
  );

  const update = (id: string, status: RequestStatus, employeeName: string) => {
    const action = status === "Approved" ? "Approve" : "Reject";

    Alert.alert(
      `${action} leave request?`,
      `${action} ${employeeName}'s request?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: action,
          style: status === "Rejected" ? "destructive" : "default",
          onPress: () => {
            const success = updateLeaveStatus(id, status);

            if (!success) {
              Alert.alert(
                "Unable to process request",
                "This request may already have been processed, or the employee may not have enough annual leave days remaining.",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <PageTitle
        title="Leave requests"
        subtitle="Review employee time-off requests."
      />

      <View style={localStyles.filters}>
        {filters.map((item) => {
          const isActive = filter === item;

          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                localStyles.filterButton,
                isActive && localStyles.activeFilter,
              ]}
            >
              <Text
                style={[
                  localStyles.filterText,
                  isActive && localStyles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((request) => (
          <Card key={request.id}>
            <View style={localStyles.cardHeader}>
              <Text style={localStyles.employeeName}>
                {request.employeeName}
              </Text>

              <Badge value={request.status} />
            </View>

            <Text style={localStyles.requestType}>
              {request.type} · {request.days} day
              {request.days === 1 ? "" : "s"}
            </Text>

            <Text style={localStyles.dates}>
              {request.startDate} → {request.endDate}
            </Text>

            <Text style={localStyles.reason}>{request.reason}</Text>

            {request.status === "Pending" && (
              <View style={localStyles.actions}>
                <View style={{ flex: 1 }}>
                  <Button
                    title="Reject"
                    variant="danger"
                    onPress={() =>
                      update(request.id, "Rejected", request.employeeName)
                    }
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Button
                    title="Approve"
                    onPress={() =>
                      update(request.id, "Approved", request.employeeName)
                    }
                  />
                </View>
              </View>
            )}
          </Card>
        ))}

        {items.length === 0 && (
          <Text style={localStyles.emptyText}>No requests in this filter.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const localStyles = {
  filters: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  filterButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterText: {
    color: colors.textSecondary,
    fontWeight: "700" as const,
    fontSize: 12,
  },

  activeFilterText: {
    color: colors.white,
  },

  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },

  employeeName: {
    color: colors.navy,
    fontWeight: "800" as const,
    fontSize: 15,
    flex: 1,
    marginRight: spacing.sm,
  },

  requestType: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "700" as const,
    marginTop: spacing.md,
  },

  dates: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
  },

  reason: {
    color: colors.text,
    fontSize: 13,
    marginTop: spacing.md,
  },

  actions: {
    flexDirection: "row" as const,
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  emptyText: {
    color: colors.muted,
    textAlign: "center" as const,
    marginTop: spacing.xxl,
  },
};
