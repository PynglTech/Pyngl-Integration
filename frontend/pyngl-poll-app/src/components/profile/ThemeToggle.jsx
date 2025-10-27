import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';

const ThemeToggle = () => {
    const { theme, setTheme } = useThemeStore(state => ({ theme: state.theme, setTheme: state.setTheme }));

    const options = [
        { name: 'light', icon: <Sun size={18} />, label: 'Light' },
        { name: 'dark', icon: <Moon size={18} />, label: 'Dark' },
        { name: 'system', icon: <Laptop size={18} />, label: 'System' },
    ];

    return (
        <div className="p-4 rounded-2xl mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">Appearance</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Customize how Pyngl looks on your device.</p>
                </div>
                <div className="flex items-center p-1 space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {options.map((option) => (
                        <button
                            key={option.name}
                            onClick={() => setTheme(option.name)}
                            title={option.label}
                            className={`p-2 rounded-full transition-colors ${
                                theme === option.name
                                    ? 'bg-white dark:bg-gray-800 text-pyngl-pink shadow-sm'
                                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            {option.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;