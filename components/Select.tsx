import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, error, className, id, ...props }) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className || ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default Select;