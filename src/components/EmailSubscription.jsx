import React, { useState } from 'react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call or save to local storage for now
    const subscriptions = JSON.parse(localStorage.getItem('archemist_subscriptions') || '[]');
    localStorage.setItem('archemist_subscriptions', JSON.stringify([...subscriptions, { email, date: new Date().toISOString() }]));
    
    setIsSubmitted(true);
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-[#111211] flex items-center justify-center px-4 py-20 font-sans selection:bg-[#e11d48] selection:text-white">
      <div className="max-w-[480px] w-full bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl relative text-black">
        {/* Close Button */}
        <button 
          onClick={handleBack}
          className="absolute top-6 right-8 text-gray-400 hover:text-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-2">
          <h2 className="text-3xl font-black mb-10 tracking-tight">누구보다 빠르게</h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-2 bg-[#f3f4f6] p-2 rounded-2xl items-center mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow bg-transparent px-4 py-3 text-sm text-gray-800 focus:outline-none placeholder:text-gray-400"
                  placeholder="example@archemist.kr"
                />
                <button
                  type="submit"
                  className="bg-[#e11d48] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#be123c] transition-all text-sm shrink-0 shadow-lg shadow-rose-900/20"
                >
                  구독하기
                </button>
              </div>
              <p className="text-[13px] text-gray-800 font-bold leading-relaxed mb-12">
                아키미스트의 뉴스레터를 통해 아키미스트의 소식들은 물론<br className="hidden sm:block" /> 유용한 로스팅 꿀팁들까지 받아보세요!
              </p>
            </form>
          ) : (
            <div className="mb-12 py-4 animate-in fade-in zoom-in duration-500">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">구독이 신청되었습니다!</h3>
              <p className="text-gray-500 text-sm">가장 신선한 로스팅 리포트로 찾아뵙겠습니다.</p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-8 mt-10">
            <h3 className="text-[15px] font-bold mb-6">SNS를 통해서도 다양한 소식을 만나보세요!</h3>
            <div className="flex gap-6 items-center">
              <a href="https://instagram.com" className="text-black hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" className="text-black hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a href="https://facebook.com" className="text-black hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.2 11c-.3-1.4-1.6-2.5-3.2-2.5-1.1 0-2.1.5-2.7 1.3-.6-.8-1.6-1.3-2.7-1.3-1.6 0-2.9 1.1-3.2 2.5H4v2h2V20h12v-7h2v-2h-1.8zM16 11c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-4.5 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM11 20H8v-7h3v7zm5 0h-3v-7h3v7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  );
};

export default EmailSubscription;
