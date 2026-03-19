import React from 'react';
import { Droplet, Thermometer, Timer, Target, Scale, MessageCircle } from 'lucide-react';

export default function Beans() {
  return (
    <section id="beans" className="py-24 px-4 sm:px-8 bg-[#111211] relative border-t border-gray-800 overflow-hidden">
      {/* Decorative background alchemy circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-copper/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-copper/5 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none drop-shadow-[0_0_15px_rgba(161,118,76,0.1)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-copper/10 rounded-full animate-[spin_100s_linear_infinite] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1.5 border border-copper/40 rounded-full mb-6 bg-copper/5 backdrop-blur-sm">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-copper uppercase drop-shadow-[0_0_10px_rgba(161,118,76,0.8)]">The Archemist Report #01</h2>
          </div>
          <h3 className="text-4xl sm:text-6xl font-bold text-gray-100 mb-3 tracking-tight">Panama La Esmeralda</h3>
          <h4 className="text-2xl sm:text-4xl font-serif text-copper mb-8 italic">Geisha Washed</h4>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light break-keep">
            자스민 뉘앙스의 화사한 아로마와 복숭아를 베어 문 듯한 달콤함. 아키미스트 로스터스만의 치밀한 로스팅 데이터로 설계된 파나마 에스메랄다 게이샤 워시드의 완벽한 한 잔을 경험하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Card 1: Roast Data Profile */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-8 text-lg border-b border-copper/30 pb-2 w-full text-center">ROAST DATA PROFILE</h4>
            
            <div className="flex w-full justify-between items-center mb-10 px-2 sm:px-6">
              {/* Generated Roaster Graphic */}
              <div className="w-1/2 flex justify-center mix-blend-screen">
                <img 
                  src="/roaster_machine.png" 
                  alt="Roaster Machine"
                  className="w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(161,118,76,0.3)]" 
                />
              </div>
              
              {/* Data Values */}
              <div className="w-1/2 flex flex-col gap-5 text-right">
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Agtron Scale (WB)</p>
                  <p className="text-3xl text-gray-100 font-bold font-serif shadow-copper">64.6</p>
                  <p className="text-[10px] text-copper tracking-widest mt-1">MEDIUM LIGHT</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Agtron Scale (G)</p>
                  <p className="text-3xl text-gray-100 font-bold font-serif">77.4</p>
                  <p className="text-[10px] text-copper tracking-widest mt-1">LIGHT</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Roast Time</p>
                  <p className="text-2xl text-copper font-bold">9' 15"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Brewing Alchemy */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-6 text-lg border-b border-copper/30 pb-2 w-full text-center">BREWING ALCHEMY</h4>
            
            {/* Visual Dripper Decoration Sprited from mockup.png */}
            <div className="flex-grow flex items-center justify-center w-full mb-6 z-10 mix-blend-screen mt-4 h-32">
                <div 
                  className="w-48 h-full drop-shadow-[0_0_15px_rgba(161,118,76,0.3)]" 
                  style={{
                    backgroundImage: "url('/mockup.png')",
                    backgroundSize: "1000px auto",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat"
                  }}
                ></div>
            </div>

            {/* Base Specs */}
            <div className="flex w-full justify-between items-start mb-6 px-1">
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Dripper</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs">☕</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">Hario<br/>V60</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Coffee</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs font-serif text-copper">18</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">18g</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Grind</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs">⚙️</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">Comandante<br/><span className="text-copper font-normal">25 clicks</span></p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Temp</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs text-red-500/80">🌡️</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">94°C</p>
              </div>
            </div>

            {/* Graphic Recipe Flow */}
            <div className="w-full mt-auto bg-black/40 rounded-xl p-5 border border-gray-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] h-36 flex flex-col justify-between">
              <p className="text-[10px] text-copper text-center font-bold tracking-widest uppercase mb-2">Pouring Timeline</p>
              
              <div className="relative w-full flex-grow mt-2">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-gray-800 -translate-y-1/2"></div>
                
                {/* Steps */}
                <div className="absolute top-0 left-[5%] flex flex-col items-center h-full justify-between -ml-3 w-8">
                  <span className="text-[10px] text-blue-300 font-bold drop-shadow-[0_0_5px_rgba(147,197,253,0.5)] bg-transparent px-1">+36g</span>
                  <div className="w-2.5 h-2.5 bg-white border-2 border-copper rounded-full z-10 shadow-[0_0_8px_rgba(161,118,76,1)]"></div>
                  <span className="text-[9px] text-gray-400 bg-transparent px-1 whitespace-nowrap">0:00 (뜸)</span>
                </div>

                <div className="absolute top-0 left-[35%] flex flex-col items-center h-full justify-between -ml-3 w-8">
                  <span className="text-[10px] text-blue-300 font-bold bg-transparent px-1">+80g</span>
                  <div className="w-2 h-2 bg-[#222] border border-copper rounded-full z-10"></div>
                  <span className="text-[9px] text-gray-400 bg-transparent px-1">0:30</span>
                </div>

                <div className="absolute top-0 left-[65%] flex flex-col items-center h-full justify-between -ml-3 w-8">
                  <span className="text-[10px] text-blue-300 font-bold bg-transparent px-1">+80g</span>
                  <div className="w-2 h-2 bg-[#222] border border-copper rounded-full z-10"></div>
                  <span className="text-[9px] text-gray-400 bg-transparent px-1">1:00</span>
                </div>

                <div className="absolute top-0 left-[95%] flex flex-col items-center h-full justify-between -ml-3 w-8">
                  <span className="text-[10px] text-blue-300 font-bold bg-transparent px-1">+80g</span>
                  <div className="w-2 h-2 bg-[#222] border border-copper rounded-full z-10"></div>
                  <span className="text-[9px] text-gray-400 bg-transparent px-1 whitespace-nowrap">1:30<span className="text-[8px] text-gray-600 block leading-none pt-1">Finish~</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Sensory Map */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-6 text-lg border-b border-copper/30 pb-2 w-full text-center">SENSORY MAP</h4>
            
            {/* Generated Radar Chart */}
            <div className="relative w-48 h-48 mb-6 flex items-center justify-center mix-blend-screen scale-110">
                <img 
                  src="/radar_chart.png"
                  alt="Sensory Map Radar Chart"
                  className="w-[120%] h-[120%] object-contain drop-shadow-[0_0_15px_rgba(161,118,76,0.3)]" 
                />
            </div>

            {/* Flavor Notes Icons */}
            <div className="flex justify-evenly w-full px-2 mb-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">🌸</span>
                <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider">Jasmine</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">🍇</span>
                <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider">Blackberry</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">🌿</span>
                <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider">Spices</span>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full mt-auto flex flex-col gap-3">
              <button className="w-full bg-[#1e201e] border border-gray-600 text-gray-300 py-3.5 rounded hover:border-copper hover:text-copper transition-colors duration-300 uppercase text-xs sm:text-sm tracking-widest font-bold shadow-md">
                Subscribe to this Roast
              </button>
              <button className="w-full bg-[#fee500]/10 border border-[#fee500]/30 text-[#fee500] py-3.5 rounded hover:bg-[#fee500] hover:text-black transition-colors duration-300 uppercase text-xs sm:text-sm tracking-widest font-bold flex items-center justify-center gap-2 shadow-md">
                <MessageCircle size={16} /> Chat with Roaster
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
