// app/(tabs)/index.js
import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenBG, useThemeX } from "../../providers/ThemeProvider";
import { useUIStore } from "../../lib/uiStore";
import { spacing, radius, fonts } from "../../lib/theme";

const W = Dimensions.get("window").width;
const AV = (i) => `https://i.pravatar.cc/128?img=${i}`;
const POST_IMG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600";

/* ============================================================
   ROOT – switches between Personal (dark) and Professional (light)
   ============================================================ */
export default function Home() {
  const mode = useUIStore((s) => s.profileMode);
  return mode === "professional" ? <ProfessionalHome /> : <PersonalHome />;
}

/* ============================================================
   PROFESSIONAL (approved)
   ============================================================ */
function ProfessionalHome() {
  const setMode = useUIStore((s) => s.setProfileMode);

  return (
    <ScreenBG>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header gradient */}
        <LinearGradient
          colors={["#E9F2FF", "#F6FAFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: 14,
            paddingBottom: 18,
            paddingHorizontal: 16,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          {/* Top row */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
            <AvatarWithAdd />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ color: "#64748B", fontWeight: "600" }}>Hello, 👋</Text>
              <Text style={{ color: "#0F172A", fontWeight: "800", fontSize: 18 }}>
                Riya Sharma
              </Text>
            </View>
            <RoundIcon name="gift-outline" />
            <RoundIcon name="person-circle-outline" style={{ marginLeft: 10 }} />
          </View>

          {/* Friends strip */}
          <StoriesRow names={["Akshay", "Sneha", "Amisha", "James", "Sneha", "Amis"]} />

          {/* Stats */}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
            <StatTile icon="eye-outline" value="127" label="Profile Views" />
            <StatTile icon="people-outline" value="2.4K" label="Connections" tint="#22c55e" />
            <StatTile icon="star-outline" value="4.8" label="Rating" tint="#a78bfa" />
          </View>

          {/* Composer */}
          <ComposerCard
            placeholder="Share your professional journey…"
            actions={[
              { icon: "image-outline", label: "Photo" },
              { icon: "videocam-outline", label: "Video" },
              { icon: "play-circle-outline", label: "Reel" },
              { icon: "briefcase-outline", label: "Job" },
            ]}
          />
        </LinearGradient>

        {/* Feed + sections */}
        <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
          <FeedCard
            brand
            author="Youtube"
            time="3 hours ago"
            subtitle="2.1M followers"
            image={POST_IMG}
          />
        </View>

        <SectionHeader title="Suggested Shorts" />
        <HorizontalShorts />

        <SectionHeader title="Suggestions" action="View all" />
        <SuggestionsRow />

        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <FeedCard
            brand
            author="Youtube"
            time="3 hours ago"
            subtitle="2.1M followers"
            image={POST_IMG}
          />
        </View>
      </ScrollView>

    </ScreenBG>
  );
}

/* ============================================================
   PERSONAL (dark / blue)
   ============================================================ */
function PersonalHome() {
  const setMode = useUIStore((s) => s.setProfileMode);

  return (
    <ScreenBG>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#0E2A3A" }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Navy curved header */}
        <LinearGradient
          colors={["#0E2A3A", "#0E2A3A"]}
          style={{
            paddingTop: 18,
            paddingBottom: 10,
            paddingHorizontal: 16,
            borderBottomLeftRadius: 26,
            borderBottomRightRadius: 26,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AvatarWithAdd ring="#1dd3b0" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ color: "#9DC6DB" }}>Hello, 👋</Text>
              <Text style={{ color: "#EAF4FA", fontWeight: "800", fontSize: 18 }}>
                Riya Sharma
              </Text>
            </View>
            <CircleIcon name="settings-outline" tint="#EAF4FA" />
            <CircleIcon name="notifications-outline" tint="#EAF4FA" style={{ marginLeft: 10 }} />
          </View>

          {/* Personal/Following tabs mock */}
          <View style={{ flexDirection: "row", gap: 24, marginTop: 14, marginBottom: 10 }}>
            <Text style={{ color: "#EAF4FA", fontWeight: "800" }}>Discover</Text>
            <Text style={{ color: "#9DC6DB" }}>Following</Text>
          </View>

          {/* Stories (with green dots) */}
          <FlatList
            horizontal
            contentContainerStyle={{ paddingVertical: 8 }}
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(i) => String(i)}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    padding: 2,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    source={{ uri: AV(item) }}
                    style={{ width: "100%", height: "100%", borderRadius: 27 }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: -2,
                    bottom: -2,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#10B981",
                    borderWidth: 2,
                    borderColor: "#0E2A3A",
                  }}
                />
              </View>
            )}
          />
        </LinearGradient>

        {/* Feed list for you */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <Text style={{ color: "#CDE8F5", marginLeft: 4, marginBottom: 8 }}>
            Feed list for you
          </Text>

          {/* Primary dark card */}
          <DarkFeedCard
            author="Nolan Botosh"
            time="20 min ago"
            text="Excited to announce our new Creator Economy initiative! We’re investing $100M to support content creators worldwide. Join us in building the future of digital creativity."
            image={POST_IMG}
          />

          {/* Suggested shorts row */}
          <Text style={{ color: "#CDE8F5", marginTop: 8, marginLeft: 4 }}>
            Suggested Shorts
          </Text>
          <FlatList
            horizontal
            style={{ marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
            data={[
              "https://images.unsplash.com/photo-1520975922325-24dd0c76c3c8?q=80&w=1200",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
              "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200",
            ]}
            keyExtractor={(u, i) => u + i}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 124,
                  height: 154,
                  borderRadius: 14,
                  overflow: "hidden",
                  backgroundColor: "#113447",
                }}
              >
                <Image source={{ uri: item }} style={{ width: "100%", height: "100%" }} />
                <View
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Icon name="eye-outline" size={14} color="#fff" />
                  <Text style={{ color: "#fff", fontSize: 12 }}>20.5K</Text>
                </View>
              </View>
            )}
          />

          {/* Another dark card */}
          <DarkFeedCard
            author="Nolan Botosh"
            time="20 min ago"
            text="Excited to announce our new Creator Economy initiative! We’re investing $100M to support content creators worldwide. Join us in building the future of digital creativity."
            image={POST_IMG}
          />
        </View>
      </ScrollView>

    </ScreenBG>
  );
}

/* ===========================
   Shared atoms / molecules
   =========================== */

const AvatarWithAdd = memo(({ ring = "#60a5fa" }) => (
  <View style={{ position: "relative" }}>
    <View
      style={{
        borderRadius: 22,
        padding: 2,
        borderWidth: 2,
        borderColor: ring,
        width: 44,
        height: 44,
      }}
    >
      <Image source={{ uri: AV(32) }} style={{ width: "100%", height: "100%", borderRadius: 22 }} />
    </View>
    <View
      style={{
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
      }}
    >
      <Icon name="add" size={14} color="#fff" />
    </View>
  </View>
));

const RoundIcon = memo(({ name, style }) => (
  <View
    style={[
      {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
      },
      style,
    ]}
  >
    <Icon name={name} size={20} color="#0F172A" />
  </View>
));

const CircleIcon = memo(({ name, style, tint = "#fff" }) => (
  <View
    style={[
      {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
      },
      style,
    ]}
  >
    <Icon name={name} size={20} color={tint} />
  </View>
));

const StoriesRow = memo(({ names }) => (
  <FlatList
    horizontal
    data={names}
    keyExtractor={(n, i) => n + i}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ marginTop: 14 }}
    ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
    renderItem={({ item, index }) => <StoryBubble name={item} uri={AV(index + 1)} />}
  />
));

const StoryBubble = memo(({ name, uri }) => (
  <View style={{ alignItems: "center" }}>
    <View style={{ borderRadius: 999, padding: 2, borderWidth: 2, borderColor: "#60a5fa" }}>
      <Image source={{ uri }} style={{ width: 52, height: 52, borderRadius: 26 }} />
    </View>
    <Text style={{ color: "#334155", marginTop: 6, fontSize: 12 }}>{name}</Text>
  </View>
));

const StatTile = memo(({ icon, value, label, tint = "#38bdf8" }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <Icon name={icon} size={20} color={tint} />
    <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "800", color: "#0F172A" }}>
      {value}
    </Text>
    <Text style={{ marginTop: 2, color: "#64748B", fontSize: 12 }}>{label}</Text>
  </View>
));

const ComposerCard = memo(({ placeholder, actions }) => (
  <View
    style={{
      marginTop: 14,
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Image source={{ uri: AV(31) }} style={{ width: 36, height: 36, borderRadius: 18 }} />
      <View
        style={{
          flex: 1,
          height: 38,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ color: "#94A3B8" }}>{placeholder}</Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      {actions.map((a) => (
        <ComposerChip key={a.label} icon={a.icon} label={a.label} />
      ))}
    </View>
  </View>
));

const ComposerChip = memo(({ icon, label }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: "#F8FAFC",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <Icon name={icon} size={16} color="#0F172A" />
    <Text style={{ color: "#0F172A", fontWeight: "700", fontSize: 12 }}>{label}</Text>
  </View>
));

const SectionHeader = memo(({ title, action }) => (
  <View
    style={{
      paddingHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#0F172A", fontWeight: "800", fontSize: fonts.h4 ?? 18 }}>
      {title}
    </Text>
    {action ? <Text style={{ color: "#2563eb", fontWeight: "700" }}>{action}</Text> : null}
  </View>
));

const ShortThumb = memo(({ uri }) => (
  <View
    style={{
      width: 124,
      height: 154,
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: "#111827",
    }}
  >
    <Image source={{ uri }} style={{ width: "100%", height: "100%" }} />
    <View
      style={{
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Icon name="eye-outline" size={14} color="#fff" />
      <Text style={{ color: "#fff", fontSize: 12 }}>20.5K</Text>
    </View>
  </View>
));

const HorizontalShorts = memo(() => (
  <View style={{ paddingHorizontal: 16 }}>
    <FlatList
      horizontal
      data={[
        "https://images.unsplash.com/photo-1520975922325-24dd0c76c3c8?q=80&w=1200",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200",
      ]}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(u, i) => u + i}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      renderItem={({ item }) => <ShortThumb uri={item} />}
    />
  </View>
));

const SuggestCard = memo(({ name, role }) => (
  <View
    style={{
      width: (W - 16 * 2 - 12 * 2) / 3,
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      alignItems: "center",
      paddingVertical: 12,
      gap: 8,
    }}
  >
    <Image source={{ uri: AV(7) }} style={{ width: 56, height: 56, borderRadius: 28 }} />
    <Text style={{ color: "#0F172A", fontWeight: "700" }}>{name}</Text>
    <Text style={{ color: "#64748B", fontSize: 12 }}>{role}</Text>
    <Pressable
      style={{
        height: 36,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#2563eb",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Icon name="add" size={16} color="#2563eb" />
      <Text style={{ color: "#2563eb", fontWeight: "800" }}>Connect</Text>
    </Pressable>
  </View>
));

const SuggestionsRow = memo(() => (
  <View style={{ paddingHorizontal: 16, flexDirection: "row", gap: 12, marginTop: 4 }}>
    <SuggestCard name="Neha Sharma" role="Front End Developer" />
    <SuggestCard name="Neha Sharma" role="Front End Developer" />
    <SuggestCard name="Neha Sharma" role="Front End Developer" />
  </View>
));

const FeedCard = memo(({ brand, author, time, subtitle, image }) => (
  <View
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      overflow: "hidden",
    }}
  >
    {/* header */}
    <View style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          backgroundColor: "#ef4444",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="logo-youtube" size={18} color="#fff" />
      </View>
      <View style={{ flex: 1, flexWrap: "wrap" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ color: "#0F172A", fontWeight: "800" }}>{author}</Text>
          {brand && <Icon name="checkmark-circle" size={16} color="#2563eb" />}
          <Text style={{ color: "#64748B" }}>• {subtitle}</Text>
          <Text style={{ color: "#64748B" }}>• {time}</Text>
        </View>
      </View>
      <Text style={{ color: "#2563eb", fontWeight: "700" }}>+ Follow</Text>
    </View>

    {/* body */}
    <Text style={{ color: "#334155", paddingHorizontal: 12, paddingBottom: 10 }}>
      Excited to announce our new Creator Economy initiative! We’re investing
      $100M to support content creators worldwide. Join us in building the
      future of digital creativity. 🚀
    </Text>

    <Image source={{ uri: image }} style={{ width: "100%", height: W * 0.9 }} />

    {/* actions */}
    <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }}>
      <RowAction icon="thumbs-up-outline" label="Like" count="1.2K" />
      <RowAction icon="chatbubble-ellipses-outline" label="Comment" count="89" />
      <RowAction icon="share-social-outline" label="Share" count="45" />
      <Icon name="ellipsis-horizontal" size={18} color="#94A3B8" />
    </View>
  </View>
));

const DarkFeedCard = memo(({ author, time, text, image }) => (
  <View
    style={{
      backgroundColor: "#0F3446",
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
      overflow: "hidden",
      paddingBottom: 8,
      marginBottom: 12,
    }}
  >
    {/* header */}
    <View style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Image source={{ uri: AV(9) }} style={{ width: 36, height: 36, borderRadius: 18 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#EAF4FA", fontWeight: "800" }}>{author}</Text>
        <Text style={{ color: "#9DC6DB", fontSize: 12 }}>{time} • Public</Text>
      </View>
      <Icon name="ellipsis-vertical" size={18} color="#9DC6DB" />
    </View>

    <Text style={{ color: "#CDE8F5", paddingHorizontal: 12, paddingBottom: 12 }}>{text}</Text>

    <Image source={{ uri: image }} style={{ width: "100%", height: W * 0.86 }} />

    <View style={{ paddingHorizontal: 12, paddingTop: 10, flexDirection: "row", gap: 22 }}>
      <DarkStat icon="heart-outline" value="4K" />
      <DarkStat icon="chatbubble-outline" value="200" />
      <DarkStat icon="paper-plane-outline" value="10" />
    </View>
  </View>
));

const RowAction = memo(({ icon, label, count }) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
    <Icon name={icon} size={18} color="#0F172A" />
    <Text style={{ color: "#0F172A" }}>
      {count} {label.toLowerCase()}s
    </Text>
  </View>
));

const DarkStat = memo(({ icon, value }) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
    <Icon name={icon} size={18} color="#EAF4FA" />
    <Text style={{ color: "#EAF4FA" }}>{value}</Text>
  </View>
));
