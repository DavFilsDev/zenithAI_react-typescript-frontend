import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

interface UserMenuDropdownProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  userEmail?: string;
  userCredits?: number;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  theme,
  onToggleTheme,
  onLogout,
  userEmail,
  userCredits = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        title="Settings"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center flex-shrink-0">
            {userEmail?.[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm truncate">{userEmail}</div>
            <div className="text-xs text-gray-400">
              {userCredits} credits
            </div>
          </div>
        </div>
        <FiSettings 
          size={18} 
          className="text-gray-400 transition-transform duration-200 group-hover:rotate-90" 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-[rgb(var(--color-bg))] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Theme Toggle */}
          <button
            onClick={() => {
              onToggleTheme();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors duration-200"
          >
            {theme === 'light' ? (
              <>
                <FiMoon size={18} />
                <span className="text-sm">Dark Mode</span>
              </>
            ) : (
              <>
                <FiSun size={18} />
                <span className="text-sm">Light Mode</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Logout Button */}
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors duration-200 text-red-500"
          >
            <FiLogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};