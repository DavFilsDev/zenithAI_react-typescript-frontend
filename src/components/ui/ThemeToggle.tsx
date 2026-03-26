import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 transition-all duration-300
                 bg-white/10 dark:bg-white/5
                 backdrop-blur-md border border-white/20 dark:border-white/10
                 flex items-center"
    >
      {/* Circle */}
      <div
        className={`w-6 h-6 rounded-full bg-[rgb(var(--color-primary))] 
                    shadow-md transform transition-transform duration-300
                    ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
      />

      {/* Optional icons (sun/moon minimalist) */}
      <span className="absolute left-1 text-xs opacity-70">🌙</span>
      <span className="absolute right-1 text-xs opacity-70">☀️</span>
    </button>
  );
};