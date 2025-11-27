import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast from '../components/Toast';

interface LoginPageProps {
    onLogin: (email: string) => void;
    onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
        show: false,
        message: '',
        type: 'success',
    });

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
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            const missing: string[] = [];
            if (!/[A-Z]/.test(password)) missing.push('uppercase letter');
            if (!/[a-z]/.test(password)) missing.push('lowercase letter');
            if (!/[0-9]/.test(password)) missing.push('number');
            if (!/[!@#$%^&*]/.test(password)) missing.push('special character');

            if (missing.length > 0) {
                if (missing.length === 1) {
                    newErrors.password = `Password must contain at least one ${missing[0]}`;
                } else {
                    const last = missing.pop();
                    newErrors.password = `Password must contain ${missing.join(', ')} and ${last}`;
                }
                isValid = false;
            }
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

                // Simulate login failure for specific email
                if (email === 'fail@error.com') {
                    setToast({ show: true, message: 'Login failed: Invalid credentials. Please try again.', type: 'error' });
                    return;
                }

                // Success case
                setToast({ show: true, message: 'Login successful! Redirecting...', type: 'success' });

                // Delay navigation to show toast
                setTimeout(() => {
                    onLogin(email);
                }, 1500);
            }, 1000);
        } else {
            setToast({ show: true, message: 'Please check the form for errors.', type: 'error' });
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
                            (Password must be 8+ chars with uppercase, lowercase, number & special char).
                        </p>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-semibold mb-2 border-b border-gray-700 pb-1">Email Test Cases</p>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Valid:</span>
                                        <button type="button" onClick={() => setEmail('AutomationTesting@carrer.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs" title="AutomationTesting@carrer.com">AutomationTesting@carrer.com</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without @:</span>
                                        <button type="button" onClick={() => setEmail('AutomationTest.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs" title="AutomationTest.com">AutomationTest.com</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without Domain:</span>
                                        <button type="button" onClick={() => setEmail('AutomationTesting@')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs" title="AutomationTesting@">AutomationTesting@</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Blank Email:</span>
                                        <button type="button" onClick={() => setEmail(' ')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs italic text-gray-500">(space)</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs text-red-400">Login Failure:</span>
                                        <button type="button" onClick={() => setEmail('fail@error.com')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs text-red-300" title="fail@error.com">fail@error.com</button>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase font-semibold mb-2 border-b border-gray-700 pb-1">Password Test Cases</p>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Valid:</span>
                                        <button type="button" onClick={() => setPassword('StrongP@ss1')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">StrongP@ss1</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without Numbers:</span>
                                        <button type="button" onClick={() => setPassword('NoNumbers!')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">NoNumbers!</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Only Low Caps:</span>
                                        <button type="button" onClick={() => setPassword('onlylowercase')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">onlylowercase</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Only Capital Caps:</span>
                                        <button type="button" onClick={() => setPassword('ONLYUPPERCASE')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">ONLYUPPERCASE</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Only Numbers:</span>
                                        <button type="button" onClick={() => setPassword('12345678')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">12345678</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without Alphabets:</span>
                                        <button type="button" onClick={() => setPassword('123456!@#')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">123456!@#</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without Lower Caps:</span>
                                        <button type="button" onClick={() => setPassword('UPPER123!')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">UPPER123!</button>
                                    </li>
                                    <li className="grid grid-cols-[110px_1fr] gap-2 items-center">
                                        <span className="text-gray-400 text-xs">Without Capital Caps:</span>
                                        <button type="button" onClick={() => setPassword('lower123!')} className="font-mono bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-left truncate transition-colors text-xs">lower123!</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default LoginPage;
