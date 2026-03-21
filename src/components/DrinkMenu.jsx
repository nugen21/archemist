import React, { useState, useEffect } from 'react';
import { ArrowLeft, Coffee, Zap, Droplets } from 'lucide-react';

export default function DrinkMenu({ onBack }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        const response = await fetch(`/products.json?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setDrinks(data.filter(p => p.category === 'beverage' && p.visible !== false));
        } else {
          const localSaved = localStorage.getItem('archemist_beans');
          if (localSaved) {
            const data = JSON.parse(localSaved);
            setDrinks(data.filter(p => p.category === 'beverage' && p.visible !== false));
          }
        }
      } catch (error) {
        console.error('Failed to load drinks:', error);
      }
    };

    loadDrinks();
    window.addEventListener('beansUpdated', loadDrinks);
    return () => window.removeEventListener('beansUpdated', loadDrinks);
  }, []);

  const espressoMenu = drinks.filter(d => d.subCategory === 'espresso' || !d.subCategory);
  const handDripMenu = drinks.filter(d => d.subCategory === 'handdrip');

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
        {espressoMenu.length > 0 && (
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
                  key={item.id || idx} 
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
                        {item.englishName && (
                          <span className="text-xs text-gray-500 font-medium tracking-tight bg-white/5 px-2 py-0.5 rounded uppercase">
                            {item.englishName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      {item.size && <span className="text-gray-400 font-medium text-sm italic">{item.size}</span>}
                      {item.size && item.price && <div className="h-4 w-[1px] bg-white/20"></div>}
                      <span className="text-2xl font-serif font-black text-copper">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-grow flex items-center">
                      <div className="h-[1px] flex-grow border-t border-dotted border-white/20 mr-4"></div>
                      <p className="text-gray-400 text-sm font-light break-keep max-w-[70%]">
                        {item.cupNotes || item.description || ''}
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
        )}

        {/* Hand Drip Menu Section */}
        {handDripMenu.length > 0 && (
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
                  key={item.id || idx} 
                  className="group p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-copper/30 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-copper transition-colors tracking-tight uppercase">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs font-medium tracking-wider break-keep">
                        {item.cupNotes || item.description || ''}
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
        )}
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
