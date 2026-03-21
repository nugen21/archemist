import React, { useState, useEffect } from 'react';

const ProductSection = ({ title, category, emoji, items, bgColor }) => {
  if (items.length === 0) return null;

  return (
    <section id={category} className={`py-2 sm:py-4 scroll-mt-24 relative overflow-hidden ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{emoji}</span>
              <span className="text-copper font-serif font-bold tracking-[0.3em] text-xs uppercase">{category.toUpperCase()} COLLECTION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight italic">
              {title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm tracking-widest uppercase font-bold border-b border-copper/30 pb-2">
            Explore the Alchemy
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
                <div className="bg-copper/10 p-4 rounded-2xl group-hover:bg-copper/20 transition-colors relative">
                  <span className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity">{emoji}</span>
                  {product.recommended && (
                    <span className="absolute -top-2 -right-2 bg-copper text-[#111] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-[#111]/20 animate-pulse">
                      BEST
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-copper font-bold tracking-widest text-sm drop-shadow-[0_0_10px_rgba(161,118,76,0.2)]">
                    {product.price || "Contact"}
                  </span>
                  {product.recommended && (
                    <span className="text-[9px] text-copper/60 font-bold tracking-widest uppercase mt-1">Recommended Choice</span>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-copper transition-colors h-16 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {product.cupNotes || "상세 정보는 매장에 문의해 주세요."}
              </p>
              <button 
                className="w-full py-4 rounded-xl border border-white/10 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => window.location.hash = '#contact'}
              >
                Inquire Now
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
    const localSaved = localStorage.getItem('archemist_beans');
    
    // Priority 1: Local Storage
    if (localSaved) {
      setProducts(JSON.parse(localSaved).filter(p => p.visible !== false));
      return;
    }

    // Priority 2: Server Fallback
    try {
      const response = await fetch(`/products.json?t=${Date.now()}`);
      if (response.ok) {
        const serverData = await response.json();
        setProducts(serverData.filter(p => p.visible !== false));
        try {
          localStorage.setItem('archemist_beans', JSON.stringify(serverData));
        } catch (e) {
          console.warn('Storage quota exceeded:', e);
        }
      }
    } catch (error) {
      console.error('Products: Server load failed:', error);
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
        title="Single Origin Beans" 
        category="bean" 
        emoji="🫘" 
        items={beans} 
        bgColor="bg-[#111211]" 
      />
      <ProductSection 
        title="Dripbag Selection" 
        category="dripbag" 
        emoji="📦" 
        items={dripBags} 
        bgColor="bg-gradient-to-b from-[#111211] to-[#181a19]" 
      />
      <ProductSection 
        title="Coldbrew Essence" 
        category="coldbrew" 
        emoji="🧪" 
        items={coldBrew} 
        bgColor="bg-[#181a19]" 
      />
      <ProductSection 
        title="Cafe Beverages" 
        category="beverage" 
        emoji="☕" 
        items={beverages} 
        bgColor="bg-gradient-to-t from-[#0b0c0b] to-[#181a19]" 
      />
      
      {showFallback && (
        <div className="py-20 text-center">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">No Dynamic Products Registered Yet</p>
          <a href="#admin" className="text-copper text-[10px] font-bold tracking-widest underline mt-4 inline-block">GO TO ADMIN PANEL</a>
        </div>
      )}
    </div>
  );
}
