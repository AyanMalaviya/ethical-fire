import { useState } from 'react';
import { signIn, signUp, confirmSignUp } from 'aws-amplify/auth';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface PhoneLoginProps {
  onSuccess: () => void;
}

export default function PhoneLogin({ onSuccess }: PhoneLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            preferred_username: displayName,
          },
        },
      });

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setNeedsConfirmation(true);
        setError('');
      } else if (nextStep.signUpStep === 'DONE') {
        await signIn({ username: email, password });
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      await signIn({ username: email, password });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({
        username: email,
        password: password,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  // Verification Screen
  if (needsConfirmation) {
    return (
      <form onSubmit={handleConfirmSignUp} className="space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
            <span className="text-3xl">📧</span>
          </div>
          <h1 className="text-2xl font-bold text-amber-400">
            Verify Your Email
          </h1>
          <p className="text-amber-200 mt-2 text-sm">
            We sent a verification code to <strong>{email}</strong>
          </p>
        </div>

        <Input
          type="text"
          placeholder="123456"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          error={error}
          className="bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700"
          required
        />

        <Button type="submit" isLoading={loading} className="w-full">
          Verify Email
        </Button>

        <button
          type="button"
          onClick={() => setNeedsConfirmation(false)}
          className="w-full text-amber-400 hover:text-amber-300 text-sm underline"
        >
          Back to Sign Up
        </button>
      </form>
    );
  }

  // Sign In / Sign Up Screen
  return (
    <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
    {/* Logo/Title - UPDATE THIS SECTION */}
        <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-600 shadow-xl shadow-amber-500/50">
            <img 
            src="/EF.jpg" 
            alt="EthicalFire Logo" 
            className="w-full h-full object-cover"
            />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            EthicalFire
        </h1>
        <p className="text-amber-200 mt-2">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
        </p>
        </div>


      {/* Display Name (Sign Up Only) */}
      {isSignUp && (
        <div>
          <label className="block text-sm font-medium text-amber-400 mb-2">
            Display Name
          </label>
          <Input
            type="text"
            placeholder="GamerName123"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700"
            required
          />
        </div>
      )}

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-amber-400 mb-2">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-amber-400 mb-2">
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700"
          required
        />
        {isSignUp && (
          <p className="text-xs text-amber-700 mt-1">Minimum 8 characters</p>
        )}
      </div>

      {/* Confirm Password (Sign Up Only) */}
      {isSignUp && (
        <div>
          <label className="block text-sm font-medium text-amber-400 mb-2">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700"
            required
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" isLoading={loading} className="w-full">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </Button>

      {/* Toggle Sign Up/Sign In */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
            setPassword('');
            setConfirmPassword('');
          }}
          className="text-amber-400 hover:text-amber-300 text-sm font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-xs text-amber-700 text-center mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
