import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { X } from 'lucide-react';

interface CustomToastProps {
  title?: string;
  description: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onClose?: () => void;
}

export const CustomToast = ({ title, description, variant = 'default', onClose }: CustomToastProps) => {
  const variantStyles = {
    default: 'border-white/20 bg-white/10',
    success: 'border-green-500/30 bg-green-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
  };

  const iconColors = {
    default: 'text-white',
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
  };

  return (
    <div className={`flex items-center gap-3 rounded-xl border backdrop-blur-xl p-4 shadow-2xl ${variantStyles[variant]}`}>
      <div className={`flex-shrink-0 ${iconColors[variant]}`}>
        {variant === 'success' && <CheckCircle className="h-5 w-5" />}
        {variant === 'error' && <XCircle className="h-5 w-5" />}
        {variant === 'warning' && <AlertTriangle className="h-5 w-5" />}
        {variant === 'default' && <Info className="h-5 w-5" />}
      </div>
      <div className="flex-1">
        {title && <ToastTitle className="text-sm font-semibold text-white">{title}</ToastTitle>}
        <ToastDescription className="whitespace-nowrap text-sm text-white/90">{description}</ToastDescription>
      </div>
      <ToastClose asChild>
        <button onClick={onClose} className="flex-shrink-0 rounded-lg p-1 hover:bg-white/10 transition-colors">
          <X className="h-4 w-4 text-white/70" />
        </button>
      </ToastClose>
    </div>
  );
};