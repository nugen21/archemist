import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '이벤트', href: '#events' },
    { name: '브랜드', href: '#brand' },
    { name: '원두', href: '#recommended' },
    { name: '드립팩', href: '#dripbag' },
    { name: '콜드브루', href: '#coldbrew' },
    { name: '음료', href: '#beverage' },
    { name: '문의', href: '#contact', bold: true },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] bg-matte-black/60 backdrop-blur-2xl border-b border-white/5 transition-all duration-300 overflow-hidden">
      {/* Unified Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-8 md:px-16">
        
        {/* Logo & Toggle Row (Visible on all, but on mobile it acts as top part) */}
        <div className="w-full sm:w-auto flex justify-between items-center py-3 sm:py-5 shrink-0">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              <span className="text-white font-serif font-bold tracking-[0.2em] text-[10px] sm:text-sm hidden sm:inline-block">ARCHEMIST</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:hidden">
            {/* Naver Login (Mobile Icon Only) */}
            <button className="bg-[#03C75A] text-white p-1.5 rounded-sm shadow-lg shadow-[#03C75A]/10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 p-1"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Global Persistent Navigation (Scrollable on Mobile) */}
        <nav className="w-full sm:w-auto overflow-x-auto scrollbar-hide py-3 sm:py-0">
          <div className="flex items-center gap-1 sm:gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`whitespace-nowrap px-3 sm:px-0 py-1 text-[11px] sm:text-[12px] transition-all duration-300 tracking-widest uppercase font-bold sm:font-medium ${link.bold ? 'text-copper sm:text-gray-200 sm:border-l sm:border-gray-800 sm:pl-8 sm:ml-2' : 'text-gray-500 sm:text-gray-400 hover:text-copper'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Admin/Auth (Right Side) */}
        <div className="hidden sm:flex items-center gap-4 py-5 shrink-0 ml-4">
          <button className="flex items-center gap-2 bg-[#03C75A] text-white px-3.5 py-1.5 rounded-sm hover:bg-[#02b350] transition-all duration-300 font-bold tracking-wide text-[11px] shadow-lg shadow-[#03C75A]/10 uppercase">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
            </svg>
            <span>네이버 로그인</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay (For secondary/helper tasks) */}
      <div className={`fixed inset-0 z-[110] bg-[#0b0c0b]/90 backdrop-blur-2xl transition-all duration-500 ease-in-out sm:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
        <div className="flex flex-col h-full p-8 pt-24 text-center">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-500"><X size={28} /></button>
          <div className="flex flex-col gap-8">
            <a href="#admin" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif tracking-widest text-gray-400">ADMIN PANEL</a>
            <a href="https://smartstore.naver.com" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif tracking-widest text-gray-400">OFFICIAL STORE</a>
          </div>
          <div className="mt-auto pb-12">
            <button className="w-full bg-[#03C75A] text-white py-4 rounded-xl font-bold tracking-widest text-sm shadow-2xl uppercase">Native Naver Auth</button>
          </div>
        </div>
      </div>
    </header>
  );
}
