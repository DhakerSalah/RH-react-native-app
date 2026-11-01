import { useMemo, useState } from "react";
import { Alert, Modal, ScrollView, Text, TextInput, View } from "react-native";

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

export default function EmployeesScreen() {
  const { employees, addEmployee } = useApp();

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const filtered = useMemo(
    () =>
      employees.filter((employee) =>
        `${employee.name} ${employee.email} ${employee.department}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [employees, search],
  );

  const saveEmployee = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !department.trim() ||
      !position.trim()
    ) {
      Alert.alert(
        "Missing information",
        "Please complete all employee fields.",
      );
      return;
    }

    addEmployee({
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      position: position.trim(),
    });

    setName("");
    setEmail("");
    setDepartment("");
    setPosition("");
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <PageTitle
        title="Your people"
        subtitle={`${employees.length} employees in your directory`}
      />

      {/* Search */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name, email or department"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      {/* Add employee button */}
      <View style={{ marginBottom: spacing.md }}>
        <Button title="+ Add employee" onPress={() => setModalVisible(true)} />
      </View>

      {/* Employees list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((employee) => (
          <Card
            key={employee.id}
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
                backgroundColor: colors.blueBg,
                alignItems: "center",
                justifyContent: "center",
                marginRight: spacing.md,
              }}
            >
              <Text style={{ color: colors.blue, fontWeight: "800" }}>
                {employee.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.navy,
                  fontWeight: "800",
                  fontSize: 14,
                }}
              >
                {employee.name}
              </Text>

              <Text
                style={{
                  color: colors.muted,
                  fontSize: 11,
                  marginTop: spacing.xs,
                }}
              >
                {employee.position} · {employee.department}
              </Text>

              <Text
                style={{
                  color: colors.muted,
                  fontSize: 11,
                  marginTop: spacing.xs,
                }}
              >
                {employee.email}
              </Text>
            </View>

            <Badge value={employee.status} />
          </Card>
        ))}

        {filtered.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              color: colors.muted,
              marginTop: spacing.xxl,
            }}
          >
            No employees found.
          </Text>
        )}
      </ScrollView>

      {/* Add employee modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.title}>Add employee</Text>

            {[
              {
                label: "Full name",
                value: name,
                set: setName,
                placeholder: "e.g. Sara Khelifi",
              },
              {
                label: "Email",
                value: email,
                set: setEmail,
                placeholder: "sara@company.tn",
              },
              {
                label: "Department",
                value: department,
                set: setDepartment,
                placeholder: "Engineering",
              },
              {
                label: "Position",
                value: position,
                set: setPosition,
                placeholder: "Product designer",
              },
            ].map((field) => (
              <View key={field.label} style={modalStyles.field}>
                <Text style={modalStyles.label}>{field.label}</Text>

                <TextInput
                  value={field.value}
                  onChangeText={field.set}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.muted}
                  autoCapitalize={field.label === "Email" ? "none" : "words"}
                  style={styles.input}
                />
              </View>
            ))}

            <View style={modalStyles.actions}>
              <View style={{ flex: 1 }}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setModalVisible(false)}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Button title="Save employee" onPress={saveEmployee} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = {
  overlay: {
    flex: 1,
    backgroundColor: "#0007",
    justifyContent: "flex-end" as const,
  },

  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
  },

  title: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "800" as const,
    marginBottom: spacing.lg,
  },

  field: {
    marginBottom: spacing.md,
  },

  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700" as const,
    marginBottom: spacing.sm,
  },

  actions: {
    flexDirection: "row" as const,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
};
