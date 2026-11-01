import { useState } from "react";

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../src/auth/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const authenticatedUser = await login(email, password);
      setIsSubmitting(false);
      if (authenticatedUser.role === "hr") {
        router.replace("/hr");
      } else {
        router.replace("/employee");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const fillDemoAccount = (role: "hr" | "employee") => {
    if (role === "hr") {
      setEmail("hr@ressourci.com");
      setPassword("hr123456");
    } else {
      setEmail("employee@ressourci.com");
      setPassword("emp123456");
    }

    setError("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>R-HR</Text>
        </View>

        <Text style={styles.title}>Ressourci HR</Text>

        <Text style={styles.subtitle}>Human Resources Management</Text>

        <View style={styles.form}>
          <Text style={styles.heading}>Welcome back!</Text>

          <Text style={styles.description}>
            Sign in to access your account.
          </Text>

          <Text style={styles.label}>Email address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={[styles.loginButton, isSubmitting && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </Pressable>

          <Text style={styles.demoTitle}>DEMO ACCOUNTS</Text>

          <Pressable
            style={styles.demoButton}
            onPress={() => fillDemoAccount("hr")}
          >
            <Text style={styles.demoButtonText}>Use HR Account</Text>
          </Pressable>

          <Pressable
            style={styles.demoButton}
            onPress={() => fillDemoAccount("employee")}
          >
            <Text style={styles.demoButtonText}>Use Employee Account</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Ressourci HR © 2026</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logoContainer: {
    width: 70,
    height: 65,
    borderRadius: 18,
    backgroundColor: "#176B63",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#172B4D",
    textAlign: "center",
  },

  subtitle: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 35,
  },

  form: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#172B4D",
  },

  description: {
    color: "#64748B",
    marginTop: 7,
    marginBottom: 25,
  },

  label: {
    color: "#334155",
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    color: "#172B4D",
  },

  passwordContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    color: "#172B4D",
  },

  showPassword: {
    color: "#176B63",
    fontWeight: "600",
  },

  error: {
    color: "#DC2626",
    marginTop: 12,
  },

  loginButton: {
    height: 52,
    backgroundColor: "#176B63",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  demoTitle: {
    color: "#94A3B8",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10,
  },

  demoButton: {
    borderWidth: 1,
    borderColor: "#DCE5E8",
    padding: 12,
    borderRadius: 9,
    marginTop: 8,
    alignItems: "center",
  },

  demoButtonText: {
    color: "#176B63",
    fontWeight: "600",
  },

  footer: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 30,
    fontSize: 12,
  },
});
