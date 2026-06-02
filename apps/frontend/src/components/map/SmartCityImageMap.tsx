import { useState } from 'react';
import { cn } from '../../lib/utils';
import { MapPin } from 'lucide-react';

export function SmartCityImageMap({ className }: { className?: string }) {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  // Example hotspots matching the original layout concept
  const hotspots = [
    { id: 'convention', name: 'Convention Center', top: '45%', left: '35%' },
    { id: 'dinosaur1', name: 'Dinosaur Valley North', top: '25%', left: '60%' },
    { id: 'dinosaur2', name: 'Dinosaur Valley East', top: '45%', left: '75%' },
  ];

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#c3d1c5]", className)}>
      {/* Background Image */}
      <img 
        src="/images/map_image.png" 
        alt="Nongnooch Wonder World Map" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay UI for interaction */}
      {activeInfo && (
        <div className="absolute top-6 left-6 z-20 bg-black/80 border border-green-500/50 backdrop-blur-md p-4 rounded-xl max-w-xs animate-in fade-in slide-in-from-top-4">
          <h3 className="text-green-400 font-mono font-bold text-lg mb-1">{activeInfo}</h3>
          <p className="text-white/70 text-sm">Interactive smart city node selected. Explore more details here.</p>
          <button 
            onClick={() => setActiveInfo(null)}
            className="mt-3 text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded hover:bg-green-500/40 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <button
          key={spot.id}
          className="absolute z-10 group transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: spot.top, left: spot.left }}
          onClick={() => setActiveInfo(spot.name)}
        >
          {/* Pin Animation */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-yellow-400/40 rounded-full animate-ping"></div>
            <div className="relative bg-white text-green-700 p-2 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 border-yellow-400 group-hover:bg-yellow-400 group-hover:text-white transition-colors">
              <MapPin size={20} />
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-100">
              {spot.name}
            </div>
          </div>
        </button>
      ))}
      
      {/* "You Are Here" Marker */}
      <div 
        className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: '55%', left: '45%' }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <div className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 border-white mb-1 z-10 relative">
            <span className="mr-1">📍</span> You Are Here
          </div>
          <div className="w-4 h-4 bg-blue-600 rotate-45 transform -translate-y-3 shadow-sm border-r-2 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
}
