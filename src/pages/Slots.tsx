import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useSlots } from '../hooks/useSlots';
import CreateSlot from '../components/slots/CreateSlot';
import SlotCard from '../components/slots/SlotCard';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Slots() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const [selectedGame] = useState('BGMI');
  const { slots, loading: slotsLoading, createSlot, joinSlot, leaveSlot } = useSlots(selectedGame);
  const [hasCreatedSlot, setHasCreatedSlot] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user && slots) {
      const userSlot = slots.find(slot => slot.creatorId === user.userId);
      setHasCreatedSlot(!!userSlot);
    }
  }, [slots, user]);

  async function handleCreateSlot(slotData: { startTime: string; description: string }) {
    if (!user) {
      alert('You must be logged in to create a slot');
      return;
    }

    setActionLoading('create');

    const userName = user.signInDetails?.loginId?.split('@')[0] || 
                    user.username || 
                    'User';

    const result = await createSlot({
      gameName: selectedGame,
      startTime: slotData.startTime,
      description: slotData.description,
      creatorId: user.userId,
      creatorName: userName,
    });

    setActionLoading(null);

    if (!result.success) {
      alert('Failed to create slot: ' + result.error);
    }
  }

  async function handleJoinSlot(slotId: string) {
    if (!user) return;
    
    setActionLoading(slotId);
    const userName = user.signInDetails?.loginId?.split('@')[0] || 
                    user.username || 
                    'User';
    
    const result = await joinSlot(slotId, user.userId, userName);
    setActionLoading(null);

    if (!result.success) {
      alert('Failed to join: ' + result.error);
    } else if (result.message) {
      alert(result.message);
    }
  }

  async function handleLeaveSlot(slotId: string) {
    if (!user) return;
    
    const slot = slots.find(s => s.id === slotId);
    const isCreator = slot?.creatorId === user.userId;
    
    // Confirm if creator is leaving
    if (isCreator) {
      const playersCount = (slot?.players || []).length;
      if (playersCount > 1) {
        if (!confirm('You are the host. Leaving will transfer host to another player. Continue?')) {
          return;
        }
      }
    }
    
    setActionLoading(slotId);
    const result = await leaveSlot(slotId, user.userId);
    setActionLoading(null);

    if (!result.success) {
      alert('Failed to leave: ' + result.error);
    } else if (result.message) {
      alert(result.message);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-amber-600/30 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30 shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/EF.jpg" 
                alt="EthicalFire" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-600 shadow-lg shadow-amber-500/30"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  EthicalFire
                </h1>
                <p className="text-xs text-gray-400">{selectedGame} Slots</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                onClick={() => navigate('/chat')}
                variant="secondary"
                className="text-sm"
                >
                💬 Chat
                </Button>
                <Button
                onClick={handleSignOut}
                variant="secondary"
                className="text-sm"
                >
                Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Create Slot Section */}
        <div className="mb-8">
          <CreateSlot 
            onCreate={handleCreateSlot}
            gameName={selectedGame}
            hasCreatedSlot={hasCreatedSlot}
            loading={actionLoading === 'create'}
          />
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Active Slots
            </h2>
            <p className="text-gray-400 text-sm">
              {slotsLoading ? 'Loading...' : `${slots.length} slot${slots.length !== 1 ? 's' : ''} available`}
            </p>
          </div>
          {slotsLoading && (
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Slots Grid */}
        {slotsLoading && slots.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        ) : slots.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border-2 border-amber-600/30 rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Active Slots</h3>
            <p className="text-gray-400 mb-6">Be the first to create a slot and start playing!</p>
            <div className="flex items-center justify-center gap-2 text-sm text-amber-500">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Waiting for players...</span>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {slots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  currentUserId={user?.userId || ''}
                  onJoin={() => handleJoinSlot(slot.id)}
                  onLeave={() => handleLeaveSlot(slot.id)}
                  isCreator={slot.creatorId === user?.userId}
                  loading={actionLoading === slot.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-zinc-900/50 border border-amber-600/20 rounded-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-400">{slots.length}</div>
              <div className="text-sm text-gray-400">Active Slots</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">4</div>
              <div className="text-sm text-gray-400">Max Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">∞</div>
              <div className="text-sm text-gray-400">Waiting Queue</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
