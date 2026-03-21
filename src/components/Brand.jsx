import React from 'react';

export default function Brand() {
  return (
    <section id="brand" className="py-3 px-4 sm:px-8 scroll-mt-24 bg-matte-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-6">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-copper uppercase mb-3">About Us</h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6 leading-tight break-keep">
              완벽한 한 잔을 향한 <br className="hidden sm:block" />끝없는 실험
            </h3>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed font-light break-keep">
              아키미스트 로스터스에게 로스팅은 과학이자 예술입니다. 생두가 지닌 수백 가지의 잠재적인 향미를 가장 이상적인 밸런스로 끌어내기 위해, 매 순간 온도와 습도, 시간을 철저히 통제하며 연금술과도 같은 과정에 몰두합니다.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light break-keep">
              평범한 일상 속 특별한 영감이 필요한 순간을 위해, 당신의 모든 감각을 일깨워줄 최상급 스페셜티 커피를 정성스럽게 볶아냅니다.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" 
              alt="Archemist Roasting Process" 
              className="rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Space Gallery */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-100 mb-12">로스터리 공간</h2>
          <div className="w-full relative group overflow-hidden rounded-2xl shadow-2xl bg-gray-900/50 min-h-[300px] flex items-center justify-center">
            <img 
              src="/roastery_new_bright.png" 
              alt="아키미스트 로스팅 룸" 
              className="w-full h-auto md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700 relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-[#121312] rounded-lg p-8 sm:p-12 border border-gray-800 shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">아키미스트 로스터스 오시는 길</h3>
            <p className="text-gray-300 text-lg mb-2 font-medium">대구시 수성구 범어동 범어역</p>
            <p className="text-gray-500 text-sm">운영 시간: 평일 08:00 - 20:00 (주말 휴무)</p>
          </div>
          <a 
            href="https://map.naver.com/p/search/%EB%8C%80%EA%B5%AC%EC%8B%9C%20%EC%88%98%EC%84%B1%EA%B5%AC%20%EB%B2%94%EC%96%B4%EB%8F%99%20%EB%B2%94%EC%96%B4%EC%97%AD" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-transparent border border-copper text-copper px-8 py-4 rounded hover:bg-copper hover:text-matte-black transition-colors duration-300 font-bold whitespace-nowrap text-lg"
          >
            네이버 지도로 보기
          </a>
        </div>
      </div>
    </section>
  );
}
