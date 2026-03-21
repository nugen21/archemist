import React from 'react';
import { Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft } from 'lucide-react';

export default function BeanDetail({ bean, onBack }) {
  if (!bean) return null;

  // Use registered data with neutral fallbacks
  const roastWb = bean.roastWb || '-';
  const roastGround = bean.roastGround || '-';
  const roastTime = bean.roastTime || "-";
  const cupNotes = bean.cupNotes || '다채롭고 우아한 플레이버';
  
  const dripper = bean.dripper || '-';
  const coffeeWeight = bean.coffeeAmount || '-';
  const grind = bean.grind || '-';
  const waterTemp = bean.temp || '-';

  return (
    <section className="min-h-screen py-12 px-4 sm:px-8 bg-[#111211] relative overflow-hidden text-gray-200 selection:bg-copper selection:text-white">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[110] flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-copper uppercase tracking-widest transition-all bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gray-800 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Roastery
      </button>

      {/* Decorative background alchemy circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-copper/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-copper/5 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none drop-shadow-[0_0_15px_rgba(161,118,76,0.1)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 pt-16">
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1.5 border border-copper/40 rounded-full mb-6 bg-copper/5 backdrop-blur-sm">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-copper uppercase drop-shadow-[0_0_10px_rgba(161,118,76,0.8)]">The Archemist Report</h2>
          </div>
          <h3 className="text-4xl sm:text-6xl font-bold text-gray-100 mb-3 tracking-tight">{bean.name}</h3>
          <h4 className="text-2xl sm:text-3xl font-serif text-copper mb-8 italic">{bean.variety} {bean.process && `/ ${bean.process}`}</h4>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light break-keep">
            {bean.region && `${bean.region}의 고유한 테루아가 선사하는`} {cupNotes}. 아키미스트 로스터스만의 치밀한 로스팅 데이터로 설계된 {bean.name}의 완벽한 한 잔을 경험하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Card 1: Roast Data Profile */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-8 text-lg border-b border-copper/30 pb-2 w-full text-center">ROAST DATA PROFILE</h4>
            
            <div className="flex w-full justify-between items-center mb-10 px-2 sm:px-6">
              <div className="w-1/2 flex justify-center mix-blend-screen opacity-70">
                <img 
                  src="/roaster_machine.png" 
                  alt="Roaster Machine"
                  className="w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(161,118,76,0.3)]" 
                />
              </div>
              
              <div className="w-1/2 flex flex-col gap-5 text-right">
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Agtron Scale (WB)</p>
                  <p className="text-3xl text-gray-100 font-bold font-serif">{roastWb}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Agtron Scale (G)</p>
                  <p className="text-3xl text-gray-100 font-bold font-serif">{roastGround}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase mb-1">Roast Time</p>
                  <p className="text-2xl text-copper font-bold">{roastTime}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto w-full text-center py-4 border-t border-gray-800">
               <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Roast Date: {bean.roastDate || 'Current Roast'}</p>
            </div>
          </div>

          {/* Card 2: Brewing Alchemy */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-6 text-lg border-b border-copper/30 pb-2 w-full text-center">BREWING ALCHEMY</h4>
            
            <div className="flex w-full justify-between items-start mb-10 px-1 mt-4">
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Dripper</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs">☕</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">{dripper}</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Coffee</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs font-serif text-copper">{coffeeWeight.replace('g', '')}</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">{coffeeWeight}</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Grind</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs">⚙️</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight truncate px-1">{grind.split(' ')[0]}</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-1/4">
                <p className="text-[9px] text-gray-500 tracking-widest uppercase text-center h-4">Temp</p>
                <div className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-xs text-red-500/80">🌡️</div>
                <p className="text-[11px] font-bold text-gray-200 text-center leading-tight">{waterTemp}</p>
              </div>
            </div>

            <div className="w-full mt-auto bg-black/40 rounded-xl p-5 border border-gray-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] min-h-[140px]">
              <p className="text-[10px] text-copper text-center font-bold tracking-widest uppercase mb-4">Pouring Strategy</p>
              <div className="text-[12px] text-gray-400 leading-relaxed font-light whitespace-pre-wrap">
                {bean.recipe || '정밀한 추출 레시피 정보가 아직 업데이트되지 않았습니다.'}
              </div>
            </div>
          </div>

          {/* Card 3: Sensory Map */}
          <div className="bg-gradient-to-b from-[#181a19] to-[#111211] border border-copper/20 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-copper/40 transition-colors duration-500">
            <h4 className="text-copper font-serif font-bold tracking-widest mb-6 text-lg border-b border-copper/30 pb-2 w-full text-center">SENSORY MAP</h4>
            
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center mix-blend-screen scale-110">
                <img 
                  src="/radar_chart.png"
                  alt="Sensory Map Radar Chart"
                  className="w-[120%] h-[120%] object-contain drop-shadow-[0_0_15px_rgba(161,118,76,0.3)] opacity-40" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-copper/30 text-[10px] font-bold uppercase tracking-[0.3em]">Alchemy Profile</div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 w-full px-2 mb-8">
               {cupNotes.split(',').map((note, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[60px]">
                    <span className="text-xl">✨</span>
                    <span className="text-[10px] text-gray-300 font-medium tracking-wider uppercase">{note.trim()}</span>
                 </div>
               ))}
            </div>

            <div className="w-full mt-auto flex flex-col gap-3">
              <button className="w-full bg-[#1e201e] border border-gray-600 text-gray-300 py-3.5 rounded-sm hover:border-copper hover:text-copper transition-colors duration-300 uppercase text-[10px] tracking-widest font-bold shadow-md">
                Inquiry This Roast
              </button>
              <button className="w-full bg-[#fee500]/10 border border-[#fee500]/30 text-[#fee500] py-3.5 rounded-sm hover:bg-[#fee500] hover:text-black transition-colors duration-300 uppercase text-[10px] tracking-widest font-bold flex items-center justify-center gap-2 shadow-md">
                <MessageCircle size={14} /> Kakao Consultation
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
