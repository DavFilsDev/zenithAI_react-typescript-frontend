import type { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className="space-y-1 relative">
      
      {/* Label */}
      <label className="text-sm font-medium opacity-80">
        {label}
      </label>

      {/* Input wrapper (for icon positioning) */}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          {...props}
          className={`
            w-full px-4 py-2 rounded-xl
            
            bg-white/10 dark:bg-white/5
            backdrop-blur-md
            
            border border-white/20 dark:border-white/10
            
            focus:outline-none focus:ring-2 
            focus:ring-[rgb(var(--color-primary))]
            
            pr-10
            
            transition-all
            
            ${className}
          `}
        />

        {/* Eye Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              opacity-60 hover:opacity-100
              transition
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};