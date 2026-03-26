import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const countryToCode = {
  // South & Central America
  '브라질': 'br', 'brazil': 'br', 'Brazil': 'br',
  '콜롬비아': 'co', 'colombia': 'co', 'Colombia': 'co',
  '파나마': 'pa', 'panama': 'pa', 'Panama': 'pa',
  '과테말라': 'gt', 'guatemala': 'gt', 'Guatemala': 'gt',
  '코스타리카': 'cr', 'costa rica': 'cr', 'Costa Rica': 'cr',
  '온두라스': 'hn', 'honduras': 'hn', 'Honduras': 'hn',
  '에콰도르': 'ec', 'ecuador': 'ec', 'Ecuador': 'ec',
  '엘살바도르': 'sv', 'el salvador': 'sv', 'El Salvador': 'sv',
  '니카라과': 'ni', 'nicaragua': 'ni', 'Nicaragua': 'ni',
  '멕시코': 'mx', 'mexico': 'mx', 'Mexico': 'mx',
  '페루': 'pe', 'peru': 'pe', 'Peru': 'pe',
  '볼리비아': 'bo', 'bolivia': 'bo', 'Bolivia': 'bo',
  '도미니카 공화국': 'do', 'dominican republic': 'do', 'Dominican Republic': 'do',
  '자메이카': 'jm', 'jamaica': 'jm', 'Jamaica': 'jm',
  // Africa
  '에티오피아': 'et', 'ethiopia': 'et', 'Ethiopia': 'et',
  '케냐': 'ke', 'kenya': 'ke', 'Kenya': 'ke',
  '탄자니아': 'tz', 'tanzania': 'tz', 'Tanzania': 'tz',
  '르완다': 'rw', 'rwanda': 'rw', 'Rwanda': 'rw',
  '부룬디': 'bi', 'burundi': 'bi', 'Burundi': 'bi',
  '우간다': 'ug', 'uganda': 'ug', 'Uganda': 'ug',
  '콩고민주공화국': 'cd', 'dr congo': 'cd', 'DR Congo': 'cd', 'congo': 'cd',
  '말라위': 'mw', 'malawi': 'mw', 'Malawi': 'mw',
  '잠비아': 'zm', 'zambia': 'zm', 'Zambia': 'zm',
  // Asia & Middle East
  '예멘': 'ye', 'yemen': 'ye', 'Yemen': 'ye',
  '베트남': 'vn', 'vietnam': 'vn', 'Vietnam': 'vn',
  '인도네시아': 'id', 'indonesia': 'id', 'Indonesia': 'id',
  '인도': 'in', 'india': 'in', 'India': 'in',
  '태국': 'th', 'thailand': 'th', 'Thailand': 'th',
  '라오스': 'la', 'laos': 'la', 'Laos': 'la',
  '파푸아뉴기니': 'pg', 'papua new guinea': 'pg', 'Papua New Guinea': 'pg',
  '필리핀': 'ph', 'philippines': 'ph', 'Philippines': 'ph',
  '동티모르': 'tl', 'east timor': 'tl', 'East Timor': 'tl',
  '미얀마': 'mm', 'myanmar': 'mm', 'Myanmar': 'mm',
  '중국': 'cn', 'china': 'cn', 'China': 'cn',
  // Others
  '미국': 'us', 'usa': 'us', 'USA': 'us', 'United States': 'us',
  '한국': 'kr', 'korea': 'kr', 'Korea': 'kr', 'South Korea': 'kr'
};

export default function RecommendedBeans({ isAdmin, onEdit, products }) {
  const [beans, setBeans] = useState([]);
  const [activeXpHelp, setActiveXpHelp] = useState(null);
  const xpHelpRef = useRef(null);

  useEffect(() => {
    if (products && products.length > 0) {
      setBeans(products.filter(p => {
        const isRec = p.recommended === true;
        const isBeev = p.category === 'beverage';
        if (!isAdmin && isBeev) return false;
        return isRec;
      }));
    }
  }, [products, isAdmin]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (activeXpHelp && xpHelpRef.current && !xpHelpRef.current.contains(event.target)) {
        setActiveXpHelp(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeXpHelp]);

  const handleHide = (id) => {
    if (window.confirm('이 원두를 메인 페이지에서 숨기시겠습니까? (관리자 메뉴에서 다시 보이게 할 수 있습니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.map(bean => bean.id === id ? { ...bean, visible: false } : bean);
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('beansUpdated', { detail: updated }));
    }
  };

  const visibleBeans = beans.filter(bean => bean.visible !== false);
  if (visibleBeans.length === 0) return null; 

  return (
    <section id="recommended" className="pt-8 sm:pt-12 pb-8 px-4 sm:px-8 scroll-mt-24 bg-gradient-to-br from-[#1a110a] via-[#111211] to-[#0b0c0b] relative border-y border-copper/10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-copper/40 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-copper/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 relative">
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-white mb-4 tracking-tight italic drop-shadow-[0_0_20px_rgba(161,118,76,0.2)]">
            로스터의 선택
          </h2>
          <p className="text-gray-400 font-serif italic text-lg sm:text-xl max-w-2xl mx-auto">아키미스트가 엄선한 이달의 최상위 셀렉션</p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {visibleBeans.map((bean) => (
            <div 
              key={bean.id} 
              onClick={() => window.location.hash = `#product/${bean.id}`}
              className={`bg-[#111211]/80 backdrop-blur-sm border border-copper/30 rounded-3xl p-5 flex flex-col hover:border-copper/60 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group h-full relative w-[300px] sm:w-[420px] shrink-0 snap-start mt-4 hover:-translate-y-2 after:content-[''] after:absolute after:right-[-8px] sm:after:right-[-12px] after:top-1/4 after:bottom-1/4 after:w-[1px] after:bg-copper/20 last:after:hidden cursor-pointer ${activeXpHelp === bean.id ? 'z-[10000]' : 'z-10'}`}
            >
              
              <div className="absolute -top-3 left-8 px-4 py-1 bg-copper rounded-full shadow-lg z-10">
                <p className="text-[9px] text-black font-black tracking-widest uppercase">추천 상품</p>
              </div>

              {isAdmin && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHide(bean.id);
                  }}
                  className="absolute top-4 right-4 z-20 text-[10px] font-bold text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors bg-black/50 px-2 py-1 rounded border border-white/5"
                >
                  숨기기
                </button>
              )}

              <div className="relative w-full h-52 mb-4 rounded-2xl overflow-hidden transition-all duration-700 bg-[#111211]/50 border border-white/5">
                {bean.image ? (
                  <img src={bean.image} alt={bean.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-12">
                     <img 
                        src={bean.category === 'dripbag' ? '/images/icons/dripbag.jpg' : bean.category === 'coldbrew' ? '/images/icons/coldbrew.jpg' : bean.category === 'beverage' ? '/images/icons/beverage.jpg' : '/images/icons/bean.jpg'} 
                        className="w-full h-full object-contain opacity-10 grayscale" 
                        alt="icon fallback"
                     />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111211] via-transparent to-transparent opacity-80"></div>
                
                {/* Product QR Code */}
                <div className="absolute top-4 right-4 z-30 group-hover:scale-110 transition-transform bg-white p-1 rounded-xl shadow-2xl opacity-80 hover:opacity-100">
                  <QRCodeCanvas 
                    value={`${window.location.origin}${window.location.pathname}#product/${bean.id}`}
                    size={50}
                    level={"M"}
                    includeMargin={false}
                  />
                </div>

                {/* BeanType Badge (Left) */}
                {['bean', 'dripbag', 'coldbrew'].includes(bean.category) && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse pointer-events-none"></span>
                      {bean.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
                    </span>
                  </div>
                )}

                {/* Size Badge (Right) */}
                {bean.size && (
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[15px] font-black px-4 py-2 rounded-lg tracking-widest shadow-xl">
                      {(() => {
                        const s = String(bean.size).toLowerCase();
                        if (bean.category === 'dripbag') return s.includes('개') ? s : `${s}개`;
                        if (bean.category === 'bean') return s.includes('g') ? s : `${s}g`;
                        return s;
                      })()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4 border-b border-copper/10 pb-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {bean.country && countryToCode[bean.country] && (
                      <img 
                        src={`https://flagcdn.com/w80/${countryToCode[bean.country]}.png`} 
                        alt={bean.country} 
                        className="w-8 h-6 object-cover rounded-md shadow-sm opacity-90 border border-white/10" 
                      />
                    )}
                    <p className="text-[10px] text-copper/80 tracking-[0.2em] uppercase font-bold">
                      {bean.category === 'beverage' 
                        ? '매장 음료' 
                        : `${bean.category === 'dripbag' ? '드립팩 | ' : ''}${bean.country || ''}`} 
                      {bean.region && ` | ${bean.region}`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isAdmin && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(bean.id);
                        }}
                        className="text-[9px] font-black text-white/40 hover:text-copper border border-white/10 hover:border-copper/40 px-2 py-0.5 rounded-md transition-all uppercase tracking-tighter"
                      >
                        EDIT
                      </button>
                    )}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-copper transition-colors h-24 line-clamp-3 italic">
                  {bean.name}
                  {bean.process && (
                    <span className="text-sm sm:text-base text-copper/60 ml-2 not-italic font-sans font-bold align-middle">
                      ({bean.process})
                    </span>
                  )}
                </h3>
                <div className="flex justify-between items-center mb-4 border-b border-copper/10 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-copper font-bold text-xl tracking-widest drop-shadow-[0_0_10px_rgba(161,118,76,0.2)] tabular-nums">
                      {bean.category === 'beverage' 
                        ? (Number(bean.price) / 1000).toFixed(1)
                        : (Number(bean.price) || 0).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-600 font-black uppercase tracking-widest">원</span>
                  </div>

                  {/* XP Reward Badge */}
                  {/* XP Reward Badge - No XP for beverages */}
                  {bean.category !== 'beverage' && (
                    <div className="flex items-center bg-gradient-to-br from-amber-500/15 to-yellow-500/5 border border-amber-500/20 px-2 py-1.5 rounded-lg backdrop-blur-sm group-hover:scale-105 transition-all relative">
                      <div className="flex flex-col items-start leading-none gap-0.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[8px] text-amber-500/80 font-black tracking-widest uppercase">경험치 보상</span>
                          <div className="relative inline-block z-40" ref={activeXpHelp === bean.id ? xpHelpRef : null}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveXpHelp(activeXpHelp === bean.id ? null : bean.id);
                              }}
                              className="p-1 hover:text-white transition-colors text-white/80 outline-none"
                              aria-label="XP Help"
                            >
                              <HelpCircle size={15} strokeWidth={2.5} />
                            </button>

                            {activeXpHelp === bean.id && (
                              <div className="absolute top-6 left-0 z-[9999] w-56 p-4 bg-[#0b0c0b]/98 border border-amber-500/20 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest leading-none font-sans">멤버십 및 등급 안내</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveXpHelp(null); }} className="text-gray-600 hover:text-white leading-none text-xs">&times;</button>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed font-bold break-keep text-left tracking-normal normal-case font-sans">
                                  경험치를 쌓아서 최고 레벨에 도전해 보세요! <br/>
                                  <span className="text-amber-500 font-black">등급</span>이 올라갈수록 더 특별한 혜택이 제공됩니다.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[15.5px] font-serif font-black text-amber-500">
                             +{Math.floor(parseFloat(String(bean.price || '0').replace(/,/g, '')) * 0.0001 * 1.1)}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black text-amber-500/60 uppercase">xp</span>
                            <span className="text-[8px] bg-amber-500/15 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 font-black leading-tight">+10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>


                {(bean.category === 'beverage' || bean.variety || (bean.beanType === 'blend' && (bean.blend1 || bean.blend2 || bean.blend3 || bean.blend4))) && (
                  <div className="mb-4">
                    {bean.beanType === 'blend' ? (
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-copper/40 font-black uppercase tracking-[0.2em] mb-1">Blend Composition</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {[1, 2, 3, 4].map(n => ({ name: bean[`blend${n}`], ratio: bean[`ratio${n}`] })).filter(c => c.name).map((comp, idx, arr) => (
                            <span key={idx} className="text-sm sm:text-lg text-gray-300 font-serif italic flex items-baseline gap-1.5">
                              {comp.name} 
                              {comp.ratio && <span className="text-xs sm:text-sm text-copper font-black not-italic opacity-90">{comp.ratio}%</span>}
                              {idx < arr.length - 1 && <span className="text-gray-700 ml-1">/</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xl sm:text-2xl text-gray-400 font-serif italic">
                        {bean.category === 'beverage' ? '시그니처 레시피' : bean.variety}
                      </p>
                    )}
                  </div>
                )}
                {bean.cupNotes && (
                  <p className="text-sm text-copper/90 font-medium leading-relaxed line-clamp-2 mb-6">
                    {bean.cupNotes}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4 flex-grow">
                {bean.category !== 'beverage' ? (
                  <>
                    {(bean.category === 'bean' || !bean.category || bean.category === 'dripbag') && (
                      <div className="col-span-2">
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">
                          로스팅 포인트 (Agtron)
                        </p>
                        <div className="space-y-1">
                          {bean.category !== 'dripbag' && bean.roastPointWb && (
                            <p className="text-copper/80 font-bold text-xs font-sans flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-copper/40"></span>
                              홀빈: <span className="text-copper text-base font-serif font-black">{bean.roastPointWb} ({bean.agtronWb || '-'})</span>
                            </p>
                          )}
                          <p className="text-copper/80 font-bold text-xs font-sans flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-copper/40"></span>
                            {bean.category !== 'dripbag' && "분쇄: "}
                            <span className="text-copper text-base font-serif font-black">{bean.roastPointGround} ({bean.agtronGround || '-'})</span>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="col-span-2 border-t border-copper/5 pt-3">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">로스팅 날짜</p>
                      <p className="text-gray-200 font-medium text-sm">
                        {bean.roastDate || '-'}
                        {Number(bean.agingDays) > 0 && <span className="text-copper ml-3 font-black text-xs whitespace-nowrap opacity-90">(에이징 {bean.agingDays}일)</span>}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 italic text-gray-500 text-xs">
                    매일 아침 가장 신선한 재료로 준비하는 아키미스트의 시그니처 메뉴입니다.
                  </div>
                )}
              </div>

              
              <div className="mt-auto h-4 items-center justify-center flex">
                 <div className="w-12 h-[1px] bg-copper/20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
