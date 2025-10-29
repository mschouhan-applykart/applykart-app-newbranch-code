// app/sign-in.js
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useThemeX } from "../providers/ThemeProvider";

export default function SignInScreen() {
  const router = useRouter();
  const t = useThemeX();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSignIn() {
    try {
      setBusy(true);
      setError("");
      // TODO: plug your real auth API here
      await new Promise((r) => setTimeout(r, 600));
      router.replace("/(tabs)");
    } catch (e) {
      setError("Sign in failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: t.mode === "personal" ? "#0A1E2A" : "#FFFFFF" }]}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.inner}>
        <Text style={[styles.title, { color: t.mode === "personal" ? "#EAF4FA" : "#0E1117" }]}>
          Sign in
        </Text>

        <View style={styles.form}>
          <Text style={[styles.label, { color: t.mode === "personal" ? "#C7DBE6" : "#4B5563" }]}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={t.mode === "personal" ? "#7FA4B8" : "#9CA3AF"}
            style={[
              styles.input,
              {
                color: t.mode === "personal" ? "#EAF4FA" : "#0E1117",
                backgroundColor: t.mode === "personal" ? "#0E2A3A" : "#F3F4F6",
                borderColor: t.mode === "personal" ? "#184055" : "#E5E7EB",
              },
            ]}
          />

          <Text style={[styles.label, { color: t.mode === "personal" ? "#C7DBE6" : "#4B5563" }]}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={t.mode === "personal" ? "#7FA4B8" : "#9CA3AF"}
            style={[
              styles.input,
              {
                color: t.mode === "personal" ? "#EAF4FA" : "#0E1117",
                backgroundColor: t.mode === "personal" ? "#0E2A3A" : "#F3F4F6",
                borderColor: t.mode === "personal" ? "#184055" : "#E5E7EB",
              },
            ]}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            disabled={busy}
            onPress={onSignIn}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: t.accent, opacity: busy || pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.buttonText}>{busy ? "Signing in..." : "Sign in"}</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} style={{ alignSelf: "center", marginTop: 12 }}>
            <Text style={{ color: t.mode === "personal" ? "#C7DBE6" : "#4B5563" }}>Back</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 56 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: 0.3, marginBottom: 24 },
  form: { gap: 10 },
  label: { fontSize: 13, fontWeight: "600" },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonText: { color: "#0B1220", fontWeight: "800", fontSize: 16 },
  error: { color: "#ef4444", marginTop: 6, fontSize: 13 },
});
