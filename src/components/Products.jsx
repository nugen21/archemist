import React, { useState, useEffect } from 'react';

const ProductSection = ({ title, category, icon, items, bgColor }) => {
  if (items.length === 0) return null;

  return (
    <section id={category} className={`py-4 sm:py-8 scroll-mt-24 relative overflow-hidden border-b border-white/5 last:border-b-0 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-widest italic uppercase">
              {category === 'bean' ? '원두' : category === 'dripbag' ? '드립팩' : category === 'coldbrew' ? '콜드브루' : '카페'}
            </h2>
          </div>
          <div className="hidden md:block h-[1px] flex-grow ml-8 bg-gradient-to-r from-copper/20 to-transparent"></div>
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {items.map((product) => (
            <div 
              key={product.id} 
              onClick={() => window.location.hash = `#product/${product.id}`}
              className="group bg-[#111211]/50 border border-white/5 rounded-3xl p-5 hover:border-copper/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full w-[280px] sm:w-[360px] md:w-[400px] shrink-0 snap-start relative after:content-[''] after:absolute after:right-[-8px] sm:after:right-[-12px] md:after:right-[-16px] after:top-1/4 after:bottom-1/4 after:w-[1px] after:bg-white/5 last:after:hidden cursor-pointer"
            >
              {product.image && (
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden transition-all duration-700">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent"></div>
                  
                  {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-md flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-copper"></span>
                        {product.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col mb-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-copper transition-colors line-clamp-2 h-16">
                  {product.name}
                </h3>
                <div className="flex justify-between items-baseline border-b border-copper/10 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-copper tracking-widest drop-shadow-[0_0_10px_rgba(161,118,76,0.2)]">
                      {product.category === 'beverage' 
                        ? (Number(product.price) / 1000).toFixed(1)
                        : (Number(product.price) || 0).toLocaleString()}
                    </span>
                    {product.size && (
                      <span className="text-lg text-gray-400 font-bold tracking-widest flex items-center">
                        <span className="opacity-30 mr-2 text-sm">/</span>
                        {(() => {
                          const s = String(product.size).toLowerCase();
                          if (product.category === 'dripbag') return s.includes('개') ? s : `${s}개`;
                          if (product.category === 'bean') return s.includes('g') ? s : `${s}g`;
                          return s;
                        })()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {product.roastDate && (
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper/40"></span>
                  로스팅 날짜: {product.roastDate}
                </p>
              )}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {product.cupNotes}
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
      
      {showFallback && (
        <div className="py-20 text-center">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">등록된 상품이 없습니다.</p>
          <a href="#admin" className="text-copper text-[10px] font-bold tracking-widest underline mt-4 inline-block">관리자 패널로 이동</a>
        </div>
      )}
    </div>
  );
}
