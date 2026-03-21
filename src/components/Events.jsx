import React from 'react';

export default function Events() {
  return (
    <section id="events" className="py-3 px-4 sm:px-8 scroll-mt-24 bg-[#111211] border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-sm font-bold tracking-widest text-copper uppercase mb-3 text-center w-full block">Special Experience</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6 text-center w-full block">스페셜 이벤트 & 예약</h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light break-keep text-center w-full block mt-2">
            오직 아키미스트 로스터스에서만 경험할 수 있는 특별한 시음과 커핑 세션에 당신을 초대합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Tasting Service */}
          <div className="bg-[#181a19] rounded-lg border border-gray-800 shadow-2xl overflow-hidden group flex flex-col">
            <div className="h-64 sm:h-80 overflow-hidden relative shrink-0">
              <img 
                src="/tasting.png" 
                alt="시음 예약 서비스" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181a19] to-transparent opacity-90"></div>
              <h4 className="absolute bottom-6 left-8 text-3xl font-bold text-white tracking-tight">시음 예약 서비스</h4>
            </div>
            <div className="p-8 sm:p-10 flex flex-col grow justify-between gap-8">
              <p className="text-gray-300 text-lg leading-relaxed font-light break-keep">
                미리 예약하신 분들을 대상으로 진행되는 프라이빗한 테이스팅 세션입니다. 아키미스트 로스터스의 다양한 라인업 원두를 직접 시음해보고 자신의 감각과 취향에 가장 알맞은 원두를 찾아가는 맞춤형 서비스를 경험하세요.
              </p>
              <a 
                href="#naver-booking" 
                className="inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-6 py-4 rounded-sm hover:bg-[#02b350] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#03C75A]/20 transition-all duration-300 font-bold tracking-wide w-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
                </svg>
                네이버 예약 서비스
              </a>
            </div>
          </div>

          {/* Public Cupping */}
          <div className="bg-[#181a19] rounded-lg border border-gray-800 shadow-2xl overflow-hidden group flex flex-col">
            <div className="h-64 sm:h-80 overflow-hidden relative shrink-0">
              <img 
                src="/cupping.png" 
                alt="퍼블릭 커핑" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181a19] to-transparent opacity-90"></div>
              <h4 className="absolute bottom-6 left-8 text-3xl font-bold text-white tracking-tight">퍼블릭 커핑</h4>
            </div>
            <div className="p-8 sm:p-10 flex flex-col grow justify-between gap-8">
              <p className="text-gray-300 text-lg leading-relaxed font-light break-keep">
                아키미스트 로스터스가 주최하는 소규모 게스트 참여형 커핑 이벤트입니다. 새롭게 입고된 다양한 스페셜티 원두를 가장 먼저 만나보고, 커피를 사랑하는 소수의 인원들과 함께 심도 깊은 커핑을 즐겨보세요.
              </p>
              <a 
                href="#naver-booking" 
                className="inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-6 py-4 rounded-sm hover:bg-[#02b350] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#03C75A]/20 transition-all duration-300 font-bold tracking-wide w-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
                </svg>
                네이버 예약 서비스
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
