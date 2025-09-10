"use client";

import { createContext, useContext, ReactNode, useState } from "react";

// نوع المتغير
type ForgetContextType = {
  forget: boolean;
  setForget: (value: boolean) => void;
};

// إنشاء الكونتكست
const ForgetContext = createContext<ForgetContextType | undefined>(undefined);

// Provider
export function ForgetProvider({ children }: { children: ReactNode }) {
  const [forget, setForget] = useState(false); // هنا المتغير اللي عايز تتحكم فيه

  return (
    <ForgetContext.Provider value={{ forget, setForget }}>
      {children}
    </ForgetContext.Provider>
  );
}

// Hook للاستخدام
export function useForget() {
  const context = useContext(ForgetContext);
  if (!context) {
    throw new Error("useForget must be used inside ForgetProvider");
  }
  return context;
}
