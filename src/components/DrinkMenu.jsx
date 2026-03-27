import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DrinkMenu({ onBack, products }) {
  const [drinks, setDrinks] = useState([]);
  const [beans, setBeans] = useState([]);
  const [dripBags, setDripBags] = useState([]);
  const [coldBrews, setColdBrews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (products && products.length > 0) {
      setDrinks(products.filter(p => p.category === 'beverage' && p.visible !== false));
      setBeans(products.filter(p => p.category === 'bean' && p.visible !== false));
      setDripBags(products.filter(p => p.category === 'dripbag' && p.visible !== false));
      setColdBrews(products.filter(p => p.category === 'coldbrew' && p.visible !== false));
    }
  }, [products]);

  const espressoMenu = drinks.filter(d => d.subCategory === 'espresso' || !d.subCategory);
  const handDripMenu = drinks.filter(d => d.subCategory === 'handdrip');

  const ProductItem = ({ item }) => (
    <div 
      onClick={() => window.location.hash = `#product/${item.id}`}
      className="flex justify-between items-center py-1.5 px-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-500 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-black/40 shadow-inner group-hover:border-copper/30 transition-all duration-500">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2.5 opacity-20 grayscale brightness-200 group-hover:opacity-40 transition-opacity">
              <img src={`/images/icons/${item.category || 'bean'}.jpg`} alt="icon" className="w-full h-full object-contain" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-black group-hover:text-copper transition-all tracking-tight leading-none">{item.name}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 shrink-0 ml-10">
        <div className="flex flex-col items-end gap-1 max-w-[160px]">
          {item.variety && (
            <span className="text-[11px] sm:text-[12px] text-copper font-serif font-black italic tracking-wide text-right leading-none truncate">
              {item.variety}
            </span>
          )}
          {item.process && (
            <span className="text-[9px] text-copper/40 font-bold uppercase tracking-widest text-right leading-none">
              {item.process}
            </span>
          )}
          {item.size && (
             <span className="text-[11px] text-white/30 font-black uppercase tracking-[0.2em] text-right mt-1 leading-none">
               {(() => {
                 const s = String(item.size).toLowerCase();
                 if (item.category === 'dripbag') return s.includes('개') ? s : `${s}개`;
                 return s.includes('g') ? s : `${s}g`;
               })()}
             </span>
          )}
        </div>
        <span className="text-lg sm:text-xl font-serif font-black text-white/90 group-hover:text-copper transition-colors w-12 text-right">
          {(Number(item.price) || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c0b] text-white font-sans selection:bg-copper relative overflow-x-hidden flex flex-col">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-copper/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-copper/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0b0c0b]/40 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex items-center transition-all duration-500 hover:bg-[#0b0c0b]/60">
        <button 
          onClick={onBack}
          className="relative z-10 group flex items-center gap-2 text-gray-500 hover:text-copper transition-all font-bold uppercase tracking-[0.2em] text-[9px]"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          <span>HOME</span>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <img src="/logo-alchemist.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <span className="text-xl sm:text-4xl font-serif font-black tracking-[-0.02em] text-white uppercase italic">ARCHEMIST ROASTERS</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-8 md:px-12 relative z-10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left: Beverage Menu (6/12) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="mb-1 flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white/90 tracking-tight italic">음료</h2>
              <span className="text-copper/40 font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase italic">Beverage</span>
            </div>
            <div className="w-full flex flex-col gap-4">
          {/* Espresso Menu Section */}
          {espressoMenu.length > 0 && (
            <section>
              <div className="flex flex-col mb-4 relative">
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-black tracking-normal text-white/50 italic">
                    ESPRESSO
                  </h2>
                  <span className="text-copper/40 font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase">에스프레소</span>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-copper/30 via-transparent to-transparent"></div>
              </div>

              <div className="grid gap-1.5">
                {espressoMenu.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    onClick={() => window.location.hash = `#product/${item.id}`}
                    className={`group relative py-2 px-6 sm:px-8 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-500 cursor-pointer ${item.isSpecial ? 'shadow-[0_0_20px_rgba(161,118,76,0.06)]' : ''}`}
                  >
                    {item.isSpecial && (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-lg sm:text-xl font-bold group-hover:text-copper transition-colors tracking-tight italic">
                          {item.name}
                        </h3>
                        {item.englishName && (
                          <span className="text-base sm:text-lg text-gray-600 font-bold tracking-[0.1em] uppercase opacity-40 hidden lg:inline">
                            {item.englishName}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-4 shrink-0">
                        {item.size && <span className="text-[9px] text-gray-600 font-bold tracking-widest lowercase">{item.size}</span>}
                        <span className="text-2xl sm:text-3xl font-serif font-black text-copper tabular-nums">
                          {(Number(item.price) || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 flex-wrap mt-[-4px]">
                      <div className="h-[1px] w-6 bg-copper/30 mt-3 hidden sm:block"></div>
                      <div className="flex flex-wrap gap-2">
                        {item.subCategory === 'handdrip' && item.cupNotes && item.cupNotes.split(/[,/|]+/).filter(Boolean).map((note, nIdx) => (
                          <span key={nIdx} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs font-bold text-copper/80 tracking-widest uppercase">
                            {note.trim()}
                          </span>
                        ))}
                        {(item.subCategory !== 'handdrip' || !item.cupNotes) && (item.description || item.story) && (
                          <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed break-keep">
                            {item.description || item.story}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hand Drip Menu Section */}
          {handDripMenu.length > 0 && (
            <section>
              <div className="flex flex-col mb-4 relative">
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-black tracking-normal text-white/50 italic">
                    HAND DRIP
                  </h2>
                  <span className="text-copper/40 font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase">핸드 드립</span>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-copper/30 via-transparent to-transparent"></div>
              </div>

              <div className="grid gap-1.5">
                {handDripMenu.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    onClick={() => window.location.hash = `#product/${item.id}`}
                    className="group relative py-2.5 px-6 sm:px-8 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-copper/20 transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-grow">
                        <div className="flex items-baseline gap-4 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold group-hover:text-copper transition-colors tracking-tight uppercase leading-tight italic">
                            {item.name}
                          </h3>
                          {item.englishName && (
                            <span className="text-base sm:text-lg text-gray-600 font-bold tracking-[0.1em] uppercase opacity-40 hidden lg:inline">
                              {item.englishName}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-3 w-[1px] bg-copper/30"></div>
                           <p className="text-gray-400 text-xs sm:text-sm font-bold tracking-wide leading-relaxed break-keep uppercase">
                             {item.cupNotes || item.description || ''}
                           </p>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-6 shrink-0">
                        <div className="h-8 w-[1px] border-l border-dotted border-white/20 hidden md:block"></div>
                        <span className="text-3xl sm:text-4xl font-serif font-black text-copper tabular-nums">
                          {(Number(item.price) || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          </div>
        </div>
          
        {/* Right Column: Coffee Products (6/12) */}
          <aside className="lg:col-span-6 flex flex-col gap-4 mt-16 lg:mt-0">
            <div className="mb-1 flex items-baseline gap-4 border-b border-white/5 pb-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white/90 tracking-tight italic">상품</h2>
              <span className="text-copper/40 font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase italic">Product</span>
            </div>
            <div className="flex flex-col gap-4">
              
              {/* Beans Section */}
              {beans.length > 0 && (
                <section>
                  <h3 className="text-xl font-black text-white/40 tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                    Beans <span className="h-[1px] flex-grow bg-white/10"></span>
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {beans.map(item => <ProductItem key={item.id} item={item} />)}
                  </div>
                </section>
              )}

              {/* Drip Packs Section */}
              {dripBags.length > 0 && (
                <section>
                  <h3 className="text-xl font-black text-white/40 tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                    Drip Packs <span className="h-[1px] flex-grow bg-white/10"></span>
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {dripBags.map(item => <ProductItem key={item.id} item={item} />)}
                  </div>
                </section>
              )}

              {/* Cold Brew Section */}
              {coldBrews.length > 0 && (
                <section>
                  <h3 className="text-xl font-black text-white/40 tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                    Cold Brew <span className="h-[1px] flex-grow bg-white/10"></span>
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {coldBrews.map(item => <ProductItem key={item.id} item={item} />)}
                  </div>
                </section>
              )}
            </div>
          </aside>

        </div>
      </main>

      <footer className="py-16 px-6 flex flex-col items-center gap-5 relative z-10">
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-copper/30 to-transparent"></div>
        <p className="text-white/40 text-[18px] tracking-[0.6em] uppercase font-black text-center italic">
          ARCHEMIST ROASTERS
        </p>
      </footer>
    </div>
  );
}
