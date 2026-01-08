import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CreateSlotProps {
  onCreate: (slotData: any) => Promise<void>;
  gameName: string;
  hasCreatedSlot: boolean;
}

export default function CreateSlot({ onCreate, gameName, hasCreatedSlot }: CreateSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await onCreate({
      startTime,
      description,
    });

    setLoading(false);
    setIsOpen(false);
    setStartTime('');
    setDescription('');
  }

  if (hasCreatedSlot) {
    return (
      <div className="bg-zinc-900 border border-amber-600/30 rounded-xl p-6 text-center">
        <p className="text-amber-400 mb-2">⚠️ Slot Limit Reached</p>
        <p className="text-gray-400 text-sm">
          You can only create 1 slot at a time. Delete your existing slot to create a new one.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 rounded-xl transition-all"
      >
        + Create New Slot
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-zinc-900 border-2 border-amber-600/50 rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-amber-400 mb-6">
                  Create {gameName} Slot
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-400 mb-2">
                      Match Start Time
                    </label>
                    <Input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="bg-zinc-800 border-amber-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-400 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., Ranked match, mic required"
                      className="w-full px-4 py-3 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={loading}
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
