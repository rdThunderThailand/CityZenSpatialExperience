import { MapContainer } from '../../components/map/MapContainer';
import { useParams } from 'react-router-dom';
import { MapPin, QrCode } from 'lucide-react';

export default function KioskView() {
  const { id } = useParams();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-brand-dark text-white">
      
      {/* Map Layer full screen */}
      <div className="absolute inset-0">
        <MapContainer interactive={false} />
      </div>

      {/* Top Floating Badge */}
      <div className="absolute top-10 left-10 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl">
        <MapPin className="text-brand-green" size={32} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">YOU ARE HERE</h1>
          <p className="text-sm text-brand-green font-semibold tracking-widest uppercase mt-0.5">Kiosk {id}</p>
        </div>
      </div>

      {/* Bottom Floating QR Panel */}
      <div className="absolute bottom-10 left-10 right-10 z-10 bg-black/70 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <QrCode className="text-brand-green" size={28} />
            <h2 className="text-4xl font-bold tracking-tight">Scan to Continue</h2>
          </div>
          <p className="text-xl text-white/70 leading-relaxed font-medium">
            Take this map with you! Get live walking directions and event notifications directly on your phone.
          </p>
        </div>
        
        {/* Apple-style QR Container */}
        <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-[32px] p-4 shadow-inner border border-white/20 flex-shrink-0">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden p-3">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/mobile/zone-' + (id || 'default'))}`} 
              alt="QR Code" 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
