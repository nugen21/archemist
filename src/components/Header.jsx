export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 md:px-16 fixed top-0 w-full z-[100] bg-matte-black/60 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="w-10 sm:w-20"></div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
        <a href="#home" className="hover:text-copper transition-colors duration-300 tracking-wide">홈</a>
        <a href="#events" className="hover:text-copper transition-colors duration-300 tracking-wide">이벤트</a>
        <a href="#brand" className="hover:text-copper transition-colors duration-300 tracking-wide">브랜드 소개</a>
        <a href="#recommended" className="hover:text-copper transition-colors duration-300 tracking-wide">원두</a>
        <a href="#dripbag" className="hover:text-copper transition-colors duration-300 tracking-wide">드립팩</a>
        <a href="#coldbrew" className="hover:text-copper transition-colors duration-300 tracking-wide">콜드브루</a>
        <a href="#beverage" className="hover:text-copper transition-colors duration-300 tracking-wide">음료</a>
        <a href="#contact" className="hover:text-copper transition-colors duration-300 tracking-wide font-bold">문의 하기</a>
      </nav>
      <button className="flex items-center gap-1.5 sm:gap-2 bg-[#03C75A] text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-sm hover:bg-[#02b350] transition-all duration-300 font-bold tracking-wide text-xs sm:text-base shadow-lg shadow-[#03C75A]/20">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="sm:w-3.5 sm:h-3.5">
          <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
        </svg>
        네이버 로그인
      </button>
    </header>
  );
}
