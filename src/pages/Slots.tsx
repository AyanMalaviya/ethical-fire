import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSlots } from '../hooks/useSlots';
import CreateSlot from '../components/slots/CreateSlot';
import SlotCard from '../components/slots/SlotCard';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Slots() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [selectedGame] = useState('BGMI'); // TODO: Get from user profile
  const { slots, loading, createSlot, joinSlot, leaveSlot, deleteSlot } = useSlots(selectedGame);
  const [hasCreatedSlot, setHasCreatedSlot] = useState(false);

  useEffect(() => {
    if (user && slots) {
      const userSlot = slots.find(slot => slot.creatorId === user.userId);
      setHasCreatedSlot(!!userSlot);
    }
  }, [slots, user]);

  async function handleCreateSlot(slotData: any) {
    if (!user) return;

    const result = await createSlot({
      ...slotData,
      gameName: selectedGame,
      gameId: '1',
      creatorId: user.userId,
      creatorName: user.signInDetails?.loginId || 'User',
      status: 'ACTIVE',
      players: [user.userId],
      playerNames: [user.signInDetails?.loginId || 'User'],
      maxPlayers: 4,
    });

    if (!result.success) {
      alert(result.error);
    }
  }

  async function handleJoinSlot(slotId: string) {
    if (!user) return;
    const result = await joinSlot(slotId, user.userId, user.signInDetails?.loginId || 'User');
    if (!result.success) {
      alert(result.error);
    }
  }

  async function handleLeaveSlot(slotId: string) {
    if (!user) return;
    const result = await leaveSlot(slotId, user.userId);
    if (!result.success) {
      alert(result.error);
    }
  }

  async function handleDeleteSlot(slotId: string) {
    if (confirm('Are you sure you want to delete this slot?')) {
      const result = await deleteSlot(slotId);
      if (!result.success) {
        alert(result.error);
      }
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-amber-600/30 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/EF.jpg" 
                alt="EthicalFire" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-600"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-amber-400">
                  EthicalFire
                </h1>
                <p className="text-xs text-gray-400">{selectedGame} Slots</p>
              </div>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="text-sm">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Create Slot Section */}
        <div className="mb-8">
          <CreateSlot 
            onCreate={handleCreateSlot}
            gameName={selectedGame}
            hasCreatedSlot={hasCreatedSlot}
          />
        </div>

        {/* Slots List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Active Slots ({slots.length})
          </h2>
        </div>

        {slots.length === 0 ? (
          <div className="bg-zinc-900 border border-amber-600/30 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Slots</h3>
            <p className="text-gray-400">Be the first to create a slot!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                currentUserId={user?.userId || ''}
                onJoin={() => handleJoinSlot(slot.id)}
                onLeave={() => handleLeaveSlot(slot.id)}
                onDelete={() => handleDeleteSlot(slot.id)}
                isCreator={slot.creatorId === user?.userId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
