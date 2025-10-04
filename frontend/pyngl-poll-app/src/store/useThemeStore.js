import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light", // Detect system preference on first load

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "pyngl-theme-storage", // saves theme in localStorage
    }
  )
);
export default useThemeStore;
