
import React, { useState, FormEvent, useCallback } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';
import Alert from '../components/Alert';
import DateRangePicker from '../components/DateRangePicker'; // Import the new DateRangePicker

const FormsTestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    emailInput: '',
    passwordInput: '',
    numberInput: '',
    dateInput: '', // From date for DateRangePicker
    dateInputTo: '', // To date for DateRangePicker
    timeInput: '',
    textareaInput: '',
    selectInput: 'option1',
    checkboxInput: false,
    radioInput: 'radio1',
    fileInput: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    textInput: '',
    emailInput: '',
    passwordInput: '',
    numberInput: '',
    dateInputTo: '', // Error for the date range picker
    textareaInput: '',
    fileInput: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error for the field being changed
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, fileInput: file }));
    setFormErrors((prev) => ({ ...prev, fileInput: '' }));
  }, []);

  const handleRadioChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, radioInput: value }));
  }, []);

  const handleDateRangeChange = useCallback((from: string, to: string) => {
    setFormData((prev) => ({ ...prev, dateInput: from, dateInputTo: to }));
    setFormErrors((prev) => ({ ...prev, dateInputTo: '' })); // Clear error when dates are changed
  }, []);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (!formData.textInput.trim()) {
      newErrors.textInput = 'Text input is required.';
      isValid = false;
    } else {
      newErrors.textInput = '';
    }

    if (!formData.emailInput.trim()) {
      newErrors.emailInput = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailInput)) {
      newErrors.emailInput = 'Invalid email format.';
      isValid = false;
    } else {
      newErrors.emailInput = '';
    }

    if (formData.passwordInput.length < 6) {
      newErrors.passwordInput = 'Password must be at least 6 characters.';
      isValid = false;
    } else {
      newErrors.passwordInput = '';
    }

    if (isNaN(Number(formData.numberInput)) || formData.numberInput === '') {
      newErrors.numberInput = 'Number input is required and must be a number.';
      isValid = false;
    } else {
      newErrors.numberInput = '';
    }

    // Date range validation for required fields
    if (formData.dateInput && !formData.dateInputTo) {
      newErrors.dateInputTo = 'To Date is required if From Date is provided.';
      isValid = false;
    } else if (!formData.dateInput && formData.dateInputTo) {
      newErrors.dateInputTo = 'From Date is required if To Date is provided.';
      isValid = false;
    } else {
      newErrors.dateInputTo = '';
    }


    if (!formData.textareaInput.trim()) {
      newErrors.textareaInput = 'Textarea is required.';
      isValid = false;
    } else {
      newErrors.textareaInput = '';
    }

    if (!formData.fileInput) {
      newErrors.fileInput = 'File upload is required.';
      isValid = false;
    } else {
      newErrors.fileInput = '';
    }

    setFormErrors(newErrors);
    return isValid;
  }, [formData, formErrors]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('idle');
    setSubmissionMessage('');
    setIsLoading(true);

    if (validateForm()) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      const success = Math.random() > 0.3; // 70% chance of success

      if (success) {
        setSubmissionStatus('success');
        setSubmissionMessage('Form submitted successfully!');
        // Optionally reset form
        setFormData({
          textInput: '',
          emailInput: '',
          passwordInput: '',
          numberInput: '',
          dateInput: '', // Reset From date
          dateInputTo: '', // Reset To date
          timeInput: '',
          textareaInput: '',
          selectInput: 'option1',
          checkboxInput: false,
          radioInput: 'radio1',
          fileInput: null,
        });
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage('Form submission failed! Please try again.');
      }
    } else {
      setSubmissionStatus('error');
      setSubmissionMessage('Please fix the errors in the form.');
    }
    setIsLoading(false);
  }, [validateForm]);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const radioOptions = [
    { value: 'radio1', label: 'Radio Button 1' },
    { value: 'radio2', label: 'Radio Button 2' },
    { value: 'radio3', label: 'Radio Button 3' },
  ];

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Form Testing Playground</h2>
      <p className="mb-8 text-gray-600">
        This section allows you to test various form elements, their states, and client-side validation.
        Focus on input fields, dropdowns, checkboxes, radio buttons, and file uploads.
      </p>

      {submissionStatus !== 'idle' && (
        <Alert
          type={submissionStatus === 'success' ? 'success' : 'error'}
          message={submissionMessage}
          onClose={() => setSubmissionStatus('idle')}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Textual Inputs</h3>
          <Input
            label="Text Input (Required)"
            type="text"
            name="textInput"
            value={formData.textInput}
            onChange={handleChange}
            placeholder="Enter text"
            error={formErrors.textInput}
            data-testid="text-input"
          />
          <Input
            label="Email Input (Required, Valid Format)"
            type="email"
            name="emailInput"
            value={formData.emailInput}
            onChange={handleChange}
            placeholder="your.email@example.com"
            error={formErrors.emailInput}
            data-testid="email-input"
          />
          <Input
            label="Password Input (Min 6 characters)"
            type="password"
            name="passwordInput"
            value={formData.passwordInput}
            onChange={handleChange}
            placeholder="Enter password"
            error={formErrors.passwordInput}
            data-testid="password-input"
          />
          <Input
            label="Number Input (Required)"
            type="number"
            name="numberInput"
            value={formData.numberInput}
            onChange={handleChange}
            placeholder="Enter a number"
            error={formErrors.numberInput}
            data-testid="number-input"
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Date & Time Pickers</h3>
          <DateRangePicker
            label="Date Range (From - To)"
            fromValue={formData.dateInput}
            toValue={formData.dateInputTo}
            onChange={handleDateRangeChange}
            error={formErrors.dateInputTo}
            data-testid="date-range-picker"
          />
          <Input
            label="Time Input"
            type="time"
            name="timeInput"
            value={formData.timeInput}
            onChange={handleChange}
            placeholder="hh:mm"
            data-testid="time-input"
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Text Area</h3>
          <TextArea
            label="Text Area (Required)"
            name="textareaInput"
            value={formData.textareaInput}
            onChange={handleChange}
            placeholder="Enter a detailed message"
            error={formErrors.textareaInput}
            data-testid="textarea-input"
          />
        </div>

        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Dropdown</h3>
          <Select
            label="Choose an Option"
            name="selectInput"
            options={selectOptions}
            value={formData.selectInput}
            onChange={handleChange}
            data-testid="select-input"
          />
        </div>

        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Checkbox</h3>
          <Checkbox
            label="Agree to Terms & Conditions"
            name="checkboxInput"
            checked={formData.checkboxInput}
            onChange={handleChange}
            data-testid="checkbox-input"
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Radio Buttons</h3>
          <RadioGroup
            label="Select a Choice"
            name="radioInput"
            options={radioOptions}
            selectedValue={formData.radioInput}
            onChange={handleRadioChange}
            data-testid="radio-group"
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">File Upload</h3>
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-1">
            Upload File (Required)
          </label>
          <input
            id="fileInput"
            type="file"
            name="fileInput"
            onChange={handleFileChange}
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.fileInput ? 'border-red-500' : ''}`}
            data-testid="file-input"
          />
          {formData.fileInput && (
            <p className="mt-2 text-sm text-gray-600">Selected file: {formData.fileInput.name}</p>
          )}
          {formErrors.fileInput && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.fileInput}</p>}
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} data-testid="submit-button">
            Submit Form
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FormsTestPage;