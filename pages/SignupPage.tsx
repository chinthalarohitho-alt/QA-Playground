import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

interface SignupPageProps {
    onSignup: (email: string) => void;
    onNavigateToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
        let isValid = true;

        // Name validation
        if (!name.trim()) {
            newErrors.name = 'Full Name is required';
            isValid = false;
        }

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
            newErrors.password = 'Password must be at least 8 characters long.';
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = 'Password must contain at least one lowercase letter.';
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter.';
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Password must contain at least one number.';
            isValid = false;
        }

        // Confirm Password validation
        if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
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
                // For demo purposes, successful signup logs the user in
                onSignup(email);
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join us to start your QA journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        error={errors.name}
                        data-testid="signup-name"
                    />

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
                        data-testid="signup-email"
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
                        helperText={(
                            <ul className="text-xs text-gray-500 list-disc list-inside mt-1">
                                <li>At least 8 characters</li>
                                <li>One uppercase & one lowercase letter</li>
                                <li>One number</li>
                            </ul>
                        )}
                        error={errors.password}
                        data-testid="signup-password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                        }}
                        error={errors.confirmPassword}
                        data-testid="signup-confirm-password"
                    />

                    {errors.general && (
                        <div className="mb-4 text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                            {errors.general}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-4"
                        isLoading={isLoading}
                        data-testid="signup-submit"
                    >
                        Sign Up
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Already have an account?{' '}
                        <button
                            onClick={onNavigateToLogin}
                            className="text-blue-600 hover:underline focus:outline-none font-medium"
                            data-testid="link-to-login"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
