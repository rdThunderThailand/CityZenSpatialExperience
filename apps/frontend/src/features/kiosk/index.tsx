import { SmartCityImageMap } from '../../components/map/SmartCityImageMap';
import { CloudSun, MapPin, Map, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function KioskView() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const BottomBar = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0a1e10] py-3 px-12 flex justify-between items-center text-white text-sm font-sans z-30 border-t border-[#1a4225]">
      <div className="font-bold tracking-wider">TH / EN</div>
      <div className="h-5 w-[1px] bg-white/30"></div>
      <div className="font-medium tracking-wide">https://www.nongnooch.world/landing</div>
      <div className="h-5 w-[1px] bg-white/30"></div>
      <div className="flex gap-4">
        <div className="w-6 h-6 bg-[#3b5998] rounded flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </div>
        <div className="w-6 h-6 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </div>
        <div className="w-6 h-6 bg-[#00B900] rounded flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* =========================================
          PORTRAIT LAYOUT (Vertical Screen)
      ========================================= */}
      <div className="landscape:hidden portrait:flex relative w-screen h-screen overflow-hidden flex-col bg-gradient-to-b from-[#e8f1e6] via-[#d4e4d4] to-[#144222] font-sans pb-48">
        {/* HEADER */}
        <header className="flex justify-between items-center px-10 pt-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-600 text-yellow-400 font-serif italic font-bold text-4xl rounded-full flex items-center justify-center shadow-md border-2 border-yellow-400">
              n
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif text-[#3e6945] leading-none tracking-wide font-bold">NONGNOOCH</h1>
              <h1 className="text-3xl font-serif text-[#9cb046] leading-none tracking-wide font-bold">WONDER WORLD</h1>
              <p className="text-gray-500 text-sm tracking-widest mt-1">Pattaya & Chonburi Attractions</p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-2 flex gap-6 shadow-sm border border-white">
            <div className="flex flex-col justify-center text-right">
              <div className="text-xl font-bold text-gray-800 leading-none">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">24 May 2025</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Open Daily : 08:00 A.M. - 06:00 P.M.</div>
            </div>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <CloudSun className="text-orange-400" size={32} />
              <div className="flex flex-col justify-center">
                <div className="text-xl font-bold text-gray-800 leading-none">28°C</div>
                <div className="text-xs text-gray-500 font-medium mt-1">Partly Cloudy</div>
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
            <SmartCityImageMap />
          </div>
        </div>

        {/* MAIN CONTENT BOTTOM HALF */}
        <div className="flex-1 px-10 py-4 flex flex-col gap-4 relative z-10 overflow-hidden">
          {/* TOP ROW: HIGHLIGHTS */}
          <div className="bg-[#14361e] rounded-3xl p-4 shadow-xl border border-white/10 flex-1 flex flex-col min-h-0">
            <div className="mb-2">
              <h3 className="text-white font-bold text-lg leading-none flex items-center gap-2">
                <span className="text-yellow-400 text-xl">⭐</span> TODAY'S HIGHLIGHTS
              </h3>
              <p className="text-green-300 text-sm mt-1">ไฮไลต์ห้ามพลาดวันนี้</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative rounded-xl overflow-hidden group h-full">
                  <img src="/images/thai_performance.png" alt="Performance" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
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
            <div className="w-1/3 bg-white rounded-3xl p-5 shadow-xl border-4 border-white flex flex-col justify-between">
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
                <img src="/images/shuttle_bus.png" className="w-28 h-20 object-contain drop-shadow-xl translate-x-2" alt="Shuttle" />
              </div>
            </div>

            <div className="flex-1 bg-white rounded-3xl p-5 shadow-xl border-4 border-white flex flex-col">
              <div className="mb-2">
                <h4 className="font-bold text-gray-800 tracking-wide italic text-sm">EXPLORE & GET INSPIRED</h4>
                <p className="text-xs text-gray-500">ไฮไลต์ห้ามพลาดวันนี้</p>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm">
                  <img src="/images/thai_performance.png" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-bold">Thai Cultural Performance</span>
                  </div>
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-sm">
                  <img src="/images/dinosaur_valley.png" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-bold">Dinosaur Valley</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER QR SECTION */}
        <div className="absolute bottom-10 left-0 right-0 h-36 bg-gradient-to-r from-[#173822] via-[#20492d] to-[#122e1a] flex items-center justify-between px-16 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20 border-t border-white/10 rounded-t-3xl">
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
        
        <BottomBar />
      </div>

      {/* =========================================
          LANDSCAPE LAYOUT (Horizontal Screen)
      ========================================= */}
      <div className="portrait:hidden landscape:flex relative w-screen h-screen overflow-hidden flex-col bg-gradient-to-b from-[#e8f1e6] via-[#d4e4d4] to-[#144222] font-sans pb-10">
        
        {/* HEADER ROW */}
        <header className="flex justify-between items-start px-8 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-4 w-[28%]">
            <div className="w-16 h-16 bg-red-600 text-yellow-400 font-serif italic font-bold text-4xl rounded-full flex items-center justify-center shadow-md border-2 border-yellow-400 flex-shrink-0">
              n
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
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 flex gap-6 shadow-sm border border-white">
              <div className="flex flex-col justify-center text-right">
                <div className="text-xl font-bold text-gray-800 leading-none">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">24 May 2025</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Open Daily : 08:00 A.M. - 06:00 P.M.</div>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                <CloudSun className="text-orange-400" size={32} />
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-bold text-gray-800 leading-none">28°C</div>
                  <div className="text-xs text-gray-500 font-medium mt-1">Partly Cloudy</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN 3-COLUMN CONTENT */}
        <div className="flex-1 px-8 pb-4 flex gap-6 min-h-0">
          
          {/* LEFT COLUMN: HIGHLIGHTS */}
          <div className="w-[25%] bg-[#14361e] rounded-3xl p-5 shadow-xl border border-white/10 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-white font-bold text-xl leading-none flex items-center gap-2 italic">
                <span className="text-yellow-400 text-2xl">⭐</span> TODAY'S HIGHLIGHTS
              </h3>
              <p className="text-green-300 text-sm mt-1">ไฮไลต์ห้ามพลาดวันนี้</p>
            </div>
            
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group flex-1 min-h-0 flex-shrink-0 border-2 border-transparent hover:border-yellow-400 transition-colors cursor-pointer shadow-lg">
                  <img src="/images/thai_performance.png" alt="Performance" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
              <SmartCityImageMap />
            </div>
            
            <div className="h-40 bg-gradient-to-r from-[#173822] via-[#20492d] to-[#122e1a] rounded-3xl shadow-xl flex items-center justify-between pl-10 pr-4 py-4 border border-white/10 relative overflow-hidden flex-shrink-0">
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
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col flex-1 relative overflow-hidden group">
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
              
              <img src="/images/shuttle_bus.png" className="absolute bottom-2 -right-4 w-40 object-contain drop-shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-x-2" alt="Shuttle" />
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col flex-1">
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 tracking-wider text-lg">EXPLORE & GET INSPIRED</h4>
                <p className="text-sm text-gray-500">ชมวิดีโอแนะนำสถานที่ท่องเที่ยว</p>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                <img src="/images/dinosaur_valley.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white text-sm font-bold">Dinosaur Valley Tour</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <BottomBar />
      </div>

    </>
  );
}
