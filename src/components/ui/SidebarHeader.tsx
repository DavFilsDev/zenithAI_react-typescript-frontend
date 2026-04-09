import { FiSidebar } from 'react-icons/fi';
import { useState } from 'react';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <h1 className="text-xl font-bold tracking-wide">
        Zenith<span className="text-[rgb(var(--color-primary))]">AI</span>
      </h1>
      
      <div className="relative">
        <button
          onClick={onToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <FiSidebar 
            size={20} 
            className={`transition-all duration-300 ${isOpen ? '' : 'rotate-180'}`}
          />
        </button>
        

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap">
            {isOpen ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
          </div>
        )}
      </div>
    </div>
  );
};