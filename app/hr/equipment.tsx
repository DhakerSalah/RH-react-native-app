import { ScrollView, Text, View } from "react-native";
import {
  Badge,
  Card,
  PageTitle,
  SectionTitle,
  styles,
} from "../../src/components/ui";
import { useApp } from "../../src/context/AppContext";
import { colors, radius, spacing } from "../../src/theme";

export default function EquipmentScreen() {
  const { equipment } = useApp();

  const available = equipment.filter(
    (item) => item.status === "Available",
  ).length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      <PageTitle
        title="Company equipment"
        subtitle="A simple overview of company assets."
      />

      {/* Equipment statistics */}
      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
          marginBottom: spacing.xl,
        }}
      >
        <Card style={{ flex: 1 }}>
          <Text style={{ color: colors.textMuted, fontSize: 12 }}>
            Total assets
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 27,
              fontWeight: "900",
              marginTop: spacing.sm,
            }}
          >
            {equipment.length}
          </Text>
        </Card>

        <Card style={{ flex: 1 }}>
          <Text style={{ color: colors.textMuted, fontSize: 12 }}>
            Available
          </Text>

          <Text
            style={{
              color: colors.success,
              fontSize: 27,
              fontWeight: "900",
              marginTop: spacing.sm,
            }}
          >
            {available}
          </Text>
        </Card>
      </View>

      {/* Equipment list */}
      <SectionTitle title="Equipment inventory" />

      {equipment.map((item) => (
        <Card
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: radius.lg,
              backgroundColor: colors.infoLight,
              alignItems: "center",
              justifyContent: "center",
              marginRight: spacing.md,
            }}
          >
            <Text style={{ fontSize: 19 }}>
              {item.category === "Laptop"
                ? "💻"
                : item.category === "Phone"
                  ? "📱"
                  : "🖥️"}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.text,
                fontWeight: "800",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginTop: spacing.xs,
              }}
            >
              {item.category} · {item.assignedTo}
            </Text>
          </View>

          <Badge value={item.status} />
        </Card>
      ))}

      {equipment.length === 0 && (
        <Text
          style={{
            textAlign: "center",
            color: colors.textMuted,
            marginTop: spacing.xxl,
          }}
        >
          No equipment found.
        </Text>
      )}
    </ScrollView>
  );
}
