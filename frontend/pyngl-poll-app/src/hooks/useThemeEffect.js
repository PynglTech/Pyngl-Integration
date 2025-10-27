import { useEffect } from 'react';
import useThemeStore from '../store/useThemeStore';

export const useThemeEffect = () => {
    const { theme } = useThemeStore();

    useEffect(() => {
        const applyTheme = () => {
            const root = window.document.documentElement;
            const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme();
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
        
    }, [theme]);
};import Share from '../pages/SharePage';