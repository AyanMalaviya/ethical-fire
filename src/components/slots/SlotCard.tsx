import { motion } from 'framer-motion';
import { formatTime, formatDate } from '../../lib/utils';
import Button from '../ui/Button';
import type { Slot } from '../../types';

interface SlotCardProps {
  slot: Slot;
  currentUserId: string;
  onJoin: () => Promise<void>;
  onLeave: () => Promise<void>;
  isCreator: boolean;
  loading?: boolean;
}

export default function SlotCard({ 
  slot, 
  currentUserId, 
  onJoin, 
  onLeave, 
  isCreator,
  loading = false
}: SlotCardProps) {
  const players = slot.players || [];
  const playerNames = slot.playerNames || [];
  const waitingQueue = slot.waitingQueue || [];
  const waitingQueueNames = slot.waitingQueueNames || [];
  const isJoined = players.includes(currentUserId);
  const isInWaitingQueue = waitingQueue.includes(currentUserId);
  const isFull = players.length >= (slot.maxPlayers || 4);
  const maxPlayers = slot.maxPlayers || 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-zinc-900 border-2 border-amber-600/30 rounded-xl p-6 hover:border-amber-500/50 transition-all shadow-lg hover:shadow-amber-500/20"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-white">
              {slot.gameName} Match
            </h3>
            {isCreator && (
              <span className="px-2 py-1 bg-amber-600 text-black text-xs font-bold rounded">
                HOST
              </span>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-amber-400 text-sm flex items-center gap-2">
              <span>📅</span>
              <span>{formatDate(slot.startTime)}</span>
            </p>
            <p className="text-amber-400 text-sm flex items-center gap-2">
              <span>🕐</span>
              <span>{formatTime(slot.startTime)}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isFull ? 'text-red-400' : 'text-green-400'}`}>
            {players.length}/{maxPlayers}
          </div>
          <div className="text-xs text-gray-400">Players</div>
        </div>
      </div>

      {/* Description */}
      {slot.description && (
        <div className="mb-4 p-3 bg-zinc-800/50 rounded-lg border border-amber-600/20">
          <p className="text-gray-300 text-sm">{slot.description}</p>
        </div>
      )}

      {/* Players List */}
      <div className="mb-4">
        <div className="text-sm font-semibold text-amber-400 mb-2">Players:</div>
        <div className="space-y-2">
          {playerNames.map((name, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 text-sm bg-zinc-800/50 px-3 py-2 rounded"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">{name}</span>
              {players[index] === slot.creatorId && (
                <span className="ml-auto text-xs text-amber-500 font-semibold">👑 Host</span>
              )}
              {players[index] === currentUserId && (
                <span className="ml-auto text-xs text-blue-400 font-semibold">You</span>
              )}
            </div>
          ))}
          {Array.from({ length: maxPlayers - players.length }).map((_, i) => (
            <div 
              key={`empty-${i}`} 
              className="flex items-center gap-2 text-sm bg-zinc-800/30 px-3 py-2 rounded opacity-50"
            >
              <span className="w-2 h-2 bg-gray-600 rounded-full" />
              <span className="text-gray-500">Empty slot</span>
            </div>
          ))}
        </div>
      </div>

      {/* Waiting Queue */}
      {waitingQueue.length > 0 && (
        <div className="mb-4 p-3 bg-amber-900/20 border border-amber-600/30 rounded-lg">
          <div className="text-sm font-semibold text-amber-400 mb-2">
            ⏳ Waiting Queue ({waitingQueue.length}):
          </div>
          <div className="space-y-1">
            {waitingQueueNames.map((name, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-amber-200">
                <span>{index + 1}.</span>
                <span>{name}</span>
                {waitingQueue[index] === currentUserId && (
                  <span className="ml-auto text-xs text-blue-400 font-semibold">You</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        {isJoined ? (
          <Button
            onClick={onLeave}
            variant="secondary"
            isLoading={loading}
            className="flex-1"
          >
            {isCreator ? '👑 Leave (Transfer Host)' : '← Leave'}
          </Button>
        ) : isInWaitingQueue ? (
          <Button
            onClick={onLeave}
            variant="secondary"
            isLoading={loading}
            className="flex-1 bg-amber-900/50 hover:bg-amber-900/70 text-amber-300 border-amber-600"
          >
            Leave Queue
          </Button>
        ) : (
          <Button
            onClick={onJoin}
            isLoading={loading}
            className="flex-1"
          >
            {isFull ? '⏳ Join Queue' : '✓ Join Slot'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
