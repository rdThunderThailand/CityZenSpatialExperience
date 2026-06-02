import { create } from 'zustand';

interface AuthState {
  role: 'admin' | 'user' | 'guest';
  setRole: (role: 'admin' | 'user' | 'guest') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: 'guest', // Default role
  setRole: (role) => set({ role }),
}));
