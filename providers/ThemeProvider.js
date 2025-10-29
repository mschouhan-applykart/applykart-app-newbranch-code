import React, { createContext, useContext, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useUIStore } from "../lib/uiStore";

const ThemeContext = createContext(null);
export const useThemeX = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const tokens = useUIStore((s) => s.themeTokens());
  const value = useMemo(() => tokens, [tokens.mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function ScreenBG({ children, style }) {
  const t = useThemeX();
  return (
    <LinearGradient colors={t.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ flex: 1 }, style]}>
      {children}
    </LinearGradient>
  );
}
