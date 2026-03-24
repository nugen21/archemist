import React, { useEffect, useState } from 'react';
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
  const [recipeTab, setRecipeTab] = useState('hot');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) return null;

  const isBean = product.category === 'bean' || !product.category;
  const isCafe = product.category === 'beverage';

  const priceNum = Number(product.price);
  const formattedPrice = priceNum > 0 
    ? (isCafe ? (priceNum / 1000).toFixed(1) : priceNum.toLocaleString())
    : (isCafe ? '0.0' : '0'); 


  const renderCupNotes = (notesString) => {
    if (!notesString) return null;
    
    // Split by comma, space, or slash, then clean up
    const notes = Array.isArray(notesString) 
      ? notesString.filter(n => typeof n === 'string' && n.trim().length > 0)
      : String(notesString).split(/[,/|]+/).filter(n => n.trim().length > 0);
    
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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16 px-4 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-y-16 lg:gap-x-8 mb-24 items-start">
          
          {/* --- Tier 1: Hero Row (Image & Info) --- */}
          <div className="lg:col-span-3">
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

          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="mb-0">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-copper/60 font-serif font-bold tracking-[0.4em] text-xs uppercase italic">아키미스트 아카이브 No.{product.id % 999}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-copper/30 to-transparent"></div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight mb-4 break-keep">
                {product.name}
              </h1>
              <div className="mb-6">
                <div className="flex items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
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
                            const roastStr = String(product.roastDate || '').replace(/\./g, '-');
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

                {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                    {[
                      { label: '국가', value: product.country || '정보 없음', flag: product.country && countryToCode[product.country] ? `https://flagcdn.com/w80/${countryToCode[product.country]}.png` : null, category: 'basic' },
                      { label: '상세 지역', value: product.region || '정보 없음', category: 'basic' },
                      { label: '농장', value: product.farm || '정보 없음', category: 'basic' },
                      { label: '마이크로밀', value: product.micromill || '정보 없음', category: 'basic' },
                      { label: '재배 고도', value: product.altitude || '정보 없음', category: 'basic' },
                      { label: product.beanType === 'blend' ? '블렌딩 구성' : '품종', value: product.beanType === 'blend' ? [1, 2, 3, 4].map(n => ({ name: product[`blend${n}`], ratio: product[`ratio${n}`] })).filter(c => c.name).map(c => `${c.name}${c.ratio ? ` (${c.ratio}%)` : ''}`).join(' | ') || product.variety || '정보 없음' : product.variety || '정보 없음', category: 'basic' },
                      { label: '가공방식', value: product.process || '정보 없음', category: 'basic' },
                      { label: '수입사', value: product.importer || '정보 없음', category: 'basic' },
                      { label: '생두 정식 명칭', value: product.greenBeanName || '정보 없음', category: 'basic' },
                      { label: 'SCA 점수', value: product.scaScore || '정보 없음', category: 'basic' },
                      { label: product.category === 'dripbag' ? '수량' : '중량', value: product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : product.size)) : (product.category === 'dripbag' ? '10개' : '200g'), category: 'essential' }
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

              {isCafe && (
                <div className="flex justify-center mt-6">
                  <div className="bg-[#181a19] border border-white/5 py-8 px-12 rounded-2xl flex flex-col items-center gap-2 max-w-xs w-full">
                    <span className="text-base text-gray-600 font-black uppercase tracking-widest">
                      {product.category === 'dripbag' ? '수량' : '중량 및 구성'}
                    </span>
                    <span className="text-xl font-bold text-copper">
                      {product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : String(product.size).toLowerCase())) : '정보 없음'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- Tier 2: Analysis Row (Cup Notes, Roast) --- */}
          {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
            <>
              {/* 1. Cup Notes Card */}
              {product.cupNotes && (
                <div className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-xl flex flex-col h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <img src="/logo-alchemist.png" alt="Logo" className="w-24 h-24 object-contain" />
                  </div>
                  <h4 className="text-copper font-serif font-black tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                    컵 노트
                  </h4>
                  <div className="flex flex-col gap-6 flex-grow">
                    <p className="text-gray-500 text-[11px] font-bold tracking-widest leading-relaxed uppercase opacity-60">
                      엄선된 테루아와 아로마
                    </p>
                    <div className="flex-grow">
                      {renderCupNotes(product.cupNotes)}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Roasting Point Guide Card */}
              {isBean && (
                <div className="lg:col-span-3 bg-[#181a19] border border-white/5 p-8 rounded-[2.5rem] hover:border-copper/20 transition-all duration-500 shadow-xl flex flex-col h-full relative group">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Scale size={80} className="text-copper" />
                  </div>
                  
                  <h4 className="text-copper font-serif font-black tracking-[0.2em] text-sm uppercase mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                    로스팅 포인트 가이드
                  </h4>
                  
                  <div className="space-y-10 flex-grow">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end mb-1 px-1">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">홀빈 (Whole Bean)</span>
                        <span className="text-xl font-serif font-black text-white tabular-nums leading-none">{product.agtronWb || '-'}</span>
                      </div>
                      <div className="relative h-10 flex items-center px-0">
                        <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-20"></div>
                        <div className="flex justify-between w-full relative z-10">
                          {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            return <div key={val} className="w-1 h-1 rounded-full bg-white/10" style={{ backgroundColor: colors[val] }} />;
                          })}
                        </div>
                        {product.agtronWb && !isNaN(parseFloat(product.agtronWb)) && (
                          <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronWb) - 25) / 70 * 100))}%` }}>
                            <div className="w-3.5 h-3.5 bg-white border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] rounded-full -ml-[7px]"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end mb-1 px-1">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">분쇄 (Ground)</span>
                        <span className="text-xl font-serif font-black text-white tabular-nums leading-none">{product.agtronGround || '-'}</span>
                      </div>
                      <div className="relative h-10 flex items-center px-0">
                        <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-20"></div>
                        <div className="flex justify-between w-full relative z-10">
                          {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                            const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                            return <div key={val} className="w-1 h-1 rounded-full bg-white/10" style={{ backgroundColor: colors[val] }} />;
                          })}
                        </div>
                        {product.agtronGround && !isNaN(parseFloat(product.agtronGround)) && (
                          <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronGround) - 25) / 70 * 100))}%` }}>
                            <div className="w-3.5 h-3.5 bg-copper border-2 border-copper shadow-[0_0_10px_rgba(161,118,76,0.4)] rounded-full -ml-[7px]"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )} 
        </div>
      </div>


        {/* Detail Information Sections */}
        <div className="mt-20 border-t border-white/5 pt-20 space-y-32">
          
          {/* 1. Shipping & Shelf Life Policy */}
          {!isCafe && (
            <div className="max-w-4xl mx-auto text-center px-4">
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



          {/* 4. Green Bean Analysis (Optional) */}
          {isBean && product.showAnalysisInfo && (
            <div className="max-w-4xl mx-auto px-4">
               <h3 className="text-2xl font-serif font-black text-white mb-8 flex items-center justify-center gap-6">
                 <div className="h-[1px] w-8 bg-white/10"></div>
                 생두 분석 정보
                 <div className="h-[1px] w-8 bg-white/10"></div>
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '수분율', value: product.moisture || '-', unit: '%' },
                    { label: '밀도', value: product.density || '-', unit: 'g/L' },
                    { label: '수분활성도', value: product.aw || '-', unit: 'aW' },
                    { label: '수확년도', value: product.cropYear || '-', unit: '' }
                  ].map(stat => (
                    <div key={stat.label} className="bg-[#111211] border border-white/5 p-6 rounded-2xl flex flex-col items-center gap-1 group hover:border-copper/30 transition-all">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</span>
                      <span className="text-xl font-serif font-black text-white group-hover:text-copper transition-colors">
                        {stat.value}{stat.value !== '-' && stat.unit ? <span className="text-[10px] ml-0.5 opacity-50">{stat.unit}</span> : ''}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      
      {/* Visual Alchemy - Floating Particles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-copper rounded-full blur-[2px] animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-copper rounded-full blur-[3px] animate-pulse delay-700 opacity-30"></div>
    </section>
  );
}
