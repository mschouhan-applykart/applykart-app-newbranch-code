import { Tabs } from "expo-router";
import { Text, Pressable, View } from "react-native";
import { useUIStore } from "../../lib/uiStore";
import { useThemeX } from "../../providers/ThemeProvider";
import Icon from "react-native-vector-icons/Ionicons";

export default function TabsLayout() {
  const t = useThemeX();
  const mode = useUIStore((s) => s.profileMode);
  const toggle = useUIStore((s) => s.toggleProfileMode);

  const headerRight = () => (
    <Pressable onPress={toggle} style={{ paddingRight: 14, paddingVertical: 8 }}>
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
        <Icon name="swap-horizontal" size={18} color={t.accent} />
        <Text style={{ color: t.accent, fontWeight: "600" }}>
          {mode === "personal" ? "Personal" : "Professional"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: t.mode === "personal" ? "#0E2A3A" : "#FFFFFF" },
        headerTintColor: t.mode === "personal" ? "#EAF4FA" : "#1B1E28",
        tabBarActiveTintColor: t.accent,
        tabBarStyle: { backgroundColor: t.mode === "personal" ? "#0E2A3A" : "#FFFFFF" },
        headerRight,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color, size }) => <Icon name="play-circle-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="chat" options={{ title: "Chat", tabBarIcon: ({ color, size }) => <Icon name="chatbubble-ellipses-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifications", tabBarIcon: ({ color, size }) => <Icon name="notifications-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Icon name="person-circle-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
