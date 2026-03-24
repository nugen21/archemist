import React, { useEffect } from 'react';
import { 
  Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft, ShoppingBag, ExternalLink,
  Cherry, Citrus, Apple, Grape, Sun, TreePalm, 
  Flower2, Sprout, Leaf, Candy, Bean, Nut, Wheat, 
  Sparkles, Milk, Wind, Edit, Coffee
} from 'lucide-react';

const FLAVOR_CONFIG = {
  // Berries
  '딸기': { image: '/assets/flavors/berries.png', color: '#ff4d6d' }, 
  '라즈베리': { image: '/assets/flavors/berries.png', color: '#ff4d6d' }, 
  '블루베리': { image: '/assets/flavors/berries.png', color: '#4361ee' }, 
  '블랙베리': { image: '/assets/flavors/berries.png', color: '#7209b7' },
  // Citrus
  '레몬': { image: '/assets/flavors/citrus.png', color: '#fee440' }, 
  '라임': { image: '/assets/flavors/citrus.png', color: '#aacc00' }, 
  '오렌지': { image: '/assets/flavors/citrus.png', color: '#fb8500' }, 
  '자몽': { image: '/assets/flavors/citrus.png', color: '#ff7b00' }, 
  '베르가못': { image: '/assets/flavors/citrus.png', color: '#9ef01a' }, 
  '귤': { image: '/assets/flavors/citrus.png', color: '#ff9100' },
  // Stone Fruit
  '복숭아': { image: '/assets/flavors/stone_fruit.png', color: '#ff9b54' }, 
  '자두': { image: '/assets/flavors/stone_fruit.png', color: '#e01e37' }, 
  '살구': { image: '/assets/flavors/stone_fruit.png', color: '#ffb38a' }, 
  '체리': { image: '/assets/flavors/stone_fruit.png', color: '#c9184a' },
  // Tropical
  '망고': { image: '/assets/flavors/tropical.png', color: '#ffbe0b' }, 
  '파인애플': { image: '/assets/flavors/tropical.png', color: '#ffd60a' }, 
  '패션후르츠': { image: '/assets/flavors/tropical.png', color: '#fb5607' }, 
  '리치': { image: '/assets/flavors/tropical.png', color: '#ff006e' }, 
  '파파야': { image: '/assets/flavors/tropical.png', color: '#ff9f1c' },
  '코코넛': { image: '/assets/flavors/tropical.png', color: '#fefae0' },
  // Orchard
  '사과': { image: '/assets/flavors/citrus.png', color: '#ef233c' }, // Fallback to citrus
  '배': { image: '/assets/flavors/stone_fruit.png', color: '#d9ed92' }, // Fallback to stone fruit
  '청포도': { image: '/assets/flavors/stone_fruit.png', color: '#b5e48c' }, 
  '적포도': { image: '/assets/flavors/stone_fruit.png', color: '#9d4edd' }, 
  '건포도': { image: '/assets/flavors/stone_fruit.png', color: '#5a189a' }, 
  '무화과': { image: '/assets/flavors/stone_fruit.png', color: '#ae2012' },
  // Floral
  '자스민': { image: '/assets/flavors/flavor_jasmine.png', color: '#f8edeb' }, 
  '오렌지 블로썸': { image: '/assets/flavors/flavor_jasmine.png', color: '#ffb5a7' }, 
  '아카시아': { image: '/assets/flavors/flavor_jasmine.png', color: '#fcd5ce' }, 
  '국화': { image: '/assets/flavors/flavor_jasmine.png', color: '#f9dcc4' }, 
  '장미': { image: '/assets/flavors/floral.png', color: '#ff4d6d' }, 
  '히비스커스': { image: '/assets/flavors/floral.png', color: '#e01e37' },
  // Herbal
  '허브': { image: '/assets/flavors/herbal.png', color: '#52b788' }, 
  '라벤더': { image: '/assets/flavors/herbal.png', color: '#b79ced' }, 
  '카모마일': { image: '/assets/flavors/herbal.png', color: '#f9f9f9' }, 
  '민트': { image: '/assets/flavors/herbal.png', color: '#2d6a4f' }, 
  '세이지': { image: '/assets/flavors/herbal.png', color: '#74c69d' }, 
  '로즈마리': { image: '/assets/flavors/herbal.png', color: '#1b4332' }, 
  '딜': { image: '/assets/flavors/herbal.png', color: '#95d5b2' },
  // Sweet
  '흑설탕': { image: '/assets/flavors/sweet.png', color: '#6f4e37' }, 
  '백설탕': { image: '/assets/flavors/sweet.png', color: '#ffffff' }, 
  '시럽': { image: '/assets/flavors/sweet.png', color: '#e85d04' }, 
  '캐러멜': { image: '/assets/flavors/sweet.png', color: '#9d4203' }, 
  '당밀': { image: '/assets/flavors/sweet.png', color: '#3d2b1f' }, 
  '아카시아 꿀': { image: '/assets/flavors/sweet.png', color: '#ffd60a' }, 
  '잡화 꿀': { image: '/assets/flavors/sweet.png', color: '#ffbe0b' },
  // Chocolate
  '다크 초콜릿': { image: '/assets/flavors/chocolate.png', color: '#2b1b17' }, 
  '밀크 초콜릿': { image: '/assets/flavors/chocolate.png', color: '#7b3f00' }, 
  '카카오': { image: '/assets/flavors/chocolate.png', color: '#4e342e' }, 
  '화이트 초콜릿': { image: '/assets/flavors/chocolate.png', color: '#fefae0' },
  // Nuts
  '구운 아몬드': { image: '/assets/flavors/nuts.png', color: '#9c6644' }, 
  '헤이즐넛': { image: '/assets/flavors/nuts.png', color: '#7f5539' }, 
  '피넛': { image: '/assets/flavors/nuts.png', color: '#b08968' }, 
  '호두': { image: '/assets/flavors/nuts.png', color: '#7b4b3a' }, 
  '캐슈넛': { image: '/assets/flavors/nuts.png', color: '#ede0d4' },
  // Grains
  '보리': { image: '/assets/flavors/grains.png', color: '#e9c46a' }, 
  '구운 빵': { image: '/assets/flavors/grains.png', color: '#f4a261' }, 
  '시리얼': { image: '/assets/flavors/grains.png', color: '#e76f51' }, 
  '호밀': { image: '/assets/flavors/grains.png', color: '#264653' }, 
  '맥아': { image: '/assets/flavors/grains.png', color: '#2a9d8f' },
  // Spices / Others (Cinnamon Focus)
  '시나몬': { image: '/assets/flavors/flavor_cinnamon.png', color: '#bc6c25' }, 
  '정향': { image: '/assets/flavors/flavor_cinnamon.png', color: '#603808' }, 
  '육두구': { image: '/assets/flavors/flavor_cinnamon.png', color: '#8b5e34' }, 
  '블랙 페퍼': { image: '/assets/flavors/flavor_cinnamon.png', color: '#212529' }, 
  '생강': { image: '/assets/flavors/flavor_cinnamon.png', color: '#dda15e' },
  '버터': { image: '/assets/flavors/batch_others.png', color: '#fefae0', objectPosition: '10% 90%', scale: '2' }, 
  '크림': { image: '/assets/flavors/batch_others.png', color: '#ffffff', objectPosition: '10% 90%', scale: '2' }, 
  '치즈': { image: '/assets/flavors/batch_others.png', color: '#fee440', objectPosition: '10% 90%', scale: '2' },
  '가죽': { image: '/assets/flavors/batch_others.png', color: '#4e342e', objectPosition: '90% 90%', scale: '2' }, 
  '흙내음': { image: '/assets/flavors/batch_others.png', color: '#582f0e', objectPosition: '90% 90%', scale: '2' }, 
  '담뱃잎': { image: '/assets/flavors/batch_others.png', color: '#333d29', objectPosition: '90% 90%', scale: '2' }, 
};

const countryToCode = {
  // South & Central America
  '브라질': 'br', 'brazil': 'br', 'Brazil': 'br',
  '콜롬비아': 'co', 'colombia': 'co', 'Colombia': 'co',
  '파나마': 'pa', 'panama': 'pa', 'Panama': 'pa',
  '과테말라': 'gt', 'guatemala': 'gt', 'Guatemala': 'gt',
  '코스타리카': 'cr', 'costa rica': 'cr', 'Costa Rica': 'cr',
  '온두라스': 'hn', 'honduras': 'hn', 'Honduras': 'hn',
  '에콰도르': 'ec', 'ecuador': 'ec', 'Ecuador': 'ec',
  '엘살바도르': 'sv', 'el salvador': 'sv', 'El Salvador': 'sv',
  '니카라과': 'ni', 'nicaragua': 'ni', 'Nicaragua': 'ni',
  '멕시코': 'mx', 'mexico': 'mx', 'Mexico': 'mx',
  '페루': 'pe', 'peru': 'pe', 'Peru': 'pe',
  '볼리비아': 'bo', 'bolivia': 'bo', 'Bolivia': 'bo',
  '도미니카 공화국': 'do', 'dominican republic': 'do', 'Dominican Republic': 'do',
  '자메이카': 'jm', 'jamaica': 'jm', 'Jamaica': 'jm',
  // Africa
  '에티오피아': 'et', 'ethiopia': 'et', 'Ethiopia': 'et',
  '케냐': 'ke', 'kenya': 'ke', 'Kenya': 'ke',
  '탄자니아': 'tz', 'tanzania': 'tz', 'Tanzania': 'tz',
  '르완다': 'rw', 'rwanda': 'rw', 'Rwanda': 'rw',
  '부룬디': 'bi', 'burundi': 'bi', 'Burundi': 'bi',
  '우간다': 'ug', 'uganda': 'ug', 'Uganda': 'ug',
  '콩고민주공화국': 'cd', 'dr congo': 'cd', 'DR Congo': 'cd', 'congo': 'cd',
  '말라위': 'mw', 'malawi': 'mw', 'Malawi': 'mw',
  '잠비아': 'zm', 'zambia': 'zm', 'Zambia': 'zm',
  // Asia & Middle East
  '예멘': 'ye', 'yemen': 'ye', 'Yemen': 'ye',
  '베트남': 'vn', 'vietnam': 'vn', 'Vietnam': 'vn',
  '인도네시아': 'id', 'indonesia': 'id', 'Indonesia': 'id',
  '인도': 'in', 'india': 'in', 'India': 'in',
  '태국': 'th', 'thailand': 'th', 'Thailand': 'th',
  '라오스': 'la', 'laos': 'la', 'Laos': 'la',
  '파푸아뉴기니': 'pg', 'papua new guinea': 'pg', 'Papua New Guinea': 'pg',
  '필리핀': 'ph', 'philippines': 'ph', 'Philippines': 'ph',
  '동티모르': 'tl', 'east timor': 'tl', 'East Timor': 'tl',
  '미얀마': 'mm', 'myanmar': 'mm', 'Myanmar': 'mm',
  '중국': 'cn', 'china': 'cn', 'China': 'cn',
  // Others
  '미국': 'us', 'usa': 'us', 'USA': 'us', 'United States': 'us',
  '한국': 'kr', 'korea': 'kr', 'Korea': 'kr', 'South Korea': 'kr'
};

export default function ProductDetail({ product, onBack, isAdmin, onEdit }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

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
    const notes = notesString.split(/[,/|]+/).filter(n => n.trim().length > 0);
    
    return (
      <div className="flex flex-wrap gap-4 justify-center px-4">
        {notes.map((note, idx) => {
          const config = FLAVOR_CONFIG[note.trim()];
          const categoryColor = config?.color || '#a1764c';
          
          return (
            <div 
              key={idx} 
              className="px-6 py-3 rounded-full border border-white/10 bg-[#131513] shadow-lg transition-all hover:-translate-y-1"
              style={{ borderColor: `${categoryColor}40` }}
            >
              <span 
                className="text-[13px] font-black tracking-widest text-center uppercase"
                style={{ color: categoryColor }}
              >
                {note}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  const StepCard = ({ step }) => (
    <div className="flex flex-col items-center group/step">
      <div className="relative mb-6 w-full aspect-square max-w-[200px] mx-auto rounded-3xl overflow-hidden bg-black/40 border border-white/5 group-hover/step:border-copper/30 transition-colors shadow-2xl">
        <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover/step:opacity-100 group-hover/step:scale-105 transition-all duration-700" />
        <div className="absolute top-4 left-4 text-copper font-serif font-black text-xl opacity-40">{step.step}</div>
      </div>
      <h4 className="text-xl font-serif font-black text-white mb-2 tracking-[0.2em]">{step.title}</h4>
      <p className="text-copper text-[10px] font-black mb-3 tracking-widest uppercase">{step.desc}</p>
      <p className="text-gray-500 text-xs leading-relaxed max-w-[180px] break-keep font-medium">{step.detail}</p>
    </div>
  );

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

      {/* Admin Edit Button */}
      {isAdmin && onEdit && (
        <button 
          onClick={() => onEdit(product.id)}
          className="fixed top-8 right-8 z-[110] flex items-center gap-2 text-[10px] font-bold text-copper/80 hover:text-copper uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-copper/30 hover:border-copper/60 hover:bg-black/60 group shadow-[0_0_15px_rgba(161,118,76,0.15)] hover:shadow-[0_0_20px_rgba(161,118,76,0.3)]"
        >
          <Edit size={14} className="group-hover:scale-110 transition-transform" />
          해당 상품 편집
        </button>
      )}

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
                
                {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                  <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.8)]"></span>
                      {product.beanType === 'blend' ? '블렌드' : '싱글 오리진'}
                    </span>
                  </div>
                )}
                
                {/* Product Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-copper text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-xl">
                    {product.category === 'bean' ? '원두' : product.category === 'dripbag' ? '드립팩' : product.category === 'coldbrew' ? '콜드브루' : '매장 음료'}
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
                {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 mb-12">
                    {[
                      { label: '국가', value: product.country || '정보 없음', flag: product.country && countryToCode[product.country] ? `https://flagcdn.com/w80/${countryToCode[product.country]}.png` : null },
                      { label: '상세 지역', value: product.region || '정보 없음' },
                      { label: '농장', value: product.farm || '정보 없음' },
                      { label: '마이크로밀', value: product.micromill || '정보 없음' },
                      { label: '재배 고도', value: product.altitude || '정보 없음' },
                      { label: product.beanType === 'blend' ? '블렌딩 구성' : '품종', value: product.beanType === 'blend' ? [1, 2, 3, 4].map(n => ({ name: product[`blend${n}`], ratio: product[`ratio${n}`] })).filter(c => c.name).map(c => `${c.name}${c.ratio ? ` (${c.ratio}%)` : ''}`).join(' | ') || product.variety || '정보 없음' : product.variety || '정보 없음' },
                      { label: '가공방식', value: product.process || '정보 없음' },
                      { label: '수입사', value: product.importer || '정보 없음' },
                      { label: '생두 정식 명칭', value: product.greenBeanName || '정보 없음' },
                      { label: 'SCA 점수', value: product.scaScore || '정보 없음' },
                      { label: product.category === 'dripbag' ? '수량' : '중량', value: product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : product.size)) : (product.category === 'dripbag' ? '10개' : '200g') }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[15px] text-gray-600 font-black uppercase tracking-[0.2em] transition-colors hover:text-copper/40">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.flag && (
                            <img src={item.flag} alt="flag" className="w-5 h-3.5 object-cover rounded shadow-sm opacity-90 border border-white/10" />
                          )}
                          <span className="text-xl text-white font-bold tracking-tight">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {product.cupNotes && (
              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 mb-12 backdrop-blur-sm shadow-inner overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <img src="/logo-alchemist.png" alt="Logo" className="w-32 h-32 object-contain" />
                </div>
                <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-lg uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                  컵 노트
                </h4>
                <div className="flex flex-col gap-6">
                  <p className="text-gray-400 text-sm font-medium tracking-wide mb-2 italic">
                    아키미스트 로스터스가 선별한 최상의 테루아를 경험하세요.
                  </p>
                  {renderCupNotes(product.cupNotes)}
                </div>
              </div>
            )}

            {/* Technical Context Section */}
            {isBean ? (
              <div className="space-y-6 bg-[#181a19] border border-white/5 p-6 rounded-[2rem] hover:border-copper/20 transition-all duration-500 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                  <Scale size={100} className="text-copper" />
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-copper font-serif font-bold tracking-[0.3em] text-sm uppercase mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
                    로스팅 포인트 가이드
                  </h4>
                  
                  <div className="space-y-8">
                    {/* Whole Bean Scale */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">홀빈 (Whole Bean)</span>
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
                              <div className="px-3 py-1.5 rounded-full border border-white/30 bg-black/90 backdrop-blur-md shadow-lg flex items-center justify-center -translate-y-12 scale-90 group-hover:scale-110 transition-transform whitespace-nowrap">
                                <span className="text-[10px] font-black text-white uppercase tracking-wider">
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
                              <div className="w-4 h-4 bg-white/20 border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-full flex items-center justify-center -mt-[1.125rem]">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ground Scale */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">분쇄 (Ground)</span>
                        <div className="h-[1px] w-4 bg-white/10"></div>
                        <span className="text-lg font-serif font-black text-copper">{product.agtronGround || '-'}</span>
                      </div>
                      <div className="relative h-12 flex items-center px-4">
                        <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-30 blur-[1px]"></div>
                        <div className="flex justify-between w-full relative z-10 px-0">
                          {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            return (
                              <div key={val} className="w-2 h-2 rounded-full border border-white/5 opacity-40" style={{ backgroundColor: colors[val] }} />
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
                              <div className="px-3 py-1.5 rounded-full border border-copper/40 bg-black/90 backdrop-blur-md shadow-lg flex items-center justify-center -translate-y-12 scale-90 group-hover:scale-110 transition-transform whitespace-nowrap">
                                <span className="text-[10px] font-black text-copper uppercase tracking-wider">
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
                              <div className="w-4 h-4 bg-copper/20 border-2 border-copper shadow-[0_0_15px_rgba(161,118,76,0.6)] rounded-full flex items-center justify-center -mt-[1.125rem]">
                                <div className="w-1.5 h-1.5 bg-copper rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between px-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter italic">Very Dark (25)</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter italic">Very Light (95)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                 <div className="bg-[#181a19] border border-white/5 py-8 px-12 rounded-2xl flex flex-col items-center gap-2 max-w-xs w-full">
                   <span className="text-base text-gray-600 font-black uppercase tracking-widest">
                     {product.category === 'dripbag' ? '수량' : '중량 및 구성'}
                   </span>
                   <span className="text-xl font-bold text-copper">
                     {product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : product.size.toLowerCase())) : '정보 없음'}
                   </span>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Sensory Profile / Graph Section */}
        {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
          <div className="mt-24 max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-[#0b0c0b] border border-white/5 rounded-[3rem] p-12 sm:p-20 shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-serif font-black text-white mb-4 tracking-tight flex items-center gap-4">
                  SENSORY ANALYSIS
                  <div className="h-[1px] w-8 bg-copper/30"></div>
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-12 break-keep">
                  아키미스트 로스터팀이 원두 고유의 잠재력을 끌어낸 감각적 평가 프로파일입니다. 각 항목은 5점 만점으로 평가되었습니다.
                </p>
                
                <div className="space-y-10">
                  {[
                    { label: '단맛 (Sweetness)', val: product.sweetness || 3, icon: '🍬' },
                    { label: '산미 (Acidity)', val: product.acidityRate || 3, icon: '🍋' },
                    { label: '고소함 (Savory)', val: product.savory || 3, icon: '🥜' },
                    { label: '바디감 (Body)', val: product.bodyRate || 3, icon: '☕' }
                  ].map((attr) => (
                    <div key={attr.label} className="flex flex-col gap-3">
                      <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{attr.label}</span>
                        <span className="text-lg font-black text-copper italic tabular-nums">{attr.val}<span className="text-[10px] text-gray-700 ml-1">/ 5.0</span></span>
                      </div>
                      <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-700/60 to-copper rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(161,118,76,0.3)]"
                          style={{ width: `${(attr.val / 5) * 100}%` }}
                        ></div>
                        {/* Markers */}
                        {[1, 2, 3, 4].map(m => (
                          <div key={m} className="absolute inset-y-0 w-[1px] bg-black/40" style={{ left: `${m * 20}%` }}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar/Visual Element */}
              <div className="w-full md:w-1/3 flex justify-center py-10 relative">
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border-[1px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-4 border-[1px] border-copper/10 rounded-full animate-[spin_15s_linear_inverse_infinite]"></div>
                    <div className="absolute inset-12 border-[1px] border-white/5 rounded-full"></div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                       <span className="text-[10px] font-black text-copper/40 uppercase tracking-[0.4em] mb-2 leading-none">Balanced Status</span>
                       <span className="text-4xl font-serif font-black text-white italic tracking-tighter leading-none mb-1">PRO-FILE</span>
                       <div className="w-8 h-[2px] bg-copper/60 mt-2"></div>
                    </div>

                    {/* Sensory Points Visualization */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(161,118,76,0.2)]" viewBox="0 0 100 100">
                      {(() => {
                        const s = (product.sweetness || 3) / 5 * 40;
                        const a = (product.acidityRate || 3) / 5 * 40;
                        const v = (product.savory || 3) / 5 * 40;
                        const b = (product.bodyRate || 3) / 5 * 40;
                        
                        // Radar-like shape calculation (0, 90, 180, 270 deg)
                        // x = 50 + r * cos, y = 50 + r * sin
                        const points = [
                          [50 + s, 50],         // Sweet (Right -> 0 deg)
                          [50, 50 + a],         // Acidity (Bottom -> 90 deg)
                          [50 - v, 50],         // Savory (Left -> 180 deg)
                          [50, 50 - b]          // Body (Top -> 270 deg)
                        ].map(p => p.join(',')).join(' ');
                        
                        return (
                          <>
                            <polygon points={points} fill="rgba(161, 118, 76, 0.4)" stroke="#A1764C" strokeWidth="1.5" className="animate-pulse" />
                            <circle cx="50" cy="50" r="1.5" fill="#A1764C" />
                          </>
                        );
                      })()}
                    </svg>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Information Sections */}
        <div className="mt-20 border-t border-white/5 pt-20 space-y-32">
          
          {/* 1. Green Bean Story / Main Body */}
          <div className="max-w-4xl mx-auto text-center px-4">
            <style>{`
              .html-content { text-align: left; }
              .html-content h1, .html-content h2, .html-content h3 { color: #A1764C; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Lora', serif; font-weight: 800; border-left: 4px solid #A1764C; padding-left: 1rem; }
              .html-content p { margin-bottom: 1.5rem; line-height: 2; color: #a1a1aa; }
              .html-content b, .html-content strong { color: #ffffff; }
              .html-content ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #71717a; }
              .html-content ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #71717a; }
              .html-content blockquote { border-left: 4px solid rgba(161, 118, 76, 0.3); padding: 1rem 1.5rem; font-style: italic; background: rgba(161, 118, 76, 0.05); border-radius: 0 1rem 1rem 0; margin-bottom: 2rem; }
              .html-content img { max-width: 100%; border-radius: 1.5rem; margin: 2rem auto; display: block; border: 1px solid rgba(255, 255, 255, 0.05); }
              .html-content a { color: #A1764C; text-decoration: underline; }
            `}</style>
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-white/10"></div>
              생두 정보
              <div className="h-[1px] w-12 bg-white/10"></div>
            </h3>
            <div className="bg-[#111211] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <div 
                className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep html-content"
                dangerouslySetInnerHTML={{ __html: product.recipe || "아키미스트가 엄선한 생두의 상세 정보와 로스터의 정성이 담긴 이야기가 곧 업데이트됩니다." }}
              />
            </div>
          </div>

          {/* 2. Shipping & Shelf Life Policy */}
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

          {/* 3. Recommended Extraction Recipe */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-black text-white mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-copper/30"></div>
              추천 추출 방식
              <div className="h-[1px] w-12 bg-copper/30"></div>
            </h3>
            <div className={`bg-[#111211] ${['dripbag', 'bean'].includes(product.category) ? 'p-8 sm:p-16' : 'p-12'} rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group`}>
              {product.category === 'dripbag' || product.category === 'bean' ? (
                <div className="relative z-10 space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8">
                    {product.category === 'dripbag' ? (
                      [
                        { 
                          step: '01', 
                          title: '개봉', 
                          desc: '절취선을 뜯어주세요', 
                          img: '/images/guide/step_cut.png',
                          detail: '필터 가장자리가 깊게 찢어지지 않도록 끝부분을 유의하며 수평으로 개봉해 주세요.'
                        },
                        { 
                          step: '02', 
                          title: '고정', 
                          desc: '컵에 드립백 고정', 
                          img: '/images/guide/step_pull.png',
                          detail: '양쪽 날개를 당겨 컵에 걸고 앞코 부분을 눌러 단단히 고정합니다.'
                        },
                        { 
                          step: '03', 
                          title: '추출', 
                          desc: '뜸 들이기 & 추출', 
                          img: '/images/guide/step_brew.png',
                          detail: '95°C 물로 30초간 뜸을 들인 후 150-180ml를 2-3회 나누어 붓습니다.'
                        }
                      ].map((step, idx) => (
                        <StepCard key={idx} step={step} />
                      ))
                    ) : (
                      [
                        { 
                          step: '01', 
                          title: '분쇄', 
                          desc: '18g 원두 분쇄', 
                          img: '/images/guide/bean_grind.png',
                          detail: '굵은 소금 정도의 굵기로 분쇄합니다. (코만단테 25~28 클릭 추천)'
                        },
                        { 
                          step: '02', 
                          title: '뜸 들이기', 
                          desc: '36~40g 물 붓기', 
                          img: '/images/guide/step_brew.png',
                          detail: '94~96°C의 물 36~40g을 부어 가루를 충분히 적셔준 뒤 30초간 기다립니다.'
                        },
                        { 
                          step: '03', 
                          title: '추출', 
                          desc: '단계별 푸어링', 
                          img: '/images/guide/step_brew.png',
                          detail: '30~40초 간격으로 70g씩 총 4회(280g) 부어줍니다. 물이 완전히 빠지면 추출을 마무리합니다.'
                        }
                      ].map((step, idx) => (
                        <StepCard key={idx} step={step} />
                      ))
                    )}
                  </div>
                  
                  {/* Additional Metrics for Bean */}
                  {product.category === 'bean' && (
                    <div className="pt-12 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: '추천 도구', value: 'Hario V60' },
                        { label: '물 온도', value: '94~96°C' },
                        { label: '원두 중량', value: '18g' },
                        { label: '최종 추출량', value: '약 310ml' }
                      ].map((stat, sIdx) => (
                        <div key={sIdx} className="bg-white/[0.02] border border-white/5 py-4 rounded-2xl flex flex-col items-center">
                          <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">{stat.label}</span>
                          <span className="text-sm font-black text-copper tabular-nums">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="pt-10 border-t border-white/5">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-8 h-[1px] bg-copper/30"></div>
                      <span className="text-[10px] text-copper font-black uppercase tracking-[0.3em]">Special Recipe Tip</span>
                      <div className="w-8 h-[1px] bg-copper/30"></div>
                    </div>
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-medium break-keep italic">
                      "{product.story || (product.category === 'dripbag' 
                        ? "뜸 들이는 30초가 커피의 단맛과 바디감을 결정하는 가장 중요한 시간입니다. 천천히 기다려주세요."
                        : "신선한 원두일수록 뜸 들이기 과정에서 기포가 많이 발생합니다. 원두가 가진 고유의 향미를 온전히 즐겨보세요.")}"
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                    <Droplet size={200} className="text-copper" />
                  </div>
                  <p className="text-gray-400 text-lg sm:text-xl leading-[2.2] font-medium break-keep relative z-10">
                    {product.story || "정밀한 추출 가이드가 준비 중입니다. 매장에 방문하시면 바리스타가 직접 안내해 드립니다."}
                  </p>
                </>
              )}
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
