import { useState, useEffect } from 'react';
import { SmartCityImageMap } from '../../components/map/SmartCityImageMap';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, MapPin, Bus, Ticket, Calendar, Utensils, ShoppingBag, Smartphone } from 'lucide-react';

export default function LandingView() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 28, desc: 'Partly Cloudy', icon: 'cloud-sun' });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fetch weather data
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.76&longitude=100.93&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          const code = data.current_weather.weathercode;
          let desc = 'Clear';
          let icon = 'sun';
          
          if (code >= 1 && code <= 3) { desc = 'Partly Cloudy'; icon = 'cloud-sun'; }
          else if (code >= 45 && code <= 48) { desc = 'Foggy'; icon = 'cloud'; }
          else if (code >= 51 && code <= 67) { desc = 'Rainy'; icon = 'cloud-rain'; }
          else if (code >= 80 && code <= 82) { desc = 'Showers'; icon = 'cloud-rain'; }
          else if (code >= 95) { desc = 'Thunderstorm'; icon = 'cloud-lightning'; }
          
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            desc,
            icon
          });
        }
      })
      .catch(console.error);

    return () => clearInterval(timer);
  }, []);

  const WeatherIcon = () => {
    if (weather.icon === 'sun') return <Sun className="text-yellow-400" size={28} />;
    if (weather.icon === 'cloud') return <Cloud className="text-gray-300" size={28} />;
    if (weather.icon === 'cloud-rain') return <CloudRain className="text-blue-300" size={28} />;
    if (weather.icon === 'cloud-lightning') return <CloudLightning className="text-purple-400" size={28} />;
    return <CloudSun className="text-yellow-400" size={28} />;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col font-sans bg-[#050b14]">
      {/* BACKGROUND MAP */}
      <div className="absolute inset-0 z-0">
        <img src="/images/bg_nongnuch_vertical.jpg" className="w-full h-full object-cover" alt="Sky" />
      </div>
      
      {/* MAP WITH PROPER ASPECT RATIO AND FADE */}
      <div 
        className="absolute bottom-[15vh] left-[50%] -translate-x-1/2 w-[220vw] sm:w-[150vw] aspect-[16/10] z-0 pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' 
        }}
      >
        <SmartCityImageMap kioskId="default" className="!bg-transparent" />
      </div>
      
      {/* Top Gradient for readability */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0a2342]/90 via-[#0a2342]/50 to-transparent z-0 pointer-events-none"></div>

      {/* HEADER OVERLAY */}
      <header className="relative z-10 flex justify-between items-start px-10 pt-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.5)] border-2 border-yellow-400 overflow-hidden">
            <img src="/images/nongnuchlogo.png" className="w-full h-full object-cover scale-110" alt="Logo" />
          </div>
          <div className="flex flex-col drop-shadow-md">
            <h1 className="text-3xl font-serif text-white leading-none tracking-wide font-bold">NONGNOOCH</h1>
            <h1 className="text-3xl font-serif text-white leading-none tracking-wide font-bold">WONDER WORLD</h1>
            <p className="text-white/90 text-sm tracking-widest mt-1">Pattaya & Chonburi Attractions</p>
          </div>
        </div>
        
        <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-3 flex gap-6 shadow-lg border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center text-left">
              <div className="text-lg font-bold text-white leading-none tracking-wide">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div className="text-[10px] text-gray-300 font-medium mt-1 uppercase tracking-wider">{time.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-white/20 pl-6 w-[130px]">
            <WeatherIcon />
            <div className="flex flex-col justify-center">
              <div className="text-lg font-bold text-white leading-none">{weather.temp}°C</div>
              <div className="text-[10px] text-gray-300 font-medium mt-1 whitespace-nowrap">{weather.desc}</div>
            </div>
          </div>
        </div>
      </header>

      {/* CENTER TITLES */}
      <div className="relative z-10 flex flex-col items-center mt-8 drop-shadow-lg">
        <h2 className="text-3xl text-white font-serif tracking-widest uppercase">Explore the world of</h2>
        <h1 className="text-6xl text-[#1a4a2b] font-serif tracking-wider font-black mt-2 drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]" style={{ WebkitTextStroke: '1px white' }}>NONGNOOCH WONDER WORLD</h1>
        <p className="text-xl text-[#1a4a2b] font-bold mt-3 bg-white/60 px-4 py-1 rounded-full backdrop-blur-sm">สัมผัสความงามระดับโลก ที่สวนนงนุชพัทยา</p>
      </div>

      <div className="flex-1"></div>

      {/* BOTTOM PANELS */}
      <div className="relative z-10 flex justify-between items-end px-12 pb-12">
        
        {/* LEFT MENU PANEL */}
        <div className="bg-[#0b2915]/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col gap-5 w-[320px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Interactive Map</div>
              <div className="text-gray-300 text-sm">แผนที่นำทาง</div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Bus size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Real-time Shuttle</div>
              <div className="text-gray-300 text-sm">รถรับ-ส่งภายในสวน</div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Ticket size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Attractions</div>
              <div className="text-gray-300 text-sm">จุดท่องเที่ยว</div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Calendar size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Events</div>
              <div className="text-gray-300 text-sm">กิจกรรมวันนี้</div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Utensils size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Dining</div>
              <div className="text-gray-300 text-sm">ร้านอาหาร</div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Shopping</div>
              <div className="text-gray-300 text-sm">ช้อปปิ้ง</div>
            </div>
          </div>
        </div>

        {/* RIGHT QR PANEL */}
        <div className="bg-[#0b2915]/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col items-center w-[400px]">
          <h2 className="text-3xl text-white font-bold tracking-wide text-center leading-tight mb-1">SCAN TO CONTINUE<br/><span className="text-green-400">YOUR JOURNEY</span></h2>
          <p className="text-gray-300 text-center mb-6 text-sm">สแกนเพื่อสำรวจแผนที่<br/>ต่อบนมือถือ</p>
          
          <div className="w-64 h-64 bg-white rounded-3xl p-4 relative shadow-[0_0_30px_rgba(74,222,128,0.3)] mb-6">
            <div className="absolute inset-0 rounded-3xl border-4 border-green-400/50 -m-1"></div>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/mobile/zone-nongnuch')}`} 
              alt="QR Code" 
              className="w-full h-full object-contain" 
            />
          </div>

          <div className="flex items-center justify-center gap-2 border border-white/20 rounded-xl py-2 px-6 bg-white/5 w-full">
            <Smartphone className="text-gray-300" size={20} />
            <div className="flex flex-col text-left">
              <span className="text-white text-sm font-bold leading-tight">No App Required</span>
              <span className="text-gray-400 text-[10px] leading-tight">ไม่ต้องโหลดแอป</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
