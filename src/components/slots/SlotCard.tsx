import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { formatTime } from '../../lib/utils';

interface SlotCardProps {
  slot: any;
  currentUserId: string;
  onJoin: () => void;
  onLeave: () => void;
  onDelete?: () => void;
  isCreator: boolean;
}

export default function SlotCard({ 
  slot, 
  currentUserId, 
  onJoin, 
  onLeave, 
  onDelete,
  isCreator 
}: SlotCardProps) {
  const players = slot.players || [];
  const playerNames = slot.playerNames || [];
  const isJoined = players.includes(currentUserId);
  const isFull = players.length >= slot.maxPlayers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-amber-600/30 rounded-xl p-6 hover:border-amber-500/50 transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {slot.gameName} Match
          </h3>
          <p className="text-amber-400 text-sm">
            🕐 {formatTime(slot.startTime)}
          </p>
        </div>
        {isCreator && (
          <span className="px-3 py-1 bg-amber-600 text-black text-xs font-bold rounded-full">
            YOUR SLOT
          </span>
        )}
      </div>

      {/* Description */}
      {slot.description && (
        <p className="text-gray-400 text-sm mb-4">{slot.description}</p>
      )}

      {/* Players */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-medium">Players:</span>
          <span className={`text-sm ${isFull ? 'text-red-400' : 'text-green-400'}`}>
            {players.length}/{slot.maxPlayers}
          </span>
        </div>
        <div className="space-y-1">
          {playerNames.map((name: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-gray-300">{name}</span>
              {players[index] === slot.creatorId && (
                <span className="text-xs text-amber-600">(Host)</span>
              )}
            </div>
          ))}
          {Array.from({ length: slot.maxPlayers - players.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-gray-600 rounded-full" />
              <span className="text-gray-600">Empty slot</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isCreator ? (
          <Button 
            variant="danger" 
            onClick={onDelete}
            className="flex-1"
          >
            Delete Slot
          </Button>
        ) : isJoined ? (
          <Button 
            variant="secondary" 
            onClick={onLeave}
            className="flex-1"
          >
            Leave
          </Button>
        ) : (
          <Button 
            onClick={onJoin}
            disabled={isFull}
            className="flex-1"
          >
            {isFull ? 'Full' : 'Join'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
