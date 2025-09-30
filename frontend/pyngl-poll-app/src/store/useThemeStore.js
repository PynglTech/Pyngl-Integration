import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'light', // Default theme
            
            // This action toggles the theme between light and dark
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light',
            })),
        }),
        {
            name: 'pyngl-theme-storage', // The key for storing the theme in localStorage
        }
    )
);

export default useThemeStore;
