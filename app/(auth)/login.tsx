import { useRouter } from "expo-router";
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
import { useAuth } from "../../src/auth/useAuth";
import { colors, radius, spacing } from "../../src/theme";

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
      setEmail("dhaker@ressourci.com");
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
            placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
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
              <ActivityIndicator color={colors.white} />
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
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.xxl,
  },

  logoContainer: {
    width: 70,
    height: 65,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },

  logo: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },

  subtitle: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.xxxl,
  },

  form: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },

  description: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },

  label: {
    color: colors.secondaryLight,
    fontWeight: "600",
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderDark,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },

  passwordContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderDark,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },

  passwordInput: {
    flex: 1,
    color: colors.text,
  },

  showPassword: {
    color: colors.primary,
    fontWeight: "600",
  },

  error: {
    color: colors.danger,
    marginTop: spacing.md,
  },

  loginButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xl,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  demoTitle: {
    color: colors.textMuted,
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

  demoButton: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    alignItems: "center",
  },

  demoButtonText: {
    color: colors.primary,
    fontWeight: "600",
  },

  footer: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xxxl,
    fontSize: 12,
  },
});
