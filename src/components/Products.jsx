import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const ProductSection = ({ title, category, icon, items, bgColor, activeXpHelp, setActiveXpHelp, isAdmin, onEdit }) => {
  if (!items || items.length === 0) return null;

  const xpHelpRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (activeXpHelp && xpHelpRef.current && !xpHelpRef.current.contains(event.target)) {
        setActiveXpHelp(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeXpHelp]);

  return (
    <section id={category} className={`py-4 sm:py-10 scroll-mt-24 relative overflow-hidden border-b border-white/5 last:border-b-0 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-widest italic uppercase">
              {category === 'bean' ? '원두' : category === 'dripbag' ? '드립팩' : category === 'coldbrew' ? '콜드브루' : '매장 음료'}
            </h2>
            <div className="h-1.5 w-12 bg-copper mt-2"></div>
          </div>
          <div className="hidden md:block h-[1px] flex-grow ml-8 bg-gradient-to-r from-copper/20 to-transparent"></div>
        </div>

        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {items.map((product) => (
            <div 
              key={product.id} 
              onClick={() => window.location.hash = `#product/${product.id}`}
              className={`group bg-[#111211]/50 border border-white/5 rounded-3xl p-5 hover:border-copper/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full w-[280px] sm:w-[360px] md:w-[400px] shrink-0 snap-start relative after:content-[''] after:absolute after:right-[-8px] sm:after:right-[-12px] md:after:right-[-16px] after:top-1/4 after:bottom-1/4 after:w-[1px] after:bg-white/5 last:after:hidden cursor-pointer ${activeXpHelp === product.id ? 'z-[10000]' : 'z-10'}`}
            >
              <div className="relative w-full h-56 mb-5 rounded-2xl overflow-hidden transition-all duration-700 bg-black/20 border border-white/5 shadow-inner">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${product.subCategory === 'handdrip' ? '' : 'p-16 opacity-10 grayscale brightness-150'}`}>
                    <img 
                      src={product.subCategory === 'handdrip' ? '/images/handdrip-default.jpg' : `/images/icons/${product.category || 'bean'}.jpg`} 
                      className={`w-full h-full ${product.subCategory === 'handdrip' ? 'object-cover' : 'object-contain opacity-20 grayscale brightness-200 group-hover:opacity-40 transition-opacity'}`} 
                      alt="icon" 
                    />
                  </div>
                )}
                {/* Product QR Code */}
                <div className="absolute top-4 right-4 z-30 group-hover:scale-110 transition-transform bg-white p-1 rounded-xl shadow-2xl opacity-80 hover:opacity-100">
                  <QRCodeCanvas 
                    value={`${window.location.origin}${window.location.pathname}#product/${product.id}`}
                    size={45}
                    level={"M"}
                    includeMargin={false}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {isAdmin === true && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product.id);
                    }}
                    className="absolute bottom-4 right-4 z-40 text-[9px] font-black text-white/40 hover:text-copper border border-white/10 hover:border-copper/40 px-3 py-1.5 rounded-md transition-all uppercase tracking-widest bg-black/40 backdrop-blur-md"
                  >
                    EDIT
                  </button>
                )}

                {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-4 py-2 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.8)]"></span>
                      {product.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-copper transition-colors line-clamp-3 min-h-[4rem] sm:min-h-[5rem] leading-tight">
                  {product.name}
                </h3>
                <div className="flex justify-between items-baseline border-b border-copper/10 pb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-black text-white tracking-widest tabular-nums">
                      {(Number(product.price) || 0).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 font-bold tracking-widest flex items-center">
                      원
                      {product.size && (
                        <>
                          <span className="opacity-30 mx-2">/</span>
                          {(() => {
                            const s = String(product.size).toLowerCase();
                            if (product.category === 'dripbag') return s.includes('개') ? s : `${s}개`;
                            if (product.category === 'bean') return s.includes('g') ? s : `${s}g`;
                            return s.toUpperCase();
                          })()}
                        </>
                      )}
                    </span>
                  </div>

                  {/* XP Reward Badge - No XP for beverages */}
                  {true && (
                    <div className="flex items-center bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/10 px-1.5 py-1 rounded-lg shadow-sm relative">
                      <div className="flex flex-col items-start leading-none gap-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[7px] text-amber-500/80 font-black tracking-widest uppercase">획득 경험치</span>
                          <div className="relative inline-block z-40" ref={activeXpHelp === product.id ? xpHelpRef : null}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveXpHelp(activeXpHelp === product.id ? null : product.id);
                              }}
                               className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                               aria-label="XP Help"
                             >
                               <HelpCircle size={15} strokeWidth={2.5} />
                            </button>

                            {activeXpHelp === product.id && (
                              <div className="absolute top-4 left-0 z-[9999] w-48 p-3 bg-[#0b0c0b]/98 border border-amber-500/20 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest leading-none font-sans">멤버십 및 등급 안내</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveXpHelp(null); }} className="text-gray-600 hover:text-white leading-none text-xs">&times;</button>
                                </div>
                                <p className="text-[8px] text-gray-400 leading-relaxed font-bold break-keep text-left tracking-normal normal-case font-sans">
                                  경험치를 쌓아서 <span className="text-amber-500 font-black">등급</span>을 높여보세요! <br/>
                                  레벨이 올라갈수록 더 특별한 혜택이 제공됩니다.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-serif font-black text-amber-500">
                            +{(parseFloat(String(product.price || '0').replace(/,/g, '')) * 0.0001 * (product.recommended ? 1.1 : 1)).toFixed(1)}
                          </span>
                          <span className="text-[8px] font-black text-amber-500/60 uppercase">xp</span>
                          {product.recommended && <span className="text-[7px] text-amber-500 font-black ml-0.5 leading-none animate-bounce">+10%</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {product.roastDate && (
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-copper/40"></span>
                  Roast: {product.roastDate}
                </p>
              )}

              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 font-medium overflow-hidden">
                {product.cupNotes || "아키미스트 테이터들의 테이스팅 노트가 기록 중입니다."}
              </p>

              <div className="relative group/btn mt-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-copper/20 to-yellow-600/20 rounded-xl blur opacity-25 group-hover/btn:opacity-60 transition duration-500"></div>
                <button 
                  className="relative w-full py-4 rounded-xl bg-black/40 border border-white/10 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.hash = '#contact';
                  }}
                >
                  Discovery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Products({ products, isAdmin, onEdit }) {
  const [activeXpHelp, setActiveXpHelp] = useState(null);
  if (!products) return null;

  const beans = products.filter(p => (p.category === 'bean' || !p.category) && p.visible !== false && p.recommended !== true);
  const dripBags = products.filter(p => p.category === 'dripbag' && p.visible !== false && p.recommended !== true);
  const coldBrew = products.filter(p => p.category === 'coldbrew' && p.visible !== false && p.recommended !== true);
  const beverages = products.filter(p => p.category === 'beverage' && p.visible !== false && p.recommended !== true);

  const showFallback = products.length === 0;

  return (
    <div className="bg-[#111211]">
      <ProductSection 
        title="싱글 오리진 원두" 
        category="bean" 
        items={beans} 
        bgColor="bg-[#111211]" 
        activeXpHelp={activeXpHelp}
        setActiveXpHelp={setActiveXpHelp}
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <ProductSection 
        title="드립백 셀렉션" 
        category="dripbag" 
        items={dripBags} 
        bgColor="bg-gradient-to-b from-[#111211] to-[#181a19]" 
        activeXpHelp={activeXpHelp}
        setActiveXpHelp={setActiveXpHelp}
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <ProductSection 
        title="콜드브루 에센스" 
        category="coldbrew" 
        items={coldBrew} 
        bgColor="bg-[#181a19]" 
        activeXpHelp={activeXpHelp}
        setActiveXpHelp={setActiveXpHelp}
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <ProductSection 
        title="매장 시그니처" 
        category="beverage" 
        items={beverages} 
        bgColor="bg-gradient-to-b from-[#181a19] to-[#0b0c0b]" 
        activeXpHelp={activeXpHelp}
        setActiveXpHelp={setActiveXpHelp}
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      
      {showFallback && (
        <div className="py-20 text-center">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">등록된 상품이 없습니다.</p>
          <a href="#admin" className="text-copper text-[10px] font-bold tracking-widest underline mt-4 inline-block">관리자 패널로 이동</a>
        </div>
      )}
    </div>
  );
}
