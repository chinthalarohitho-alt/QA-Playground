
import React from 'react';
import Button from './Button'; // Assuming you have a Button component

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  hideCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  hideCloseButton = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 mx-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
            {title}
          </h3>
          {!hideCloseButton && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="py-4 text-gray-700">
          {children}
        </div>
        {(primaryButtonText || secondaryButtonText) && (
          <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            {secondaryButtonText && (
              <Button variant="secondary" onClick={onSecondaryButtonClick || onClose}>
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button variant="primary" onClick={onPrimaryButtonClick}>
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
