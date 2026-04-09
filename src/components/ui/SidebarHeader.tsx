import { FiMenu, FiX } from 'react-icons/fi';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <h1 className="text-xl font-bold tracking-wide">
        Zenith<span className="text-[rgb(var(--color-primary))]">AI</span>
      </h1>
      
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
        title={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
    </div>
  );
};