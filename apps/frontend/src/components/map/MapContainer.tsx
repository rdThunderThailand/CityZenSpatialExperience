import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '../../store/useMapStore';
import { useShuttleStore } from '../../store/useShuttleStore';
import { cn } from '../../lib/utils';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibW9jay11c2VyIiwiYSI6ImNtbW9jay10b2tlbiJ9.mock';

interface MapContainerProps {
  className?: string;
  interactive?: boolean;
}

export const MapContainer = ({ className = '', interactive = true }: MapContainerProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  
  const { center, zoom, setCenter, setZoom } = useMapStore();
  const { shuttles, connect, disconnect } = useShuttleStore();

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // Apple Maps-like minimalist base
      center: center,
      zoom: zoom,
      interactive: interactive,
    });

    mapRef.current.on('move', () => {
      if (!mapRef.current) return;
      const mapCenter = mapRef.current.getCenter();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapRef.current.getZoom());
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  // 2. Connect to WebSocket
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // 3. Render Shuttles natively on the map
  useEffect(() => {
    if (!mapRef.current) return;

    shuttles.forEach((shuttle) => {
      // If marker already exists, smoothly animate it to the new location
      if (markersRef.current[shuttle.id]) {
        markersRef.current[shuttle.id].setLngLat(shuttle.location);
      } else {
        // Create custom Apple-like marker element
        const el = document.createElement('div');
        el.className = 'w-6 h-6 bg-brand-green border-2 border-white rounded-full shadow-[0_0_15px_rgba(46,204,113,0.5)] transition-transform duration-1000 ease-linear';
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat(shuttle.location)
          .addTo(mapRef.current!);
          
        markersRef.current[shuttle.id] = marker;
      }
    });

    // Cleanup removed shuttles (not strictly needed for this mock, but good practice)
    const activeIds = shuttles.map(s => s.id);
    Object.keys(markersRef.current).forEach(id => {
      if (!activeIds.includes(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });
  }, [shuttles]);

  return (
    <div 
      ref={mapContainerRef} 
      className={cn("absolute inset-0 w-full h-full", className)}
    />
  );
};
