import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

interface LoginPageProps {
    onLogin: (email: string) => void;
    onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        let isValid = true;

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                // For demo purposes, any valid input logs in
                onLogin(email);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Left Branding Panel */}
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-800 text-white items-center justify-center p-12">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">QA Playground</h1>
                    <p className="text-lg text-gray-300">
                        Your all-in-one environment for practicing and mastering software quality assurance.
                    </p>
                    <div className="mt-8 w-32 h-1 bg-blue-500 mx-auto rounded"></div>

                    {/* Demo Account Info Moved to Left Panel */}
                    <div className="mt-10 p-6 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-left text-sm">
                        <p className="font-semibold text-gray-100 mb-2 text-center">For Demo & Testing Purposes</p>
                        <p className="text-gray-300 mb-4 text-center">
                            Click an email below to auto-fill the form.
                            <br />
                            (Any password with 6+ characters will work).
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-2">
                                <strong className="flex-shrink-0">Automation:</strong>
                                <button type="button" onClick={() => setEmail('AutomationTesting@carrer.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md text-left w-full transition-colors">AutomationTesting@carrer.com</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <strong className="flex-shrink-0">Manual Guide:</strong>
                                <button type="button" onClick={() => setEmail('ManualTesting@carrer.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md text-left w-full transition-colors">ManualTesting@carrer.com</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <strong className="flex-shrink-0">API Testing:</strong> <button type="button" onClick={() => setEmail('ApiTesting@carrer.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md text-left w-full transition-colors">ApiTesting@carrer.com</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-6 md:p-12 bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <div className="text-center mb-6">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
                        </div>
                        <p className="text-gray-500">to access the QA Playground</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            error={errors.email}
                            data-testid="login-email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: undefined });
                            }}
                            error={errors.password}
                            data-testid="login-password"
                        />

                        {errors.general && (
                            <div className="mb-4 text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                                {errors.general}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-6"
                            isLoading={isLoading}
                            data-testid="login-submit"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onNavigateToSignup}
                                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
                                data-testid="link-to-signup"
                            >
                                Create one for free
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
