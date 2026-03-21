import React from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-3 px-4 sm:px-8 scroll-mt-24 bg-[#111211] border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Contact Info */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">문의 하기</h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">
            원두 납품, 샘플 요청, 혹은 로스팅에 대한 어떠한 궁금증이라도 환영합니다. 매일 아침 당신의 뛰어난 감각을 마주할 수 있도록 돕겠습니다.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group">
              <div className="bg-gray-800 p-3 rounded-full text-copper group-hover:bg-copper group-hover:text-matte-black transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">이메일 문의</p>
                <a href="mailto:archemist@gmail.com" className="text-lg text-gray-200 font-medium hover:text-copper transition-colors">archemist@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="bg-gray-800 p-3 rounded-full text-copper group-hover:bg-[#FEE500] group-hover:text-black transition-colors">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">카카오톡 문의</p>
                <span className="text-lg text-gray-200 font-medium whitespace-nowrap">아키미스트</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="bg-gray-800 p-3 rounded-full text-copper group-hover:bg-copper group-hover:text-matte-black transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">로스터리 위치</p>
                <a 
                  href="https://map.naver.com/p/search/%EB%8C%80%EA%B5%AC%EC%8B%9C%20%EC%88%98%EC%84%B1%EA%B5%AC%20%EB%B2%94%EC%96%B4%EB%8F%99%20%EB%B2%94%EC%96%B4%EC%97%AD" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base sm:text-lg text-gray-200 font-medium break-keep hover:text-copper transition-colors underline-offset-4 hover:underline"
                >
                  대구시 수성구 범어동 범어역
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:w-2/3">
          <form 
            action="mailto:archemist@gmail.com" 
            method="post" 
            encType="text/plain" 
            className="bg-[#181a19] p-8 sm:p-12 rounded-lg border border-gray-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-bl-[100px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">이름 / 상호명</label>
                <input 
                  type="text" 
                  name="Name" 
                  className="w-full bg-[#121312] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-copper transition-colors" 
                  placeholder="담당자 성함 또는 카페 상호" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">연락처</label>
                <input 
                  type="text" 
                  name="Phone" 
                  className="w-full bg-[#121312] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-copper transition-colors" 
                  placeholder="010-0000-0000" 
                  required 
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-300 mb-2 font-medium">문의 내용</label>
              <textarea 
                name="Message" 
                rows="6" 
                className="w-full bg-[#121312] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-copper transition-colors resize-none" 
                placeholder="납품 수량, 희망 원두 스타일 등 세부적인 내용을 적어주시면 친절하게 상담해 드립니다." 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-copper text-matte-black font-bold text-lg py-4 rounded hover:bg-opacity-90 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-copper/30"
            >
              문의 메일 보내기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
