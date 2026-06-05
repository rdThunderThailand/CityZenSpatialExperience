import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, Heart, ChevronLeft, Info, Camera, Clock, X, CarFront, Coffee, Droplets } from 'lucide-react';
import { cn } from '../../lib/utils';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const NONGNOOCH_BOUNDS: [mapboxgl.LngLatLike, mapboxgl.LngLatLike] = [
  [100.9150, 12.7550], // SW coordinates
  [100.9400, 12.7750]  // NE coordinates
];

const PLACES = [
  {
    id: 'dinosaur-valley',
    name: 'Dinosaur Valley',
    category: 'Attraction',
    image: '/images/dinosaur_valley.png',
    openTime: '08:00 - 17:30',
    distance: '650 m',
    highlight: 'A world of dinosaurs! Life-sized statues and educational exhibits.',
    gallery: ['/images/dinosaur_valley.png', '/images/thai_performance.png', '/images/dinosaur_valley.png'],
    lngLat: [100.9284, 12.7683] as [number, number],
    icon: <Camera size={20} />,
    color: 'bg-orange-500',
    markerColor: 'border-t-orange-500'
  },
  {
    id: 'thai-performance',
    name: 'Thai Cultural Performance',
    category: 'Show',
    image: '/images/thai_performance.png',
    openTime: '10:30 - 16:30',
    distance: '400 m',
    highlight: 'Experience authentic Thai culture and traditional dances.',
    gallery: ['/images/thai_performance.png'],
    lngLat: [100.9314, 12.7643] as [number, number],
    icon: <span className="text-xl">🎭</span>,
    color: 'bg-purple-500',
    markerColor: 'border-t-purple-500'
  },
  {
    id: 'convention',
    name: 'Convention Center',
    category: 'Service',
    image: '/images/map_image.png',
    openTime: '08:00 - 18:00',
    distance: '100 m',
    highlight: 'Main event hall and gathering point.',
    gallery: [],
    lngLat: [100.9324, 12.7653] as [number, number],
    icon: <Info size={20} />,
    color: 'bg-blue-500',
    markerColor: 'border-t-blue-500'
  }
];

export default function MobileView() {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'explore' | 'detail' | 'about'>('explore');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  const categories = [
    { name: 'All', icon: <MapPin size={24} /> },
    { name: 'Attractions', icon: <Camera size={24} /> },
    { name: 'Garden', icon: <span className="text-2xl">🌿</span> },
    { name: 'Show', icon: <span className="text-2xl">🎭</span> },
    { name: 'Food', icon: <Coffee size={24} /> },
    { name: 'Service', icon: <Info size={24} /> },
    { name: 'Shuttle', icon: <CarFront size={24} /> },
    { name: 'Toilet', icon: <Droplets size={24} /> },
  ];

  const handlePinClick = (place: any) => {
    setSelectedPlace(place);
    setViewMode('detail');
  };

  const closeDetail = () => {
    setSelectedPlace(null);
    setViewMode('explore');
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [100.9304, 12.7663],
      zoom: 16.5,
      pitch: 45,
      maxBounds: NONGNOOCH_BOUNDS, // Restrict to Nongnooch interior
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    PLACES.forEach(place => {
      if (activeCategory !== 'All' && place.category !== activeCategory && activeCategory !== 'Attractions') return;

      const el = document.createElement('div');
      el.className = 'cursor-pointer transform hover:scale-105 transition-transform flex flex-col items-center justify-center translate-y-[-20px]';
      el.innerHTML = `
        <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 mb-1">
          <span class="text-sm font-bold text-gray-800 whitespace-nowrap">${place.name}</span>
        </div>
        <div class="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent ${place.markerColor}"></div>
      `;
      
      el.addEventListener('click', () => {
        handlePinClick(place);
        mapRef.current?.flyTo({ center: place.lngLat, zoom: 17.5, pitch: 60 });
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(place.lngLat)
        .addTo(mapRef.current!);
      
      markersRef.current[place.id] = marker;
    });
  }, [activeCategory]);

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-[#e8f1e6] relative overflow-hidden font-sans">
      
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-20 pt-12 pb-4 px-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 bg-red-600 text-yellow-400 font-serif italic font-bold text-lg rounded-full flex items-center justify-center shadow-md border border-yellow-400">n</div>
          <div className="flex flex-col">
            <span className="text-white font-bold leading-tight text-sm drop-shadow-md">NONGNOOCH</span>
            <span className="text-yellow-400 font-bold leading-tight text-xs drop-shadow-md">GARDEN</span>
          </div>
        </div>
        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto border border-white/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Map Layer */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* Floating Action Buttons */}
      <div className="absolute top-28 right-4 flex flex-col gap-3 z-10">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </button>
      </div>

      {/* OVERLAYS */}
      
      {/* 1. Explore Bottom Sheet */}
      {viewMode === 'explore' && (
        <div className="absolute bottom-0 inset-x-0 z-20 bg-white rounded-t-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 pb-8 pt-2">
          <div className="w-full flex justify-center py-2 active:cursor-grabbing cursor-grab">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          <div className="px-6 mt-2">
            <h2 className="text-2xl font-bold text-[#1a3821] mb-1">Explore Nongnooch Garden</h2>
            <p className="text-gray-500 text-sm mb-4">สำรวจสวนนงนุชพัทยา</p>
            
            <div className="relative mb-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search places" className="w-full bg-gray-100 rounded-full py-3 pl-12 pr-4 text-gray-800 outline-none focus:ring-2 focus:ring-green-500 font-medium" />
              </div>
              <button className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              </button>
            </div>

            <h3 className="font-bold text-gray-800 mb-3 text-sm">Categories</h3>
            <div className="grid grid-cols-4 gap-y-4 gap-x-2">
              {categories.map(cat => (
                <button 
                  key={cat.name} 
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-sm",
                    activeCategory === cat.name ? "bg-green-600 text-white" : "bg-green-50 text-green-700"
                  )}>
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 text-center">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Detail Bottom Sheet */}
      {viewMode === 'detail' && selectedPlace && (
        <div className="absolute bottom-0 inset-x-0 z-30 bg-white rounded-t-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 pb-8">
          <div className="relative">
            <button onClick={closeDetail} className="absolute right-4 top-4 z-10 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <X size={18} />
            </button>
            <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-40 object-cover rounded-t-[32px]" />
          </div>
          
          <div className="px-6 pt-5">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{selectedPlace.name}</h2>
            <div className="flex items-center gap-1 text-green-700 mt-1 mb-5">
              <span className="text-xs">🏕️</span>
              <span className="text-xs font-bold uppercase tracking-wide">{selectedPlace.category}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Clock size={18} className="text-gray-400" />
              <span>Open daily <span className="text-gray-900 font-bold ml-2">{selectedPlace.openTime}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
              <MapPin size={18} className="text-gray-400" />
              <span>Distance from you <span className="text-gray-900 font-bold ml-2">{selectedPlace.distance}</span></span>
            </div>

            <button 
              onClick={() => setViewMode('about')}
              className="w-full bg-[#1a3821] hover:bg-[#2a4d31] text-white font-bold py-4 rounded-2xl transition-colors text-lg"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* 3. About Full Page */}
      {viewMode === 'about' && selectedPlace && (
        <div className="absolute inset-0 z-50 bg-white overflow-y-auto pb-24">
          <div className="relative w-full h-72">
            <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
            <div className="absolute top-12 inset-x-4 flex justify-between">
              <button onClick={() => setViewMode('detail')} className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-sm border border-white/20">
                <ChevronLeft size={24} />
              </button>
              <button className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-sm border border-white/20">
                <Heart size={20} />
              </button>
            </div>
          </div>
          
          <div className="px-6 pt-6 bg-white -mt-8 rounded-t-[32px] relative">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{selectedPlace.name}</h1>
            <div className="flex items-center gap-1 text-green-700 mt-2 mb-6">
              <span className="text-sm">🏕️</span>
              <span className="text-sm font-bold uppercase tracking-wide">{selectedPlace.category}</span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-4 mb-6">
              <button className="flex flex-col items-center gap-2 text-green-700">
                <Info size={24} />
                <span className="text-[11px] font-bold">Info</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-gray-400">
                <Camera size={24} />
                <span className="text-[11px] font-bold">Photos</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-gray-400">
                <MapPin size={24} />
                <span className="text-[11px] font-bold">Nearby</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-gray-400">
                <Coffee size={24} />
                <span className="text-[11px] font-bold">Facilities</span>
              </button>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <Clock className="text-gray-400 mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-bold text-gray-900">Open daily</div>
                  <div className="text-sm text-gray-500 mt-1">{selectedPlace.openTime}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-gray-400 mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-bold text-gray-900">Distance from you</div>
                  <div className="text-sm text-gray-500 mt-1">{selectedPlace.distance}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Info className="text-gray-400 mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-bold text-gray-900">Highlight</div>
                  <div className="text-sm text-gray-500 mt-1 leading-relaxed">{selectedPlace.highlight}</div>
                </div>
              </div>
            </div>

            {selectedPlace.gallery.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Gallery</h3>
                  <button className="text-sm text-green-600 font-bold">See all</button>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {selectedPlace.gallery.map((img: string, i: number) => (
                    <img key={i} src={img} className="w-40 h-28 object-cover rounded-2xl flex-shrink-0 shadow-sm border border-gray-100" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 inset-x-0 px-6 py-4 bg-white border-t border-gray-100 z-50">
            <button className="w-full bg-[#1a3821] hover:bg-[#2a4d31] text-white font-bold py-4 rounded-2xl transition-colors text-lg shadow-lg">
              How to get there
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
