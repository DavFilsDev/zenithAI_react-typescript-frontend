import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  registration,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="text-sm font-medium opacity-80">
        {label}
      </label>

      {/* Input */}
      <input
        {...registration}
        {...props}
        className={`
          w-full px-4 py-2 rounded-xl
          bg-white/10 dark:bg-white/5
          backdrop-blur-md
          border border-white/20 dark:border-white/10
          text-[rgb(var(--color-text))]
          placeholder:opacity-50
          outline-none
          transition-all duration-200
          
          focus:border-[rgb(var(--color-primary))]
          focus:ring-1 focus:ring-[rgb(var(--color-primary))]
          
          ${error ? 'border-red-400 focus:ring-red-400' : ''}
        `}
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-[rgb(var(--color-error))]">
          {error.message}
        </p>
      )}
    </div>
  );
};