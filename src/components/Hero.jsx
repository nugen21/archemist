export default function Hero({ id }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-8 overflow-hidden">
      {/* Background decorations for a premium dynamic feel */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-copper/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/4 w-[600px] h-[600px] bg-copper/5 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="max-w-5xl text-center z-10 relative mt-16 break-keep w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 max-w-xs sm:max-w-md md:max-w-[24rem]">
          <img
            src="/logo-icon.png"
            alt="Archemist Roasters Icon"
            className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(161,118,76,0.3)] mb-3 sm:mb-5"
          />
          <img
            src="/logo-text.png"
            alt="Archemist Roasters"
            className="w-full h-auto object-contain px-2 -ml-3"
          />
        </div>

        <p className="text-base sm:text-lg md:text-[22px] text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed sm:leading-loose font-light px-4 md:px-8 whitespace-pre-wrap text-center">
          <strong className="block text-xl sm:text-2xl md:text-[28px] text-copper mb-4 sm:mb-6 font-medium">당신의 감각을 믿으세요.</strong>
          연금술사의 세심한 로스팅과 데이터는 오직 당신의 확신을 돕기 위한 도구일 뿐입니다.
          우리는 그저 당신의 감각이 찾아낸 그 기분 좋은 마주침이 매일 아침 당신의 식탁 위에서 반복될 수 있도록 돕습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 w-full px-2">
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
