import { useState, useEffect } from 'react';
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

  // Auto-cycle through hotspots every 5 seconds since there is no touch interaction
  useEffect(() => {
    let i = 0;
    // Set the first one initially
    setActiveInfo(hotspots[i].name);
    
    const interval = setInterval(() => {
      i = (i + 1) % hotspots.length;
      setActiveInfo(hotspots[i].name);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#c3d1c5]", className)}>
      {/* Background Image without animation so pins stay aligned */}
      <img 
        src="/images/map_image.png" 
        alt="Nongnooch Wonder World Map" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay UI for interaction */}
      {activeInfo && (
        <div className="absolute top-6 left-6 z-20 bg-black/80 border border-green-500/50 backdrop-blur-md p-4 rounded-xl max-w-xs animate-in fade-in slide-in-from-top-4">
          <h3 className="text-green-400 font-mono font-bold text-lg mb-1">{activeInfo}</h3>
          <p className="text-white/70 text-sm">กำลังแสดงข้อมูลอัตโนมัติ (Auto-Tour Mode)</p>
        </div>
      )}

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
          style={{ top: spot.top, left: spot.left }}
        >
          {/* Pin Animation */}
          <div className="relative flex items-center justify-center">
            {activeInfo === spot.name && (
              <div className="absolute w-16 h-16 bg-yellow-400/50 rounded-full animate-ping"></div>
            )}
            <div className={cn(
              "relative p-2 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 transition-all duration-500",
              activeInfo === spot.name ? "bg-yellow-400 text-white border-white scale-125" : "bg-white text-green-700 border-yellow-400"
            )}>
              <MapPin size={20} />
            </div>
            
            {/* Label - Permanently visible since no touch screen */}
            <div className={cn(
              "absolute top-full mt-3 left-1/2 -translate-x-1/2 backdrop-blur-sm font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border transition-colors duration-500",
              activeInfo === spot.name ? "bg-yellow-400 text-green-900 border-white scale-110" : "bg-white/95 text-green-900 border-green-100"
            )}>
              {spot.name}
            </div>
          </div>
        </div>
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
