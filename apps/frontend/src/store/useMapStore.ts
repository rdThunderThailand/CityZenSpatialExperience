import { create } from 'zustand';

interface MapState {
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

// Default center for Nong Nooch Garden or general area
export const useMapStore = create<MapState>((set) => ({
  center: [100.9304, 12.7663], // Approx coordinates for Nong Nooch
  zoom: 15,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
}));
