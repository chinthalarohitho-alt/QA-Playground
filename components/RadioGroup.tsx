
import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  label?: string;
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  label,
  selectedValue,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={`mb-4 ${className || ''}`}>
      {label && (
        <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
      )}
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default RadioGroup;
