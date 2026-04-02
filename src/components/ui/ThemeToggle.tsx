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
        bg-white/10 dark:bg-white/5
        backdrop-blur-md border border-white/20 dark:border-white/10
        flex items-center
        transition-all duration-300 ease-in-out
      "
    >
      {/* Sliding circle */}
      <div
        className={`
          absolute top-1 left-1 w-7 h-7 rounded-full
          flex items-center justify-center
          shadow-md
          transition-all duration-300 ease-in-out
          ${isDark ? 'translate-x-7 bg-[rgb(var(--color-primary))]' : 'translate-x-0 bg-yellow-400'}
        `}
      >
        {isDark ? (
          <Moon size={16} className="text-white" />
        ) : (
          <Sun size={16} className="text-white" />
        )}
      </div>

      {/* Background icons */}
      <div className="flex justify-between w-full px-1">
        <Moon
          size={14}
          className={`transition-opacity duration-300 ${
            isDark ? 'opacity-0' : 'opacity-60'
          }`}
        />
        <Sun
          size={14}
          className={`transition-opacity duration-300 ${
            isDark ? 'opacity-60' : 'opacity-0'
          } text-yellow-400`}
        />
      </div>
    </button>
  );
};