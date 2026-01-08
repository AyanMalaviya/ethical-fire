import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateUserAttributes } from 'aws-amplify/auth';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../ui/Button';

interface OnboardingModalProps {
  onComplete: () => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { requestPermission } = useNotifications();

  async function handleNotificationStep() {
    setLoading(true);
    const result = await requestPermission();
    setLoading(false);
    
    if (result.success || result.error === 'Permission denied') {
      setStep(2); // Move to phone number step regardless
    }
  }

  async function handlePhoneStep() {
    setLoading(true);
    
    try {
      if (phoneNumber.trim()) {
        // Format phone number with +91 for India
        const formattedPhone = phoneNumber.startsWith('+91') 
          ? phoneNumber 
          : `+91${phoneNumber}`;

        await updateUserAttributes({
          userAttributes: {
            phone_number: formattedPhone,
          },
        });
      }
      
      // Save to localStorage that onboarding is complete
      localStorage.setItem('onboarding_completed', 'true');
      onComplete();
    } catch (error: any) {
      console.error('Error updating phone:', error);
      alert('Failed to save phone number: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSkip() {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-zinc-900 border-2 border-amber-600/50 rounded-2xl p-8 w-full max-w-md shadow-2xl"
        >
          {step === 1 ? (
            // Step 1: Notifications
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔔</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Stay Updated!
                </h2>
                <p className="text-gray-400 text-sm">
                  Enable notifications to never miss:
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: '🎮', text: 'New game slots' },
                  { icon: '💬', text: 'Chat messages' },
                  { icon: '⏰', text: 'Match reminders' },
                  { icon: '✅', text: 'Player updates' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleNotificationStep}
                  isLoading={loading}
                  className="w-full"
                >
                  Enable Notifications
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  variant="secondary"
                  className="w-full"
                >
                  Skip for now
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Phone Number
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📱</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Add Your Number
                </h2>
                <p className="text-gray-400 text-sm">
                  Get SMS notifications and enhance account security
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-400 mb-2">
                  Mobile Number (Optional)
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ Secure • ✓ Never shared • ✓ SMS alerts
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handlePhoneStep}
                  isLoading={loading}
                  disabled={phoneNumber.length !== 10 && phoneNumber.length !== 0}
                  className="w-full"
                >
                  {phoneNumber.length === 10 ? 'Save & Continue' : 'Continue'}
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="secondary"
                  className="w-full"
                >
                  Skip for now
                </Button>
              </div>
            </>
          )}

          {/* Progress Indicator */}
          <div className="flex gap-2 justify-center mt-6">
            <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-amber-500' : 'bg-gray-600'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-amber-500' : 'bg-gray-600'}`} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
