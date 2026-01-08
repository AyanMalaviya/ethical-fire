import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export function useChat(roomId: string = 'global') {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [roomId]);

  function subscribeToMessages() {
    const subscription = client.models.ChatMessage.observeQuery({
      filter: { roomId: { eq: roomId } },
    }).subscribe({
      next: ({ items }) => {
        const sortedMessages = [...items].sort(
          (a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
        );
        setMessages(sortedMessages);
        setLoading(false);
      },
      error: (err) => {
        console.error('Subscription error:', err);
        setError(err.message);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }

  async function fetchMessages() {
    try {
      setLoading(true);
      const { data, errors } = await client.models.ChatMessage.list({
        filter: { roomId: { eq: roomId } },
      });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      const sortedMessages = (data || []).sort(
        (a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
      );

      setMessages(sortedMessages);
      setError(null);
    } catch (err: any) {
      console.error('Fetch messages error:', err);
      setError(err.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(message: string, senderId: string, senderName: string) {
    try {
      if (!message.trim()) {
        return { success: false, error: 'Message cannot be empty' };
      }

      if (message.length > 500) {
        return { success: false, error: 'Message too long (max 500 characters)' };
      }

      const messageData = {
        roomId,
        senderId,
        senderName,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      const { data, errors } = await client.models.ChatMessage.create(messageData);

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      return { success: true, data };
    } catch (err: any) {
      console.error('Send message error:', err);
      return { success: false, error: err.message || 'Failed to send message' };
    }
  }

  async function deleteMessage(messageId: string) {
    try {
      const { data, errors } = await client.models.ChatMessage.delete({ id: messageId });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      return { success: true, data };
    } catch (err: any) {
      console.error('Delete message error:', err);
      return { success: false, error: err.message || 'Failed to delete message' };
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    deleteMessage,
    refreshMessages: fetchMessages,
  };
}
