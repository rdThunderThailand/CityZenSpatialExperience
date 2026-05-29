import { MapContainer } from '../../components/map/MapContainer';
import { Layers, AlertTriangle, ShieldAlert, Bus, MonitorSmartphone, Settings } from 'lucide-react';

export default function ControlRoomView() {
  return (
    <div className="w-screen h-screen flex flex-col bg-brand-dark text-white overflow-hidden">
      
      {/* Sleek Header */}
      <header className="h-16 bg-[#121619] border-b border-white/5 flex items-center px-6 shrink-0 z-20">
        <div className="font-bold text-lg tracking-wide flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_12px_rgba(46,204,113,0.8)]"></div>
          CityZen Spatial Core
        </div>
        <div className="ml-10 flex gap-1">
          <button className="text-white bg-white/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Live Map</button>
          <button className="text-white/50 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Fleet</button>
          <button className="text-white/50 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Incidents</button>
          <button className="text-white/50 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">CCTV</button>
        </div>
        <div className="ml-auto">
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Settings size={18} className="text-white/70" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        
        {/* Left Floating Toolbar */}
        <div className="absolute left-6 top-6 bottom-6 w-16 bg-[#121619]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center py-6 space-y-4 z-10 shadow-2xl">
          <button className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center cursor-pointer hover:bg-brand-green/30 transition-colors shadow-inner" title="Map Layers">
            <Layers size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" title="Shuttles Layer">
            <Bus size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" title="Device Status">
            <MonitorSmartphone size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors mt-auto" title="Active Incidents">
            <ShieldAlert size={20} />
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative pl-28 pr-[340px]"> {/* Padding to account for floating panels */}
          <div className="absolute inset-0">
            <MapContainer interactive={true} />
          </div>
        </div>

        {/* Right Floating Info Panel */}
        <div className="absolute right-6 top-6 bottom-6 w-80 bg-[#121619]/80 backdrop-blur-xl border border-white/10 rounded-3xl z-10 p-5 flex flex-col shadow-2xl">
          <h3 className="font-semibold text-white/50 mb-4 uppercase tracking-widest text-xs">Active Incidents</h3>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3">
            
            {/* Critical Incident Card */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 transition-transform hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                <AlertTriangle size={16} className="animate-pulse" />
                Crowd Alert
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-3">High density detected at Dinosaur Show entrance. Exceeds threshold by 15%.</p>
              <div className="flex justify-between items-center text-xs text-red-400/70 font-medium">
                <span>Zone B</span>
                <span>Just now</span>
              </div>
            </div>

            {/* Warning Incident Card */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 transition-transform hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                <ShieldAlert size={16} />
                Maintenance
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-3">Kiosk 4 has gone offline.</p>
              <div className="flex justify-between items-center text-xs text-amber-400/70 font-medium">
                <span>Zone A</span>
                <span>5m ago</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
