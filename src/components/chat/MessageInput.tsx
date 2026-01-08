import { useState, useEffect, type KeyboardEvent } from 'react';
import Button from '../ui/Button';

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showCooldownWarning, setShowCooldownWarning] = useState(false);

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    
    if (!message.trim() || sending || disabled) return;

    // Check cooldown - show warning but DON'T clear the message
    if (cooldown > 0) {
      setShowCooldownWarning(true);
      setTimeout(() => setShowCooldownWarning(false), 2000);
      return; // Exit without clearing message
    }

    setSending(true);
    await onSend(message);
    setMessage(''); // Only clear after successful send
    setSending(false);

    // Start 5-second cooldown
    setCooldown(5);
  }

  function handleKeyPress(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const canSend = !disabled && !sending && cooldown === 0 && message.trim().length > 0;

  return (
    <div>
      {/* Cooldown Warning */}
      {showCooldownWarning && (
        <div className="px-4 py-2 bg-amber-900/50 border-t border-amber-600/30 text-center animate-pulse">
          <p className="text-amber-300 text-sm font-medium">
            ⏳ Please wait {cooldown} second{cooldown !== 1 ? 's' : ''} before sending another message
          </p>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-zinc-900 border-t border-amber-600/30">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
            disabled={disabled || sending}
            maxLength={500}
            className="w-full px-4 py-3 pr-16 bg-zinc-800 border-2 border-amber-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            rows={2}
          />
          {/* Character Counter */}
          <div className={`absolute bottom-2 right-2 text-xs font-medium ${
            message.length > 450 ? 'text-amber-400' : 'text-gray-500'
          }`}>
            {message.length}/500
          </div>
        </div>
        
        <div className="flex flex-col justify-end">
          <Button
            type="submit"
            isLoading={sending}
            disabled={!canSend}
            className="px-6 py-3"
          >
            {cooldown > 0 ? (
              <span className="flex items-center gap-1">
                ⏱️ {cooldown}s
              </span>
            ) : (
              'Send'
            )}
          </Button>
          {cooldown > 0 && (
            <p className="text-xs text-amber-600 mt-1 text-center">Cooldown</p>
          )}
        </div>
      </form>
    </div>
  );
}
