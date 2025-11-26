import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, error, className, id, ...props }) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 ${error ? 'border-red-500' : ''} ${className || ''}`}
        rows={4}
        {...props}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default TextArea;