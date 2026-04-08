import { toast } from 'react-hot-toast';
import { toastConfig, formatToastMessage } from '../config/toastConfig';

export const useToast = () => {
  const showSuccess = (message: string, duration?: number) => {
    const formattedMessage = formatToastMessage(message);
    toast.success(formattedMessage, {
      ...toastConfig.success,
      duration: duration || toastConfig.success.duration,
    });
  };

  const showError = (message: string, duration?: number) => {
    const formattedMessage = formatToastMessage(message);
    toast.error(formattedMessage, {
      ...toastConfig.error,
      duration: duration || toastConfig.error.duration,
    });
  };

  const showLoading = (message: string = 'Loading...') => {
    const formattedMessage = formatToastMessage(message);
    return toast.loading(formattedMessage, toastConfig.loading);
  };

  const showCustom = (message: string, variant: 'success' | 'error' | 'info' = 'info') => {
    const formattedMessage = formatToastMessage(message);
    const config = {
      ...toastConfig.custom,
      icon: variant === 'success' ? '✓' : variant === 'error' ? '✗' : 'ℹ',
    };
    toast(formattedMessage, config);
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showCustom,
    dismiss,
  };
};