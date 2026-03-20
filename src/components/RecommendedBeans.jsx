import React, { useState, useEffect } from 'react';

export default function RecommendedBeans({ isAdmin }) {
  const [beans, setBeans] = useState([]);

  const loadBeans = async () => {
    const saved = localStorage.getItem('archemist_beans');
    if (saved) {
      const all = JSON.parse(saved);
      setBeans(all.filter(p => (p.category === 'bean' || !p.category) && p.recommended === true));
    } else {
      try {
        const response = await fetch('/products.json');
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter(p => (p.category === 'bean' || !p.category) && p.recommended === true);
          setBeans(filteredData);
          localStorage.setItem('archemist_beans', JSON.stringify(filteredData));
        }
      } catch (error) {
        console.error('Failed to load initial products:', error);
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
  }, []);

  const handleHide = (id) => {
    if (window.confirm('이 원두를 메인 페이지에서 숨기시겠습니까? (관리자 메뉴에서 다시 보이게 할 수 있습니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.map(bean => bean.id === id ? { ...bean, visible: false } : bean);
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      loadBeans();
      window.dispatchEvent(new Event('beansUpdated'));
    }
  };

  const visibleBeans = beans.filter(bean => bean.visible !== false && (bean.category === 'bean' || !bean.category));
  if (visibleBeans.length === 0) return null; 

  return (
    <section id="recommended" className="py-24 px-4 sm:px-8 bg-gradient-to-br from-[#1a110a] via-[#111211] to-[#0b0c0b] relative border-y border-copper/10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-copper/40 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-copper/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1 rounded-full border border-copper/20 bg-copper/5 mb-6">
             <p className="text-[10px] text-copper tracking-[0.4em] uppercase font-bold">The Alchemist's Selection</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-white mb-4 tracking-tight italic drop-shadow-[0_0_20px_rgba(161,118,76,0.2)]">
            RECOMMENDED BEANS
          </h2>
          <p className="text-gray-400 font-serif italic text-lg sm:text-xl max-w-2xl mx-auto">아케미스트가 엄선한 이달의 최상위 원두 큐레이션</p>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-16 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {visibleBeans.map((bean) => (
            <div key={bean.id} className="bg-[#111211]/80 backdrop-blur-sm border border-copper/30 rounded-3xl p-6 sm:p-8 flex flex-col hover:border-copper/60 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group h-full relative w-[300px] sm:w-[420px] shrink-0 snap-start mt-4 hover:-translate-y-2">
              
              <div className="absolute -top-3 left-8 px-4 py-1 bg-copper rounded-full shadow-lg z-10">
                <p className="text-[9px] text-black font-black tracking-widest uppercase">Featured Choice</p>
              </div>

              {isAdmin && (
                <button 
                  onClick={() => handleHide(bean.id)}
                  className="absolute top-4 right-4 z-20 text-[10px] font-bold text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors bg-black/50 px-2 py-1 rounded border border-white/5"
                >
                  숨기기
                </button>
              )}

              {bean.image && (
                <div className="relative w-full h-52 mb-6 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={bean.image} alt={bean.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111211] to-transparent"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-2 border-copper/10 group-hover:border-copper/0 transition-all pointer-events-none rounded-2xl"></div>
                </div>
              )}

              <div className="mb-6 border-b border-copper/10 pb-5">
                <p className="text-[10px] text-copper/80 tracking-[0.2em] uppercase mb-1 font-bold">{bean.country} {bean.region && `| ${bean.region}`}</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-copper transition-colors h-20 line-clamp-2 italic">{bean.name}</h3>
                <p className="text-sm text-gray-500 font-serif italic">{bean.variety} / {bean.process}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm mb-6 flex-grow">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Roaster</p>
                  <p className="text-gray-200 font-medium text-sm">{bean.roaster || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Altitude</p>
                  <p className="text-gray-200 font-medium text-sm">{bean.altitude || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Agtron (WB / G)</p>
                  <p className="text-copper font-black text-xl font-serif">{bean.roastWb || '-'} / {bean.roastGround || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Roast Date</p>
                  <p className="text-gray-200 font-medium text-sm">{bean.roastDate || '-'}</p>
                </div>
              </div>

              <div className="mb-8 bg-copper/5 p-4 rounded-xl border border-copper/10 shadow-inner">
                <p className="text-[10px] text-copper uppercase tracking-widest mb-2 font-bold">Cup Notes</p>
                <p className="text-sm text-gray-300 font-medium leading-relaxed line-clamp-2">{bean.cupNotes || '다채롭고 우아한 플레이버'}</p>
              </div>
              
              <div className="mt-auto pt-4">
                <a 
                  href={`#bean/${bean.id}`}
                  className="w-full bg-copper text-black py-4 rounded-xl hover:bg-white transition-all duration-300 uppercase text-[11px] tracking-[0.2em] font-black flex items-center justify-center gap-2 group/btn shadow-[0_10px_20px_rgba(161,118,76,0.3)]"
                >
                  View Alchemy Report
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
