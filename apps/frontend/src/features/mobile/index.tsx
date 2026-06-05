import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, Heart, ChevronLeft, Info, Camera, Clock, X, Coffee, Filter, Menu, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'All', icon: 'All', color: 'bg-gray-200' },
  { id: 'Attractions', icon: '🏔️', color: 'bg-blue-100' },
  { id: 'Garden', icon: '🌿', color: 'bg-green-100' },
  { id: 'Show', icon: '🎭', color: 'bg-yellow-100' },
  { id: 'Food', icon: '🍽️', color: 'bg-orange-100' },
  { id: 'Service', icon: 'ℹ️', color: 'bg-teal-100' },
  { id: 'Shuttle', icon: '🚌', color: 'bg-indigo-100' },
  { id: 'Toilet', icon: '🚻', color: 'bg-cyan-100' },
  { id: 'Parking', icon: '🅿️', color: 'bg-purple-100' },
  { id: 'First Aid', icon: '➕', color: 'bg-red-100' },
];

const PLACES = [
  { id: 1, name: 'Dinosaur Valley', category: 'Attractions', lngLat: [100.9320, 12.7680] as [number, number], image: '/images/dinosaur_valley.png', distance: '650 m', time: '08:00 - 17:30', highlight: 'A world of dinosaurs! Life-sized statues and educational exhibits.', icon: '🏔️', color: 'bg-red-500' },
  { id: 2, name: 'Thai Cultural Performance', category: 'Show', lngLat: [100.9280, 12.7650] as [number, number], image: '/images/thai_performance.png', distance: '1.2 km', time: '10:30 - 16:30', highlight: 'Experience traditional Thai dancing and martial arts.', icon: '🎭', color: 'bg-purple-500' },
  { id: 3, name: 'Nongnooch Botanical', category: 'Garden', lngLat: [100.9350, 12.7640] as [number, number], image: '/images/dinosaur_valley.png', distance: '300 m', time: '08:00 - 18:00', highlight: 'Beautiful curated gardens from around the world.', icon: '🌿', color: 'bg-green-500' },
  { id: 4, name: 'Food Court', category: 'Food', lngLat: [100.9250, 12.7620] as [number, number], image: '/images/thai_performance.png', distance: '100 m', time: '09:00 - 17:00', highlight: 'Delicious local and international cuisine.', icon: '🍽️', color: 'bg-orange-500' },
];

export default function MobileView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<typeof PLACES[0] | null>(null);
  const [viewState, setViewState] = useState<'HOME' | 'CATEGORIES' | 'DETAILS'>('HOME');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});

  const filteredPlaces = activeCategory === 'All' ? PLACES : PLACES.filter(p => p.category === activeCategory);

  // Initialize Mapbox
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [100.9304, 12.7663],
      zoom: 16.5,
      pitch: 45,
    });

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.resize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    if (!mapRef.current) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    filteredPlaces.forEach(place => {
      const isSelected = selectedPlace?.id === place.id;
      
      const el = document.createElement('div');
      el.className = 'cursor-pointer transform hover:scale-105 transition-transform flex flex-col items-center justify-center translate-y-[-20px]';
      el.innerHTML = `
        <div class="flex items-center justify-center w-10 h-10 rounded-full shadow-xl border-2 transition-colors ${isSelected ? 'bg-red-600 border-white ring-4 ring-red-600/30' : place.color + ' border-white'}">
          <span class="text-lg">${place.icon}</span>
        </div>
        <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent mx-auto mt-[-2px] ${isSelected ? 'border-t-red-600' : 'border-t-' + place.color.replace('bg-', '')}"></div>
      `;
      
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        handlePinClick(place);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(place.lngLat)
        .addTo(mapRef.current!);
      
      markersRef.current[place.id] = marker;
    });
  }, [activeCategory, selectedPlace]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (viewState === 'HOME') setViewState('CATEGORIES');
  };

  const handlePinClick = (place: typeof PLACES[0]) => {
    setSelectedPlace(place);
    setViewState('CATEGORIES'); 
    mapRef.current?.flyTo({ center: place.lngLat, zoom: 17.5, pitch: 60 });
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 50) { // Swiped down
      if (selectedPlace) setSelectedPlace(null);
      else if (viewState === 'CATEGORIES') setViewState('HOME');
    } else if (info.offset.y < -50) { // Swiped up
      if (viewState === 'HOME') setViewState('CATEGORIES');
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-[#e8f1e6] relative overflow-hidden font-sans flex flex-col">
      
      {/* MAPBOX LAYER */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" style={{ minHeight: '100dvh' }} />

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        
        {/* TOP HEADER */}
        <div className="pointer-events-none">
          <AnimatePresence mode="wait">
            {viewState === 'HOME' ? (
              <motion.div 
                key="home-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-14 px-6 pb-8 bg-gradient-to-b from-white/95 via-white/70 to-transparent pointer-events-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white shadow-sm border border-green-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/images/nongnuchlogo.png" className="w-full h-full object-cover" alt="Logo" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#1a3821] font-bold text-sm leading-none tracking-wide">NONGNOOCH</span>
                      <span className="text-[#3e6945] font-bold text-xs leading-none tracking-wide mt-1">GARDEN</span>
                    </div>
                  </div>
                  <button><Menu className="text-gray-800" size={28} /></button>
                </div>
                <div>
                  <h1 className="text-[32px] font-bold text-gray-900 leading-[1.1] tracking-tight">Explore<br/>Nongnooch Garden</h1>
                  <p className="text-gray-600 text-sm mt-3 font-medium">สำรวจสวนนงนุชพัทยา</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="cat-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-14 px-5 flex gap-3 pointer-events-auto"
              >
                <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center px-4 py-3.5 border border-white">
                  <Search className="text-gray-400 w-5 h-5 mr-3" />
                  <input type="text" placeholder="Search places" className="w-full outline-none text-[15px] bg-transparent text-gray-800 font-medium placeholder:font-normal" />
                </div>
                <button 
                  className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center border border-white flex-shrink-0"
                  onClick={() => setViewState(viewState === 'CATEGORIES' && !selectedPlace ? 'HOME' : 'CATEGORIES')}
                >
                  <Filter className="text-gray-700 w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pointer-events-none flex flex-col justify-end h-full">
          
          <AnimatePresence>
            {/* HOME Bottom Floating Items */}
            {viewState === 'HOME' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="px-5 pb-8 flex flex-col gap-4 pointer-events-auto"
              >
                <div 
                  className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center px-5 py-4 border border-white cursor-pointer"
                  onClick={() => setViewState('CATEGORIES')}
                >
                  <Search className="text-gray-400 w-5 h-5 mr-3" />
                  <span className="text-gray-400 text-[15px]">Search places</span>
                </div>
                
                <div className="bg-white/95 backdrop-blur-md rounded-[24px] shadow-lg p-2 flex justify-between overflow-x-auto hide-scrollbar border border-white">
                  {CATEGORIES.slice(0,5).map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex flex-col items-center justify-center gap-1.5 min-w-[76px] py-3 rounded-[20px] transition-colors hover:bg-gray-50"
                    >
                      <div className={cn("w-[42px] h-[42px] rounded-full flex items-center justify-center text-xl shadow-sm", cat.color, activeCategory === cat.id ? "ring-2 ring-green-600 ring-offset-2" : "")}>
                        {cat.icon === 'All' ? <span className="font-bold text-gray-800 text-sm">All</span> : cat.icon}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">{cat.id}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CATEGORIES GRID BOTTOM SHEET */}
            {viewState === 'CATEGORIES' && !selectedPlace && (
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 pb-12 pointer-events-auto w-full touch-none"
              >
                <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-grab"></div>
                <h3 className="font-bold text-gray-900 mb-6 px-2 text-lg">Categories</h3>
                <div className="grid grid-cols-5 gap-y-8 gap-x-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={cn("w-[50px] h-[50px] rounded-full flex items-center justify-center text-[22px] transition-all shadow-sm", cat.color, activeCategory === cat.id ? "ring-2 ring-green-600 ring-offset-2 scale-105" : "")}>
                        {cat.icon === 'All' ? <span className="font-bold text-gray-800 text-base">All</span> : cat.icon}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{cat.id}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PLACE SUMMARY BOTTOM SHEET */}
            {viewState === 'CATEGORIES' && selectedPlace && (
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-5 pb-8 relative pointer-events-auto touch-none"
              >
                <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5 cursor-grab"></div>
                <button 
                  className="absolute top-5 right-5 p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                  onClick={() => setSelectedPlace(null)}
                ><X size={16}/></button>
                
                <div className="flex gap-4">
                  <img src={selectedPlace.image} className="w-32 h-28 object-cover rounded-[20px] shadow-sm pointer-events-none" />
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-gray-900 text-[19px] leading-tight mb-1 pr-6">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-1.5 text-[#3e6945] mb-2">
                      <span className="text-sm">{selectedPlace.icon}</span>
                      <span className="text-[13px] font-bold">{selectedPlace.category}</span>
                    </div>
                    <p className="text-[13px] text-gray-600 font-medium mt-1">Open daily {selectedPlace.time}</p>
                    <p className="text-[13px] text-gray-600 font-medium mt-0.5">{selectedPlace.distance} from you</p>
                  </div>
                </div>
                <button 
                  className="w-full mt-5 bg-[#1a4225] text-white py-4 rounded-2xl font-bold tracking-wide shadow-lg shadow-green-900/20 text-[15px]"
                  onClick={() => setViewState('DETAILS')}
                >
                  View Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* DETAILS FULL SCREEN VIEW */}
      <AnimatePresence>
        {viewState === 'DETAILS' && selectedPlace && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-white overflow-y-auto pb-28 font-sans"
          >
            <div className="relative h-[38vh]">
              <img src={selectedPlace.image} className="w-full h-full object-cover" />
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/40 to-transparent"></div>
              <button 
                className="absolute top-14 left-5 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-md"
                onClick={() => setViewState('CATEGORIES')}
              ><ChevronLeft size={24} className="mr-0.5" /></button>
              <button className="absolute top-14 right-5 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-md">
                <Heart size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <h1 className="text-[28px] font-bold text-gray-900 mb-2 leading-tight">{selectedPlace.name}</h1>
              <div className="flex items-center gap-1.5 text-[#3e6945] mb-6">
                <span className="text-base">{selectedPlace.icon}</span>
                <span className="text-[15px] font-bold">{selectedPlace.category}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-0 mb-6 px-2">
                <div className="flex flex-col items-center gap-1.5 text-[#1a4225] border-b-[3px] border-[#1a4225] pb-3 px-2">
                  <Info size={22} />
                  <span className="text-xs font-bold">Info</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-gray-400 pb-3 px-2">
                  <Camera size={22} />
                  <span className="text-xs font-bold">Photos</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-gray-400 pb-3 px-2">
                  <MapPin size={22} />
                  <span className="text-xs font-bold">Nearby</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-gray-400 pb-3 px-2">
                  <Coffee size={22} />
                  <span className="text-xs font-bold">Facilities</span>
                </div>
              </div>

              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-center gap-4">
                  <Clock className="text-gray-800" size={20} />
                  <div className="flex-1 flex justify-between text-[15px]">
                    <span className="font-bold text-gray-900">Open daily</span>
                    <span className="text-gray-600 font-medium">{selectedPlace.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-gray-800" size={20} />
                  <div className="flex-1 flex justify-between text-[15px]">
                    <span className="font-bold text-gray-900">Distance from you</span>
                    <span className="text-gray-600 font-medium">{selectedPlace.distance}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 flex justify-center mt-1"><img src="/favicon.svg" className="w-4 h-4 grayscale opacity-60" /></div>
                  <div>
                    <span className="font-bold text-gray-900 text-[15px] block mb-1">Highlight</span>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{selectedPlace.highlight}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 text-xl">Gallery</h3>
                  <span className="text-sm font-bold text-gray-500">See all</span>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                  {[1,2,3].map(i => (
                    <img key={i} src={selectedPlace.image} className="w-[140px] h-[100px] rounded-2xl object-cover flex-shrink-0 shadow-sm border border-gray-100" />
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-md">
              <button className="w-full bg-[#1a4225] text-white py-4 rounded-[16px] font-bold tracking-wide shadow-lg shadow-green-900/20 text-[16px] flex items-center justify-center gap-2">
                <Navigation size={20} />
                How to get there
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
