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
    <div className="min-h-screen bg-[#111211] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 font-sans selection:bg-copper selection:text-white">
      <div className="max-w-md w-full bg-[#181a19] border border-copper/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-copper/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-copper font-serif tracking-widest uppercase mb-3">Subscribe</h2>
            <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
              아키미스트의 새로운 원두 소식과<br/>로스팅 리포트를 가장 먼저 받아보세요.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0b0c0b] border border-gray-800 rounded-xl px-4 py-4 text-gray-200 focus:outline-none focus:border-copper transition-all placeholder:text-gray-700 shadow-inner"
                  placeholder="name@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-700 via-copper to-yellow-600 text-[#111] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(161,118,76,0.4)] transition-all uppercase tracking-widest text-sm active:scale-[0.98]"
              >
                구독 신청하기
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-copper/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-copper/40">
                <svg className="w-8 h-8 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">신청이 완료되었습니다!</h3>
              <p className="text-gray-400 text-sm">깊고 풍부한 커피 소식으로 찾아뵙겠습니다.</p>
            </div>
          )}

          <div className="mt-10 text-center border-t border-gray-800 pt-8">
            <button 
              onClick={handleBack}
              className="group flex items-center justify-center mx-auto text-[10px] font-bold text-gray-500 hover:text-copper uppercase tracking-widest transition-colors"
            >
              <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
              Back to Roastery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
