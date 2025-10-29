import { ScreenBG, useThemeX } from "../../providers/ThemeProvider";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { spacing, radius } from "../../lib/theme";

export default function Profile() {
  const t = useThemeX();
  return (
    <ScreenBG>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }}>
        <Text style={{ color: t.text, fontWeight: "800", fontSize: 22, marginBottom: spacing.md }}>My Profile</Text>
        <View style={{ backgroundColor: t.card, borderRadius: radius.xl, padding: spacing.md, flexDirection: "row", gap: 12, alignItems: "center", shadowColor: t.shadow, shadowOpacity: 0.3, shadowRadius: 8 }}>
          <Image source={{ uri: "https://i.pravatar.cc/120?img=15" }} style={{ width: 72, height: 72, borderRadius: 16 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: t.text, fontWeight: "800" }}>Riya Sharma</Text>
            <Text style={{ color: t.subtext, marginBottom: 8 }}>UI/UX Designer</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {[{k:'Connections',v:100},{k:'Followers',v:100}].map(x => (
                <View key={x.k} style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: t.mode==='personal'?'rgba(255,255,255,0.06)':'#fff', borderRadius: 12, borderWidth: 1, borderColor: t.pillBorder }}>
                  <Text style={{ color: t.text, fontWeight: "800", textAlign: "center" }}>{x.v}</Text>
                  <Text style={{ color: t.subtext, fontSize: 12, textAlign: "center" }}>{x.k}</Text>
                </View>
              ))}
            </View>
          </View>
          <Icon name="create-outline" size={18} color={t.subtext} />
        </View>

        <View style={{ flexDirection: "row", gap: 12, marginTop: spacing.lg }}>
          <Pressable style={{ flex: 1, backgroundColor: t.bg, borderWidth: 1, borderColor: t.pillBorder, paddingVertical: 14, borderRadius: 999, alignItems: "center" }}>
            <Text style={{ color: t.text, fontWeight: "800" }}>CV</Text>
          </Pressable>
          <Pressable style={{ flex: 1, backgroundColor: "#18d39e", paddingVertical: 14, borderRadius: 999, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontWeight: "800" }}>Contact</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenBG>
  );
}
