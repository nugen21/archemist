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
    <section id="recommended" className="py-24 px-4 sm:px-8 bg-gradient-to-b from-[#111211] to-[#181a19] relative border-t border-gray-800">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 tracking-tight">RECOMMENDED BEANS</h2>
          <p className="text-copper font-serif italic text-lg sm:text-xl">아케미스트의 이달의 추천 원두 라인업</p>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-16 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 group/scroll relative">
          {visibleBeans.map((bean) => (
            <div key={bean.id} className="bg-[#0b0c0b] border border-copper/20 rounded-3xl p-6 sm:p-8 flex flex-col hover:border-copper/50 transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group h-full relative w-[300px] sm:w-[420px] shrink-0 snap-start">
              
              {/* Admin Hide Action */}
              {isAdmin && (
                <button 
                  onClick={() => handleHide(bean.id)}
                  className="absolute top-4 right-4 z-20 text-[10px] font-bold text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors bg-black/50 px-2 py-1 rounded border border-gray-800"
                >
                  숨기기 (Hide)
                </button>
              )}

              {bean.image && (
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={bean.image} alt={bean.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0b] to-transparent"></div>
                </div>
              )}

              <div className="mb-6 border-b border-gray-800 pb-5">
                <p className="text-[10px] text-copper tracking-widest uppercase mb-1">{bean.country} {bean.region && `| ${bean.region}`}</p>
                <h3 className="text-2xl font-bold text-gray-100 mb-2 leading-tight group-hover:text-copper transition-colors h-16 line-clamp-2">{bean.name}</h3>
                <p className="text-sm text-gray-400 font-serif italic">{bean.variety} / {bean.process}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm mb-6 flex-grow">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Roaster</p>
                  <p className="text-white font-medium text-sm">{bean.roaster || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Altitude</p>
                  <p className="text-white font-medium text-sm">{bean.altitude || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Agtron (WB / G)</p>
                  <p className="text-copper font-medium text-lg font-serif">{bean.roastWb || '-'} / {bean.roastGround || '-'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Roast Date</p>
                  <p className="text-white font-medium text-sm">{bean.roastDate || '-'}</p>
                </div>
              </div>

              <div className="mb-6 bg-black/40 p-4 rounded-xl border border-gray-800/80 shadow-inner">
                <p className="text-[10px] text-copper uppercase tracking-widest mb-2 font-bold">Cup Notes</p>
                <p className="text-sm text-gray-200 font-medium leading-relaxed line-clamp-2">{bean.cupNotes || '다채롭고 우아한 플레이버'}</p>
              </div>
              
              <div className="mt-auto pt-6">
                <a 
                  href={`#bean/${bean.id}`}
                  className="w-full bg-copper/10 border border-copper/30 text-copper py-3 rounded-xl hover:bg-copper hover:text-matte-black transition-all duration-300 uppercase text-[11px] tracking-widest font-bold flex items-center justify-center gap-2 group/btn"
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
