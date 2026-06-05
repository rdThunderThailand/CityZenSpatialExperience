import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Search, MapPin, Heart, ChevronLeft, Info, Camera, Clock, X, CarFront, Coffee, Droplets, Filter, Menu, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  { id: 1, name: 'Dinosaur Valley', category: 'Attractions', top: '45%', left: '48%', image: '/images/dinosaur_valley.png', distance: '650 m', time: '08:00 - 17:30', highlight: 'A world of dinosaurs! Life-sized statues and educational exhibits.', icon: '🏔️', color: 'bg-red-500' },
  { id: 2, name: 'Thai Cultural Performance', category: 'Show', top: '55%', left: '60%', image: '/images/thai_performance.png', distance: '1.2 km', time: '10:30 - 16:30', highlight: 'Experience traditional Thai dancing and martial arts.', icon: '🎭', color: 'bg-purple-500' },
  { id: 3, name: 'Nongnooch Botanical', category: 'Garden', top: '35%', left: '30%', image: '/images/map_image.png', distance: '300 m', time: '08:00 - 18:00', highlight: 'Beautiful curated gardens from around the world.', icon: '🌿', color: 'bg-green-500' },
  { id: 4, name: 'Food Court', category: 'Food', top: '65%', left: '40%', image: '/images/map_image.png', distance: '100 m', time: '09:00 - 17:00', highlight: 'Delicious local and international cuisine.', icon: '🍽️', color: 'bg-orange-500' },
];

export default function MobileView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<typeof PLACES[0] | null>(null);
  const [viewState, setViewState] = useState<'HOME' | 'CATEGORIES' | 'DETAILS'>('HOME');

  const filteredPlaces = activeCategory === 'All' ? PLACES : PLACES.filter(p => p.category === activeCategory);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (viewState === 'HOME') setViewState('CATEGORIES');
  };

  const handlePinClick = (place: typeof PLACES[0]) => {
    setSelectedPlace(place);
    setViewState('CATEGORIES'); // Keep map visible but show place summary
  };

  return (
    <div className="w-full h-[100dvh] bg-[#e8f1e6] relative overflow-hidden font-sans flex flex-col">
      
      {/* MAP BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <TransformWrapper
          initialScale={1.5}
          minScale={1}
          maxScale={4}
          centerOnInit={true}
          limitToBounds={true}
        >
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
            <div className="relative w-full h-full min-w-[1200px] min-h-[1200px]">
              <img src="/images/map_image.png" alt="Map" className="w-full h-full object-cover opacity-90" />
              
              {/* Fake User Location */}
              <div className="absolute top-[60%] left-[30%] w-8 h-8 bg-blue-500 border-[3px] border-white rounded-full shadow-lg z-10 animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Pins */}
              {filteredPlaces.map(place => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div 
                    key={place.id}
                    className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-110"
                    style={{ top: place.top, left: place.left }}
                    onClick={(e) => { e.stopPropagation(); handlePinClick(place); }}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full shadow-xl border-2 transition-colors",
                      isSelected ? "bg-red-600 border-white ring-4 ring-red-600/30" : place.color + " border-white"
                    )}>
                      <span className="text-lg">{place.icon}</span>
                    </div>
                    <div className={cn(
                      "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent mx-auto mt-[-2px]",
                      isSelected ? "border-t-red-600" : `border-t-${place.color.replace('bg-', '')}`
                    )}></div>
                  </div>
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* FOREGROUND UI OVERLAYS */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        
        {/* TOP SECTION */}
        <div className="pointer-events-auto">
          {viewState === 'HOME' ? (
            <div className="pt-14 px-6 pb-8 bg-gradient-to-b from-white/95 via-white/70 to-transparent">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white shadow-sm border border-green-100 rounded-lg flex items-center justify-center">
                    <img src="/images/smart_city_map.png" className="w-6 h-6 object-cover rounded opacity-0" />
                    {/* Fallback to simple icon since logo image not specific */}
                    <span className="text-green-700 font-bold text-xl italic absolute">n</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1a3821] font-bold text-sm leading-none tracking-wide">NONGNOOCH</span>
                    <span className="text-[#3e6945] font-bold text-xs leading-none tracking-wide mt-1">GARDEN</span>
                  </div>
                </div>
                <button><Menu className="text-gray-800" size={28} /></button>
              </div>
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <h1 className="text-[32px] font-bold text-gray-900 leading-[1.1] tracking-tight">Explore<br/>Nongnooch Garden</h1>
                <p className="text-gray-600 text-sm mt-3 font-medium">สำรวจสวนนงนุชพัทยา</p>
              </div>
            </div>
          ) : (
            <div className="pt-14 px-5 flex gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
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
            </div>
          )}
        </div>

        {/* BOTTOM SECTION */}
        <div className="pointer-events-auto flex flex-col justify-end h-full">
          
          {/* Right Floating button (Target) */}
          <div className="absolute right-5 bottom-[140px] pointer-events-auto transition-all duration-300" style={{ bottom: viewState === 'HOME' ? '140px' : selectedPlace ? '200px' : '360px' }}>
            <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-gray-800">
              <div className="w-4 h-4 border-2 border-gray-800 rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* HOME Search & Categories Pill */}
          {viewState === 'HOME' && (
            <div className="px-5 pb-8 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div 
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center px-5 py-4 border border-white cursor-pointer"
                onClick={() => setViewState('CATEGORIES')}
              >
                <Search className="text-gray-400 w-5 h-5 mr-3" />
                <span className="text-gray-400 text-[15px]">Search places</span>
              </div>
              
              <div className="bg-white/95 backdrop-blur-md rounded-[24px] shadow-lg p-2 flex justify-between overflow-x-auto hide-scrollbar border border-white">
                {CATEGORIES.slice(0,5).map((cat, i) => (
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
            </div>
          )}

          {/* CATEGORIES GRID BOTTOM SHEET */}
          {viewState === 'CATEGORIES' && !selectedPlace && (
            <div className="bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 pb-12 animate-in slide-in-from-bottom-full duration-300 pointer-events-auto">
              <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
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
            </div>
          )}

          {/* PLACE SUMMARY BOTTOM SHEET */}
          {viewState === 'CATEGORIES' && selectedPlace && (
            <div className="bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-5 pb-8 relative animate-in slide-in-from-bottom-full duration-300 pointer-events-auto">
              <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
              <button 
                className="absolute top-5 right-5 p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                onClick={() => setSelectedPlace(null)}
              ><X size={16}/></button>
              
              <div className="flex gap-4">
                <img src={selectedPlace.image} className="w-32 h-28 object-cover rounded-[20px] shadow-sm" />
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
            </div>
          )}

        </div>
      </div>

      {/* DETAILS FULL SCREEN VIEW */}
      {viewState === 'DETAILS' && selectedPlace && (
        <div className="absolute inset-0 z-50 bg-white overflow-y-auto pb-28 animate-in slide-in-from-right-full duration-300 font-sans">
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
            <button className="w-full bg-[#1a4225] text-white py-4 rounded-[16px] font-bold tracking-wide shadow-lg shadow-green-900/20 text-[16px]">
              How to get there
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
