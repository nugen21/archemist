export default function Hero({ id }) {
  return (
    <section id={id} className="relative min-h-[60vh] flex items-center justify-center pt-12 px-4 sm:px-8 scroll-mt-24 overflow-hidden">
      {/* Background decorations for a premium dynamic feel */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-copper/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/4 w-[600px] h-[600px] bg-copper/5 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="max-w-5xl text-center z-10 relative mt-10 break-keep w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-[28rem]">
          <img
            src="/logo-alchemist.png"
            alt="Archemist Roasters Icon"
            className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(161,118,76,0.4)] mb-2 sm:mb-4"
          />
          <img
            src="/logo-text-new.png"
            alt="Archemist Roasters"
            className="w-full h-auto object-contain px-4"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 animate-fade-in">
          <p className="text-lg sm:text-2xl md:text-[26px] text-copper font-serif italic leading-snug break-keep">
            고대 그리스어로 ‘Arche(ἀρχή)”는 <br className="hidden sm:block" />
            만물의 시초이자 근원적인 원리를 뜻합니다.
          </p>
          <p className="text-[15px] sm:text-lg md:text-[19px] text-gray-400 leading-relaxed sm:leading-[1.8] font-normal tracking-normal break-keep max-w-3xl mx-auto">
            아키미스트 로스터스는 유행에 휩쓸리는 커피가 아닌, <br className="hidden md:block"/>
            원두가 가진 <span className="text-gray-200 font-bold">‘태초의 잠재력(Arche)’</span>을 현대적 연금술(Alchemy)로 <br className="hidden md:block"/>
            증명해내기 위해 설립된 비밀 결사체와 같은 로스터리입니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 w-full px-2 mb-6">
          <a 
            href="#subscribe"
            className="bg-copper text-matte-black px-8 py-3.5 sm:px-10 sm:py-4 rounded-sm font-bold text-base sm:text-lg hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(161,118,76,0.5)] transition-all duration-300 w-full md:w-auto max-w-sm text-center"
          >
            원두 소식 받기
          </a>
        </div>
      </div>
    </section>
  );
}
