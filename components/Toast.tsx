import React, { useEffect } from 'react';
import Alert from './Alert';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
            <Alert type={type} message={message} onClose={onClose} className="shadow-lg min-w-[300px]" />
        </div>
    );
};

export default Toast;
