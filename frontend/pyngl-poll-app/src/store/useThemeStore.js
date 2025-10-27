import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'system', // Can be 'light', 'dark', or 'system'
            setTheme: (newTheme) => set({ theme: newTheme }),
        }),
        {
            name: 'pyngl-theme-storage',
        }
    )
);

export default useThemeStore;