import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '이벤트', href: '#events' },
    { name: '브랜드 소개', href: '#brand' },
    { name: '원두', href: '#recommended' },
    { name: '드립팩', href: '#dripbag' },
    { name: '콜드브루', href: '#coldbrew' },
    { name: '음료', href: '#beverage' },
    { name: '문의 하기', href: '#contact', bold: true },
  ];

  return (
    <header className="flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 md:px-16 fixed top-0 w-full z-[100] bg-matte-black/70 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="flex items-center">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-serif font-bold tracking-widest text-sm hidden sm:inline-block">ARCHEMIST</span>
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 text-[13px] font-medium text-gray-400">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className={`hover:text-copper transition-colors duration-300 tracking-wide ${link.bold ? 'font-bold text-gray-200 border-l border-gray-800 pl-8 ml-2' : ''}`}
          >
            {link.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {/* Naver Login (Desktop & Tablet) */}
        <button className="hidden sm:flex items-center gap-2 bg-[#03C75A] text-white px-4 py-2 rounded-sm hover:bg-[#02b350] transition-all duration-300 font-bold tracking-wide text-xs shadow-lg shadow-[#03C75A]/20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
          </svg>
          <span className="hidden md:inline">네이버 로그인</span>
          <span className="md:hidden">로그인</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-300 hover:text-copper transition-colors p-2"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-[110] bg-[#0b0c0b]/90 backdrop-blur-2xl transition-all duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
        <div className="flex flex-col h-full p-8 pt-24 text-center">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-copper"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-serif tracking-widest ${link.bold ? 'text-copper font-bold' : 'text-gray-300'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pb-12">
            <button className="w-full flex items-center justify-center gap-3 bg-[#03C75A] text-white py-4 rounded-xl font-bold tracking-widest text-base shadow-2xl">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
              </svg>
              네이버로 로그인하기
            </button>
            <p className="mt-8 text-[10px] text-gray-600 tracking-widest leading-relaxed uppercase">
              © 2026 Archemist Roasters<br/>Specialty Coffee Alchemy
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
