import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ isAdmin, onAdminNav }) {
  const [user, setUser] = useState(null);
  
  const navLinks = [
    { name: '브랜드', href: '#brand' },
    { name: '이벤트', href: '#events' },
    { name: '원두', href: '#recommended' },
    { name: '드립팩', href: '#dripbag' },
    { name: '콜드브루', href: '#coldbrew' },
    ...(isAdmin ? [{ name: '매장음료', href: '#menu' }] : []),
    { name: '문의', href: '#contact', bold: true },
    { name: 'ADMIN', href: '#admin', isAdminLink: true },
  ];

  useEffect(() => {
    // Initialize Naver Login
    const initNaverLogin = () => {
      if (!window.naver) return;

      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "alHUBeHRQr9g_lfpvkrU", 
        callbackUrl: window.location.origin + "/",
        isPopup: false,
        loginButton: { color: "green", type: 2, height: 40 }
      });
      
      naverLogin.init();

      // Check login status
      naverLogin.getLoginStatus((status) => {
        if (status) {
          setUser(naverLogin.user);
        }
      });
    };

    // Wait for SDK to load if needed
    if (window.naver) {
      initNaverLogin();
    } else {
      const handleSdkLoad = () => initNaverLogin();
      window.addEventListener('load', handleSdkLoad);
      return () => window.removeEventListener('load', handleSdkLoad);
    }
  }, []);

  const handleLogout = () => {
    // Naver doesn't provide a direct client-side logout SDK function that clears Naver's session,
    // only the local session. To fully logout, normally you redirect to Naver's logout URL.
    // For now, we clear the local state.
    setUser(null);
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
    alert('로그아웃 되었습니다.');
  };

  const handleLoginClick = () => {
    // If we use the SDK's hidden button approach:
    const naverBtn = document.getElementById('naverIdLogin_loginButton');
    if (naverBtn) {
      naverBtn.firstChild.click();
    } else {
      // Direct jump to login if button not initialized
      alert('네이버 로그인 SDK 초기화 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <header className="fixed top-0 w-full z-[100] bg-matte-black/60 backdrop-blur-2xl border-b border-white/5 transition-all duration-300 overflow-hidden">
      {/* Hidden container for Naver SDK's button */}
      <div id="naverIdLogin" className="hidden"></div>
      
      {/* Unified Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-8 md:px-16">
        
        {/* Logo & Mobile Login Button */}
        <div className="w-full sm:w-auto flex justify-between items-center py-3 sm:py-5 shrink-0">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2 sm:gap-3">
              <img src="/logo-alchemist.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
              <img src="/logo-text-new.png" alt="ARCHEMIST" className="h-4 sm:h-5 object-contain" />
            </a>
          </div>

          {/* Naver Login (Mobile) */}
          <div className="sm:hidden flex items-center gap-3">
            {user ? (
               <div className="flex items-center gap-2">
                 <img src={user.profile_image} className="w-6 h-6 rounded-full border border-copper/30" alt="profile" />
                 <button onClick={handleLogout} className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">로그아웃</button>
               </div>
            ) : (
              <button onClick={handleLoginClick} className="bg-[#03C75A] text-white p-1.5 rounded-sm shadow-lg shadow-[#03C75A]/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Global Persistent Navigation (Scrollable on Mobile) */}
        <nav className="w-full sm:w-auto overflow-x-auto scrollbar-hide py-3 sm:py-0">
          <div className="flex items-center gap-1 sm:gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`whitespace-nowrap px-3 sm:px-0 py-1 text-[11px] sm:text-[12px] transition-all duration-300 tracking-[0.2em] uppercase font-bold sm:font-medium 
                  ${link.isAdminLink ? 'text-gray-400 hover:text-copper border-l border-white/10 pl-4 ml-2' : 
                    link.bold ? 'text-copper sm:text-gray-200 sm:border-l sm:border-gray-800' : 
                    'text-gray-500 sm:text-gray-400 hover:text-copper'}`}
                onClick={link.isAdminLink ? onAdminNav : undefined}
              >
                {link.isAdminLink && <span className="opacity-50 mr-1">🔒</span>}
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Admin/Auth (Right Side) */}
        <div className="hidden sm:flex items-center gap-6 py-5 shrink-0 ml-4">
          {user ? (
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <img src={user.profile_image} alt="profile" className="w-6 h-6 rounded-full border border-copper/40" />
                 <span className="text-[11px] font-bold text-gray-300 tracking-tighter">{user.name}님</span>
               </div>
               <button onClick={handleLogout} className="text-[10px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest">로그아웃</button>
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-[#03C75A] text-white px-3.5 py-1.5 rounded-sm hover:bg-[#02b350] transition-all duration-300 font-bold tracking-wide text-[11px] shadow-lg shadow-[#03C75A]/10 uppercase"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.04 11.234L8.605 0.408H0.2V23.592H8.16V12.766L15.594 23.592H24V0.408H16.04V11.234Z"/>
              </svg>
              <span>네이버 로그인</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
