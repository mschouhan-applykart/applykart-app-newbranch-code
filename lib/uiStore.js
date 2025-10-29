import { create } from "zustand";

export const useUIStore = create((set, get) => ({
  profileMode: "personal",
  setProfileMode: (mode) => set({ profileMode: mode }),
  toggleProfileMode: () => set((s) => ({ profileMode: s.profileMode === "personal" ? "professional" : "personal" })),

  unread: { chat: 2, notifications: 4 },
  setUnread: (key, value) => set((s) => ({ unread: { ...s.unread, [key]: value } })),

  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),

  themeTokens: () => {
    const mode = get().profileMode;
    const isPersonal = mode === "personal";
    return {
      mode,
      bg: isPersonal ? "#0E2A3A" : "#FFFFFF",
      card: isPersonal ? "#123B52" : "#F8F9FB",
      text: isPersonal ? "#EAF4FA" : "#1B1E28",
      subtext: isPersonal ? "rgba(234,244,250,0.7)" : "#6B7280",
      pillBg: isPersonal ? "rgba(255,255,255,0.06)" : "#FFFFFF",
      pillBorder: isPersonal ? "rgba(255,255,255,0.16)" : "#E5E7EB",
      accent: "#2F6BED",
      danger: "#EF4444",
      success: "#22C55E",
      gradient: isPersonal ? ["#0E2A3A", "#0C2230", "#091A26"] : ["#E9F2FF", "#F7FAFF", "#FFFFFF"],
      shadow: isPersonal ? "rgba(0,0,0,0.35)" : "rgba(17,24,39,0.08)",
      input: {
        bg: isPersonal ? "rgba(255,255,255,0.08)" : "#FFFFFF",
        border: isPersonal ? "rgba(255,255,255,0.18)" : "#E5E7EB",
        placeholder: isPersonal ? "rgba(234,244,250,0.55)" : "#9CA3AF",
      },
      listDivider: isPersonal ? "rgba(255,255,255,0.08)" : "#F1F5F9",
    };
  },
}));
