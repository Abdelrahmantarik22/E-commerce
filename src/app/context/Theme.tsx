"use client";

import { createContext, useContext, ReactNode, useState } from "react";

// نوع المتغير
type ThemeType = {
    Dark: string;
    setDark: (value: string) => void;
};

// إنشاء الكونتكست
const ThemeContext = createContext<ThemeType |null>(null);

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [Dark, setDark] = useState<string>('light'); // هنا المتغير اللي عايز تتحكم فيه







  return (
    <ThemeContext.Provider value={{ Dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook للاستخدام
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useForget must be used inside ForgetProvider");
  }
  return context;
}
