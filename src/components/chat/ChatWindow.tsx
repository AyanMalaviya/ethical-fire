import { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Spinner from '../ui/Spinner';

interface ChatWindowProps {
  roomId?: string;
  currentUserId: string;
  currentUserName: string;
  isAdmin?: boolean;
}

export default function ChatWindow({ 
  roomId = 'global', 
  currentUserId,
  currentUserName,
  isAdmin = false 
}: ChatWindowProps) {
  const { messages, loading, sendMessage, deleteMessage } = useChat(roomId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function handleSendMessage(message: string) {
    const result = await sendMessage(message, currentUserId, currentUserName);
    if (!result.success) {
      alert('Failed to send message: ' + result.error);
    }
  }

  async function handleDeleteMessage(messageId: string) {
    if (!confirm('Delete this message?')) return;
    
    const result = await deleteMessage(messageId);
    if (!result.success) {
      alert('Failed to delete message: ' + result.error);
    }
  }

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
            <p className="text-gray-400 text-sm">Be the first to start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwnMessage={msg.senderId === currentUserId}
                isAdmin={isAdmin}
                onDelete={
                  (msg.senderId === currentUserId || isAdmin)
                    ? () => handleDeleteMessage(msg.id)
                    : undefined
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
