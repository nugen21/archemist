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

        <p className="text-base sm:text-lg md:text-[20px] text-gray-300 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed sm:leading-loose font-light px-4 md:px-8 whitespace-pre-wrap text-center break-keep">
          <strong className="block text-xl sm:text-2xl md:text-[28px] text-copper mb-4 sm:mb-6 font-serif">“Ad Fontes, Ad Aroma - 근원으로, 향기로”</strong>
          세상의 모든 물질이 4원소로 이루어져 있다는 고대 철학처럼, 커피의 맛 또한 씨앗, 토양, 물, 그리고 불(로스팅)이라는 근원에서 시작됩니다.
          ARCHEMIST는 이 근원의 에너지를 가장 순수한 형태의 ‘액체’로 정제하는 자들입니다.
        </p>

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
