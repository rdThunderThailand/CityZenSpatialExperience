import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Shuttle {
  id: string;
  name: string;
  location: [number, number];
  routeId: string;
  status: 'active' | 'inactive';
}

interface ShuttleState {
  shuttles: Shuttle[];
  socket: Socket | null;
  setShuttles: (shuttles: Shuttle[]) => void;
  updateShuttleLocation: (id: string, location: [number, number]) => void;
  connect: () => void;
  disconnect: () => void;
}

export const useShuttleStore = create<ShuttleState>((set, get) => ({
  shuttles: [],
  socket: null,
  setShuttles: (shuttles) => set({ shuttles }),
  
  updateShuttleLocation: (id, location) =>
    set((state) => {
      // If shuttle exists, update it. Otherwise, we might want to add it.
      const exists = state.shuttles.find(s => s.id === id);
      if (exists) {
        return {
          shuttles: state.shuttles.map((shuttle) =>
            shuttle.id === id ? { ...shuttle, location } : shuttle
          ),
        };
      } else {
        // Just mock adding it if it doesn't exist for now
        return {
          shuttles: [...state.shuttles, {
            id,
            name: `Shuttle ${id}`,
            location,
            routeId: 'route-1',
            status: 'active'
          }]
        };
      }
    }),

  connect: () => {
    const currentSocket = get().socket;
    if (currentSocket) return;

    // Connect to NestJS Backend Gateway
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');
    
    socket.on('connect', () => {
      console.log('Connected to Shuttle Gateway:', socket.id);
    });

    socket.on('shuttle_moved', (data: { id: string; location: [number, number] }) => {
      get().updateShuttleLocation(data.id, data.location);
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));
