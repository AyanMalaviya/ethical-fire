import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

interface CreateSlotProps {
  onCreate: (slotData: { startTime: string; description: string }) => Promise<void>;
  gameName: string;
  hasCreatedSlot: boolean;
  loading: boolean;
}

export default function CreateSlot({ onCreate, gameName, hasCreatedSlot, loading }: CreateSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Get minimum datetime (current time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onCreate({
        startTime,
        description,
      });
      
      // Reset form
      setStartTime('');
      setDescription('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating slot:', error);
    } finally {
      setSubmitting(false);
    }
  }

  if (hasCreatedSlot) {
    return (
      <div className="bg-zinc-900 border-2 border-amber-600/30 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-amber-400 font-bold text-lg mb-2">Slot Limit Reached</h3>
        <p className="text-gray-400 text-sm">
          You can only create 1 active slot at a time. Leave your existing slot to create a new one.
        </p>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        disabled={loading}
        className="w-full text-lg py-5 shadow-lg hover:shadow-amber-500/50"
      >
        ➕ Create New Slot
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-zinc-900 border-2 border-amber-600/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <h2 className="text-2xl font-bold text-amber-400">
                    Create {gameName} Slot
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Set up a new match and invite players
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Start Time */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-400 mb-2">
                      Match Start Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      min={getMinDateTime()}
                      className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Select when you want to start playing
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-400 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., Ranked match, mic required, squad push"
                      maxLength={200}
                      className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {description.length}/200 characters
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsOpen(false)}
                      disabled={submitting}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={submitting}
                      className="flex-1"
                    >
                      Create Slot
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
