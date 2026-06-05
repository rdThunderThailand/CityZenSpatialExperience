import { SmartCityImageMap } from '../../components/map/SmartCityImageMap';
import { CloudSun, MapPin, Map, Smartphone, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function KioskView() {
  const { id } = useParams();
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const videoRef4 = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Attempt to force play videos if autoplay is blocked by browser policies
    const playVideo = (ref: React.RefObject<HTMLVideoElement>) => {
      if (ref?.current) {
        ref.current.defaultMuted = true;
        ref.current.muted = true;
        ref.current.play().catch(e => console.log('Video play failed:', e));
      }
    };
    
    const playAll = () => {
      playVideo(videoRef1);
      playVideo(videoRef2);
      playVideo(videoRef3);
      playVideo(videoRef4);
    };

    playAll();

    // In case strict autoplay blocks it completely, play on first user interaction
    document.addEventListener('touchstart', playAll, { once: true });
    document.addEventListener('click', playAll, { once: true });
    return () => {
      document.removeEventListener('touchstart', playAll);
      document.removeEventListener('click', playAll);
    };
  }, []);
  const [weather, setWeather] = useState({ temp: 32, desc: 'Partly Cloudy', icon: 'cloud-sun' });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fetch real weather for Pattaya
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.9236&longitude=100.8825&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          const code = data.current_weather.weathercode;
          let desc = 'Clear';
          let icon = 'sun';
          if (code === 1 || code === 2 || code === 3) { desc = 'Partly Cloudy'; icon = 'cloud-sun'; }
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
    if (weather.icon === 'sun') return <Sun className="text-yellow-500" size={32} />;
    if (weather.icon === 'cloud') return <Cloud className="text-gray-400" size={32} />;
    if (weather.icon === 'cloud-rain') return <CloudRain className="text-blue-400" size={32} />;
    if (weather.icon === 'cloud-lightning') return <CloudLightning className="text-purple-500" size={32} />;
    return <CloudSun className="text-orange-400" size={32} />;
  };



  return (
    <>
      {/* =========================================
          PORTRAIT LAYOUT (Vertical Screen)
      ========================================= */}
      <div 
        className="landscape:hidden portrait:flex relative w-screen h-screen overflow-hidden flex-col bg-[#e8f1e6] font-sans pb-48"
        style={{ backgroundImage: "url('/images/bg_nongnuch_vertical.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* HEADER */}
        <header className="flex justify-between items-center px-10 pt-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-yellow-400 overflow-hidden">
              <img src="/images/nongnuchlogo.png" className="w-full h-full object-cover" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif text-[#3e6945] leading-none tracking-wide font-bold">NONGNOOCH</h1>
              <h1 className="text-3xl font-serif text-[#9cb046] leading-none tracking-wide font-bold">WONDER WORLD</h1>
              <p className="text-gray-500 text-sm tracking-widest mt-1">Pattaya & Chonburi Attractions</p>
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-3xl rounded-2xl px-6 py-2 flex gap-6 shadow-sm border border-white/40">
            <div className="flex flex-col justify-center text-right">
              <div className="text-xl font-bold text-gray-800 leading-none">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{time.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Open Daily : 08:00 A.M. - 06:00 P.M.</div>
            </div>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6 w-[120px]">
              <WeatherIcon />
              <div className="flex flex-col justify-center">
                <div className="text-xl font-bold text-gray-800 leading-none">{weather.temp}°C</div>
                <div className="text-xs text-gray-500 font-medium mt-1 whitespace-nowrap">{weather.desc}</div>
              </div>
            </div>
          </div>
        </header>

        {/* HERO TITLE */}
        <div className="px-10 py-2">
          <h2 className="text-2xl text-[#2a4d31] font-serif tracking-widest uppercase">Explore the world of</h2>
          <h1 className="text-5xl text-[#1a3821] font-serif tracking-wider font-bold mt-1">NONGNOOCH WONDER WORLD</h1>
          <p className="text-lg text-[#3e6945] font-medium mt-2">สัมผัสความงามระดับโลก ที่สวนนงนุชพัทยา</p>
        </div>

        {/* MAP CONTAINER */}
        <div className="px-10 py-2 h-[45vh] flex-shrink-0 relative z-10">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border-4 border-white/50 relative bg-[#050b14]">
            <SmartCityImageMap kioskId={id} />
          </div>
        </div>

        {/* MAIN CONTENT BOTTOM HALF */}
        <div className="flex-1 px-10 py-4 flex flex-col gap-4 relative z-10 overflow-hidden">
          {/* TOP ROW: HIGHLIGHTS */}
          <div className="bg-[#14361e]/40 backdrop-blur-3xl rounded-3xl p-4 shadow-xl border border-white/20 flex-1 flex flex-col min-h-0">
            <div className="mb-2">
              <h3 className="text-white font-bold text-lg leading-none flex items-center gap-2">
                <span className="text-yellow-400 text-xl">⭐</span> TODAY'S HIGHLIGHTS
              </h3>
              <p className="text-green-300 text-sm mt-1">ไฮไลต์ห้ามพลาดวันนี้</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative rounded-xl overflow-hidden group h-full animate-float-subtle" style={{ animationDelay: `${i * 0.5}s` }}>
                  <img src="/images/thai_performance.png" alt="Performance" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" style={{ animationDelay: `${i}s` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-bold text-sm leading-tight">Thai Cultural Performance</h4>
                    <p className="text-gray-300 text-[10px] mb-1">Nong Nooch Tropical Garden</p>
                    <div className="flex gap-2 text-[9px] text-white/90 font-mono bg-black/50 rounded-full px-2 py-1 w-fit backdrop-blur-md">
                      <span>10:30 AM | 11:30 AM | 01:30 PM | 03:30 PM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: SPLIT CARDS */}
          <div className="flex gap-4 flex-1 min-h-0">
            <div className="w-1/3 bg-white/30 backdrop-blur-3xl rounded-3xl p-5 shadow-xl border-2 border-white/40 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center">
                  <span className="text-xl">🚌</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 tracking-wide text-sm">SHUTTLE BUS</h4>
                  <p className="text-xs text-gray-500">รถรับ-ส่งภายในสวน</p>
                </div>
              </div>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-sm font-bold text-gray-800">Next Shuttle</p>
                  <div className="text-4xl font-black text-gray-900 tracking-tighter">03<span className="text-lg font-bold ml-1">min</span></div>
                  <p className="text-xs text-gray-500 font-medium">To Sky Garden</p>
                </div>
                <img src="/images/shuttle_bus.png" className="w-28 h-20 object-contain drop-shadow-xl animate-drive" alt="Shuttle" />
              </div>
            </div>

            <div className="flex-1 bg-white/30 backdrop-blur-3xl rounded-3xl p-5 shadow-xl border-2 border-white/40 flex flex-col justify-center">
              <div className="mb-2 shrink-0">
                <h4 className="font-bold text-gray-800 tracking-wide italic text-sm">EXPLORE & GET INSPIRED</h4>
                <p className="text-xs text-gray-500">ไฮไลต์ห้ามพลาดวันนี้</p>
              </div>
              <div className="flex gap-4 items-center justify-center mt-2">
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-200">
                  <video 
                    ref={videoRef1}
                    src="/videos/nongnooch_landing.mp4" 
                    autoPlay 
                    loop 
                    muted={true}
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-[10px] font-bold">Nongnooch Garden</span>
                  </div>
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-200">
                  <video 
                    ref={videoRef2}
                    src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" 
                    autoPlay 
                    loop 
                    muted={true}
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-[10px] font-bold">Cultural Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER QR SECTION */}
        <div className="relative py-8 bg-black/30 backdrop-blur-3xl flex items-center justify-between px-16 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20 border-t border-white/20 rounded-t-3xl mt-auto">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-3xl text-[#e8f1e6] font-serif tracking-widest text-center pr-10 mb-2">SCAN TO CONTINUE YOUR JOURNEY</h2>
            <div className="flex justify-center gap-12 pr-10">
              <div className="flex flex-col items-center gap-1">
                <MapPin className="text-red-500" size={28} />
                <div className="text-center"><p className="text-white text-xs font-bold">Interactive Map</p><p className="text-[#89a891] text-[10px]">แผนที่นำทาง</p></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Map className="text-yellow-500" size={28} />
                <div className="text-center"><p className="text-white text-xs font-bold">Real-time Shuttle</p><p className="text-[#89a891] text-[10px]">แผนที่นำทาง</p></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Smartphone className="text-pink-500" size={28} />
                <div className="text-center"><p className="text-white text-xs font-bold">No App Required</p><p className="text-[#89a891] text-[10px]">ไม่ต้องโหลดแอป</p></div>
              </div>
            </div>
          </div>
          
          <div className="w-32 h-32 bg-white rounded-2xl p-2 relative shadow-[0_0_20px_rgba(255,255,255,0.4)] border-4 border-yellow-100 -translate-y-4">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/mobile/zone-nongnuch')}`} 
              alt="QR Code" 
              className="w-full h-full object-contain mix-blend-multiply relative z-10" 
            />
          </div>
        </div>
        
      </div>

      {/* =========================================
          LANDSCAPE LAYOUT (Horizontal Screen)
      ========================================= */}
      <div 
        className="portrait:hidden landscape:flex relative w-screen h-screen overflow-hidden flex-col bg-[#e8f1e6] font-sans pb-10"
        style={{ backgroundImage: "url('/images/bg_nongnuch_horizon.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        
        {/* HEADER ROW */}
        <header className="flex justify-between items-start px-8 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-4 w-[28%]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-yellow-400 flex-shrink-0 overflow-hidden">
              <img src="/images/nongnuchlogo.png" className="w-full h-full object-cover" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif text-[#3e6945] leading-none tracking-wide font-bold">NONGNOOCH</h1>
              <h1 className="text-2xl font-serif text-[#9cb046] leading-none tracking-wide font-bold mt-1">WONDER WORLD</h1>
              <p className="text-gray-500 text-xs tracking-widest mt-1.5">Pattaya & Chonburi Attractions</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center flex-1 pt-2">
            <h2 className="text-2xl text-[#2a4d31] font-serif tracking-widest uppercase mb-1">Explore the world of</h2>
            <h1 className="text-4xl text-[#1a3821] font-serif tracking-wider font-bold mb-2">NONGNOOCH WONDER WORLD</h1>
            <p className="text-xl text-[#3e6945] font-medium">สัมผัสความงามระดับโลก ที่สวนนงนุชพัทยา</p>
          </div>
          
          <div className="w-[28%] flex justify-end">
            <div className="bg-white/40 backdrop-blur-3xl rounded-2xl px-6 py-3 flex gap-6 shadow-sm border border-white/40">
              <div className="flex flex-col justify-center text-right">
                <div className="text-xl font-bold text-gray-800 leading-none">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">{time.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Open Daily : 08:00 A.M. - 06:00 P.M.</div>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-200 pl-6 w-[120px]">
                <WeatherIcon />
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-bold text-gray-800 leading-none">{weather.temp}°C</div>
                  <div className="text-xs text-gray-500 font-medium mt-1 whitespace-nowrap">{weather.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN 3-COLUMN CONTENT */}
        <div className="flex-1 px-8 pb-4 flex gap-6 min-h-0">
          
          {/* LEFT COLUMN: HIGHLIGHTS */}
          <div className="w-[25%] bg-[#14361e]/40 backdrop-blur-3xl rounded-3xl p-5 shadow-xl border border-white/20 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-white font-bold text-xl leading-none flex items-center gap-2 italic">
                <span className="text-yellow-400 text-2xl">⭐</span> TODAY'S HIGHLIGHTS
              </h3>
              <p className="text-green-300 text-sm mt-1">ไฮไลต์ห้ามพลาดวันนี้</p>
            </div>
            
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group flex-1 min-h-0 flex-shrink-0 border-2 border-transparent shadow-lg animate-float-subtle" style={{ animationDelay: `${i * 0.4}s` }}>
                  <img src="/images/thai_performance.png" alt="Performance" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" style={{ animationDelay: `${i * 1.5}s` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-bold text-sm leading-tight mb-0.5">Thai Cultural Performance</h4>
                    <p className="text-gray-300 text-[10px] mb-2">Nong Nooch Tropical Garden</p>
                    <div className="flex gap-2 text-[9px] text-white/90 font-mono bg-black/60 rounded-full px-2 py-1 w-fit backdrop-blur-md">
                      <span>10:30 AM | 11:30 AM | 01:30 PM | 03:30 PM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP CANVAS */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex-1 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] border-4 border-white/60 relative bg-[#e8f1e6]">
              <SmartCityImageMap kioskId={id} />
            </div>
            
            <div className="py-6 min-h-[10rem] bg-black/30 backdrop-blur-3xl rounded-3xl shadow-xl flex items-center justify-between pl-10 pr-4 border border-white/20 relative overflow-hidden flex-shrink-0">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="flex flex-col flex-1">
                <h2 className="text-3xl text-[#e8f1e6] font-serif tracking-widest mb-1">SCAN TO CONTINUE YOUR JOURNEY</h2>
                <p className="text-[#89a891] text-lg mb-4">สแกนเพื่อสำรวจแผนที่ต่อบนมือถือ</p>
                
                <div className="flex gap-8">
                  <div className="flex flex-col items-center gap-1.5">
                    <MapPin className="text-red-500" size={24} />
                    <div className="text-center"><p className="text-white text-xs font-bold">Interactive Map</p><p className="text-[#89a891] text-[10px]">แผนที่นำทาง</p></div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Map className="text-yellow-500" size={24} />
                    <div className="text-center"><p className="text-white text-xs font-bold">Real-time Shuttle</p><p className="text-[#89a891] text-[10px]">แผนที่นำทาง</p></div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Smartphone className="text-pink-500" size={24} />
                    <div className="text-center"><p className="text-white text-xs font-bold">No App Required</p><p className="text-[#89a891] text-[10px]">ไม่ต้องโหลดแอป</p></div>
                  </div>
                </div>
              </div>
              
              <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-lg border-2 border-green-100 flex-shrink-0 z-10 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-green-400 to-green-600 rounded-2xl blur opacity-30"></div>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/mobile/zone-nongnuch')}`} 
                  alt="QR Code" 
                  className="w-full h-full object-contain relative z-10" 
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SHUTTLE + INSPIRE */}
          <div className="w-[25%] flex flex-col gap-6">
            <div className="bg-white/30 backdrop-blur-3xl rounded-3xl p-6 shadow-xl border-2 border-white/40 flex flex-col flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50 z-0"></div>
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-[3px] border-yellow-400 flex items-center justify-center shadow-inner">
                  <span className="text-2xl">🚌</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 tracking-wider text-lg">SHUTTLE BUS</h4>
                  <p className="text-sm text-gray-500">รถรับ-ส่งภายในสวน</p>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col flex-1 justify-center">
                <p className="text-lg font-bold text-gray-800 mb-1">Next Shuttle</p>
                <div className="text-6xl font-black text-red-600 tracking-tighter drop-shadow-sm flex items-baseline">
                  03<span className="text-2xl font-bold ml-1 text-red-600">min</span>
                </div>
                <p className="text-sm text-gray-600 font-medium mt-2">To Sky Garden</p>
              </div>
              
              <img src="/images/shuttle_bus.png" className="absolute bottom-2 -right-4 w-40 object-contain drop-shadow-2xl z-10 animate-drive" alt="Shuttle" />
            </div>

            <div className="bg-white/30 backdrop-blur-3xl rounded-3xl p-6 shadow-xl border-2 border-white/40 flex flex-col flex-1 justify-center">
              <div className="mb-4 shrink-0">
                <h4 className="font-bold text-gray-900 tracking-wider text-lg">EXPLORE & GET INSPIRED</h4>
                <p className="text-sm text-gray-500">ชมวิดีโอแนะนำสถานที่ท่องเที่ยว</p>
              </div>
              <div className="flex gap-4 items-center justify-center mt-2">
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-200">
                  <video 
                    ref={videoRef3}
                    src="/videos/nongnooch_landing.mp4" 
                    autoPlay 
                    loop 
                    muted={true}
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-[10px] font-bold">Nongnooch Garden</span>
                  </div>
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-200">
                  <video 
                    ref={videoRef4}
                    src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" 
                    autoPlay 
                    loop 
                    muted={true}
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-[10px] font-bold">Cultural Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
