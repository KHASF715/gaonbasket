'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequest } from '@/types';
import { APP_NAME } from '@/utils/constants';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    const success = await login(formData);
    if (!success && error) {
      setFormError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">{APP_NAME}</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Welcome back!</p>
        </div>

        {/* Login Card */}
        <div className="card-custom">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {formError && (
              <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 rounded-lg text-sm">
                {formError}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login (Placeholder) */}
            <button
              type="button"
              className="w-full button-secondary py-2 text-sm"
            >
              📱 Continue with Phone
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold">
              Sign up
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-xs text-neutral-500 dark:text-neutral-400">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>

        {/* Test Credentials Info */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-sm text-blue-900 dark:text-blue-200">
          <p className="font-semibold mb-2">🧪 Test Credentials:</p>
          <p>Admin: admin@gaonbasket.com / Admin@123</p>
          <p>Customer: customer@gaonbasket.com / Customer@123</p>
        </div>
      </div>
    </div>
  );
}
