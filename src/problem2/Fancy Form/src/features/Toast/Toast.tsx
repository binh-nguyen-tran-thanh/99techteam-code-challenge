import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContext, type Toast } from './context/toastContext';
import { cn } from '@/utils/className';

const getToastStyles = (type: Toast['type']) => {
  const base = 'px-4 py-3 rounded-lg shadow-lg mb-2 animate-slide-in';
  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black'
  };
  return cn(`${base} ${styles[type]}`);
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast['type'], duration = 3000) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const newToast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      const timeoutId = setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);

      timeoutIds.current.push(timeoutId);
    },
    []
  );

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext value={contextValue}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
        {toasts.map((toast) => (
          <div key={toast.id} className={getToastStyles(toast.type)}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext>
  );
};
