import React, { useState } from 'react';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, helperText, className, id, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  const isPassword = type === 'password';

  // Apply specific styles for date/time inputs to ensure native picker UI appears
  // Added cursor-pointer and color-scheme: light for better UX and compatibility
  const dateOrTimeInputStyles =
    (type === 'date' || type === 'time')
      ? '[appearance:auto] cursor-pointer [color-scheme:light]'
      : '';

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 ${error ? 'border-red-500' : ''} ${className || ''} ${dateOrTimeInputStyles} ${isPassword ? 'pr-10' : ''}`}
          {...props}
        />
        {isPassword && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
              size="small"
              tabIndex={-1} // Prevent tabbing to the icon, keep focus flow on inputs
            >
              {showPassword ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
            </IconButton>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
      {!error && helperText && (
        <div className="mt-1 text-sm text-gray-500">{helperText}</div>
      )}
    </div>
  );
};

export default Input;