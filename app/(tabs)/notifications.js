import { ScreenBG } from "../../providers/ThemeProvider";
import { useThemeX } from "../../providers/ThemeProvider";
import { View, Text, ScrollView, Image } from "react-native";
import { spacing, radius } from "../../lib/theme";

export default function Notifications() {
  const t = useThemeX();
  const items = [
    { text: "Ayman liked your picture.", ago: "32m" },
    { text: "Ayman started following you.", ago: "32m" },
    { text: "Ayman commented on your post. nice pic 🔥", ago: "32m" },
    { text: "Ayman tagged you in a post.", ago: "32m" },
  ];

  return (
    <ScreenBG>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }}>
        {items.map((it, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: t.card, borderRadius: radius.lg, padding: 12, marginBottom: 10 }}>
            <Image source={{ uri: "https://i.pravatar.cc/80?img=64" }} style={{ width: 42, height: 42, borderRadius: 21 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: t.text }}>{it.text}</Text>
              <Text style={{ color: t.subtext, marginTop: 2, fontSize: 12 }}>{it.ago}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenBG>
  );
}
