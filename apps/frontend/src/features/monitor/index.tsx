import { MapContainer } from '../../components/map/MapContainer';
import { Bus, Clock, CalendarDays, Radio } from 'lucide-react';

export default function MonitorView() {
  return (
    <div className="relative w-screen h-screen bg-brand-dark text-white overflow-hidden">
      
      {/* Map layer fills screen completely */}
      <div className="absolute inset-0">
        <MapContainer interactive={false} />
      </div>

      {/* Floating Sidebar overlay */}
      <div className="absolute top-8 left-8 bottom-8 w-[400px] z-10 flex flex-col">
        <div className="h-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex flex-col shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 mb-8">
            <Radio className="text-brand-green animate-pulse" size={28} />
            <h1 className="text-3xl font-bold tracking-tight">Live Status</h1>
          </div>
          
          <div className="space-y-6 flex-1">
            {/* Shuttle Card */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-inner">
              <div className="flex items-center gap-2 mb-4 text-brand-green">
                <Bus size={20} />
                <h2 className="text-xl font-semibold">Next Shuttle</h2>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div className="text-6xl font-bold tracking-tighter">3</div>
                <div className="text-xl text-brand-green font-medium mb-1.5">min</div>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock size={14} />
                <span>Arriving at Station A</span>
              </div>
            </div>
            
            {/* Events Card */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-inner">
              <div className="flex items-center gap-2 mb-5 text-brand-green">
                <CalendarDays size={20} />
                <h2 className="text-xl font-semibold">Live Events</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="font-medium text-lg">Dinosaur Valley Show</span>
                  <span className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">LIVE</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white/70">Cultural Dance</span>
                  <span className="text-white/50 text-sm font-medium bg-white/5 px-3 py-1 rounded-full">In 15 mins</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">CityZen Spatial Core • Monitor A1</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
