import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-16 h-9 rounded-full p-1
        bg-red-200 dark:bg-white/5
        border border-gray-400 dark:border-white/10
        backdrop-blur-md
        flex items-center justify-between
        transition-all duration-300
      "
    >
      {/* Sliding background (FIXED direction) */}
      <div
        className={`
          absolute top-1 left-1 w-7 h-7 rounded-full
          flex items-center justify-center
          shadow-md
          transition-all duration-300 ease-in-out
          ${isDark 
            ? 'translate-x-0 bg-[rgb(var(--color-primary))]'   // 🌙 LEFT
            : 'translate-x-7 bg-yellow-400'}                  // ☀️ RIGHT
        `}
      />

      {/* Moon (LEFT) */}
      <div className="z-10 w-7 h-7 flex items-center justify-center">
        <Moon
          size={16}
          className={`transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-400'
          }`}
        />
      </div>

      {/* Sun (RIGHT) */}
      <div className="z-10 w-7 h-7 flex items-center justify-center">
        <Sun
          size={16}
          className={`transition-colors duration-300 ${
            !isDark ? 'text-white' : 'text-yellow-400'
          }`}
        />
      </div>
    </button>
  );
};