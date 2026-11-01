import React, { useMemo, useState } from "react";
import { Alert, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { Badge, Button, Card, PageTitle, colors, styles } from "../../src/components/ui";

export default function EmployeesScreen() {
  const { employees, addEmployee } = useApp();
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const filtered = useMemo(() => employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.department}`.toLowerCase().includes(search.toLowerCase())
  ), [employees, search]);

  const saveEmployee = () => {
    if (!name.trim() || !email.trim() || !department.trim() || !position.trim()) {
      Alert.alert("Missing information", "Please complete all employee fields.");
      return;
    }
    addEmployee({ name: name.trim(), email: email.trim(), department: department.trim(), position: position.trim() });
    setName(""); setEmail(""); setDepartment(""); setPosition(""); setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <PageTitle title="Your people" subtitle={`${employees.length} employees in your directory`} />
      <TextInput value={search} onChangeText={setSearch} placeholder="Search by name, email or department" placeholderTextColor={colors.muted} style={styles.input} />
      <View style={{ marginBottom: 14 }}><Button title="+ Add employee" onPress={() => setModalVisible(true)} /></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((employee) => (
          <Card key={employee.id} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: colors.blueBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
              <Text style={{ color: colors.blue, fontWeight: "800" }}>{employee.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.navy, fontWeight: "800", fontSize: 14 }}>{employee.name}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 3 }}>{employee.position} · {employee.department}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 3 }}>{employee.email}</Text>
            </View>
            <Badge value={employee.status} />
          </Card>
        ))}
        {filtered.length === 0 && <Text style={{ textAlign: "center", color: colors.muted, marginTop: 25 }}>No employees found.</Text>}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "#0007", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22 }}>
            <Text style={{ color: colors.navy, fontSize: 20, fontWeight: "800", marginBottom: 18 }}>Add employee</Text>
            {[{ label: "Full name", value: name, set: setName, placeholder: "e.g. Sara Khelifi" }, { label: "Email", value: email, set: setEmail, placeholder: "sara@company.tn" }, { label: "Department", value: department, set: setDepartment, placeholder: "Engineering" }, { label: "Position", value: position, set: setPosition, placeholder: "Product designer" }].map((field) => (
              <View key={field.label}><Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>{field.label}</Text><TextInput value={field.value} onChangeText={field.set} placeholder={field.placeholder} placeholderTextColor={colors.muted} autoCapitalize={field.label === "Email" ? "none" : "words"} style={styles.input} /></View>
            ))}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}><Button title="Cancel" variant="secondary" onPress={() => setModalVisible(false)} /></View>
              <View style={{ flex: 1 }}><Button title="Save employee" onPress={saveEmployee} /></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
