import React from 'react';
import { Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft, ShoppingBag, ExternalLink } from 'lucide-react';

export default function ProductDetail({ product, onBack }) {
  if (!product) return null;

  // Formatting logic for display
  const formattedPrice = product.category === 'beverage' 
    ? (Number(product.price) / 1000).toFixed(1)
    : (Number(product.price) || 0).toLocaleString();

  const isBean = product.category === 'bean' || !product.category;
  const isCafe = product.category === 'beverage';

  return (
    <section className="min-h-screen py-12 px-4 sm:px-8 bg-[#0b0c0b] relative overflow-hidden text-gray-200 selection:bg-copper selection:text-white">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[110] flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-copper uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/5 group shadow-2xl"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        홈으로 돌아가기
      </button>

      {/* Naver Purchase Sticky Bar (Mobile Only) */}
      {product.storeUrl && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-[120] p-4 bg-gradient-to-t from-black to-transparent">
          <a 
            href={product.storeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#03C75A] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-widest shadow-[0_10px_30px_rgba(3,199,90,0.3)] animate-bounce-subtle"
          >
            <span className="bg-white text-[#03C75A] w-6 h-6 rounded-md flex items-center justify-center font-black text-xs">N</span>
            네이버 스마트 스토어 구매하기
          </a>
        </div>
      )}

      {/* Decorative background alchemy elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-[150px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Product Image & Quick Info */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-copper/20 to-yellow-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-[#111211] shadow-2xl">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-20 opacity-10 grayscale brightness-200">
                    <img src={`/images/icons/${product.category || 'bean'}.jpg`} alt="icon" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Product Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-copper text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-xl">
                    {product.category === 'bean' ? '스페셜티 원두' : product.category === 'dripbag' ? '드립백' : product.category === 'coldbrew' ? '콜드브루' : '매장 음료'}
                  </span>
                  {product.isSpecial && (
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      시즌 한정 에디션
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Direct Purchase Button (Desktop Only) */}
            {product.storeUrl && (
              <div className="hidden lg:block mt-8">
                <a 
                  href={product.storeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#03C75A] hover:bg-[#02b351] text-white py-5 rounded-2xl flex items-center justify-center gap-4 font-black text-lg tracking-widest transition-all shadow-[0_15px_30px_rgba(3,199,90,0.2)] hover:shadow-[0_20px_40px_rgba(3,199,90,0.4)] hover:-translate-y-1"
                >
                  <div className="bg-white text-[#03C75A] w-8 h-8 rounded-lg flex items-center justify-center font-black text-base shadow-sm">N</div>
                  네이버 스마트 스토어 구매하기
                  <ExternalLink size={18} className="opacity-50" />
                </a>
              </div>
            )}
          </div>

          {/* Right: Detailed Specifications */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-copper/60 font-serif font-bold tracking-[0.4em] text-xs uppercase italic">아키미스트 아카이브 No.{product.id % 999}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-copper/30 to-transparent"></div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight mb-4 break-keep">
                {product.name}
              </h1>
              <div className="mb-10">
                <div className="flex flex-col gap-2 mb-6 border-b border-white/5 pb-6">
                  <span className="text-base text-gray-500 font-black uppercase tracking-[0.3em]">원산지 / 국가</span>
                  <p className="text-3xl font-bold text-white tracking-wide">{product.country || '블렌드'} {product.region && <span className="text-copper opacity-80 mx-1">/</span>} {product.region || ''}</p>
                </div>

                <div className="flex items-center justify-between gap-6 mb-4">
                  <p className="text-4xl sm:text-5xl font-serif font-black text-copper tracking-wider tabular-nums">
                    {formattedPrice}
                    <span className="text-lg ml-3 text-gray-500 font-sans font-black">원</span>
                  </p>
                  <div className="flex gap-8">
                    {product.roastDate && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-gray-600 font-black uppercase tracking-[0.2em]">로스팅 날짜</span>
                        <span className="text-lg text-gray-400 font-bold tabular-nums">{product.roastDate}</span>
                      </div>
                    )}
                    {product.category === 'bean' && product.agingDays && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-copper/60 font-black uppercase tracking-[0.2em]">에이징</span>
                        <span className="text-lg text-copper font-bold tabular-nums">
                          {(() => {
                            const roastStr = (product.roastDate || '').replace(/\./g, '-');
                            const date = new Date(roastStr);
                            if (isNaN(date.getTime())) return `${product.agingDays}일 후`;
                            date.setDate(date.getDate() + parseInt(product.agingDays));
                            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
                          })()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-12 border-t border-white/5 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-xl text-gray-600 font-black uppercase tracking-[0.2em]">품종 / 가공 방식</span>
                <p className="text-2xl font-bold text-white tracking-wide">{product.variety || '토착종'} <span className="text-copper opacity-80 mx-1">/</span> {product.process || '워시드'}</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 mb-12 backdrop-blur-sm shadow-inner overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <img src="/logo-alchemist.png" alt="Logo" className="w-32 h-32 object-contain" />
              </div>
              <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-lg uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                컵 프로파일
              </h4>
              <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-medium break-keep italic">
                "{product.cupNotes || (isCafe ? '도심 속에서 즐기는 우아한 연금술 한 잔.' : '아키미스트 로스터스가 선별한 최상의 테루아를 경험하세요.')}"
              </p>
            </div>

            {/* Technical Context Section */}
            {isBean ? (
              <div className="space-y-8 bg-[#181a19] border border-white/5 p-8 rounded-[2.5rem] hover:border-copper/20 transition-all duration-500 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                  <Scale size={120} className="text-copper" />
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-sm uppercase mb-8 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                    SCA 로스팅 레벨 가이드
                  </h4>
                  
                  <div className="space-y-12">
                    {/* Whole Bean Scale */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">홀빈 (Whole Bean)</span>
                        <span className="text-xl font-serif font-bold text-white">{product.agtronWb || '-'}</span>
                      </div>
                      <div className="relative h-12 flex items-center px-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4B483] via-[#8B6242] to-[#2B1B17] opacity-20 blur-xl rounded-full"></div>
                        <div className="flex justify-between w-full relative z-10">
                          {[95, 85, 75, 65, 55, 45, 35, 25].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            const isActive = product.agtronWb && Math.abs(parseFloat(product.agtronWb) - val) < 5;
                            return (
                              <div key={val} className="relative flex flex-col items-center group/item">
                                <div 
                                  className={`w-4 h-4 rounded-full transition-all duration-500 ${isActive ? 'scale-150 ring-4 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'scale-100 opacity-40 hover:opacity-100 hover:scale-110'}`}
                                  style={{ backgroundColor: colors[val] }}
                                />
                                {isActive && (
                                  <div className="absolute -top-10 animate-bounce-subtle">
                                    <div className="w-8 h-8 rounded-full border-2 border-copper flex items-center justify-center bg-black/80 backdrop-blur-sm shadow-xl">
                                      <div className="w-4 h-4 rounded-sm rotate-45" style={{ backgroundColor: colors[val] }}></div>
                                    </div>
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-copper mx-auto"></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Ground Scale */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">분쇄 (Ground)</span>
                        <span className="text-xl font-serif font-bold text-white">{product.agtronGround || '-'}</span>
                      </div>
                      <div className="relative h-12 flex items-center px-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4B483] via-[#8B6242] to-[#2B1B17] opacity-20 blur-xl rounded-full"></div>
                        <div className="flex justify-between w-full relative z-10">
                          {[95, 85, 75, 65, 55, 45, 35, 25].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            const isActive = product.agtronGround && Math.abs(parseFloat(product.agtronGround) - val) < 5;
                            return (
                              <div key={val} className="relative flex flex-col items-center group/item">
                                <div 
                                  className={`w-8 h-2 rounded-sm transition-all duration-500 ${isActive ? 'scale-150 ring-2 ring-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'scale-100 opacity-30 hover:opacity-100 hover:scale-110'}`}
                                  style={{ backgroundColor: colors[val] }}
                                />
                                {isActive && (
                                  <div className="absolute -top-10 animate-pulse">
                                    <div className="w-8 h-8 rounded-lg border-2 border-white/20 flex items-center justify-center bg-black/80 backdrop-blur-sm shadow-xl">
                                      <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: colors[val] }}></div>
                                    </div>
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white/20 mx-auto"></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between px-1">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-tighter italic">Very Light (95)</span>
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-tighter italic">Very Dark (25)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#181a19] border border-white/5 py-8 px-4 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-base text-gray-600 font-black uppercase tracking-widest">용량 및 구성</span>
                   <span className="text-xl font-bold text-copper">{product.size || '기본'}</span>
                 </div>
                 <div className="bg-[#181a19] border border-white/5 py-8 px-4 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-base text-gray-600 font-black uppercase tracking-widest">컬렉션</span>
                   <span className="text-xl font-bold text-copper uppercase">
                     {product.category === 'bean' ? '원두' : product.category === 'dripbag' ? '드립백' : product.category === 'coldbrew' ? '콜드브루' : '매장 음료'}
                   </span>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail Information Sections */}
        <div className="mt-20 border-t border-white/5 pt-20 space-y-32">
          
          {/* 1. Shipping & Shelf Life Policy */}
          {!isCafe && (
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-copper/30"></div>
                배송 및 소비기한 안내
                <div className="h-[1px] w-12 bg-copper/30"></div>
              </h3>
              <div className="bg-copper/5 border border-copper/20 p-12 rounded-[3rem] shadow-2xl backdrop-blur-sm">
                <p className="text-gray-300 text-lg sm:text-xl leading-[2.2] break-keep font-medium">
                  원두의 소비기한은 생산일로부터 1년이며, 로스팅 일자는 원두 뒷면에 별도 표기됩니다. 주문하신 상품은 주문일 기준 1~4일 이내에 로스팅 된 원두로 출고됩니다.
                </p>
              </div>
            </div>
          )}

          {/* 2. Green Bean Story */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-white/10"></div>
              생두 정보
              <div className="h-[1px] w-12 bg-white/10"></div>
            </h3>
            <div className="bg-[#111211] p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <p className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep italic">
                {product.story || "아키미스트가 엄선한 생두의 상세 정보와 로스터의 정성이 담긴 이야기가 곧 업데이트됩니다."}
              </p>
            </div>
          </div>

          {/* 3. Recommended Extraction Recipe */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-copper/30"></div>
              추천 추출 방식
              <div className="h-[1px] w-12 bg-copper/30"></div>
            </h3>
            <div className="bg-[#111211] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <Droplet size={200} className="text-copper" />
              </div>
              <p className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep relative z-10">
                {product.recipe || "정밀한 추출 가이드가 준비 중입니다. 매장에 방문하시면 바리스타가 직접 안내해 드립니다."}
              </p>
            </div>
          </div>

        </div>

      </div>
      
      {/* Visual Alchemy - Floating Particles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-copper rounded-full blur-[2px] animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-copper rounded-full blur-[3px] animate-pulse delay-700 opacity-30"></div>
    </section>
  );
}
