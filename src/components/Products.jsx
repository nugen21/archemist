import React, { useState, useEffect } from 'react';

const ProductSection = ({ title, category, icon, items, bgColor }) => {
  if (items.length === 0) return null;

  return (
    <section id={category} className={`py-2 sm:py-4 scroll-mt-24 relative overflow-hidden ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center p-1.5 border border-copper/20 shadow-[0_0_15px_rgba(161,118,76,0.2)]">
                <img src={icon} alt={category} className="w-full h-full object-contain" />
              </div>
              <span className="text-copper font-serif font-bold tracking-[0.3em] text-xs uppercase">{category === 'bean' ? '싱글 오리진' : category === 'dripbag' ? '드립백' : category === 'coldbrew' ? '콜드브루' : '카페'} 컬렉션</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight italic">
              {title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm tracking-widest uppercase font-bold border-b border-copper/30 pb-2">
            아키미스트의 연구
          </p>
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="group bg-[#111211]/50 border border-white/5 rounded-3xl p-5 hover:border-copper/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full w-[280px] sm:w-[360px] md:w-[400px] shrink-0 snap-start"
            >
              {product.image && (
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden transition-all duration-700">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent"></div>
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-copper/5 p-3 rounded-2xl group-hover:bg-copper/15 transition-all duration-500 relative border border-white/5 group-hover:border-copper/20 w-16 h-16 flex items-center justify-center">
                  <img src={icon} alt={category} className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(161,118,76,0.3)]" />
                  {product.recommended && (
                    <span className="absolute -top-1 -right-1 bg-copper text-[#111] text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-[#111]/20 animate-pulse z-20">
                      BEST
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-copper font-bold tracking-widest text-sm drop-shadow-[0_0_10px_rgba(161,118,76,0.2)]">
                    {product.price || "Contact"}
                  </span>
                  {product.recommended && (
                    <span className="text-[9px] text-copper/60 font-bold tracking-widest uppercase mt-1">아키미스트 추천 셀렉션</span>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-copper transition-colors h-16 line-clamp-2">
                {product.name}
              </h3>
              {product.roastDate && (
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper/40"></span>
                  로스팅 날짜: {product.roastDate}
                </p>
              )}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {product.cupNotes || "상세 정보는 매장에 문의해 주세요."}
              </p>
              <button 
                className="w-full py-4 rounded-xl border border-white/10 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => window.location.hash = '#contact'}
              >
                문의하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      // Priority 1: Server Data (Always fetch fresh to ensure sync)
      const response = await fetch(`/products.json?t=${Date.now()}`);
      if (response.ok) {
        const serverData = await response.json();
        setProducts(serverData.filter(p => p.visible !== false));
        
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
      console.error('Products: Server load failed, using local fallback:', error);
      
      // Fallback: Local Storage
      const localSaved = localStorage.getItem('archemist_beans');
      if (localSaved) {
        setProducts(JSON.parse(localSaved).filter(p => p.visible !== false));
      }
    }
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener('beansUpdated', loadProducts);
    return () => window.removeEventListener('beansUpdated', loadProducts);
  }, []);

  const beans = products.filter(p => p.category === 'bean' || !p.category);
  const dripBags = products.filter(p => p.category === 'dripbag');
  const coldBrew = products.filter(p => p.category === 'coldbrew');
  const beverages = products.filter(p => p.category === 'beverage');

  // Fallback demo items if empty
  const showFallback = products.length === 0;

  return (
    <div className="bg-[#111211]">
      <ProductSection 
        title="싱글 오리진 원두" 
        category="bean" 
        icon="/images/icons/bean.jpg" 
        items={beans} 
        bgColor="bg-[#111211]" 
      />
      <ProductSection 
        title="드립백 셀렉션" 
        category="dripbag" 
        icon="/images/icons/dripbag.jpg" 
        items={dripBags} 
        bgColor="bg-gradient-to-b from-[#111211] to-[#181a19]" 
      />
      <ProductSection 
        title="콜드브루 에센스" 
        category="coldbrew" 
        icon="/images/icons/coldbrew.jpg" 
        items={coldBrew} 
        bgColor="bg-[#181a19]" 
      />
      <ProductSection 
        title="카페 베버리지" 
        category="beverage" 
        icon="/images/icons/beverage.jpg" 
        items={beverages} 
        bgColor="bg-gradient-to-t from-[#0b0c0b] to-[#181a19]" 
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
