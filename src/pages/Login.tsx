import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn({ username: email, password });
      navigate('/game-selection');
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.name === 'UserNotConfirmedException') {
        setNeedsConfirmation(true);
        setError('Please verify your email first');
      } else {
        setError(err.message || 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      setNeedsConfirmation(true);
      setError('');
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await confirmSignUp({ username: email, confirmationCode });
      await signIn({ username: email, password });
      navigate('/game-selection');
    } catch (err: any) {
      console.error('Confirmation error:', err);
      setError(err.message || 'Failed to confirm code');
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode() {
    setLoading(true);
    setError('');

    try {
      await resendSignUpCode({ username: email });
      alert('Verification code resent to your email');
    } catch (err: any) {
      console.error('Resend code error:', err);
      setError(err.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  }

  if (needsConfirmation) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-zinc-900 border-2 border-amber-600 rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
            <p className="text-gray-400 text-sm">
              Enter the code sent to <strong className="text-amber-400">{email}</strong>
            </p>
          </div>

          <form onSubmit={handleConfirmSignUp} className="space-y-4">
            {error && (
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <Button type="submit" isLoading={loading} className="w-full">
              Verify & Continue
            </Button>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="w-full text-amber-400 text-sm underline hover:text-amber-300 transition-colors"
            >
              Resend Code
            </button>

            <button
              type="button"
              onClick={() => {
                setNeedsConfirmation(false);
                setConfirmationCode('');
                setError('');
              }}
              className="w-full text-gray-400 text-sm hover:text-gray-300 transition-colors"
            >
              ← Back to Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/EF.jpg" 
            alt="EthicalFire" 
            className="w-24 h-24 mx-auto rounded-full border-4 border-amber-600 shadow-2xl shadow-amber-500/50 mb-4"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
            EthicalFire
          </h1>
          <p className="text-gray-400">Gaming Community Platform</p>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-zinc-900 border-2 border-amber-600 rounded-2xl p-8 shadow-2xl">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                !isSignUp
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                  : 'bg-zinc-800 text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                isSignUp
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                  : 'bg-zinc-800 text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {error && (
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'Min 8 characters' : 'Enter password'}
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
                minLength={8}
              />
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              )}
            </div>

            <Button type="submit" isLoading={loading} className="w-full">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {isSignUp
            ? 'By signing up, you agree to our Terms & Privacy Policy'
            : 'Secure authentication powered by AWS Cognito'}
        </p>
      </motion.div>
    </div>
  );
}
