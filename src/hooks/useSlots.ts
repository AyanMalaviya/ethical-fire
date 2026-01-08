import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { Slot } from '../types';

const client = generateClient<Schema>();

export function useSlots(gameName?: string) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlots();
    subscribeToSlots();
  }, [gameName]);

  function subscribeToSlots() {
    const subscription = client.models.Slot.observeQuery({
      filter: gameName ? { gameName: { eq: gameName } } : undefined,
    }).subscribe({
      next: ({ items }) => {
        const activeSlots = items
          .filter(slot => slot.status === 'ACTIVE')
          .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()) as Slot[];
        setSlots(activeSlots);
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

  async function fetchSlots() {
    try {
      setLoading(true);
      const filter: any = { status: { eq: 'ACTIVE' } };
      if (gameName) {
        filter.gameName = { eq: gameName };
      }

      const { data, errors } = await client.models.Slot.list({
        filter,
      });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      const sortedSlots = (data || [])
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()) as Slot[];
      
      setSlots(sortedSlots);
      setError(null);
    } catch (err: any) {
      console.error('Fetch slots error:', err);
      setError(err.message);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  async function createSlot(slotInput: {
    gameName: string;
    startTime: string;
    description?: string;
    creatorId: string;
    creatorName: string;
  }) {
    try {
      const now = new Date().toISOString();
      const slotData = {
        gameName: slotInput.gameName,
        startTime: new Date(slotInput.startTime).toISOString(),
        status: 'ACTIVE' as const,
        creatorId: slotInput.creatorId,
        creatorName: slotInput.creatorName,
        players: [slotInput.creatorId],
        playerNames: [slotInput.creatorName],
        waitingQueue: [],
        waitingQueueNames: [],
        maxPlayers: 4,
        description: slotInput.description || '',
        createdAt: now,
        updatedAt: now,
      };

      console.log('Creating slot with data:', slotData);

      const { data, errors } = await client.models.Slot.create(slotData);

      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        throw new Error(errors[0].message);
      }

      console.log('Slot created successfully:', data);
      return { success: true, data: data as Slot };
    } catch (err: any) {
      console.error('Create slot error:', err);
      return { success: false, error: err.message || 'Failed to create slot' };
    }
  }

  async function joinSlot(slotId: string, userId: string, userName: string) {
    try {
      const { data: slot, errors: fetchErrors } = await client.models.Slot.get({ id: slotId });

      if (fetchErrors && fetchErrors.length > 0) {
        throw new Error(fetchErrors[0].message);
      }

      if (!slot) {
        throw new Error('Slot not found');
      }

      const players = slot.players || [];
      const playerNames = slot.playerNames || [];
      const waitingQueue = slot.waitingQueue || [];
      const waitingQueueNames = slot.waitingQueueNames || [];

      // Check if already in slot
      if (players.includes(userId)) {
        throw new Error('You are already in this slot');
      }

      // Check if already in waiting queue
      if (waitingQueue.includes(userId)) {
        throw new Error('You are already in the waiting queue');
      }

      const maxPlayers = slot.maxPlayers || 4;

      // If slot is full, add to waiting queue
      if (players.length >= maxPlayers) {
        const { data, errors } = await client.models.Slot.update({
          id: slotId,
          waitingQueue: [...waitingQueue, userId],
          waitingQueueNames: [...waitingQueueNames, userName],
          updatedAt: new Date().toISOString(),
        });

        if (errors && errors.length > 0) {
          throw new Error(errors[0].message);
        }

        return { success: true, data: data as Slot, message: 'Added to waiting queue' };
      }

      // Add to slot
      const { data, errors } = await client.models.Slot.update({
        id: slotId,
        players: [...players, userId],
        playerNames: [...playerNames, userName],
        updatedAt: new Date().toISOString(),
      });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      return { success: true, data: data as Slot, message: 'Joined slot successfully' };
    } catch (err: any) {
      console.error('Join slot error:', err);
      return { success: false, error: err.message || 'Failed to join slot' };
    }
  }

async function leaveSlot(slotId: string, userId: string) {
  try {
    const { data: slot, errors: fetchErrors } = await client.models.Slot.get({ id: slotId });

    if (fetchErrors && fetchErrors.length > 0) {
      throw new Error(fetchErrors[0].message);
    }

    if (!slot) {
      throw new Error('Slot not found');
    }

    const players = slot.players || [];
    const playerNames = slot.playerNames || [];
    const waitingQueue = slot.waitingQueue || [];
    const waitingQueueNames = slot.waitingQueueNames || [];
    const currentCreatorId = slot.creatorId || '';
    const currentCreatorName = slot.creatorName || '';

    // Check if user is in slot
    const playerIndex = players.indexOf(userId);
    if (playerIndex === -1) {
      throw new Error('You are not in this slot');
    }

    // Remove user from slot
    const newPlayers = players.filter((_, i) => i !== playerIndex);
    const newPlayerNames = playerNames.filter((_, i) => i !== playerIndex);

    // Check if slot will be empty after leaving
    if (newPlayers.length === 0 && waitingQueue.length === 0) {
      // Delete the slot if it becomes empty
      console.log('Slot is empty, deleting...');
      const { errors: deleteErrors } = await client.models.Slot.delete({ id: slotId });
      
      if (deleteErrors && deleteErrors.length > 0) {
        throw new Error(deleteErrors[0].message);
      }

      return { 
        success: true, 
        data: null, 
        message: 'Left slot successfully. Slot was deleted as it became empty.' 
      };
    }

    // If there's someone in waiting queue, move them to players
    let newWaitingQueue = [...waitingQueue];
    let newWaitingQueueNames = [...waitingQueueNames];

    if (waitingQueue.length > 0 && newPlayers.length < (slot.maxPlayers || 4)) {
      const nextUserId = waitingQueue[0];
      const nextUserName = waitingQueueNames[0];
      
      newPlayers.push(nextUserId);
      newPlayerNames.push(nextUserName);
      
      newWaitingQueue = waitingQueue.slice(1);
      newWaitingQueueNames = waitingQueueNames.slice(1);
    }

    // If creator is leaving, transfer ownership to first remaining player
    let newCreatorId: string = currentCreatorId;
    let newCreatorName: string = currentCreatorName;
    
    const isCreatorLeaving = userId === currentCreatorId;
    
    if (isCreatorLeaving && newPlayers.length > 0) {
      newCreatorId = newPlayers[0] || 'NewHostId';
      newCreatorName = newPlayerNames[0] || 'New Host';
      console.log('Transferring host to:', newCreatorName);
    }

    // Update the slot
    const { data, errors } = await client.models.Slot.update({
      id: slotId,
      creatorId: newCreatorId,
      creatorName: newCreatorName,
      players: newPlayers,
      playerNames: newPlayerNames,
      waitingQueue: newWaitingQueue,
      waitingQueueNames: newWaitingQueueNames,
      updatedAt: new Date().toISOString(),
    });

    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    const message = isCreatorLeaving
      ? `Left slot successfully. Host transferred to ${newCreatorName}`
      : 'Left slot successfully';

    return { success: true, data: data as Slot, message };
  } catch (err: any) {
    console.error('Leave slot error:', err);
    return { success: false, error: err.message || 'Failed to leave slot' };
  }
}


  async function deleteSlot(slotId: string) {
    try {
      const { data, errors } = await client.models.Slot.delete({ id: slotId });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      return { success: true, data };
    } catch (err: any) {
      console.error('Delete slot error:', err);
      return { success: false, error: err.message || 'Failed to delete slot' };
    }
  }

  async function cancelSlot(slotId: string) {
    try {
      const { data, errors } = await client.models.Slot.update({
        id: slotId,
        status: 'CANCELLED',
        updatedAt: new Date().toISOString(),
      });

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      return { success: true, data: data as Slot };
    } catch (err: any) {
      console.error('Cancel slot error:', err);
      return { success: false, error: err.message || 'Failed to cancel slot' };
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
    cancelSlot,
    refreshSlots: fetchSlots,
  };
}
