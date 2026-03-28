import React, { useEffect, useState, useRef } from 'react';
import { 
  Filter, Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft, ShoppingBag, ExternalLink,
  Cherry, Citrus, Apple, Grape, Sun, TreePalm, 
  Flower2, Sprout, Leaf, Candy, Bean, Nut, Wheat, 
  Sparkles, Milk, Wind, Edit, Coffee, HelpCircle
} from 'lucide-react';

import { FLAVOR_CONFIG, countryToCode } from '../utils/coffeeData';


export default function ProductDetail({ product, onBack, isAdmin, onEdit, archiveNumber }) {
  const [recipeTab, setRecipeTab] = useState('hot');

  const [activeHelp, setActiveHelp] = useState(null);

  const agtronHelpRef = useRef(null);
  const cupNotesHelpRef = useRef(null);
  const agingHelpRef = useRef(null);
  const roastTimeHelpRef = useRef(null);
  const xpHelpRef = useRef(null);
  const sensoryHelpRef = useRef(null);
  const tdsHelpRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (activeHelp) {
        const currentRef = 
          activeHelp === 'agtron' || activeHelp === 'dt' || activeHelp === 'dtr' || activeHelp === 'capacity' ? agtronHelpRef :
          activeHelp === 'cupNotes' ? cupNotesHelpRef :
          activeHelp === 'aging' ? agingHelpRef :
          activeHelp === 'roastTime' ? roastTimeHelpRef :
          activeHelp === 'xp' ? xpHelpRef : 
          activeHelp === 'sensory' ? sensoryHelpRef :
            activeHelp === 'tds' ? tdsHelpRef : null;

        if (currentRef?.current && !currentRef.current.contains(event.target)) {
          setActiveHelp(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeHelp]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) return null;

  const isBean = product.category === 'bean' || !product.category;
  const isCafe = product.category === 'beverage';

  const priceNum = Number(product.price);
  const formattedPrice = priceNum > 0 
    ? priceNum.toLocaleString()
    : '0'; 


  const renderCupNotes = (notesString) => {
    if (!notesString) return null;
    
    const notes = Array.isArray(notesString) 
      ? notesString.filter(n => typeof n === 'string' && n.trim().length > 0)
      : String(notesString).split(/[,/|]+/).filter(n => n.trim().length > 0);
    
    return (
      <div className="flex flex-wrap gap-3 justify-center px-4">
        {notes.map((note, idx) => {
          const trimmedNote = note.trim();
          const config = FLAVOR_CONFIG[trimmedNote] || FLAVOR_CONFIG[trimmedNote.replace(/\s+/g, '')];
          const bgColor = config?.color || '#a1764c';
          const textColor = config?.textColor || '#ffffff';
          
          return (
            <div 
              key={idx} 
              className="px-4 py-1.5 rounded-full shadow-lg transition-all hover:-translate-y-1 hover:brightness-110 border border-white/5"
              style={{ 
                backgroundColor: bgColor,
              }}
            >
              <span 
                className="text-[15px] font-black tracking-widest text-center uppercase drop-shadow-sm"
                style={{ color: textColor }}
              >
                {trimmedNote}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  const StepCard = ({ step }) => (
    <div className="flex flex-col items-center group/step">
      <div className="relative mb-6 w-full aspect-square max-w-[200px] mx-auto rounded-3xl overflow-hidden bg-black/40 border border-white/5 group-hover/step:border-copper/30 transition-colors shadow-2xl">
        <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover/step:opacity-100 group-hover/step:scale-105 transition-all duration-700" />
        <div className="absolute top-4 left-4 text-copper font-serif font-black text-xl opacity-40">{step.step}</div>
      </div>
      <h4 className="text-xl font-serif font-black text-white mb-2 tracking-[0.2em]">{step.title}</h4>
      <p className="text-copper text-[10px] font-black mb-3 tracking-widest uppercase">{step.desc}</p>
      <p className="text-gray-500 text-xs leading-relaxed max-w-[180px] break-keep font-medium">{step.detail}</p>
    </div>
  );

  return (
    <section className="min-h-screen pt-32 pb-12 px-4 sm:px-8 bg-[#0b0c0b] relative overflow-hidden text-gray-200 selection:bg-copper selection:text-white">
      <style>{`
        .html-content .ql-align-center { text-align: center !important; }
        .html-content .ql-align-right { text-align: right !important; }
        .html-content .ql-align-justify { text-align: justify !important; }
        .html-content .ql-align-center img { display: block; margin-left: auto !important; margin-right: auto !important; }
        .html-content .ql-align-right img { display: block; margin-left: auto !important; margin-right: 0 !important; }
        .html-content img { max-width: 100%; height: auto; border-radius: 1rem; margin: 1.5rem 0; }
        .html-content iframe { width: 100%; aspect-ratio: 16/9; border-radius: 1rem; margin: 1.5rem 0; }
      `}</style>

      {/* Admin Edit Button */}
      {(isAdmin === true) && onEdit && (
        <button 
          onClick={() => onEdit(product.id)}
          className="fixed top-24 right-8 z-[110] flex items-center gap-2 text-[10px] font-bold text-copper/80 hover:text-copper uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-copper/30 hover:border-copper/60 hover:bg-black/60 group shadow-[0_0_15px_rgba(161,118,76,0.15)] hover:shadow-[0_0_20px_rgba(161,118,76,0.3)]"
        >
          <Edit size={14} className="group-hover:scale-110 transition-transform" />
          해당 상품 편집
        </button>
      )}

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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-8 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-y-8 lg:gap-x-12 mb-10 items-start">
          
          {/* --- Tier 1: Hero Row (Image & Info) --- */}
          <div className="lg:col-span-3">
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
                
                {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                  <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.8)]"></span>
                      {product.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
                    </span>
                  </div>
                )}
                
                {/* Product Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-copper text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-xl">
                      {(product.category === "beverage" && product.subCategory)
                        ? (product.subCategory === "espresso" ? "에스프레소" : "핸드 드립")
                        : (product.category === "bean" ? "원두" : product.category === "dripbag" ? "드립백" : product.category === "coldbrew" ? "콜드브루" : "매장 음료")}
                  </span>
                  {product.isSpecial && (
                    <span className="bg-white/10 backdrop-blur-md text-blue-300 border border-blue-400/30 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      시즌 한정 에디션
                    </span>
                  )}
                  {product.recommended && (
                    <span className="bg-white/10 backdrop-blur-md text-copper border border-copper/30 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      추천 상품
                    </span>
                  )}
                </div>
              </div>
            </div>
            
          </div>

          <div className="lg:col-span-3 flex flex-col h-full justify-start">
            <div className="mb-0">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-copper/60 font-serif font-bold tracking-[0.4em] text-xs uppercase italic">아키미스트 아카이브 No.{String(archiveNumber || (product.id % 999)).padStart(3, '0')}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-copper/30 to-transparent"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight mb-3 break-keep">
                {product.name}
              </h1>
              {!isCafe && product.englishName && (
                <h2 className="text-sm sm:text-base font-serif text-gray-500 tracking-wider mb-5">
                  {product.englishName}
                </h2>
              )}
              {product.story && product.story !== '<p><br></p>' && (
                <div className="mb-4 mt-1 px-1">
                  <div 
                    className="text-gray-400 text-base sm:text-lg leading-relaxed break-keep italic html-content prose prose-invert max-w-none border-l-2 border-copper/30 pl-6 py-2"
                    dangerouslySetInnerHTML={{ __html: product.story }}
                  />
                </div>
              )}
              <div className="mb-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-4 border-b border-white/5 pb-4">
                  <div className="flex flex-row items-center gap-6">
                    <p className="text-4xl sm:text-5xl font-serif font-black text-white tracking-wider tabular-nums">
                      {formattedPrice}
                      <span className="text-lg ml-3 text-gray-500 font-sans font-black">원</span>
                    </p>
                    
                    {/* XP Reward Highlight */}
                    {/* XP Reward Highlight - No XP for beverages */}
                    {true && (
                      <div className={`flex items-center bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:scale-[1.02] transition-all group cursor-default relative ${activeHelp === 'xp' ? 'z-[10000]' : 'z-10'}`}>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] text-amber-500/80 font-black tracking-[0.1em] leading-none">획득 경험치</span>
                            <div className="relative inline-block" ref={xpHelpRef}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHelp(activeHelp === 'xp' ? null : 'xp');
                                }}
                                  className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                                  aria-label="XP Help"
                                >
                                  <HelpCircle size={15} strokeWidth={2.5} />
                              </button>

                              {activeHelp === 'xp' && (
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 z-[9999] w-64 p-5 bg-[#0b0c0b]/98 border border-amber-500/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="text-[11px] text-amber-500 font-black uppercase tracking-widest leading-none font-sans">멤버십 및 등급 안내</span>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveHelp(null); }} className="text-gray-600 hover:text-white leading-none">&times;</button>
                                  </div>
                                  <p className="text-[11px] text-gray-400 leading-relaxed font-bold break-keep text-left tracking-normal normal-case font-sans">
                                    경험치를 쌓아서 최고 레벨에 도전해 보세요! <br/><br/>
                                    <span className="text-amber-500 font-black">등급</span>이 올라갈수록 아키미스트 멤버십만의 더 특별하고 다양한 혜택과 시크릿 오퍼를 누리실 수 있습니다.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-serif font-black text-amber-500 tracking-tighter">
                              +{(parseFloat(String(product.price || '0').replace(/,/g, '')) * 0.0001 * (product.recommended ? 1.1 : 1)).toFixed(1)}
                            </span>
                            <span className="text-[10px] font-black text-amber-500/60 uppercase">xp</span>
                            {product.recommended && (
                              <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 ml-1 font-black animate-bounce">+10% HOT</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-8">
                    {product.roastDate && (
                      <div className="flex flex-col items-end gap-1">
                        <div className="h-7 flex items-center">
                            <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">로스팅 날짜</span>
                          </div>
                        <span className="text-lg text-gray-400 font-bold tabular-nums">{product.roastDate}</span>
                      </div>
                    )}
                    {product.category === 'bean' && product.agingDays && (
                      <div className="flex flex-col items-end gap-1">
                        <div 
                          ref={agingHelpRef}
                          className={`h-7 flex items-center gap-1.5 justify-end relative ${activeHelp === 'aging' ? 'z-[10000]' : 'z-10'}`}
                        >
                          <span className="text-[10px] text-copper/60 font-black uppercase tracking-[0.2em]">권장 에이징</span>
                          <button 
                            onClick={() => setActiveHelp(activeHelp === 'aging' ? null : 'aging')}
                            className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                            aria-label="Aging Help"
                          >
                            <HelpCircle size={15} strokeWidth={2.5} />
                          </button>

                          {/* Aging Help Popup */}
                          {activeHelp === 'aging' && (
                            <div className="absolute top-6 right-0 z-[9999] w-64 p-4 bg-[#0b0c0b]/98 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[11px] text-copper font-black uppercase tracking-widest font-sans">권장 에이징(Aging) 가이드</span>
                                <button onClick={() => setActiveHelp(null)} className="text-gray-500 hover:text-white">&times;</button>
                              </div>
                              <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep text-left">
                                권장 에이징(Aging)은 원두가 로스팅된 후 맛이 가장 조화롭게 발현되는 숙성 기간을 의미합니다. 가스가 안정화되어 더 풍성한 아로마와 깊은 맛을 느끼실 수 있는 권장 시점을 안내해 드립니다.
                              </p>
                            </div>
                          )}
                        </div>
                        <span className="text-lg text-copper font-bold tabular-nums">
                          {(() => {
                            const roastStr = String(product.roastDate || '').replace(/\./g, '-');
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

                {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                    {[
                      { label: '국가', value: product.country || '정보 없음', flag: product.country && countryToCode[product.country] ? `https://flagcdn.com/w80/${countryToCode[product.country]}.png` : null, category: 'basic' },
                      { label: '지역', value: product.region || '정보 없음', category: 'basic' },
                      { label: '농장', value: product.farm || '정보 없음', category: 'basic' },
                      { label: '마이크로랏', value: product.micromill || '정보 없음', category: 'basic' },
                      { label: '재배 고도', value: product.altitude || '정보 없음', category: 'basic' },
                      { label: product.beanType === 'blend' ? '블렌딩 구성' : '품종', value: product.beanType === 'blend' ? [1, 2, 3, 4].map(n => ({ name: product[`blend${n}`], ratio: product[`ratio${n}`] })).filter(c => c.name).map(c => `${c.name}${c.ratio ? ` (${c.ratio}%)` : ''}`).join(' | ') || product.variety || '정보 없음' : product.variety || '정보 없음', category: 'basic' },
                      { label: '가공방식', value: product.process || '정보 없음', category: 'basic' },
                      { label: '수입사', value: product.importer || '정보 없음', category: 'greenBeanBasic' },
                      { label: '생두 정식 명칭', value: product.greenBeanName || '정보 없음', category: 'greenBeanBasic' },
                      { label: 'SCA 점수', value: product.scaScore || '정보 없음', category: 'greenBeanBasic' },
                      { label: product.category === 'beverage' ? '사이즈' : (product.category === 'dripbag' ? '수량' : '중량'), value: product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (product.category === 'beverage' ? product.size : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : product.size))) : (product.category === 'beverage' ? '16oz' : (product.category === 'dripbag' ? '10개' : '200g')), category: 'essential' }
                    ].filter(item => 
                      item.category !== 'greenBeanBasic' || product.showBasicInfo !== false
                    ).map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[11px] text-gray-600 font-black uppercase tracking-[0.2em] transition-colors hover:text-copper/40">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.flag && (
                            <img src={item.flag} alt="flag" className="w-5 h-3.5 object-cover rounded shadow-sm opacity-90 border border-white/10" />
                          )}
                          <span className="text-sm text-white font-bold tracking-tight">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Direct Purchase Button (Right Side) */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <a 
                  href={product.storeUrl || "https://smartstore.naver.com/archemist"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#03C75A] hover:bg-[#02b351] text-white py-5 rounded-2xl flex items-center justify-center gap-4 font-black text-base sm:text-lg tracking-widest transition-all shadow-[0_15px_30px_rgba(3,199,90,0.1)] hover:shadow-[0_20px_40px_rgba(3,199,90,0.3)] hover:-translate-y-1"
                >
                  <div className="bg-white text-[#03C75A] w-8 h-8 rounded-lg flex items-center justify-center font-black text-base shadow-sm">N</div>
                  네이버 스마트 스토어에서 구매하기
                  <ExternalLink size={18} className="opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* --- Tier 2: Analysis Row (Cup Notes & Sensory Profile) --- */}
          {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
            <div className="lg:col-span-6 grid grid-cols-1 lg:grid-cols-6 gap-4">
              {/* 1. Cup Notes Card */}
              {product.cupNotes && (
                <div 
                  ref={cupNotesHelpRef}
                  className={`lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-xl flex flex-col h-full relative group ${activeHelp === 'cupNotes' ? 'z-[10000]' : 'z-10'}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <img src="/logo-alchemist.png" alt="Logo" className="w-24 h-24 object-contain" />
                  </div>
                  <div className="flex items-center gap-3 mb-6 relative">
                    <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                      컵 노트
                    </h4>
                    <button 
                      onClick={() => setActiveHelp(activeHelp === 'cupNotes' ? null : 'cupNotes')}
                      className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                      aria-label="Cup Notes Help"
                    >
                      <HelpCircle size={15} strokeWidth={2.5} />
                    </button>

                    {/* Cup Notes Help Popup */}
                    {activeHelp === 'cupNotes' && (
                      <div className="absolute top-8 left-0 z-[9999] w-64 p-4 bg-[#0b0c0b]/98 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] text-copper font-black uppercase tracking-widest font-sans">컵 노트(Cup Notes) 안내</span>
                          <button onClick={() => setActiveHelp(null)} className="text-gray-500 hover:text-white">&times;</button>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep">
                          컵 노트(Cup Notes)는 커피를 마셨을 때 느낄 수 있는 대표적인 향미를 과일, 꽃, 견과류 등에 빗대어 표현한 것입니다. 아키미스트는 생두가 가진 고유의 테루아를 가장 잘 드러낼 수 있는 향미들을 엄선하여 기록합니다.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-6 flex-grow">
                    <div className="flex-grow">
                      {renderCupNotes(product.cupNotes)}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Sensory Profile Card */}
              <div 
                ref={sensoryHelpRef}
                className={`lg:col-span-3 bg-[#181a19] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 shadow-xl relative group flex flex-col h-full ${activeHelp === 'sensory' ? 'z-[10000]' : 'z-10'}`}
              >
                <div className="flex items-center gap-3 mb-6 relative">
                  <h4 className="text-white/60 font-serif font-black tracking-[0.2em] text-[15px] uppercase flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.2)]"></span>
                    센서리 프로파일
                  </h4>
                  <button 
                    onClick={() => setActiveHelp(activeHelp === 'sensory' ? null : 'sensory')}
                    className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                    aria-label="Sensory Help"
                  >
                    <HelpCircle size={15} strokeWidth={2.5} />
                  </button>

                  {activeHelp === 'sensory' && (
                    <div className="absolute top-8 left-0 z-[9999] w-64 p-4 bg-[#0b0c0b]/98 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] text-copper font-black uppercase tracking-widest font-sans">센서리 프로파일 안내</span>
                        <button onClick={() => setActiveHelp(null)} className="text-gray-500 hover:text-white leading-none">&times;</button>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep">
                        향(Fragrance), 후미(Aftertaste), 산미(Acidity), 단맛(Sweetness), 마우스필(Mouthfeel), 밸런스(Balance) 등 커피의 매력을 결정하는 6가지 핵심 지표를 시각화한 결과물입니다. <br/><br/>
                        <span className="text-[9px] text-gray-500 italic font-bold leading-none">* 표기된 수치는 아키미스트 로스터의 주관적인 평가이며, 절대적인 수치가 아님을 안내 드립니다.</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center flex-grow py-4">
                  {/* Hexagonal Radar Chart (Spider Map) */}
                  <div className="relative w-full max-w-[280px] aspect-square mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      {/* Define Gradients & Filters */}
                      <defs>
                        <linearGradient id="spiderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a1764c" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#a1764c" stopOpacity="0.1" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Radar Background Grids (Hexagons) */}
                      {[1, 2, 3, 4, 5].map((step) => {
                        const r = (step / 5) * 40;
                        const points = [0, 60, 120, 180, 240, 300].map(angle => {
                          const rad = ((angle - 90) * Math.PI) / 180;
                          return `${50 + r * Math.cos(rad)},${50 + r * Math.sin(rad)}`;
                        }).join(' ');
                        return (
                          <polygon 
                            key={step}
                            points={points}
                            fill="none"
                            stroke="white"
                            strokeOpacity={0.08}
                            strokeWidth="0.4"
                          />
                        );
                      })}

                      {/* Axis Lines */}
                      {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                        const rad = ((angle - 90) * Math.PI) / 180;
                        return (
                          <line
                            key={idx}
                            x1="50" y1="50"
                            x2={50 + 40 * Math.cos(rad)}
                            y2={50 + 40 * Math.sin(rad)}
                            stroke="white"
                            strokeOpacity={0.12}
                            strokeWidth="0.4"
                          />
                        );
                      })}

                      {/* Data Polygon */}
                      {(() => {
                        const stats = [
                          { val: product.flavor || 0 },
                          { val: product.aftertaste || 0 },
                          { val: product.acidityRate || 0 },
                          { val: product.sweetness || 0 },
                          { val: product.bodyRate || 0 },
                          { val: product.balance || 0 }
                        ];
                        const points = stats.map((s, idx) => {
                          const r = (Math.max(0.5, Math.min(5, Number(s.val))) / 5) * 40;
                          const rad = ((idx * 60 - 90) * Math.PI) / 180;
                          return `${50 + r * Math.cos(rad)},${50 + r * Math.sin(rad)}`;
                        }).join(' ');
                        
                        return (
                          <g filter="url(#glow)">
                            <polygon 
                              points={points} 
                              fill="url(#spiderGradient)" 
                              stroke="#a1764c" 
                              strokeWidth="1.2"
                              strokeLinejoin="round"
                              className="animate-pulse-subtle"
                            />
                            {/* Inner nodes */}
                            {stats.map((s, idx) => {
                              const r = (Math.max(0.5, Math.min(5, Number(s.val))) / 5) * 40;
                              const rad = ((idx * 60 - 90) * Math.PI) / 180;
                              if (s.val <= 0) return null;
                              return (
                                <circle 
                                  key={idx}
                                  cx={50 + r * Math.cos(rad)} 
                                  cy={50 + r * Math.sin(rad)} 
                                  r="0.8" 
                                  fill="#a1764c" 
                                />
                              );
                            })}
                          </g>
                        );
                      })()}
                    </svg>

                    {/* Labels with Scores (Synchronized with cup note font style) */}
                    {(() => {
                      const stats = [
                        { text: '향', val: product.flavor || 0 },
                        { text: '후미', val: product.aftertaste || 0 },
                        { text: '산미', val: product.acidityRate || 0 },
                        { text: '단맛', val: product.sweetness || 0 },
                        { text: '마우스필', val: product.bodyRate || 0 },
                        { text: '밸런스', val: product.balance || 0 }
                      ];
                      return stats.map((l, idx) => {
                        const angle = idx * 60 - 90;
                        const rad = (angle * Math.PI) / 180;
                        const x = 50 + 48 * Math.cos(rad);
                        const y = 50 + 48 * Math.sin(rad);
                        
                        return (
                          <div 
                            key={idx}
                            className="absolute flex flex-col items-center justify-center gap-0.5 whitespace-nowrap"
                            style={{ 
                              left: `${x}%`, 
                              top: `${y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <span className="text-[12px] font-black tracking-widest text-white uppercase drop-shadow-md">
                              {l.text}
                            </span>
                            <span className="text-[15px] font-black tracking-tighter text-white drop-shadow-md">
                              {l.val > 0 ? l.val : '-'}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* 3. Roasting Point & Time Card */}
              {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
                <div 
                  ref={agtronHelpRef}
                  className={`lg:col-span-6 bg-[#181a19] border border-white/5 p-4 md:p-5 rounded-[2.5rem] hover:border-copper/20 transition-all duration-500 shadow-xl relative group flex flex-col md:flex-row gap-4 md:gap-6 mt-0 items-center ${(activeHelp === 'agtron' || activeHelp === 'roastTime' || activeHelp === 'dt' || activeHelp === 'dtr' || activeHelp === 'capacity') ? 'z-[10000]' : 'z-10'}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Scale size={100} className="text-copper" />
                  </div>
                                   {/* Roasting Information (Left Side) */}
                  <div className="flex-shrink-0 flex flex-col justify-center min-w-[240px] border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6 w-full md:w-auto text-center md:text-left">
                     <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase mb-2 flex items-center justify-center md:justify-start gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                       로스팅 정보
                       <div className="relative inline-block" ref={roastTimeHelpRef}>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveHelp(activeHelp === 'roastTime' ? null : 'roastTime');
                           }}
                           className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                           aria-label="Roast Time Help"
                         >
                           <HelpCircle size={15} strokeWidth={2.5} />
                         </button>

                         {activeHelp === 'roastTime' && (
                           <div className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 z-[9999] w-64 p-5 bg-[#0b0c0b]/98 border border-copper/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                             <div className="flex justify-between items-start mb-3">
                               <span className="text-[11px] text-copper font-black uppercase tracking-widest leading-none font-sans">로스팅 정보 가이드</span>
                               <button onClick={() => setActiveHelp(null)} className="text-gray-600 hover:text-white leading-none">&times;</button>
                             </div>
                             <p className="text-[11px] text-gray-400 leading-relaxed font-bold break-keep text-left tracking-normal font-sans">
                               <span className="text-gray-200 font-bold">DT (Develop Time)</span>는 1차 크랙 시작부터 배출까지의 시간을 의미하며, <span className="text-gray-200 font-bold">DTR (Ratio, %)</span>은 총 시간에 대한 DT의 비율입니다. <br/><br/>
                               아키미스트 로스터스는 하이엔드 로스터 <span className="text-copper font-bold">스트롱홀드(Stronghold)</span>를 사용하여 최적의 DT와 DTR(%)을 정밀하게 제어해 제품을 생산합니다.
                             </p>
                           </div>
                         )}
                       </div>
                     </h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">총 소요 시간</div>
                          <div className="text-base font-serif font-black text-white text-center">{product.roastTime || '-'}</div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1 relative">
                          <div className="flex items-center gap-1.5">
                            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">DT</div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveHelp(activeHelp === 'dt' ? null : 'dt'); }}
                              className="p-1 text-white/80 hover:text-white transition-colors outline-none"
                            >
                              <HelpCircle size={15} strokeWidth={2.5} />
                            </button>
                            {activeHelp === 'dt' && (
                              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[9999] w-48 p-3 bg-[#0b0c0b]/98 border border-copper/20 rounded-xl shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-[10px] text-copper font-black uppercase tracking-widest">DT (Develop Time)</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveHelp(null); }} className="text-gray-600 hover:text-white leading-none">&times;</button>
                                </div>
                                <p className="text-[9px] text-gray-400 leading-relaxed font-bold break-keep text-left">1차 크랙이 시작된 후부터 배출까지의 시간입니다. 커피의 당도와 마우스필이 결정되는 핵심 구간입니다.</p>
                              </div>
                            )}
                          </div>
                          <div className="text-base font-serif font-black text-white text-center">{product.dt || '-'}</div>
                        </div>

                        <div className="flex flex-col items-center gap-1 relative">
                          <div className="flex items-center gap-1.5">
                             <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">DTR (%)</div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveHelp(activeHelp === 'dtr' ? null : 'dtr'); }}
                              className="p-1 text-white/80 hover:text-white transition-colors outline-none"
                            >
                              <HelpCircle size={15} strokeWidth={2.5} />
                            </button>
                            {activeHelp === 'dtr' && (
                              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[9999] w-48 p-3 bg-[#0b0c0b]/98 border border-copper/20 rounded-xl shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                <div className="flex justify-between items-start mb-1">
                                   <span className="text-[10px] text-copper font-black uppercase tracking-widest">DTR (Develop Time Ratio) (%)</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveHelp(null); }} className="text-gray-600 hover:text-white leading-none">&times;</button>
                                </div>
                                <p className="text-[9px] text-gray-400 leading-relaxed font-bold break-keep text-left">전체 로스팅 시간에 대한 DT의 비율입니다. 밸런스와 플레이버의 특징을 파악할 수 있는 고정밀 지표입니다.</p>
                              </div>
                            )}
                          </div>
                          <div className="text-base font-serif font-black text-white text-center">
                            {product.dtr ? (String(product.dtr).includes('%') ? product.dtr : `${product.dtr}%`) : '-'}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-1 relative">
                          <div className="flex items-center gap-1.5">
                            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">배치 용량</div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveHelp(activeHelp === 'capacity' ? null : 'capacity'); }}
                              className="p-1 text-white/80 hover:text-white transition-colors outline-none"
                            >
                              <HelpCircle size={15} strokeWidth={2.5} />
                            </button>
                            {activeHelp === 'capacity' && (
                              <div className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 z-[9999] w-48 p-3 bg-[#0b0c0b]/98 border border-copper/20 rounded-xl shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-[10px] text-copper font-black uppercase tracking-widest">배치 용량 (Batch Size)</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveHelp(null); }} className="text-gray-600 hover:text-white leading-none">&times;</button>
                                </div>
                                <p className="text-[9px] text-gray-400 leading-relaxed font-bold break-keep text-left">1회 로스팅 시 투입되는 원두의 양입니다. 동일한 규격을 유지하여 로스팅의 균일성을 확보합니다.</p>
                              </div>
                            )}
                          </div>
                          <div className="text-base font-serif font-black text-white text-center">
                            {product.roastCapacity ? (String(product.roastCapacity).toLowerCase().includes('g') ? product.roastCapacity : `${product.roastCapacity}g`) : '-'}
                          </div>
                        </div>
                      </div>

                      {/* Roaster's Comment */}
                      {product.roasterComment && (
                        <div className="mt-5 pt-4 border-t border-white/5 w-full">
                           <div className="flex items-center gap-2 mb-1.5 justify-center md:justify-start">
                             <span className="text-[10px] font-black text-copper uppercase tracking-[0.2em]">로스터 코멘트</span>
                           </div>
                           <p className="text-[11px] text-gray-400 leading-relaxed font-bold break-keep text-center md:text-left italic">
                             "{product.roasterComment}"
                           </p>
                        </div>
                      )}
                     </div>

                  {/* Roasting Point Guide (Right Side) */}
                  <div className="flex-grow flex flex-col justify-center w-full relative z-10 pt-2 md:pt-0">
                    <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase mb-1.5 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                        로스팅 포인트 가이드
                    </h4>
                      <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1.5 opacity-60">* DiFluid Omni 측정 기준</p>
                      <div className="flex items-center gap-1.5 mb-4 relative">
                        <span className="text-[12px] text-copper/60 font-black tracking-widest uppercase">Agtron</span>
                        <button 
                          onClick={() => setActiveHelp(activeHelp === 'agtron' ? null : 'agtron')}
                          className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                          aria-label="Agtron Help"
                        >
                          <HelpCircle size={15} strokeWidth={2.5} />
                        </button>

                        {/* Agtron Help Popup */}
                        {activeHelp === 'agtron' && (
                          <div className="absolute top-6 left-0 z-[9999] w-64 p-4 bg-[#111211]/98 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[11px] text-copper font-black uppercase tracking-widest font-sans">아그트론(Agtron) 가이드</span>
                              <button onClick={() => setActiveHelp(null)} className="text-gray-500 hover:text-white">&times;</button>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep">
                              아그트론(Agtron)은 커피의 로스팅 정도(배전도)를 수치화한 글로벌 표준입니다. 숫자가 낮을수록 다크(강배전), 높을수록 라이트(약배전)를 의미하며, 디플루이드 옴니(DiFluid Omni) 등 정밀 측정기를 통해 객관적인 데이터를 도출합니다.
                            </p>
                          </div>
                        )}
                      </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-end mb-1 px-1">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">홀빈 (Whole Bean) AGTRON</span>
                        </div>
                        <div className="relative h-10 flex items-center px-0">
                          <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-20"></div>
                          <div className="flex justify-between w-full relative z-10">
                            {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                              const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                              return <div key={val} className="w-1 h-1 rounded-full bg-white/10" style={{ backgroundColor: colors[val] }} />;
                            })}
                          </div>
                          {product.agtronWb && !isNaN(parseFloat(product.agtronWb)) && (
                            <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronWb) - 25) / 70 * 100))}%` }}>
                              {/* Large Speech Bubble - 30% smaller than previous 27px -> 19px */}
                              <div className="absolute -top-[85px] left-0 -translate-x-1/2 bg-white text-[#111] px-4 py-2 rounded-xl shadow-[0_6px_30px_rgba(0,0,0,0.6)] whitespace-nowrap flex flex-col items-center leading-none z-40 min-w-[55px]">
                                <span className="text-[19px] font-serif font-black">{product.agtronWb}</span>
                                {product.roastPointWb && <span className="text-[8.5px] font-black opacity-60 uppercase tracking-tighter mt-1">{product.roastPointWb}</span>}
                                {/* Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45"></div>
                              </div>
                              
                              {/* Marking Dot centered - also scaled slightly */}
                              <div className="w-4 h-4 bg-white border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.7)] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end mb-1 px-1">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">분쇄 (Ground) AGTRON</span>
                        </div>
                        <div className="relative h-10 flex items-center px-0">
                          <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-20"></div>
                          <div className="flex justify-between w-full relative z-10" style={{ padding: '0 2px' }}>
                            {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                              const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                              return <div key={val} className="w-1 h-1 rounded-full bg-white/10" style={{ backgroundColor: colors[val] }} />;
                            })}
                          </div>
                          {product.agtronGround && !isNaN(parseFloat(product.agtronGround)) && (
                            <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronGround) - 25) / 70 * 100))}%` }}>
                              {/* Large Speech Bubble - 30% smaller than previous 27px -> 19px */}
                              <div className="absolute -top-[85px] left-0 -translate-x-1/2 bg-copper text-[#111] px-4 py-2 rounded-xl shadow-[0_6px_30px_rgba(0,0,0,0.6)] whitespace-nowrap flex flex-col items-center leading-none z-40 min-w-[55px]">
                                <span className="text-[19px] font-serif font-black">{product.agtronGround}</span>
                                {product.roastPointGround && <span className="text-[8.5px] font-black opacity-60 uppercase tracking-tighter mt-1">{product.roastPointGround}</span>}
                       {/* Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-copper rotate-45"></div>
                              </div>
                              
                              {/* Marking Dot centered - also scaled slightly */}
                              <div className="w-4 h-4 bg-copper border-2 border-copper shadow-[0_0_15px_rgba(161,118,76,0.7)] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>



        {/* Detail Information Sections */}
        <div className="mt-6 border-t border-white/5 pt-6 space-y-8">
          
          {/* 1. Shipping & Shelf Life Policy */}
          <div className="max-w-7xl mx-auto text-center px-4">
              <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                <div className="h-[1px] w-8 bg-copper/30"></div>
                배송 및 소비기한 안내
                <div className="h-[1px] w-8 bg-copper/30"></div>
              </h3>
              <div className="bg-copper/5 border border-copper/20 p-8 sm:p-12 rounded-[2.5rem] shadow-8xl backdrop-blur-sm">
                <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-[1.8] break-keep font-medium">
                  원두의 소비기한은 생산일로부터 1년이며, 로스팅 일자는 원두 뒷면에 별도 표기됩니다. 주문하신 상품은 주문일 기준 1~4일 이내에 로스팅 된 원두로 출고됩니다.
                </p>
              </div>
            </div>


          {/* 1.1 Detailed HTML Story (Moved from bottom) */}
          {product.recipe && (
             <div className="max-w-7xl mx-auto px-4 mt-6">
               <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                 <div className="h-[1px] w-8 bg-white/10"></div>
                 상세 스토리
                 <div className="h-[1px] w-8 bg-white/10"></div>
               </h3>
                <style>{`
                  .html-content { line-height: 1.8; letter-spacing: -0.01em; }
                  .html-content p { margin-top: 0; margin-bottom: 0; }
                  .html-content h1, .html-content h2, .html-content h3 { color: #fff; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.3; }
                  .html-content h1 { font-size: 2.2rem; }
                  .html-content h2 { font-size: 1.8rem; }
                  .html-content h3 { font-size: 1.5rem; }
                  .html-content .ql-align-center { text-align: center !important; }
                  .html-content .ql-align-right { text-align: right !important; }
                  .html-content .ql-align-justify { text-align: justify !important; }
                  .html-content .ql-size-small { font-size: 0.75rem; }
                  .html-content .ql-size-large { font-size: 1.5rem; }
                  .html-content .ql-size-huge { font-size: 2.5rem; }
                  .html-content ul, .html-content ol { margin-top: 1rem; margin-bottom: 1rem; padding-left: 2rem; }
                  .html-content li { margin-bottom: 0.5rem; list-style-position: outside; }
                  .html-content ul > li { list-style-type: disc; }
                  .html-content ol > li { list-style-type: decimal; }
                  .html-content img { max-width: 100%; height: auto; border-radius: 1.5rem; margin: 2rem 0; box-shadow: 0 15px 45px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.03); display: inline-block; }
                  .html-content .ql-align-center img { display: block; margin-left: auto; margin-right: auto; }
                  .html-content .ql-align-right img { display: block; margin-left: auto; margin-right: 0; }
                  .html-content strong, .html-content b { color: #fff; font-weight: 900; }
                  .html-content em, .html-content i { font-style: italic; opacity: 0.9; }
                  .html-content u { text-decoration: underline; text-underline-offset: 4px; }
                  .html-content a { color: #a1764c; text-decoration: underline; text-underline-offset: 6px; font-weight: 800; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                  .html-content a:hover { color: #fff; text-shadow: 0 0 15px rgba(161,118,76,0.6); }
                  .html-content iframe { width: 100%; aspect-ratio: 16/9; border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
                `}</style>
               <div className="bg-[#111211] border border-white/5 p-8 sm:p-12 lg:p-16 rounded-[3rem] prose prose-lg prose-invert max-w-none hover:border-copper/20 transition-all font-sans overflow-hidden break-words text-gray-200 text-base sm:text-lg md:text-xl html-content whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: product.recipe }} />
            </div>
          )}



          {/* 4. Green Bean Analysis (Optional) */}
          {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && product.showAnalysisInfo !== false && (
            <div className="max-w-7xl mx-auto px-4 mt-6">
               <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                 <div className="h-[1px] w-8 bg-white/10"></div>
                 생두 분석 정보
                 <div className="h-[1px] w-8 bg-white/10"></div>
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '수분율', value: product.moisture || '-', unit: '%' },
                    { label: '밀도', value: product.density || '-', unit: 'g/L' },
                    { label: '수분활성도', value: product.aw || '-', unit: 'aW' },
                    { label: '수확년도', value: product.cropYear || '-', unit: '' }
                  ].map(stat => (
                    <div key={stat.label} className="bg-[#111211] border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-1 group hover:border-copper/30 transition-all">
                      <span className="text-[8.5px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</span>
                      <span className="text-base font-serif font-black text-white group-hover:text-copper transition-colors">
                        {stat.value}{stat.value !== '-' && stat.unit ? <span className="text-[8px] ml-0.5 opacity-50">{stat.unit}</span> : ''}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 4.1 Grind Guide Section */}
            {['bean', 'dripbag', 'beverage'].includes(product.category) && (
              <div className="max-w-7xl mx-auto px-4 mt-8">
                <h3 className="text-xl font-serif font-black text-white mb-2 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                  <div className="h-[1px] w-8 bg-white/10"></div>
                  분쇄 가이드
                  <div className="h-[1px] w-8 bg-white/10"></div>
                </h3>
                  <p className="text-center text-[8.5px] text-gray-600 font-black uppercase tracking-widest mb-10 opacity-60">* DiFluid 측정 기준</p>
                
                <div className="relative bg-[#111211] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-8xl group">
                  <img 
                    src="/images/grind/grind_guide_reference.png" 
                    alt="원두 분쇄 가이드" 
                    className="w-full h-auto object-cover opacity-90 transition-all duration-700 hover:opacity-100 hover:scale-[1.01]" 
                  />
                  {/* Subtle reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111211]/30 to-transparent pointer-events-none"></div>
                </div>

                <div className="mt-6 px-2 sm:px-6">
                    <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
                        {[
                            { name: '에스프레소', value: '200~400μm', desc: '고운 밀가루' },
                            { name: '모카포트', value: '400~600μm', desc: '고운 소금' },
                            { name: '핸드드립', value: '700~900μm', desc: '일반 꽃소금' },
                            { name: '커피메이커', value: '800~1000μm', desc: '중간 소금' },
                            { name: '더치', value: '900~1100μm', desc: '굵은 바다 소금' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group/item hover:translate-y-[-4px] transition-transform duration-300">
                                <span className="text-[12px] sm:text-[16px] md:text-[20px] font-black text-white uppercase tracking-widest block mb-1">{item.name}</span>
                                <span className="text-[11px] sm:text-[14px] font-bold text-copper/60 block">{item.value}</span>
                                <span className="text-[10px] sm:text-[12px] text-gray-600 block mt-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 whitespace-nowrap">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}

          {/* 4.2 Recipe Section */}
          {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
            <div className="max-w-7xl mx-auto text-center px-4">
              <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                <div className="h-[1px] w-8 bg-copper/30"></div>
                추출 레시피
                <div className="h-[1px] w-8 bg-copper/30"></div>
              </h3>
              <div className="bg-[#111211] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                {['dripbag', 'bean'].includes(product.category) ? (
                  <div className="relative z-10 space-y-12">
                    {/* Tab Switcher */}
                    <div className="flex justify-center gap-4 mb-8">
                      <button 
                        onClick={() => setRecipeTab('hot')}
                        className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 border ${recipeTab === 'hot' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-transparent text-gray-500 hover:text-gray-300'}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${recipeTab === 'hot' ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`}></div>
                        HOT RECIPE
                      </button>
                      <button 
                        onClick={() => setRecipeTab('ice')}
                        className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 border ${recipeTab === 'ice' ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' : 'bg-white/5 border-transparent text-gray-500 hover:text-gray-300'}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${recipeTab === 'ice' ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'}`}></div>
                        ICE RECIPE
                      </button>
                    </div>

                    {/* Recipe Content */}
                    {(() => {
                      const prefix = recipeTab === 'hot' ? 'hot_' : 'ice_';
                      const hasData = product[`${prefix}grind`] || product[`${prefix}bloom_water`];
                      
                      if (!hasData) {
                        return (
                          <div className="py-12 text-center text-gray-600 italic">
                            {recipeTab.toUpperCase()} 레시피가 아직 등록되지 않았습니다.
                          </div>
                        );
                      }

                      const pours = [
                        { label: '뜸 (Bloom)', time: product[`${prefix}bloom_time`], water: product[`${prefix}bloom_water`] },
                        { label: '1차 푸어', time: product[`${prefix}p1_time`], water: product[`${prefix}p1_water`] },
                        { label: '2차 푸어', time: product[`${prefix}p2_time`], water: product[`${prefix}p2_water`] },
                        { label: '3차 푸어', time: product[`${prefix}p3_time`], water: product[`${prefix}p3_water`] },
                        { label: '4차 푸어', time: product[`${prefix}p4_time`], water: product[`${prefix}p4_water`] },
                      ].filter(p => p.water);

                      const totalWater = pours.reduce((acc, p) => acc + Number(p.water || 0), 0);

                      return (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          {/* Summary Row */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                              { label: '원두량', value: product[`${prefix}coffee_amount`] ? (String(product[`${prefix}coffee_amount`]).toLowerCase().includes('g') ? product[`${prefix}coffee_amount`] : `${product[`${prefix}coffee_amount`]}g`) : '-', icon: <Coffee size={14} /> },
                              { label: '분쇄도', value: product[`${prefix}grind`], icon: <Scale size={14} /> },
                               { label: '물 온도', value: product[`${prefix}temp`] ? (String(product[`${prefix}temp`]).includes('℃') || String(product[`${prefix}temp`]).includes('C') || String(product[`${prefix}temp`]).includes('°') ? product[`${prefix}temp`] : `${product[`${prefix}temp`]}℃`) : '-', icon: <Thermometer size={14} /> },
                              { label: '드리퍼', value: product[`${prefix}dripper`], icon: <Droplet size={14} /> },
                              { 
                                label: recipeTab === 'ice' ? '얼음 중량' : '추출 비율', 
                                value: recipeTab === 'ice' 
                                  ? (product.ice_weight ? `${product.ice_weight}g` : '-') 
                                  : (product.hot_ratio ? (String(product.hot_ratio).includes(':') ? product.hot_ratio : `1:${product.hot_ratio}`) : '-'), 
                                icon: <Target size={14} /> 
                              }
                            ].map((item, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-1.5">
                                <div className="text-copper/50">{item.icon}</div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-bold text-white">{item.value || '-'}</span>
                              </div>
                            ))}
                          </div>

                          {/* Horizontal Step-by-Step Layout */}
                          <div className="relative pt-4 pb-4">
                            <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 md:gap-x-1">
                              {pours.map((pour, pIdx) => (
                                <div key={pIdx} className="flex-1 group relative">
                                  {/* Horizontal Connector Line (Hidden on mobile) */}
                                  {pIdx < pours.length - 1 && (
                                    <div className="absolute top-[45px] left-[50%] w-full h-[1px] bg-gradient-to-r from-copper/40 via-copper/10 to-transparent hidden md:block z-0"></div>
                                  )}
                                  
                                  <div className="flex flex-col items-center relative z-10">
                                    {/* Step Label */}
                                    <span className="text-copper font-black text-[12px] uppercase tracking-[0.2em] mb-2 opacity-100">{pour.label}</span>
                                    
                                    {/* Step Circle with Number */}
                                    <div className="w-[50px] h-[50px] rounded-full bg-[#181a19] border border-white/10 flex items-center justify-center mb-6 group-hover:border-copper/40 transition-all duration-500 shadow-xl relative overflow-hidden">
                                       <div className="absolute inset-0 bg-gradient-to-br from-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                       <span className="text-base font-serif font-black text-white group-hover:text-copper transition-colors">{pIdx + 1}</span>
                                       
                                       {/* Mobile Vertical Connector Line */}
                                       {pIdx < pours.length - 1 && (
                                         <div className="absolute top-1/2 left-1/2 translate-y-[25px] w-[1px] h-[32px] bg-copper/20 md:hidden"></div>
                                       )}
                                    </div>
                                    
                                    {/* Step Data */}
                                    <div className="flex flex-col items-center gap-1 pt-0">
                                      <div className="flex items-baseline gap-1.5">
                                        <span className="text-xl font-serif font-black text-white tabular-nums group-hover:text-copper transition-colors">{pour.water}</span>
                                        <span className="text-[8.5px] font-bold text-gray-500 tracking-widest">g</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <Timer size={14} className="opacity-30 group-hover:opacity-60 transition-opacity" />
                                        <span className="text-sm font-serif font-bold tabular-nums text-gray-400 group-hover:text-gray-200 transition-colors">{pour.time || '-'}</span>
                                        <span className="text-[8.5px] font-bold uppercase tracking-widest opacity-40">sec</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-10">
                            <div className="flex items-center gap-4">
                              <span className="text-[17px] font-black text-gray-600 uppercase tracking-widest">최종 추출량</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-serif font-black text-copper tabular-nums">{totalWater}</span>
                                <span className="text-xs font-bold text-gray-500">g</span>
                              </div>
                            </div>
                            
                            
                            {product[`${prefix}tds`] && (
                              <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5 relative" ref={tdsHelpRef}>
                                    <span className="text-[17px] font-black text-gray-600 uppercase tracking-widest leading-none">TDS</span>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setActiveHelp(activeHelp === 'tds' ? null : 'tds'); }}
                                      className="p-1 text-white/50 hover:text-white transition-colors outline-none"
                                    >
                                      <HelpCircle size={15} strokeWidth={2.5} />
                                    </button>
                                    {activeHelp === 'tds' && (
                                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[9999] w-48 p-3 bg-[#0b0c0b]/98 border border-copper/20 rounded-xl shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                        <div className="flex justify-between items-start mb-1">
                                          <span className="text-[10px] text-copper font-black uppercase tracking-widest">TDS</span>
                                          <button onClick={(e) => { e.stopPropagation(); setActiveHelp(null); }} className="text-gray-600 hover:text-white leading-none">&times;</button>
                                        </div>
                                        <p className="text-[9px] text-gray-400 leading-relaxed font-bold break-keep text-left">추출된 커피 성분의 농도를 백분율(%)로 나타낸 것입니다. 풍미의 강도와 추출 효율을 보여주는 핵심 지표입니다.</p>
                                      </div>
                                    )}
                                  </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-2xl font-serif font-black text-copper tabular-nums">{product[`${prefix}tds`]}</span>
                                  <span className="text-xs font-bold text-gray-500">%</span>
                                </div>
                              </div>
                            )}

                            {product[`${prefix}comment`] && (
                              <div className="max-w-2xl w-full text-center mx-auto px-6 sm:px-8 md:px-0">
                                 <div className="text-[8.5px] text-copper/40 font-black uppercase tracking-[0.2em] mb-2">Recipe Note</div>
                                  <div 
                                   className="text-gray-300 text-sm sm:text-base md:text-xl leading-relaxed font-medium break-words italic html-content prose prose-invert max-w-none whitespace-pre-wrap"
                                   dangerouslySetInnerHTML={{ __html: product[`${prefix}comment`] }}
                                 />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                      <Droplet size={200} className="text-copper" />
                    </div>
                    <div 
                      className="text-gray-400 text-sm sm:text-base leading-[1.8] font-medium break-keep relative z-10 html-content prose prose-invert max-w-none whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: product.story || "정밀한 추출 가이드가 준비 중입니다. 매장에 방문하시면 바리스타가 직접 안내해 드립니다." }}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. Regulatory Product Information Notice (Table) */}
        {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
          <div className="max-w-7xl mx-auto px-4 mt-20 mb-32 border-t border-white/5 pt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 text-center">
            <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
              <div className="h-[1px] w-6 bg-white/10"></div>
              상품 정보 제공 고시
              <div className="h-[1px] w-6 bg-white/10"></div>
            </h3>
            <div className="bg-[#111211] rounded-2xl border border-white/5 overflow-hidden shadow-2xl text-left">
              <div className="flex flex-col">
                {[
                  { label: '식품유형', value: '커피 (Coffee)' },
                  { label: '업소명의 명칭 및 소재지', value: '아키미스트 로스터스 / 대구광역시 수성구 범어동 범어역' },
                  { label: '제조일자', value: '상품 후면 별도 표기' },
                  { label: '소비기한', value: '제조일로부터 1년' },
                  { label: '내용량', value: product.size ? (String(product.size).includes('g') || String(product.size).includes('개') ? product.size : `${product.size}g / ${product.size}개`) : '200g / 500g / 1000g (상품 전면 표기)' },
                  { label: '원재료명 및 함량', value: '커피원두 100%' },
                  { label: '포장재질', value: '폴리에틸렌 (내면)' },
                  { label: '품목보고번호', value: '상품 후면 별도 표기' },
                  { label: '반품 및 교환', value: '구입처 및 본사' },
                  { label: '보관방법', value: '건냉한 곳에 밀폐보관' },
                  { label: '고객 상담 전화', value: '010-0000-0000 (아키미스트)' },
                ].map((info, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                     <div className="w-full sm:w-1/3 bg-white/[0.01] p-4 text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center border-b sm:border-b-0 sm:border-r border-white/5">
                       {info.label}
                     </div>
                     <div className="w-full sm:w-2/3 p-4 text-xs font-medium text-gray-300 flex items-center break-keep">
                       {info.value}
                     </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/[0.01] border-t border-white/5">
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium mb-1.5 opacity-60 italic">
                  * 본 제품은 공정거래위원회 고시 소비자 분쟁 해결 기준에 의거 정당한 소비자 피해에 대해 교환 또는 보상받을 수 있습니다.
                </p>
                <p className="text-[10px] text-gray-500 leading-relaxed font-bold opacity-80">
                  * 부정·불량 식품 신고는 국번없이 1399
                </p>
              </div>
            </div>
          </div>
        )}
      
      {/* Visual Alchemy - Floating Particles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-copper rounded-full blur-[2px] animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-copper rounded-full blur-[3px] animate-pulse delay-700 opacity-30"></div>
    </section>
  );
}

