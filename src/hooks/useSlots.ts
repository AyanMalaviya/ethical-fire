import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export function useSlots(gameName?: string) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlots();
    
    // Subscribe to real-time updates
    const subscription = client.models.Slot.observeQuery().subscribe({
      next: ({ items }) => {
        const filtered = gameName 
          ? items.filter(slot => slot.gameName === gameName && slot.status === 'ACTIVE')
          : items.filter(slot => slot.status === 'ACTIVE');
        setSlots(filtered);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [gameName]);

  async function fetchSlots() {
    try {
      const { data } = await client.models.Slot.list({
        filter: {
          status: { eq: 'ACTIVE' },
          ...(gameName && { gameName: { eq: gameName } }),
        },
      });
      setSlots(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createSlot(slotData: any) {
    try {
      const { data, errors } = await client.models.Slot.create(slotData);
      if (errors) throw new Error(errors[0].message);
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  async function joinSlot(slotId: string, userId: string, userName: string) {
    try {
      const { data: slot } = await client.models.Slot.get({ id: slotId });
      if (!slot) throw new Error('Slot not found');

      const players = slot.players || [];
      const playerNames = slot.playerNames || [];

      if (players.includes(userId)) {
        throw new Error('Already in slot');
      }

      if (players.length >= (slot.maxPlayers || 4)) {
        throw new Error('Slot is full');
      }

      const { data, errors } = await client.models.Slot.update({
        id: slotId,
        players: [...players, userId],
        playerNames: [...playerNames, userName],
      });

      if (errors) throw new Error(errors[0].message);
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  async function leaveSlot(slotId: string, userId: string) {
    try {
      const { data: slot } = await client.models.Slot.get({ id: slotId });
      if (!slot) throw new Error('Slot not found');

      const players = slot.players || [];
      const playerNames = slot.playerNames || [];
      const userIndex = players.indexOf(userId);

      if (userIndex === -1) {
        throw new Error('Not in this slot');
      }

      const newPlayers = players.filter((_, i) => i !== userIndex);
      const newPlayerNames = playerNames.filter((_, i) => i !== userIndex);

      const { data, errors } = await client.models.Slot.update({
        id: slotId,
        players: newPlayers,
        playerNames: newPlayerNames,
      });

      if (errors) throw new Error(errors[0].message);
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  async function deleteSlot(slotId: string) {
    try {
      const { data, errors } = await client.models.Slot.delete({ id: slotId });
      if (errors) throw new Error(errors[0].message);
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return {
    slots,
    loading,
    error,
    createSlot,
    joinSlot,
    leaveSlot,
    deleteSlot,
    refreshSlots: fetchSlots,
  };
}
