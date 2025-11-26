
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, error, className, id, ...props }) => {
  const checkboxId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  return (
    <div className="mb-4 flex items-center">
      <input
        id={checkboxId}
        type="checkbox"
        className={`form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className || ''}`}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="ml-2 text-sm text-gray-700">
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default Checkbox;
