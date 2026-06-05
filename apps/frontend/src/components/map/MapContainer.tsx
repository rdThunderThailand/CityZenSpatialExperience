import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '../../store/useMapStore';
import { useShuttleStore } from '../../store/useShuttleStore';
import { cn } from '../../lib/utils';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapContainerProps {
  className?: string;
  interactive?: boolean;
}

export const MapContainer = ({ className = '', interactive = true }: MapContainerProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  
  const { center, setCenter, setZoom } = useMapStore();
  const { shuttles, connect, disconnect } = useShuttleStore();

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9', // Using satellite to blend with the garden vibe
      center: center,
      zoom: 16.5,
      pitch: 65, // Isometric angle
      bearing: -20,
      interactive: interactive,
      antialias: true // Crucial for 3D models
    });

    mapRef.current.on('style.load', () => {
      if (!mapRef.current) return;
      const map = mapRef.current as any;

      // Add the custom 3D model of Nongnooch
      try {
        map.addModel('nongnuch', '/models/nongnuch/nongnuch.glb');
        
        map.addSource('nongnuch-source', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [100.9304, 12.7663]
            }
          }
        });

        map.addLayer({
          id: 'nongnuch-layer',
          type: 'model',
          source: 'nongnuch-source',
          layout: {
            'model-id': 'nongnuch'
          },
          paint: {
            'model-scale': [500, 500, 500], // Scale up the OBJ model
            'model-rotation': [0, 0, 0],
            'model-opacity': 1
          }
        });
      } catch (e) {
        console.warn('Mapbox 3D Model API not fully supported or GLB missing', e);
      }

      // Add static pins for the screenshot UI
      const createPin = (color: string, label: string, iconUrl: string, lngLat: [number, number]) => {
        const el = document.createElement('div');
        el.className = 'flex flex-col items-center justify-center translate-y-[-20px]';
        el.innerHTML = `
          <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 mb-1">
            <img src="${iconUrl}" class="w-6 h-6 rounded-full object-cover" />
            <span class="text-sm font-bold text-gray-800 whitespace-nowrap">${label}</span>
          </div>
          <div class="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent ${color}"></div>
        `;
        new mapboxgl.Marker({ element: el })
          .setLngLat(lngLat)
          .addTo(mapRef.current!);
      };

      createPin('border-t-orange-500', 'Dinosaur Valley', 'https://cdn-icons-png.flaticon.com/512/2809/2809930.png', [100.9284, 12.7683]);
      createPin('border-t-blue-500', 'You Are Here', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', [100.9304, 12.7663]);
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
    return () => disconnect();
  }, [connect, disconnect]);

  // 3. Render Real-time Shuttles
  useEffect(() => {
    if (!mapRef.current) return;

    shuttles.forEach((shuttle) => {
      if (markersRef.current[shuttle.id]) {
        markersRef.current[shuttle.id].setLngLat(shuttle.location);
      } else {
        const el = document.createElement('div');
        el.innerHTML = '<div class="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md shadow-green-500/50"></div>';
        
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(shuttle.location)
          .addTo(mapRef.current!);
          
        markersRef.current[shuttle.id] = marker;
      }
    });

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
