
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input'; // Added import for Input component

const ElementsTestPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);

  const triggerAlert = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000); // Auto-hide after 5 seconds
  }, []);

  const handleAsyncButtonClick = useCallback(() => {
    setIsButtonLoading(true);
    setTimeout(() => {
      triggerAlert('success', 'Asynchronous action completed!');
      setIsButtonLoading(false);
    }, 2000);
  }, [triggerAlert]);

  const handleConfirmAction = useCallback(() => {
    triggerAlert('success', 'Action confirmed successfully!');
    setIsConfirmationModalOpen(false);
  }, [triggerAlert]);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Interactive Elements Playground</h2>
      <p className="mb-8 text-gray-600">
        Test various UI elements including buttons, links, alerts, and modal dialogs.
        Pay attention to their states (hover, focus, disabled, loading) and interactions.
      </p>

      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          className="mb-6"
          data-testid="alert-message"
        />
      )}

      {/* Buttons Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Buttons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Button variant="primary" onClick={() => triggerAlert('info', 'Primary button clicked!')} data-testid="btn-primary">
          Primary Button
        </Button>
        <Button variant="secondary" onClick={() => triggerAlert('info', 'Secondary button clicked!')} data-testid="btn-secondary">
          Secondary Button
        </Button>
        <Button variant="danger" onClick={() => triggerAlert('error', 'Danger button clicked!')} data-testid="btn-danger">
          Danger Button
        </Button>
        <Button variant="outline" onClick={() => triggerAlert('info', 'Outline button clicked!')} data-testid="btn-outline">
          Outline Button
        </Button>
        <Button size="sm" onClick={() => triggerAlert('info', 'Small button clicked!')} data-testid="btn-sm">
          Small Button
        </Button>
        <Button size="lg" onClick={() => triggerAlert('info', 'Large button clicked!')} data-testid="btn-lg">
          Large Button
        </Button>
        <Button isLoading={true} data-testid="btn-loading">
          Loading Button
        </Button>
        <Button disabled={true} data-testid="btn-disabled">
          Disabled Button
        </Button>
        <Button isLoading={isButtonLoading} onClick={handleAsyncButtonClick} data-testid="btn-async">
          {isButtonLoading ? 'Processing...' : 'Async Action'}
        </Button>
        <Button disabled={isButtonDisabled} onClick={() => triggerAlert('info', 'Conditional disabled button clicked!')} data-testid="btn-conditional-disabled">
          Conditional Disabled
        </Button>
        <Checkbox
          label="Disable above button"
          checked={isButtonDisabled}
          onChange={(e) => setIsButtonDisabled(e.target.checked)}
          className="col-span-full md:col-span-1"
          data-testid="checkbox-disable-button"
        />
      </div>

      {/* Links Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Links</h3>
      <div className="flex flex-wrap gap-6 mb-8 items-center">
        <a href="#/internal-link" className="text-blue-600 hover:underline transition-colors duration-200" data-testid="link-internal">
          Internal Link
        </a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline transition-colors duration-200" data-testid="link-external">
          External Link (New Tab)
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); triggerAlert('info', 'JavaScript link clicked!'); }} className="text-green-600 hover:underline transition-colors duration-200" data-testid="link-js">
          JavaScript Link
        </a>
        <a href="#" className={`text-gray-500 ${isLinkDisabled ? 'pointer-events-none opacity-60' : 'hover:underline'}`} data-testid="link-conditional-disabled">
          Conditional Disabled Link
        </a>
        <Checkbox
          label="Disable above link"
          checked={isLinkDisabled}
          onChange={(e) => setIsLinkDisabled(e.target.checked)}
          data-testid="checkbox-disable-link"
        />
      </div>

      {/* Alerts Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Alerts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button onClick={() => triggerAlert('success', 'This is a success message!')} variant="primary" data-testid="btn-show-success-alert">
          Show Success Alert
        </Button>
        <Button onClick={() => triggerAlert('error', 'This is an error message!')} variant="danger" data-testid="btn-show-error-alert">
          Show Error Alert
        </Button>
        <Button onClick={() => triggerAlert('warning', 'This is a warning message!')} variant="secondary" data-testid="btn-show-warning-alert">
          Show Warning Alert
        </Button>
        <Button onClick={() => triggerAlert('info', 'This is an info message!')} variant="outline" data-testid="btn-show-info-alert">
          Show Info Alert
        </Button>
      </div>

      {/* Browser Alerts Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Browser Alerts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button
          onClick={() => window.alert('This is a simple browser alert!')}
          variant="primary"
          data-testid="btn-browser-alert"
        >
          Show Alert
        </Button>
        <Button
          onClick={() => {
            const result = window.confirm('Do you want to proceed?');
            triggerAlert(result ? 'success' : 'info', `You clicked: ${result ? 'OK' : 'Cancel'}`);
          }}
          variant="secondary"
          data-testid="btn-browser-confirm"
        >
          Show Confirm
        </Button>
        <Button
          onClick={() => {
            const result = window.prompt('Please enter your name:', 'John Doe');
            if (result !== null) {
              triggerAlert('success', `Hello, ${result}!`);
            } else {
              triggerAlert('info', 'Prompt cancelled');
            }
          }}
          variant="outline"
          data-testid="btn-browser-prompt"
        >
          Show Prompt
        </Button>
      </div>

      {/* Modals Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Modals</h3>
      <div className="flex flex-wrap gap-4 mb-8">
        <Button onClick={() => setIsModalOpen(true)} variant="primary" data-testid="btn-open-modal">
          Open Basic Modal
        </Button>
        <Button onClick={() => setIsConfirmationModalOpen(true)} variant="danger" data-testid="btn-open-confirm-modal">
          Open Confirmation Modal
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Basic Information Modal">
        <p className="mb-4" data-testid="modal-content-basic">
          This is a basic modal displaying some important information.
          You can interact with elements inside, or close it using the button or by clicking outside.
        </p>
        <Input label="Modal Input" type="text" placeholder="Type something..." data-testid="modal-input" />
      </Modal>

      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Confirm Your Action"
        primaryButtonText="Confirm"
        onPrimaryButtonClick={handleConfirmAction}
        secondaryButtonText="Cancel"
        onSecondaryButtonClick={() => setIsConfirmationModalOpen(false)}
      >
        <p className="mb-4" data-testid="modal-content-confirm">
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>
        <Checkbox label="I understand the risks" data-testid="modal-confirm-checkbox" />
      </Modal>

    </section>
  );
};

export default ElementsTestPage;