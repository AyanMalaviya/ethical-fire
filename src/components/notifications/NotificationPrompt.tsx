import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../ui/Button';
import { useState } from 'react';

interface NotificationPromptProps {
  onClose: () => void;
}

export default function NotificationPrompt({ onClose }: NotificationPromptProps) {
  const { permission, supported, requestPermission, sendTestNotification } = useNotifications();
  const [requesting, setRequesting] = useState(false);

  async function handleEnable() {
    setRequesting(true);
    const result = await requestPermission();
    setRequesting(false);

    if (result.success) {
      await sendTestNotification();
      setTimeout(onClose, 2000);
    } else {
      alert('Failed to enable notifications: ' + result.error);
    }
  }

  if (!supported) {
    return null;
  }

  if (permission === 'granted') {
    return null;
  }

  if (permission === 'denied') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 bg-zinc-900 border-2 border-red-600/50 rounded-xl p-6 shadow-2xl z-50"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🔕</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Notifications Blocked
            </h3>
            <p className="text-sm text-gray-400">
              Please enable notifications in your browser settings to receive slot alerts.
            </p>
          </div>
          <Button onClick={onClose} variant="secondary" className="w-full">
            Dismiss
          </Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 bg-zinc-900 border-2 border-amber-600/50 rounded-xl p-6 shadow-2xl z-50"
      >
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🔔</div>
          <h3 className="text-lg font-bold text-white mb-2">
            Enable Notifications?
          </h3>
          <p className="text-sm text-gray-400">
            Get notified when:
          </p>
          <ul className="text-xs text-gray-400 mt-2 space-y-1 text-left">
            <li>• New slots are created</li>
            <li>• Your slot is starting soon</li>
            <li>• A waiting queue spot opens</li>
            <li>• Someone joins your slot</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Not Now
          </Button>
          <Button
            onClick={handleEnable}
            isLoading={requesting}
            className="flex-1"
          >
            Enable
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
