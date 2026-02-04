import React, { useState, useEffect } from 'react';
import { SEO } from './SEO';
import { Button } from './Button';
import { AuthManager } from '../utils/authManager';
import { Shield, Eye, EyeOff, AlertTriangle, Lock } from 'lucide-react';

interface AffiliateLoginProps {
  onLogin: () => void;
}

export const AffiliateLogin: React.FC<AffiliateLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Security: Check if user is temporarily blocked
  useEffect(() => {
    const checkBlockStatus = () => {
      const blockStatus = AuthManager.getBlockStatus();
      setIsBlocked(blockStatus.isBlocked);
      setBlockTimeLeft(blockStatus.timeLeft);
      setAttempts(blockStatus.attempts);
    };

    checkBlockStatus();
    const interval = setInterval(checkBlockStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError(`Access blocked. Try again in ${Math.ceil(blockTimeLeft / 60)} minutes.`);
      return;
    }

    setIsLoading(true);
    setError('');

    // Security: Add artificial delay to prevent brute force
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Use AuthManager for authentication
    const authResult = AuthManager.authenticate(password);

    if (authResult.success) {
      setPassword('');
      setAttempts(0);
      onLogin();
    } else {
      setError(authResult.error || 'Authentication failed');
      // Update local state with new attempt count
      const blockStatus = AuthManager.getBlockStatus();
      setAttempts(blockStatus.attempts);
      setIsBlocked(blockStatus.isBlocked);
    }

    setIsLoading(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Affiliate Dashboard Login - Dr. Oz Health Facts"
        description="Secure login to affiliate management dashboard"
        canonicalUrl="https://drozhealthfacts.com/affiliate"
      />

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Affiliate Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Secure access to affiliate link management
          </p>
        </div>

        {/* Security Warning for Blocked Users */}
        {isBlocked && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Access Temporarily Blocked
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Too many failed login attempts. Please wait {formatTime(blockTimeLeft)} before trying again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBlocked || isLoading}
                className="appearance-none relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter affiliate dashboard password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isBlocked || isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-300 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Attempt Counter */}
          {attempts > 0 && !isBlocked && (
            <div className="text-center">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Failed attempts: {attempts}/5
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={isBlocked || isLoading || !password.trim()}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Access Dashboard
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Security Features Active
              </h3>
              <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                <li>• Rate limiting: 5 attempts per 15 minutes</li>
                <li>• Session timeout: 2 hours</li>
                <li>• Secure password hashing</li>
                <li>• Brute force protection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Unauthorized access is prohibited and monitored
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLogin;