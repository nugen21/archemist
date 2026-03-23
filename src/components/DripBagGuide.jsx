import React, { useEffect } from 'react';
import { ArrowLeft, Scissors, Thermometer, Droplets, Timer, ChevronDown, CheckCircle2, Coffee } from 'lucide-react';

const DripBagGuide = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: '01',
      title: 'CUT AWAY',
      subtitle: '절취선을 뜯어주세요',
      description: '상단의 절취선을 따라 가볍게 뜯어 드립백을 개봉합니다. 필터 가장자리가 깊게 찢어지지 않도록 주의하여 천천히 열어주세요.',
      icon: <Scissors className="text-copper" size={24} />,
      badge: 'CAUTION',
      badgeText: '필터 파손 주의'
    },
    {
      id: '02',
      title: 'PULL & FIX',
      subtitle: '컵에 단단히 고정해주세요',
      description: '드립백 양쪽의 종이 날개와 앞부분(앞코)을 바깥쪽으로 당겨 컵 가장자리에 안정적으로 걸어줍니다.',
      icon: <CheckCircle2 className="text-copper" size={24} />,
    },
    {
      id: '03',
      title: 'PUSH',
      subtitle: '중앙 고정부를 눌러주세요',
      description: '앞부분 중앙에 표시된 "PUSH" 부분을 살짝 눌러 컵 내부에서 드립백이 흔들리지 않게 한 번 더 고정해줍니다.',
      icon: <ChevronDown className="text-copper" size={24} />,
    },
    {
      id: '04',
      title: 'BREW',
      subtitle: '95°C의 물로 추출을 시작합니다',
      description: '추출 최적 온도인 95°C 전후의 뜨거운 물을 준비합니다. 커피 가루가 충분히 젖을 정도로만 물을 부어 약 30초간 뜸을 들여줍니다.',
      icon: <Thermometer className="text-copper" size={24} />,
      stats: [
        { label: '물 온도', value: '95°C' },
        { label: '뜸 시간', value: '30s' }
      ]
    },
    {
      id: '05',
      title: 'POUR',
      subtitle: '2~3회에 나누어 부어주세요',
      description: '나머지 150~180ml의 물을 2~3번에 나누어 천천히 부어줍니다. 추출이 완료된 후 드립백을 제거하면 맛있는 커피가 완성됩니다.',
      icon: <Droplets className="text-copper" size={24} />,
      stats: [
        { label: '추출량', value: '150-180ml' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0b] text-white font-sans selection:bg-copper relative overflow-x-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-copper/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-copper/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0b0c0b]/40 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex items-center transition-all">
        <button 
          onClick={onBack}
          className="relative z-10 group flex items-center gap-2 text-gray-500 hover:text-copper transition-all font-bold uppercase tracking-[0.2em] text-[9px]"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK</span>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <Coffee className="text-copper w-5 h-5" />
            <span className="text-sm font-black tracking-[0.3em] text-white uppercase opacity-40">Drip Bag Brewing Guide</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-32 pb-24 px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-copper font-serif font-black tracking-[0.4em] text-xs uppercase italic drop-shadow-[0_0_15px_rgba(161,118,76,0.2)]">Premium Extraction Guide</h2>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-tight">드립백 <span className="text-copper italic">추출 가이드</span></h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed break-keep">
            아키미스트 로스터스가 제안하는 최상의 드립백 추출법으로 테루아가 선사하는 모든 향미를 온전히 경험해 보세요.
          </p>
        </div>

        <div className="grid gap-12 sm:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
              {/* Step Number Decoration */}
              <div className="absolute -left-1 sm:-left-20 top-0 text-[100px] sm:text-[140px] font-serif font-black text-white/[0.03] leading-none pointer-events-none select-none transition-colors group-hover:text-copper/[0.05]">
                {step.id}
              </div>

              {/* Icon & Connector */}
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-copper/30 group-hover:bg-copper/5 transition-all duration-500 shadow-xl group-hover:shadow-copper/5 backdrop-blur-md">
                  {step.icon}
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block w-[1px] h-32 bg-gradient-to-b from-copper/20 to-transparent"></div>
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 space-y-4 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight group-hover:text-copper transition-colors duration-500">{step.title}</h3>
                  {step.badge && (
                    <span className="bg-red-950/40 text-red-500 border border-red-500/20 text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase animate-pulse">
                      {step.badgeText}
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white/90 tracking-tight leading-snug">{step.subtitle}</h4>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed break-keep font-medium">
                  {step.description}
                </p>

                {step.stats && (
                  <div className="flex gap-4 pt-2">
                    {step.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <span className="block text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">{stat.label}</span>
                        <span className="block text-sm font-black text-copper tabular-nums">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* TIP Section */}
        <div className="mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-copper/20 to-yellow-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#111211] border border-white/5 rounded-[2rem] p-8 sm:p-12 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-copper rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(161,118,76,0.4)]">
                <Timer className="text-black" size={20} />
              </div>
              <div>
                <span className="text-[10px] text-copper font-black uppercase tracking-[0.3em] block mb-1">Brewing Tip</span>
                <h3 className="text-2xl font-serif font-black tracking-tight text-white">더 풍부한 향미를 위한 포인트</h3>
              </div>
            </div>
            
            <div className="space-y-6 text-gray-400 font-medium leading-relaxed break-keep">
              <p>
                뜸 들이기는 가장 중요한 단계입니다. 처음에는 커피 가루가 전체적으로 젖을 수 있도록 중심부터 원을 그리며 소량의 물을 부어주세요. 
                <span className="text-white"> 30초의 뜸 시간</span> 동안 커피가 가진 수용성 향미 성분이 균형 있게 추출될 준비를 마칩니다.
              </p>
              <p>
                이후의 물줄기는 가늘고 일정하게 부어주는 것이 좋습니다. 필터의 종이 부분을 직접 때리지 않도록 주의하며, 소용돌이를 방지하기 위해 천천히 나누어 부어주세요.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-copper animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-copper/60">Archemist Roasters Standard</span>
              </div>
              <button 
                onClick={onBack}
                className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-xs font-black tracking-[0.2em] transition-all border border-white/5 uppercase hover:border-copper/30"
              >
                쇼핑으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Hero Image as Visual Aid */}
      <footer className="w-full h-[60vh] relative overflow-hidden mt-12">
        <img 
          src="/images/brewing_guide_hero.png" 
          alt="Brewing Coffee" 
          className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-2000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0b] via-[#0b0c0b]/40 to-transparent"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full px-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-copper mb-4 block">Enjoy Your Coffee</span>
          <h4 className="text-2xl sm:text-4xl font-serif font-black tracking-widest text-white/60">당신만의 아키미스트 타임을 경험하세요</h4>
        </div>
      </footer>
    </div>
  );
};

export default DripBagGuide;
