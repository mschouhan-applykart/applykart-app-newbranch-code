import { ScreenBG, useThemeX } from "../../providers/ThemeProvider";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { spacing, radius } from "../../lib/theme";

const Field = ({ label, children }) => {
  const t = useThemeX();
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={{ color: t.text, marginBottom: 6 }}>{label}</Text>
      {children}
    </View>
  );
};

export default function PostJob() {
  const t = useThemeX();

  const Input = (props) => (
    <TextInput
      {...props}
      placeholderTextColor={t.input.placeholder}
      style={{
        backgroundColor: t.input.bg,
        borderColor: t.input.border,
        borderWidth: 1,
        borderRadius: radius.md,
        color: t.text,
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
    />
  );

  const Select = (props) => (
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: t.input.bg, borderColor: t.input.border, borderWidth: 1, borderRadius: radius.md, paddingRight: 8 }}>
      <Input style={{ flex: 1, borderWidth: 0 }} {...props} />
      <Icon name="chevron-down" size={18} color={t.subtext} />
    </View>
  );

  return (
    <ScreenBG>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }}>
        <Text style={{ color: t.text, fontWeight: "800", fontSize: 18, marginBottom: spacing.lg }}>Post a job</Text>
        <Field label="Job Title"><Input placeholder="e.g., Product Designer" /></Field>
        <Field label="Company"><Input placeholder="e.g., ApplyKart" /></Field>
        <Field label="Work Place Type"><Select placeholder="On-site / Hybrid / Remote" /></Field>
        <Field label="Job Location"><Input placeholder="City, Country" /></Field>
        <Field label="Job type"><Select placeholder="Full-time / Part-time / Contract" /></Field>
        <Field label="Job description">
          <Input placeholder="Describe the role…" multiline style={{ minHeight: 140, textAlignVertical: "top" }} />
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <Pressable style={{ backgroundColor: "#2F6BED", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>✨ Write with AI</Text>
            </Pressable>
            <Pressable style={{ borderColor: t.pillBorder, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 }}>
              <Text style={{ color: t.text, fontWeight: "700" }}>Write on my own</Text>
            </Pressable>
          </View>
        </Field>
      </ScrollView>
    </ScreenBG>
  );
}
