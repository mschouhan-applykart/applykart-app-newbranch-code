import { View, Text, ImageBackground, Pressable } from "react-native";
import { useThemeX } from "../../providers/ThemeProvider";
import Icon from "react-native-vector-icons/Ionicons";

export default function Reels() {
  const t = useThemeX();
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200" }}
      style={{ flex: 1 }}
      imageStyle={{ resizeMode: "cover" }}
    >
      <View style={{ paddingTop: 64, alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>Reels | Friends 👩🏽‍🤝‍👨🏼</Text>
      </View>
      <View style={{ position: "absolute", right: 16, bottom: 120, gap: 18, alignItems: "center" }}>
        <Icon name="heart-outline" size={26} color="#fff" />
        <Text style={{ color: "#fff" }}>10K</Text>
        <Icon name="chatbubble-outline" size={26} color="#fff" />
        <Text style={{ color: "#fff" }}>200</Text>
        <Icon name="paper-plane-outline" size={26} color="#fff" />
        <Text style={{ color: "#fff" }}>200</Text>
      </View>
      <View style={{ position: "absolute", left: 16, bottom: 32, right: 16, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", padding: 12, borderRadius: 999 }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Yogesh.45</Text>
          <Text style={{ color: "#fff" }}>Sky • #sky</Text>
        </View>
        <Pressable style={{ backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999 }}>
          <Text style={{ color: t.accent, fontWeight: "800" }}>Follow</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

