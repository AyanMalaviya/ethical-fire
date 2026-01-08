import { formatTime } from '../../lib/utils';

interface MessageBubbleProps {
  message: any;
  isOwnMessage: boolean;
  isAdmin?: boolean;
  onDelete?: () => void;
}

export default function MessageBubble({ 
  message, 
  isOwnMessage, 
  isAdmin = false,
  onDelete 
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Sender Name */}
        {!isOwnMessage && (
          <div className="text-xs text-amber-400 font-medium mb-1 px-2">
            {message.senderName}
          </div>
        )}

        <div className="relative">
          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isOwnMessage
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-br-none'
                : 'bg-zinc-800 text-white border border-amber-600/30 rounded-bl-none'
            }`}
          >
            <p className="text-sm break-words whitespace-pre-wrap">
              {message.message}
            </p>
          </div>

          {/* Delete Button (for admins or own messages) */}
          {(isOwnMessage || isAdmin) && onDelete && (
            <button
              onClick={onDelete}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete message"
            >
              ×
            </button>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 px-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {formatTime(message.createdAt || new Date().toISOString())}
        </div>
      </div>
    </div>
  );
}
