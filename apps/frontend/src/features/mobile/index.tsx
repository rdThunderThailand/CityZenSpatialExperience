import { MapContainer } from '../../components/map/MapContainer';
import { Navigation, Heart, Map as MapIcon, LocateFixed } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MobileView() {
  return (
    <div className="w-full h-[100dvh] flex flex-col bg-brand-dark text-white relative overflow-hidden">
      
      {/* Map Layer */}
      <div className="absolute inset-0">
        <MapContainer interactive={true} />
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-16 right-4 flex flex-col gap-3 z-10">
        <button className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg">
          <LocateFixed size={20} />
        </button>
        <button className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg">
          <MapIcon size={20} />
        </button>
      </div>
      
      {/* 
        Bottom Sheet 
        Apple Maps Aesthetic: heavy glassmorphism, floating above the map 
      */}
      <div 
        className={cn(
          "absolute bottom-0 inset-x-0 z-20 flex flex-col max-h-[85vh]",
          "bg-black/60 backdrop-blur-3xl border-t border-white/10 rounded-t-[32px]",
          "shadow-[0_-8px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Grabber handle */}
        <div className="w-full flex justify-center pt-4 pb-3 active:cursor-grabbing cursor-grab">
          <div className="w-12 h-1.5 bg-white/30 rounded-full"></div>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="px-6 pt-2 pb-6 overflow-y-auto hide-scrollbar">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dinosaur Valley</h1>
          <p className="text-brand-green font-medium mb-6">Open • 0.2 km away</p>
          
          {/* Primary Actions */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-brand-green text-black font-semibold py-3.5 rounded-2xl flex justify-center items-center gap-2 active:scale-95 transition-transform">
              <Navigation size={18} className="fill-black" />
              Directions
            </button>
            <button className="w-[52px] bg-white/10 hover:bg-white/15 border border-white/5 text-white rounded-2xl flex justify-center items-center active:scale-95 transition-transform">
              <Heart size={20} />
            </button>
          </div>
          
          {/* Nearby Section */}
          <h3 className="font-semibold text-white/90 text-lg mb-4 tracking-tight">Nearby Facilities</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-2xl border border-white/5 cursor-pointer">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center font-bold text-sm">WC</div>
              <div className="flex-1">
                <div className="font-semibold text-white">Restroom A</div>
                <div className="text-sm text-white/60">100m • Cleaned 1h ago</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-2xl border border-white/5 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center font-bold text-[11px] tracking-widest">FOOD</div>
              <div className="flex-1">
                <div className="font-semibold text-white">Valley Cafe</div>
                <div className="text-sm text-white/60">150m • Open until 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
