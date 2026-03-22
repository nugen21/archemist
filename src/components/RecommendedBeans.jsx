import React, { useState, useEffect } from 'react';

const countryToCode = {
  // South & Central America
  '브라질': 'br', '콜롬비아': 'co', '파나마': 'pa', '과테말라': 'gt', 
  '코스타리카': 'cr', '온두라스': 'hn', '에콰도르': 'ec', '엘살바도르': 'sv', 
  '니카라과': 'ni', '멕시코': 'mx', '페루': 'pe', '볼리비아': 'bo', 
  '도미니카 공화국': 'do', '자메이카': 'jm',
  // Africa
  '에티오피아': 'et', '케냐': 'ke', '탄자니아': 'tz', '르완다': 'rw', 
  '부룬디': 'bi', '우간다': 'ug', '콩고민주공화국': 'cd', '말라위': 'mw', '잠비아': 'zm',
  // Asia & Middle East
  '예멘': 'ye', '베트남': 'vn', '인도네시아': 'id', '인도': 'in', 
  '태국': 'th', '라오스': 'la', '파푸아뉴기니': 'pg', '필리핀': 'ph', 
  '동티모르': 'tl', '미얀마': 'mm', '중국': 'cn',
  // Others
  '미국': 'us', '한국': 'kr'
};

export default function RecommendedBeans({ isAdmin, onEdit }) {
  const [beans, setBeans] = useState([]);

  const loadBeans = async () => {
    try {
      // Priority 1: Server Data (Always fetch fresh to ensure sync)
      const response = await fetch(`/products.json?t=${Date.now()}`);
      if (response.ok) {
        const serverData = await response.json();
        setBeans(serverData.filter(p => {
          const isRec = p.recommended === true;
          const isBeev = p.category === 'beverage';
          if (!isAdmin && isBeev) return false;
          return isRec;
        }));
        
        // Sync to local storage for persistence/fallback
        try {
          localStorage.setItem('archemist_beans', JSON.stringify(serverData));
        } catch (e) {
          console.warn('Storage quota exceeded:', e);
        }
      } else {
        throw new Error('Server response not OK');
      }
    } catch (error) {
      console.error('RecommendedBeans: Server load failed, fallback to local:', error);
      
      // Fallback: Local Storage
      const localSaved = localStorage.getItem('archemist_beans');
      if (localSaved) {
        const all = JSON.parse(localSaved);
        setBeans(all.filter(p => p.recommended === true && (isAdmin || p.category !== 'beverage')));
      }
    }
  };

  useEffect(() => {
    loadBeans();
    
    const handleStorageChange = () => loadBeans();
    window.addEventListener('storage', handleStorageChange);
    // Also listen to local changes in the same window
    window.addEventListener('beansUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beansUpdated', handleStorageChange);
    };
  }, [isAdmin]);

  const handleHide = (id) => {
    if (window.confirm('이 원두를 메인 페이지에서 숨기시겠습니까? (관리자 메뉴에서 다시 보이게 할 수 있습니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.map(bean => bean.id === id ? { ...bean, visible: false } : bean);
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      loadBeans();
      window.dispatchEvent(new Event('beansUpdated'));
    }
  };

  const visibleBeans = beans.filter(bean => bean.visible !== false);
  if (visibleBeans.length === 0) return null; 

  return (
    <section id="recommended" className="pt-10 sm:pt-16 pb-12 px-4 sm:px-8 scroll-mt-24 bg-gradient-to-br from-[#1a110a] via-[#111211] to-[#0b0c0b] relative border-y border-copper/10 overflow-hidden">
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
              className="bg-[#111211]/80 backdrop-blur-sm border border-copper/30 rounded-3xl p-5 flex flex-col hover:border-copper/60 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group h-full relative w-[300px] sm:w-[420px] shrink-0 snap-start mt-4 hover:-translate-y-2 after:content-[''] after:absolute after:right-[-8px] sm:after:right-[-12px] after:top-1/4 after:bottom-1/4 after:w-[1px] after:bg-copper/20 last:after:hidden cursor-pointer"
            >
              
              <div className="absolute -top-3 left-8 px-4 py-1 bg-copper rounded-full shadow-lg z-10">
                <p className="text-[9px] text-black font-black tracking-widest uppercase">추천 상품</p>
              </div>

              {isAdmin && (
                <button 
                  onClick={() => handleHide(bean.id)}
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
                
                {/* BeanType Badge */}
                {['bean', 'dripbag', 'coldbrew'].includes(bean.category) && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse pointer-events-none"></span>
                      {bean.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
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
                        : `${bean.category === 'dripbag' ? '드립백 | ' : ''}${bean.country || '스페셜티'}`} 
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
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-copper transition-colors h-16 line-clamp-2 italic">
                  {bean.name}
                  {bean.process && (
                    <span className="text-sm sm:text-base text-copper/60 ml-2 not-italic font-sans font-bold align-middle">
                      ({bean.process})
                    </span>
                  )}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-copper font-bold text-xl tracking-widest drop-shadow-[0_0_10px_rgba(161,118,76,0.2)]">
                    {bean.category === 'beverage' 
                      ? (Number(bean.price) / 1000).toFixed(1)
                      : (Number(bean.price) || 0).toLocaleString()}
                    <span className="text-[10px] text-gray-500 font-bold ml-1">KRW</span>
                  </span>
                </div>
                <p className="text-3xl text-gray-400 font-serif italic mb-3">
                  {bean.category === 'beverage' ? '시그니처 레시피' : (bean.variety || '스페셜티')}
                </p>
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
                      <p className="text-gray-200 font-medium text-sm">{bean.roastDate || '-'}</p>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 italic text-gray-500 text-xs">
                    매일 아침 가장 신선한 재료로 준비하는 아키미스트의 시그니처 메뉴입니다.
                  </div>
                )}
              </div>

              
              <div className="mt-auto pt-4">
                <a 
                  href={`#bean/${bean.id}`}
                  className="w-full bg-copper text-black py-4 rounded-xl hover:bg-white transition-all duration-300 uppercase text-[11px] tracking-[0.2em] font-black flex items-center justify-center gap-2 group/btn shadow-[0_10px_20px_rgba(161,118,76,0.3)]"
                >
                  연금술 보고서 확인
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
