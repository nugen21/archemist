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
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-copper/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-copper/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0b0c0b]/40 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex justify-between items-center transition-all duration-500 hover:bg-[#0b0c0b]/60">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-copper transition-all font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO HOME</span>
        </button>
        <div className="flex items-center gap-3 scale-90 sm:scale-100">
          <img src="/logo-alchemist.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-serif font-black tracking-[-0.05em] text-white">ARCHEMIST</span>
        </div>
        <div className="hidden sm:block w-24"></div>
      </header>

      <main className="pt-32 pb-24 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        {/* Espresso Menu Section */}
        {espressoMenu.length > 0 && (
          <section className="mb-24">
            <div className="flex flex-col mb-12 relative">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-5xl sm:text-7xl font-serif font-black tracking-tighter text-white/90">
                  ESPRESSO
                </h2>
                <span className="text-copper font-bold tracking-[0.3em] text-[10px] uppercase">에스프레소</span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-copper/40 via-copper/10 to-transparent"></div>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {espressoMenu.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  className={`group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-700 ${item.isSpecial ? 'shadow-[0_0_40px_rgba(161,118,76,0.1)]' : ''}`}
                >
                  {item.isSpecial && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 pointer-events-none animate-pulse"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-2xl font-bold group-hover:text-copper transition-colors tracking-tight">
                          {item.name}
                        </h3>
                        {item.englishName && (
                          <span className="text-[10px] text-gray-500 font-bold tracking-[0.1em] uppercase opacity-60">
                            {item.englishName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-3 shrink-0">
                      {item.size && <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.size}</span>}
                      <span className="text-3xl font-serif font-black text-copper drop-shadow-[0_0_15px_rgba(161,118,76,0.3)]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block h-[1px] w-12 border-t border-copper/30"></div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed break-keep max-w-[85%]">
                      {item.cupNotes || item.description || ''}
                    </p>
                  </div>

                  {item.isSpecial && (
                    <div className="absolute top-4 right-6 flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping delay-300"></div>
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
            <div className="flex flex-col mb-12 relative">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-5xl sm:text-7xl font-serif font-black tracking-tighter text-white/90">
                    HAND DRIP
                  </h2>
                  <span className="text-copper font-bold tracking-[0.3em] text-[10px] uppercase">핸드 드립</span>
                </div>
                <div className="bg-copper/10 border border-copper/20 px-3 py-1 rounded-full">
                  <span className="text-[9px] font-black text-copper uppercase tracking-[0.15em]">
                    March 2026 Selection
                  </span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-copper/40 via-copper/10 to-transparent"></div>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {handDripMenu.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-700"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-copper transition-colors tracking-tight uppercase leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4">
                         <div className="hidden sm:block h-6 w-[1px] bg-copper/20"></div>
                         <p className="text-gray-400 text-xs font-bold tracking-wider leading-relaxed break-keep uppercase">
                           {item.cupNotes || item.description || ''}
                         </p>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-4 shrink-0">
                      <div className="h-8 w-[1px] border-l border-dotted border-white/20 hidden md:block"></div>
                      <span className="text-4xl font-serif font-black text-copper drop-shadow-[0_0_20px_rgba(161,118,76,0.3)]">
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

      <footer className="py-20 px-6 flex flex-col items-center gap-6">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-copper/40 to-transparent"></div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 text-[9px] tracking-[0.6em] uppercase font-black text-center opacity-40">
            Archemist Roasters Laboratory
          </p>
          <p className="text-[8px] text-gray-700 uppercase tracking-widest">In pursuit of the perfect extraction</p>
        </div>
      </footer>
    </div>
  );
}
