'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost p-2 rounded-lg transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-400 hover:text-yellow-300 transition-colors" />
      )}
    </button>
  );
}
