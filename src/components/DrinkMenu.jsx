import React from 'react';
import { ArrowLeft, Coffee, Zap, Droplets } from 'lucide-react';

export default function DrinkMenu({ onBack }) {
  const espressoMenu = [
    {
      name: '아메리카노(HOT / ICED)',
      english: 'Americano',
      size: '16oz',
      price: '3.5',
      description: '자체 블랜드 원두를 사용하는 고소해 매일 마실 수 있는 아메리카노'
    },
    {
      name: '디카페인 아메리카노(HOT / ICED)',
      english: 'Decaffeine',
      size: '16oz',
      price: '3.5',
      description: '카페인 걱정 없는 커피를 원한다면 탁월한 선택'
    },
    {
      name: '카페 라떼(HOT / ICED)',
      english: 'Caffè Latte',
      size: '16oz',
      price: '3.5',
      description: '자체 블랜드 원두, 우유로 제조한 든든한 커피 우유'
    },
    {
      name: 'HP/MP 물약(ICED Only)',
      english: 'HP/MP Potion',
      size: '16oz',
      price: '4.0',
      description: '자체 블랜드 원두, 우유, 붉은/파란 큐라소 얼음으로 제조한 달달한 아이스 라떼',
      isSpecial: true
    }
  ];

  const handDripMenu = [
    {
      name: 'THE ESSENCE #1',
      description: 'PANAMA HACIENDA LA ESMERALDA PRIVATE COLLECTION GEISHA(W) EL VELO',
      price: '15.0'
    },
    {
      name: 'THE GOLD #1',
      description: 'PANAMA HACIENDA LONG BOARD GEISHA(W)',
      price: '20.0'
    },
    {
      name: 'THE ESSENCE #2',
      description: 'PANAMA HACIENDA LA ESMERALDA PRIVATE COLLECTION GEISHA(W) EL VELO',
      price: '15.0'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0b] text-white font-sans selection:bg-copper relative overflow-x-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-copper/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-copper/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0b0c0b]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-copper transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={18} />
          돌아가기
        </button>
        <div className="flex items-center gap-3">
          <img src="/logo-alchemist.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-serif font-black tracking-tighter text-white">ARCHEMIST</span>
        </div>
        <div className="w-20"></div> {/* Spacer for balance */}
      </header>

      <main className="pt-24 pb-16 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        {/* Espresso Menu Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
            <h2 className="bg-white text-black px-4 py-1 text-2xl font-black rounded-sm shadow-[4px_4px_0px_rgba(161,118,76,1)]">
              에스프레소 메뉴
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid gap-6">
            {espressoMenu.map((item, idx) => (
              <div 
                key={idx} 
                className={`group relative p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-copper/30 transition-all duration-500 ${item.isSpecial ? 'overflow-hidden' : ''}`}
              >
                {item.isSpecial && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold group-hover:text-copper transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs text-gray-500 font-medium tracking-tight bg-white/5 px-2 py-0.5 rounded uppercase">
                        {item.english}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-gray-400 font-medium text-sm italic">{item.size}</span>
                    <div className="h-4 w-[1px] bg-white/20"></div>
                    <span className="text-2xl font-serif font-black text-copper">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-grow flex items-center">
                    <div className="h-[1px] flex-grow border-t border-dotted border-white/20 mr-4"></div>
                    <p className="text-gray-400 text-sm font-light break-keep max-w-[70%]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.isSpecial && (
                  <div className="absolute top-0 right-0 p-2 flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Droplets className="text-red-400 animate-pulse" size={12} />
                    <Zap className="text-blue-400 animate-pulse delay-75" size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hand Drip Menu Section */}
        <section>
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
            <h2 className="bg-white text-black px-4 py-1 text-2xl font-black rounded-sm shadow-[4px_4px_0px_rgba(161,118,76,1)]">
              핸드 드립 메뉴
            </h2>
            <div className="bg-white text-black px-3 py-1 text-sm font-bold rounded-sm ml-2">
              2026년 3월 아키미스트 로스터리 추천 스페셜티 커피
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid gap-6">
            {handDripMenu.map((item, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-copper/30 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-copper transition-colors tracking-tight uppercase">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium tracking-wider break-keep">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="h-10 w-[1px] border-l border-dotted border-white/20 hidden md:block"></div>
                    <span className="text-3xl font-serif font-black text-copper">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 flex flex-col items-center gap-4">
        <div className="h-[1px] w-24 bg-copper/20 mb-4"></div>
        <p className="text-gray-600 text-[10px] tracking-[0.5em] uppercase font-bold text-center">
          Crafted by Archemist Roasters
        </p>
      </footer>
    </div>
  );
}
