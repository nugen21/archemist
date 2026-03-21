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
    <div className="min-h-screen bg-[#0b0c0b] text-white font-sans selection:bg-copper relative overflow-x-hidden flex flex-col">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-copper/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-copper/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0b0c0b]/40 backdrop-blur-xl border-b border-white/5 py-5 px-6 flex justify-between items-center transition-all duration-500 hover:bg-[#0b0c0b]/60">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-copper transition-all font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>HOME</span>
        </button>
        <div className="flex items-center gap-4 flex-grow justify-center -ml-20">
          <img src="/logo-alchemist.png" alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-3xl sm:text-5xl font-serif font-black tracking-[-0.02em] text-white">ARCHEMIST ROASTERS</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center pt-36 pb-20 px-4 sm:px-8 md:px-12 relative z-10">
        <div className="w-full max-w-4xl flex flex-col gap-10">
          {/* Espresso Menu Section */}
          {espressoMenu.length > 0 && (
            <section>
              <div className="flex flex-col mb-6 relative">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tighter text-white/50">
                    ESPRESSO
                  </h2>
                  <span className="text-copper/40 font-bold tracking-[0.3em] text-[8px] uppercase">에스프레소</span>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-copper/20 via-transparent to-transparent"></div>
              </div>

              <div className="grid gap-3">
                {espressoMenu.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className={`group relative py-2.5 px-6 sm:px-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-500 ${item.isSpecial ? 'shadow-[0_0_20px_rgba(161,118,76,0.06)]' : ''}`}
                  >
                    {item.isSpecial && (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-copper transition-colors tracking-tight">
                          {item.name}
                        </h3>
                        {item.englishName && (
                          <span className="text-[10px] text-gray-600 font-bold tracking-[0.1em] uppercase opacity-40 hidden lg:inline">
                            {item.englishName}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-4 shrink-0">
                        {item.size && <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{item.size}</span>}
                        <span className="text-3xl sm:text-4xl font-serif font-black text-copper">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="h-[1px] w-12 bg-copper/30 hidden sm:block"></div>
                      <p className="text-gray-400 text-base sm:text-lg font-medium leading-relaxed break-keep">
                        {item.cupNotes || item.description || ''}
                      </p>
                    </div>

                    {item.isSpecial && (
                      <div className="absolute top-6 right-8 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400/80 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400/80 animate-pulse delay-300"></div>
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
              <div className="flex flex-col mb-6 relative">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tighter text-white/50">
                      HAND DRIP
                    </h2>
                    <span className="text-copper/40 font-bold tracking-[0.3em] text-[8px] uppercase">핸드 드립</span>
                  </div>
                  <div className="bg-copper/5 border border-copper/10 px-3 py-1 rounded-full hidden sm:block">
                    <span className="text-[9px] font-black text-copper/60 uppercase tracking-[0.12em]">
                      March 2026 Selection
                    </span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-copper/20 via-transparent to-transparent"></div>
              </div>

              <div className="grid gap-3">
                {handDripMenu.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="group relative py-3 px-6 sm:px-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-grow">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-copper transition-colors tracking-tight uppercase leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4">
                           <div className="h-4 w-[1px] bg-copper/30"></div>
                           <p className="text-gray-400 text-sm sm:text-base font-bold tracking-wide leading-relaxed break-keep uppercase">
                             {item.cupNotes || item.description || ''}
                           </p>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-6 shrink-0">
                        <div className="h-10 w-[1px] border-l border-dotted border-white/20 hidden md:block"></div>
                        <span className="text-4xl sm:text-5xl font-serif font-black text-copper">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="py-20 px-6 flex flex-col items-center gap-6 relative z-10">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-copper/30 to-transparent"></div>
        <p className="text-white/40 text-[24px] tracking-[0.6em] uppercase font-black text-center">
          ARCHEMIST ROASTERS
        </p>
      </footer>
    </div>
  );
}
