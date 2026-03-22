import { 
  Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft, ShoppingBag, ExternalLink,
  Cherry, Citrus, Apple, Grape, Sun, TreePalm, 
  Flower2, Sprout, Leaf, Candy, Bean, Nut, Wheat, 
  Sparkles, Milk, Wind
} from 'lucide-react';

const CUP_NOTE_ICONS = {
  // Berries
  '딸기': Cherry, '라즈베리': Cherry, '블루베리': Cherry, '블랙베리': Cherry,
  // Citrus
  '레몬': Citrus, '라임': Citrus, '오렌지': Citrus, '자몽': Citrus, '베르가못': Citrus, '귤': Citrus,
  // Stone Fruit
  '복숭아': Cherry, '자두': Cherry, '살구': Cherry, '체리': Cherry,
  // Tropical
  '망고': Sun, '파인애플': Sun, '패션후르츠': Sun, '리치': Sun, '파파야': Sun,
  // Nuts/Coconut
  '코코넛': TreePalm, '구운 아몬드': Nut, '헤이즐넛': Nut, '피넛': Nut, '호두': Nut, '캐슈넛': Nut,
  // Orchard
  '사과': Apple, '배': Apple, '청포도': Grape, '적포도': Grape, '건포도': Grape, '무화과': Grape,
  // Floral
  '자스민': Flower2, '오렌지 블로썸': Flower2, '아카시아': Flower2, '국화': Flower2, '장미': Flower2, '히비스커스': Flower2,
  // Herbal
  '허브': Sprout, '라벤더': Sprout, '카모마일': Sprout, '민트': Leaf, '세이지': Leaf, '로즈마리': Leaf, '딜': Leaf,
  // Sweet
  '흑설탕': Candy, '백설탕': Candy, '시럽': Candy, '캐러멜': Candy, '당밀': Candy, '아카시아 꿀': Candy, '잡화 꿀': Candy,
  // Chocolate/Bean
  '다크 초콜릿': Bean, '밀크 초콜릿': Bean, '카카오': Bean, '화이트 초콜릿': Bean,
  // Grains
  '보리': Wheat, '구운 빵': Wheat, '시리얼': Wheat, '호밀': Wheat, '맥아': Wheat,
  // Spices
  '시나몬': Sparkles, '정향': Sparkles, '육두구': Sparkles, '블랙 페퍼': Sparkles, '생강': Sparkles,
  // Dairy
  '버버': Milk, '크림': Milk, '치즈': Milk,
  // Other
  '가죽': Wind, '흙내음': Wind, '담뱃잎': Wind, '파이프 담배': Wind
};

export default function ProductDetail({ product, onBack }) {
  if (!product) return null;

  // Formatting logic for display
  const formattedPrice = product.category === 'beverage' 
    ? (Number(product.price) / 1000).toFixed(1)
    : (Number(product.price) || 0).toLocaleString();

  const isBean = product.category === 'bean' || !product.category;
  const isCafe = product.category === 'beverage';

  const renderCupNotes = (notesString) => {
    if (!notesString) return null;
    
    // Split by comma, space, or slash, then clean up
    const notes = notesString.split(/[,\s/|]+/).filter(n => n.trim().length > 0);
    
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {notes.map((note, idx) => {
          const IconComponent = CUP_NOTE_ICONS[note.trim()];
          return (
            <div 
              key={idx} 
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-copper/40 transition-all group/note"
            >
              {IconComponent && <IconComponent size={18} className="text-copper group-hover/note:scale-110 transition-transform" />}
              <span className="text-lg font-bold text-gray-200 tracking-tight">{note}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="min-h-screen py-12 px-4 sm:px-8 bg-[#0b0c0b] relative overflow-hidden text-gray-200 selection:bg-copper selection:text-white">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-[110] flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-copper uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/5 group shadow-2xl"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        홈으로 돌아가기
      </button>

      {/* Naver Purchase Sticky Bar (Mobile Only) */}
      {product.storeUrl && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-[120] p-4 bg-gradient-to-t from-black to-transparent">
          <a 
            href={product.storeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#03C75A] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-widest shadow-[0_10px_30px_rgba(3,199,90,0.3)] animate-bounce-subtle"
          >
            <span className="bg-white text-[#03C75A] w-6 h-6 rounded-md flex items-center justify-center font-black text-xs">N</span>
            네이버 스마트 스토어 구매하기
          </a>
        </div>
      )}

      {/* Decorative background alchemy elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-[150px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Product Image & Quick Info */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-copper/20 to-yellow-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-[#111211] shadow-2xl">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-20 opacity-10 grayscale brightness-200">
                    <img src={`/images/icons/${product.category || 'bean'}.jpg`} alt="icon" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Product Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-copper text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-xl">
                    {product.category === 'bean' ? '스페셜티 원두' : product.category === 'dripbag' ? '드립백' : product.category === 'coldbrew' ? '콜드브루' : '매장 음료'}
                  </span>
                  {product.isSpecial && (
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      시즌 한정 에디션
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Direct Purchase Button (Desktop Only) */}
            {product.storeUrl && (
              <div className="hidden lg:block mt-8">
                <a 
                  href={product.storeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#03C75A] hover:bg-[#02b351] text-white py-5 rounded-2xl flex items-center justify-center gap-4 font-black text-lg tracking-widest transition-all shadow-[0_15px_30px_rgba(3,199,90,0.2)] hover:shadow-[0_20px_40px_rgba(3,199,90,0.4)] hover:-translate-y-1"
                >
                  <div className="bg-white text-[#03C75A] w-8 h-8 rounded-lg flex items-center justify-center font-black text-base shadow-sm">N</div>
                  네이버 스마트 스토어 구매하기
                  <ExternalLink size={18} className="opacity-50" />
                </a>
              </div>
            )}
          </div>

          {/* Right: Detailed Specifications */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-copper/60 font-serif font-bold tracking-[0.4em] text-xs uppercase italic">아키미스트 아카이브 No.{product.id % 999}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-copper/30 to-transparent"></div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight mb-4 break-keep">
                {product.name}
              </h1>
              <div className="mb-10">
                <div className="flex items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
                  <p className="text-4xl sm:text-5xl font-serif font-black text-copper tracking-wider tabular-nums">
                    {formattedPrice}
                    <span className="text-lg ml-3 text-gray-500 font-sans font-black">원</span>
                  </p>
                  <div className="flex gap-8">
                    {product.roastDate && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">로스팅 날짜</span>
                        <span className="text-lg text-gray-400 font-bold tabular-nums">{product.roastDate}</span>
                      </div>
                    )}
                    {product.category === 'bean' && product.agingDays && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-copper/60 font-black uppercase tracking-[0.2em]">에이징</span>
                        <span className="text-lg text-copper font-bold tabular-nums">
                          {(() => {
                            const roastStr = (product.roastDate || '').replace(/\./g, '-');
                            const date = new Date(roastStr);
                            if (isNaN(date.getTime())) return `${product.agingDays}일 후`;
                            date.setDate(date.getDate() + parseInt(product.agingDays));
                            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
                          })()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Unified Coffee Spec Grid */}
                {product.category === 'bean' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 mb-12">
                    {[
                      { label: '지역', value: `${product.country || ''} ${product.region || ''}`.trim() || '정보 없음' },
                      { label: '농장', value: product.farm || '정보 없음' },
                      { label: '마이크로밀', value: product.micromill || '정보 없음' },
                      { label: '재배 고도', value: product.altitude || '정보 없음' },
                      { label: '품종', value: product.variety || '정보 없음' },
                      { label: '가공방식', value: product.process || '정보 없음' },
                      { label: '중량', value: product.size ? (String(product.size).endsWith('g') ? product.size : `${product.size}g`) : '200g' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[15px] text-gray-600 font-black uppercase tracking-[0.2em]">{item.label}</span>
                        <span className="text-xl text-white font-bold tracking-tight">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 mb-12 backdrop-blur-sm shadow-inner overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <img src="/logo-alchemist.png" alt="Logo" className="w-32 h-32 object-contain" />
              </div>
              <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-lg uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                컵 프로파일
              </h4>
              <div className="flex flex-col gap-6">
                <p className="text-gray-400 text-sm font-medium tracking-wide mb-2 italic">
                  아키미스트 로스터스가 선별한 최상의 테루아를 경험하세요.
                </p>
                {renderCupNotes(product.cupNotes)}
                {!product.cupNotes && (
                  <p className="text-lg text-gray-500 italic">
                    {isCafe ? '도심 속에서 즐기는 우아한 연금술 한 잔.' : '테이스팅 노트 준비 중입니다.'}
                  </p>
                )}
              </div>
            </div>

            {/* Technical Context Section */}
            {isBean ? (
              <div className="space-y-6 bg-[#181a19] border border-white/5 p-6 rounded-[2rem] hover:border-copper/20 transition-all duration-500 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                  <Scale size={100} className="text-copper" />
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-copper animate-pulse"></span>
                    로스팅 레벨 가이드
                  </h4>
                  
                  <div className="space-y-8">
                    {/* Whole Bean Scale */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">홀빈 (Whole Bean)</span>
                        <div className="h-[1px] w-4 bg-white/10"></div>
                        <span className="text-lg font-serif font-black text-white">{product.agtronWb || '-'}</span>
                      </div>
                      <div className="relative h-12 flex items-center px-4">
                        <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-30 blur-[1px]"></div>
                        <div className="flex justify-between w-full relative z-10 px-0">
                          {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            return (
                              <div key={val} className="w-2 h-2 rounded-full border border-white/5" style={{ backgroundColor: colors[val] }} />
                            );
                          })}
                        </div>
                        {/* Floating Marker (WB) */}
                        {product.agtronWb && !isNaN(parseFloat(product.agtronWb)) && (
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
                            style={{ 
                              left: `calc(1rem + ${Math.max(0, Math.min(100, (parseFloat(product.agtronWb) - 25) / 70 * 100))}% - 1rem)` 
                            }}
                          >
                            <div className="relative flex flex-col items-center">
                              <div className="px-2.5 py-1 rounded-full border border-white/30 bg-black/90 backdrop-blur-md shadow-lg flex items-center justify-center -translate-y-9 scale-90 group-hover:scale-100 transition-transform whitespace-nowrap">
                                <span className="text-[8px] font-black text-white uppercase tracking-wider">
                                  {(() => {
                                    const v = parseFloat(product.agtronWb);
                                    if (v >= 90) return 'Very Light';
                                    if (v >= 80) return 'Light';
                                    if (v >= 70) return 'Medium-Light';
                                    if (v >= 60) return 'Medium';
                                    if (v >= 50) return 'Medium-Dark';
                                    if (v >= 40) return 'Dark';
                                    if (v >= 30) return 'Very Dark';
                                    return 'Extreme Dark';
                                  })()}
                                </span>
                              </div>
                              <div className="w-1 h-5 bg-white shadow-sm rounded-full -translate-y-5"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ground Scale */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">분쇄 (Ground)</span>
                        <div className="h-[1px] w-4 bg-white/10"></div>
                        <span className="text-lg font-serif font-black text-copper">{product.agtronGround || '-'}</span>
                      </div>
                      <div className="relative h-12 flex items-center px-4">
                        <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-30 blur-[1px]"></div>
                        <div className="flex justify-between w-full relative z-10">
                          {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            return (
                              <div key={val} className="w-6 h-0.5 rounded-full opacity-20" style={{ backgroundColor: colors[val] }} />
                            );
                          })}
                        </div>
                        {/* Floating Marker (Ground) */}
                        {product.agtronGround && !isNaN(parseFloat(product.agtronGround)) && (
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
                            style={{ 
                              left: `calc(1rem + ${Math.max(0, Math.min(100, (parseFloat(product.agtronGround) - 25) / 70 * 100))}% - 1rem)` 
                            }}
                          >
                            <div className="relative flex flex-col items-center">
                              <div className="px-2.5 py-1 rounded-full border border-copper/40 bg-black/90 backdrop-blur-md shadow-lg flex items-center justify-center -translate-y-9 scale-90 group-hover:scale-100 transition-transform whitespace-nowrap">
                                <span className="text-[8px] font-black text-copper uppercase tracking-wider">
                                  {(() => {
                                    const v = parseFloat(product.agtronGround);
                                    if (v >= 90) return 'Very Light';
                                    if (v >= 80) return 'Light';
                                    if (v >= 70) return 'Medium-Light';
                                    if (v >= 60) return 'Medium';
                                    if (v >= 50) return 'Medium-Dark';
                                    if (v >= 40) return 'Dark';
                                    if (v >= 30) return 'Very Dark';
                                    return 'Extreme Dark';
                                  })()}
                                </span>
                              </div>
                              <div className="w-1 h-5 bg-copper shadow-sm rounded-full -translate-y-5"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between px-1">
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter italic">Very Dark (25)</span>
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter italic">Very Light (95)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#181a19] border border-white/5 py-8 px-4 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-base text-gray-600 font-black uppercase tracking-widest">중량 및 구성</span>
                   <span className="text-xl font-bold text-copper">{product.size || '기본'}</span>
                 </div>
                 <div className="bg-[#181a19] border border-white/5 py-8 px-4 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-base text-gray-600 font-black uppercase tracking-widest">컬렉션</span>
                   <span className="text-xl font-bold text-copper uppercase">
                     {product.category === 'bean' ? '원두' : product.category === 'dripbag' ? '드립백' : product.category === 'coldbrew' ? '콜드브루' : '매장 음료'}
                   </span>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail Information Sections */}
        <div className="mt-20 border-t border-white/5 pt-20 space-y-32">
          
          {/* 1. Shipping & Shelf Life Policy */}
          {!isCafe && (
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-copper/30"></div>
                배송 및 소비기한 안내
                <div className="h-[1px] w-12 bg-copper/30"></div>
              </h3>
              <div className="bg-copper/5 border border-copper/20 p-12 rounded-[3rem] shadow-2xl backdrop-blur-sm">
                <p className="text-gray-300 text-lg sm:text-xl leading-[2.2] break-keep font-medium">
                  원두의 소비기한은 생산일로부터 1년이며, 로스팅 일자는 원두 뒷면에 별도 표기됩니다. 주문하신 상품은 주문일 기준 1~4일 이내에 로스팅 된 원두로 출고됩니다.
                </p>
              </div>
            </div>
          )}

          {/* 2. Green Bean Story */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-white/10"></div>
              생두 정보
              <div className="h-[1px] w-12 bg-white/10"></div>
            </h3>
            <div className="bg-[#111211] p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <p className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep italic">
                {product.story || "아키미스트가 엄선한 생두의 상세 정보와 로스터의 정성이 담긴 이야기가 곧 업데이트됩니다."}
              </p>
            </div>
          </div>

          {/* 3. Recommended Extraction Recipe */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-copper/30"></div>
              추천 추출 방식
              <div className="h-[1px] w-12 bg-copper/30"></div>
            </h3>
            <div className="bg-[#111211] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <Droplet size={200} className="text-copper" />
              </div>
              <p className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep relative z-10">
                {product.recipe || "정밀한 추출 가이드가 준비 중입니다. 매장에 방문하시면 바리스타가 직접 안내해 드립니다."}
              </p>
            </div>
          </div>

        </div>

      </div>
      
      {/* Visual Alchemy - Floating Particles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-copper rounded-full blur-[2px] animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-copper rounded-full blur-[3px] animate-pulse delay-700 opacity-30"></div>
    </section>
  );
}
