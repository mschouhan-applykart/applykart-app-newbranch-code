// app/(tabs)/explore.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// Optional theme/store hooks from your app.
// If you don't have them, this still works thanks to fallbacks below.
import { useThemeX } from "../../providers/ThemeProvider";
import { useUIStore } from "../../lib/uiStore";

const W = Dimensions.get("window").width;
const PADDING_H = 20;
const GUTTER = 10;
const COLS = 3;
const TILE_W = (W - PADDING_H * 2 - GUTTER * (COLS - 1)) / COLS;

const TABS = ["Trending", "Reels", "New & Rising", "Nearby", "Topics"];
const TAGS = ["#trending", "#coding", "#fyp", "#feed", "#hiring"];

// Demo feed (some are reels)
const FEED = [
  { id: "1", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900", reels: false, score: 98, tags: ["#coding", "#feed"], lat: -37.81, lng: 144.96, h: 180 },
  { id: "2", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900", reels: false, score: 92, tags: ["#trending", "#fyp"], lat: -37.79, lng: 144.93, h: 150 },
  { id: "3", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=900", reels: false, score: 81, tags: ["#feed"], lat: -37.71, lng: 144.99, h: 240 },
  { id: "4", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900", reels: false, score: 85, tags: ["#trending"], lat: -37.86, lng: 145.01, h: 140 },
  { id: "5", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900", reels: true,  score: 99, tags: ["#coding", "#fyp"], lat: -37.80, lng: 144.95, h: 220 },
  { id: "6", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900", reels: false, score: 76, tags: ["#feed"], lat: -37.77, lng: 145.05, h: 190 },
  { id: "7", img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=900", reels: true,  score: 97, tags: ["#trending"], lat: -37.83, lng: 145.03, h: 210 },
  { id: "8", img: "https://images.unsplash.com/photo-1542198626-88d52f91c7a1?w=900", reels: false, score: 79, tags: ["#feed", "#hiring"], lat: -37.69, lng: 144.88, h: 260 },
  { id: "9", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900", reels: false, score: 83, tags: ["#fyp"], lat: -37.74, lng: 144.90, h: 170 },
  { id: "10", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900", reels: true, score: 94, tags: ["#coding", "#trending"], lat: -37.82, lng: 144.97, h: 180 },
];

function inCbdBox(it) {
  // rough bbox near Melbourne CBD
  return Math.abs(it.lat + 37.8136) < 0.12 && Math.abs(it.lng - 144.9631) < 0.12;
}

export default function Explore() {
  const router = useRouter();

  // Try to use your app theme; if not present, use safe defaults
  const tMaybe = useThemeX?.();
  const mode = useUIStore?.(s => s.profileMode) ?? "personal";
  const isPersonal = mode === "personal";

  const palette = useMemo(() => {
    // When ThemeProvider is present, prefer its palette keys if they exist
    if (tMaybe && tMaybe.mode) {
      const dark = tMaybe.mode === "personal";
      return {
        gradient: dark ? ["#10364B", "#0D2A3B"] : ["#FFFFFF", "#F7F8FA"],
        searchBg: dark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
        searchBorder: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
        searchText: dark ? "#F4FAFE" : "#1B1E28",
        placeholder: dark ? "#CFE0EA" : "#9AA3AE",
        chipBg: dark ? "rgba(255,255,255,0.12)" : "#FFFFFF",
        chipBorder: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
        chipText: dark ? "#E6F3FA" : "#263040",
        activeUnderline: dark ? "#78E2FF" : "#1B1E28",
        tabOn: dark ? "#FFFFFF" : "#1B1E28",
        tabOff: dark ? "rgba(255,255,255,0.8)" : "#6D7683",
        cardShadow: dark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.08)",
      };
    }
    // Fallbacks
    return {
      gradient: isPersonal ? ["#10364B", "#0D2A3B"] : ["#FFFFFF", "#F7F8FA"],
      searchBg: isPersonal ? "rgba(255,255,255,0.08)" : "#FFFFFF",
      searchBorder: isPersonal ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
      searchText: isPersonal ? "#F4FAFE" : "#1B1E28",
      placeholder: isPersonal ? "#CFE0EA" : "#9AA3AE",
      chipBg: isPersonal ? "rgba(255,255,255,0.12)" : "#FFFFFF",
      chipBorder: isPersonal ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
      chipText: isPersonal ? "#E6F3FA" : "#263040",
      activeUnderline: isPersonal ? "#78E2FF" : "#1B1E28",
      tabOn: isPersonal ? "#FFFFFF" : "#1B1E28",
      tabOff: isPersonal ? "rgba(255,255,255,0.8)" : "#6D7683",
      cardShadow: isPersonal ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.08)",
    };
  }, [tMaybe, isPersonal]);

  const styles = useMemo(() => mkStyles(palette), [palette]);

  // State
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [chips, setChips] = useState([]);
  const [data, setData] = useState(FEED);

  const deb = useRef(null);
  useEffect(() => {
    clearTimeout(deb.current);
    deb.current = setTimeout(() => {
      setData(filterFeed(tab, q, chips));
    }, 180);
    return () => clearTimeout(deb.current);
  }, [tab, q, chips]);

  function filterFeed(tabIndex, query, tags) {
    let list = [...FEED];

    switch (tabIndex) {
      case 0: // Trending
        list = list.sort((a, b) => b.score - a.score);
        break;
      case 1: // Reels
        list = list.filter(x => x.reels);
        break;
      case 2: // New & Rising
        list = list.sort((a, b) => a.score - b.score).slice(Math.floor(FEED.length / 2));
        break;
      case 3: // Nearby
        list = list.filter(inCbdBox);
        break;
      case 4: // Topics
      default:
        break;
    }

    if (query.trim()) {
      const s = query.trim().toLowerCase();
      list = list.filter(x => x.tags.join(" ").toLowerCase().includes(s));
    }
    if (tags.length) {
      list = list.filter(x => tags.some(t => x.tags.includes(t)));
    }
    return list;
  }

  const onOpen = (item) => {
    // Opens your reels page with params
    // Ensure app/(tabs)/reels.js exists
    router.push({ pathname: "/reels", params: { id: item.id, isVideo: item.reels ? "1" : "0" } });
  };

  const toggleChip = (tag) =>
    setChips((c) => (c.includes(tag) ? c.filter(t => t !== tag) : [...c, tag]));

  const renderTile = ({ item, index }) => (
    <Pressable
      onPress={() => onOpen(item)}
      style={{
        width: TILE_W,
        marginRight: (index + 1) % COLS ? GUTTER : 0,
        marginBottom: GUTTER,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: item.img }} style={{ width: TILE_W, height: item.h }} />
      {item.reels && (
        <View style={styles.reelsBadge}>
          <Icon name="film-outline" size={14} color="#fff" />
        </View>
      )}
    </Pressable>
  );

  return (
    <LinearGradient colors={palette.gradient} style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ paddingHorizontal: PADDING_H, paddingTop: 18 }}>
            {/* Search */}
            <View style={styles.searchWrap}>
              <Icon name="search" size={18} color={isPersonal ? "#E3EDF4" : "#6D7683"} />
              <TextInput
                value={q}
                onChangeText={setQ}
                placeholder="Search ……"
                placeholderTextColor={palette.placeholder}
                style={styles.searchInput}
                returnKeyType="search"
              />
              {q.length > 0 && (
                <Pressable onPress={() => setQ("")} hitSlop={10}>
                  <Icon name="close-circle" size={18} color={isPersonal ? "#BFD1DB" : "#A3ADB7"} />
                </Pressable>
              )}
            </View>

            {/* Chips */}
            <View style={styles.chipsRow}>
              {TAGS.map((tag) => {
                const on = chips.includes(tag);
                return (
                  <Pressable
                    key={tag}
                    onPress={() => toggleChip(tag)}
                    style={[styles.chip, on && styles.chipOn]}
                  >
                    <Text style={[styles.chipText, on && styles.chipTextOn]}>{tag}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Tabs */}
            <View style={styles.tabsRow}>
              {TABS.map((label, i) => {
                const on = i === tab;
                return (
                  <Pressable key={label} onPress={() => setTab(i)} style={styles.tabBtn}>
                    <Text style={[styles.tabText, on ? styles.tabTextOn : styles.tabTextOff]}>
                      {label}
                    </Text>
                    {on && <View style={styles.tabUnderline} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        }
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={tab === 1 ? 1 : COLS} // Reels = full width rows
        renderItem={(props) =>
          tab === 1 ? <ReelRow item={props.item} onOpen={() => onOpen(props.item)} /> : renderTile(props)
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: PADDING_H, paddingBottom: 30, paddingTop: 8 }}
      />
    </LinearGradient>
  );
}

function ReelRow({ item, onOpen }) {
  return (
    <Pressable onPress={onOpen} style={{ marginBottom: 12, borderRadius: 16, overflow: "hidden" }}>
      <Image source={{ uri: item.img }} style={{ width: "100%", height: 360 }} />
      <View style={reelBadgeStyle}>
        <Icon name="play" size={12} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12, marginLeft: 6 }}>Reel</Text>
      </View>
    </Pressable>
  );
}

const reelBadgeStyle = {
  position: "absolute",
  right: 10,
  top: 10,
  backgroundColor: "rgba(0,0,0,0.55)",
  paddingHorizontal: 10,
  height: 28,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
};

function mkStyles(p) {
  return StyleSheet.create({
    searchWrap: {
      height: 50,
      borderRadius: 26,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: p.searchBg,
      borderWidth: 1,
      borderColor: p.searchBorder,
      gap: 10,
    },
    searchInput: {
      flex: 1,
      color: p.searchText,
      fontSize: 16,
      paddingVertical: 8,
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 14,
    },
    chip: {
      paddingHorizontal: 14,
      height: 38,
      borderRadius: 22,
      backgroundColor: p.chipBg,
      borderWidth: 1,
      borderColor: p.chipBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    chipOn: {
      backgroundColor: "#35E3B6",
      borderColor: "#35E3B6",
    },
    chipText: { fontWeight: "700", color: p.chipText },
    chipTextOn: { color: "#0D2A3B", fontWeight: "800" },

    tabsRow: { flexDirection: "row", gap: 26, alignItems: "center", marginTop: 18 },
    tabBtn: { paddingVertical: 6 },
    tabText: { fontSize: 20 },
    tabTextOn: { fontWeight: "800", color: p.tabOn },
    tabTextOff: { fontWeight: "600", color: p.tabOff },
    tabUnderline: {
      height: 3,
      width: 60,
      backgroundColor: p.activeUnderline,
      marginTop: 8,
      borderRadius: 2,
    },

    reelsBadge: {
      position: "absolute",
      right: 8,
      top: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "rgba(0,0,0,0.55)",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
