import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
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
        
        {/* Logo & Mobile Login Button */}
        <div className="w-full sm:w-auto flex justify-between items-center py-3 sm:py-5 shrink-0">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              <span className="text-white font-serif font-bold tracking-[0.2em] text-[10px] sm:text-sm hidden sm:inline-block">ARCHEMIST</span>
            </a>
          </div>

          {/* Naver Login (Mobile Icon Only) */}
          <div className="sm:hidden flex items-center">
            <button className="bg-[#03C75A] text-white p-1.5 rounded-sm shadow-lg shadow-[#03C75A]/10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
              </svg>
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
    </header>
  );
}
