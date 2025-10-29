import { ScreenBG } from "../../providers/ThemeProvider";
import { useThemeX } from "../../providers/ThemeProvider";
import { spacing } from "../../lib/theme";
import { View, Text, ScrollView, TextInput, Image } from "react-native";

const people = [
  { name: "Rafael Mante", time: "19:45", unread: 0, subtitle: "Figma ipsum component variant main" },
  { name: "Katherine Bernhard", time: "19:45", unread: 0, subtitle: "Figma", tick: true },
  { name: "Terrence Lemke", time: "19:45", unread: 2, subtitle: "Figma ipsum component variant main" },
  { name: "Alyssa Wisozk-Kihn", time: "19:45", unread: 0, subtitle: "Figma ipsum component variant main" },
];

export default function Chat() {
  const t = useThemeX();
  return (
    <ScreenBG>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }}>
        <TextInput
          placeholder="Search chat……"
          placeholderTextColor={t.input.placeholder}
          style={{
            backgroundColor: t.input.bg,
            borderColor: t.input.border,
            borderWidth: 1,
            borderRadius: 999,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: t.text,
            marginBottom: spacing.lg,
          }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: spacing.lg }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <Image source={{ uri: `https://i.pravatar.cc/100?img=${20 + i}` }} style={{ width: 56, height: 56, borderRadius: 28, marginBottom: 6 }} />
              <Text style={{ color: t.subtext, fontSize: 11 }}>User {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ gap: 14 }}>
          {people.map((p, i) => (
            <Row key={i} {...p} />
          ))}
        </View>
      </ScrollView>
    </ScreenBG>
  );
}

function Row({ name, time, unread, subtitle }) {
  const t = useThemeX();
  return (
    <View style={{ flexDirection: "row", paddingVertical: 12, alignItems: "center", justifyContent: "space-between", borderBottomColor: t.listDivider, borderBottomWidth: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
        <Image source={{ uri: "https://i.pravatar.cc/80" }} style={{ width: 44, height: 44, borderRadius: 22 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: t.text, fontWeight: "600" }}>{name}</Text>
          <Text numberOfLines={1} style={{ color: t.subtext, marginTop: 3, fontSize: 12 }}>{subtitle}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", width: 56 }}>
        <Text style={{ color: t.subtext, fontSize: 12 }}>{time}</Text>
        {unread > 0 && (
          <View style={{ marginTop: 6, backgroundColor: t.card, borderColor: t.pillBorder, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
            <Text style={{ color: t.text, fontSize: 12 }}>{unread}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
