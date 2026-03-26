import React from 'react';
import { Mail, Phone, Clock, Instagram, Send, ExternalLink } from 'lucide-react';

const Footer = ({ isAdmin }) => {
  return (
    <footer className="bg-[#0b0c0b] border-t border-white/5 pt-16 pb-24 lg:pb-16 text-gray-500 font-sans relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <h3 className="text-white font-serif font-black text-2xl tracking-tighter uppercase">
              ARCHEMIST <span className="text-copper">ROASTERS</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-sm break-keep text-gray-400">
              아키미스트 로스터스는 원두의 화합을 연구하는 로스터리입니다. 
              최고의 생두를 선별하고 정교한 로스팅 원칙을 지켜내며 
              한 잔의 커피에 완벽한 연금술 같은 경험을 담아냅니다.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/archemist_roasters" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://smartstore.naver.com/archemist" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Business Info</h4>
            <ul className="text-[11px] space-y-4 leading-relaxed font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-gray-600 uppercase tracking-widest text-[9px] font-black">상호명</span>
                <span className="text-gray-300">아키미스트 (ARCHEMIST)</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-gray-600 uppercase tracking-widest text-[9px] font-black">대표자</span>
                <span className="text-gray-300">박주형</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-gray-600 uppercase tracking-widest text-[9px] font-black">사업자등록번호</span>
                <span className="text-gray-300">742-12-00000 <span className="text-[9px] opacity-40 ml-1">(예시)</span></span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-gray-600 uppercase tracking-widest text-[9px] font-black">주소</span>
                <span className="text-gray-300">대구광역시 수성구 범어동 범어역 11번 출구 인근</span>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Customer Support</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-copper/10 rounded-lg text-copper">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">PHONE</div>
                  <div className="text-xs text-gray-300 font-bold">010-0000-0000</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-copper/10 rounded-lg text-copper">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">EMAIL</div>
                  <div className="text-xs text-gray-300 font-bold">archemist.roasters@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-copper/10 rounded-lg text-copper">
                  <Clock size={14} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">HOURS</div>
                  <div className="text-xs text-gray-300 font-bold">평일 08:00 - 20:00 (주말 휴무)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">© 2026 Archemist Roasters. All rights reserved.</p>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
              <span className="text-gray-700">이용약관</span>
              <span className="text-gray-700">개인정보처리방침</span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
             {isAdmin ? (
                <div className="bg-copper/10 border border-copper/30 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                  <span className="text-[10px] text-copper font-black tracking-widest uppercase">Admin Active</span>
                </div>
              ) : (
                <a 
                  href="#admin"
                  className="text-gray-700 hover:text-copper text-[9px] tracking-[0.2em] font-black uppercase transition-all flex items-center gap-2 border border-white/5 px-4 py-2 rounded-full hover:bg-white/5"
                >
                  <span className="opacity-40">🔒</span>
                  Admin Panel
                </a>
              )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
