'use client';

import { useState, useEffect } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'ri-check-line';
      case 'error':
        return 'ri-close-line';
      case 'warning':
        return 'ri-alert-line';
      case 'info':
        return 'ri-information-line';
      default:
        return 'ri-notification-line';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] ${getTypeStyles()}`}>
      <i className={`${getIcon()} text-xl`}></i>
      <span className="flex-1">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 hover:opacity-75 transition-opacity"
      >
        <i className="ri-close-line text-lg"></i>
      </button>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-0 right-0 z-50 p-4">
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ top: `${index * 80}px` }} className="relative">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}
