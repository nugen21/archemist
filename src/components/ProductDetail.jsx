import React, { useEffect, useState, useRef } from 'react';
import { 
  Droplet, Thermometer, Timer, Target, Scale, MessageCircle, ArrowLeft, ShoppingBag, ExternalLink,
  Cherry, Citrus, Apple, Grape, Sun, TreePalm, 
  Flower2, Sprout, Leaf, Candy, Bean, Nut, Wheat, 
  Sparkles, Milk, Wind, Edit, Coffee, HelpCircle
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

export default function ProductDetail({ product, onBack, isAdmin, onEdit, archiveNumber }) {
  const [recipeTab, setRecipeTab] = useState('hot');

  const [showAgtronHelp, setShowAgtronHelp] = useState(false);
  const [showCupNotesHelp, setShowCupNotesHelp] = useState(false);
  const [showAgingHelp, setShowAgingHelp] = useState(false);
  const [showRoastTimeHelp, setShowRoastTimeHelp] = useState(false);

  const agtronHelpRef = useRef(null);
  const cupNotesHelpRef = useRef(null);
  const agingHelpRef = useRef(null);
  const roastTimeHelpRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (agtronHelpRef.current && !agtronHelpRef.current.contains(event.target)) {
        setShowAgtronHelp(false);
      }
      if (cupNotesHelpRef.current && !cupNotesHelpRef.current.contains(event.target)) {
        setShowCupNotesHelp(false);
      }
      if (agingHelpRef.current && !agingHelpRef.current.contains(event.target)) {
        setShowAgingHelp(false);
      }
      if (roastTimeHelpRef.current && !roastTimeHelpRef.current.contains(event.target)) {
        setShowRoastTimeHelp(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) return null;

  const isBean = product.category === 'bean' || !product.category;
  const isCafe = product.category === 'beverage';

  const priceNum = Number(product.price);
  const formattedPrice = priceNum > 0 
    ? priceNum.toLocaleString()
    : '0'; 


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
              className="px-4 py-2 rounded-full border border-white/10 bg-[#131513] shadow-lg transition-all hover:-translate-y-1"
              style={{ borderColor: `${categoryColor}40` }}
            >
              <span 
                className="text-[10px] font-black tracking-widest text-center uppercase"
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
      <style>{`
        .html-content .ql-align-center { text-align: center !important; }
        .html-content .ql-align-right { text-align: right !important; }
        .html-content .ql-align-justify { text-align: justify !important; }
        .html-content .ql-align-center img { display: block; margin-left: auto !important; margin-right: auto !important; }
        .html-content .ql-align-right img { display: block; margin-left: auto !important; margin-right: 0 !important; }
        .html-content img { max-width: 100%; height: auto; border-radius: 1rem; margin: 1.5rem 0; }
        .html-content iframe { width: 100%; aspect-ratio: 16/9; border-radius: 1rem; margin: 1.5rem 0; }
      `}</style>
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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-8 px-4 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-y-10 lg:gap-x-8 mb-10 items-start">
          
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
                      {(product.category === "beverage" && product.subCategory)
                        ? (product.subCategory === "espresso" ? "에스프레소" : "핸드 드립")
                        : (product.category === "bean" ? "원두" : product.category === "dripbag" ? "드립백" : product.category === "coldbrew" ? "콜드브루" : "매장 음료")}
                  </span>
                  {product.isSpecial && (
                    <span className="bg-white/10 backdrop-blur-md text-blue-300 border border-blue-400/30 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      시즌 한정 에디션
                    </span>
                  )}
                  {product.recommended && (
                    <span className="bg-white/10 backdrop-blur-md text-copper border border-copper/30 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                      추천 상품
                    </span>
                  )}
                </div>
              </div>
            </div>
            
          </div>

          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="mb-0">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-copper/60 font-serif font-bold tracking-[0.4em] text-xs uppercase italic">아키미스트 아카이브 No.{String(archiveNumber || (product.id % 999)).padStart(3, '0')}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-copper/30 to-transparent"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight mb-3 break-keep">
                {product.name}
              </h1>
              {!isCafe && product.englishName && (
                <h2 className="text-sm sm:text-base font-serif text-gray-500 tracking-wider mb-5">
                  {product.englishName}
                </h2>
              )}
              {product.story && product.story !== '<p><br></p>' && (
                <div className="mb-8 mt-2 px-1">
                  <div 
                    className="text-gray-400 text-base sm:text-lg leading-relaxed break-keep italic html-content prose prose-invert max-w-none border-l-2 border-copper/30 pl-6 py-2"
                    dangerouslySetInnerHTML={{ __html: product.story }}
                  />
                </div>
              )}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
                  <div className="flex flex-row items-center gap-6">
                    <p className="text-4xl sm:text-5xl font-serif font-black text-white tracking-wider tabular-nums">
                      {formattedPrice}
                      <span className="text-lg ml-3 text-gray-500 font-sans font-black">원</span>
                    </p>
                    
                    {/* XP Reward Highlight */}
                    {/* XP Reward Highlight - No XP for beverages */}
                    {product.category !== 'beverage' && (
                      <div className="flex items-center gap-3 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 px-5 py-3 rounded-2xl shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:scale-[1.02] transition-all group cursor-default">
                        <Sparkles size={16} className="text-amber-500 animate-pulse" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-amber-500/80 font-black tracking-[0.1em] leading-none mb-1">경험치 보상</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-serif font-black text-amber-500 tracking-tighter">
                              +{Math.floor(parseFloat(String(product.price || '0').replace(/,/g, '')) * 0.0001 * (product.recommended ? 1.1 : 1))}
                            </span>
                            <span className="text-[10px] font-black text-amber-500/60 uppercase">xp</span>
                            {product.recommended && (
                              <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 ml-1 font-black animate-bounce">+10% HOT</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-8">
                    {product.roastDate && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">로스팅 날짜</span>
                        <span className="text-lg text-gray-400 font-bold tabular-nums">{product.roastDate}</span>
                      </div>
                    )}
                    {product.category === 'bean' && product.agingDays && (
                      <div className="flex flex-col items-end gap-1">
                        <div 
                          ref={agingHelpRef}
                          className={`flex items-center gap-1.5 justify-end relative ${showAgingHelp ? 'z-50' : 'z-10'}`}
                        >
                          <span className="text-[10px] text-copper/60 font-black uppercase tracking-[0.2em]">에이징</span>
                          <button 
                            onClick={() => setShowAgingHelp(!showAgingHelp)}
                            className="p-0.5 hover:text-white transition-colors text-gray-700 outline-none"
                            aria-label="Aging Help"
                          >
                            <HelpCircle size={10} strokeWidth={2.5} />
                          </button>

                          {/* Aging Help Popup */}
                          {showAgingHelp && (
                            <div className="absolute top-6 right-0 z-[9999] w-64 p-4 bg-[#1a1c1b]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[11px] text-copper font-black uppercase tracking-widest">Recommended Aging</span>
                                <button onClick={() => setShowAgingHelp(false)} className="text-gray-500 hover:text-white">&times;</button>
                              </div>
                              <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep text-left">
                                에이징(Aging)은 원두가 로스팅된 후 맛이 가장 조화롭게 발현되는 숙성 기간을 의미합니다. 가스가 안정화되어 더 풍성한 아로마와 깊은 맛을 느끼실 수 있는 권장 시점을 안내해 드립니다.
                              </p>
                            </div>
                          )}
                        </div>
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
                      { label: '마이크로랏', value: product.micromill || '정보 없음', category: 'basic' },
                      { label: '재배 고도', value: product.altitude || '정보 없음', category: 'basic' },
                      { label: product.beanType === 'blend' ? '블렌딩 구성' : '품종', value: product.beanType === 'blend' ? [1, 2, 3, 4].map(n => ({ name: product[`blend${n}`], ratio: product[`ratio${n}`] })).filter(c => c.name).map(c => `${c.name}${c.ratio ? ` (${c.ratio}%)` : ''}`).join(' | ') || product.variety || '정보 없음' : product.variety || '정보 없음', category: 'basic' },
                      { label: '가공방식', value: product.process || '정보 없음', category: 'basic' },
                      { label: '수입사', value: product.importer || '정보 없음', category: 'greenBeanBasic' },
                      { label: '생두 정식 명칭', value: product.greenBeanName || '정보 없음', category: 'greenBeanBasic' },
                      { label: 'SCA 점수', value: product.scaScore || '정보 없음', category: 'greenBeanBasic' },
                      { label: product.category === 'dripbag' ? '수량' : '중량', value: product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : product.size)) : (product.category === 'dripbag' ? '10개' : '200g'), category: 'essential' }
                    ].filter(item => 
                      item.category !== 'greenBeanBasic' || product.showBasicInfo !== false
                    ).map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[11px] text-gray-600 font-black uppercase tracking-[0.2em] transition-colors hover:text-copper/40">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.flag && (
                            <img src={item.flag} alt="flag" className="w-5 h-3.5 object-cover rounded shadow-sm opacity-90 border border-white/10" />
                          )}
                          <span className="text-sm text-white font-bold tracking-tight">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isCafe && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <div className="bg-[#181a19] border border-white/5 py-6 px-8 rounded-2xl flex flex-col items-center gap-2 flex-1 max-w-xs">
                    <span className="text-xs text-gray-600 font-black uppercase tracking-widest">
                      {product.category === 'dripbag' ? '수량' : '중량 및 구성'}
                    </span>
                    <span className="text-sm font-bold text-copper">
                      {product.size ? (product.category === 'dripbag' ? (!String(product.size).includes('개') ? `${product.size}개` : product.size) : (!String(product.size).toLowerCase().includes('g') ? `${product.size}g` : String(product.size).toLowerCase())) : '정보 없음'}
                    </span>
                  </div>
                  {product.variety && (
                    <div className="bg-[#181a19] border border-white/5 py-6 px-8 rounded-2xl flex flex-col items-center gap-2 flex-1 max-w-xs">
                      <span className="text-xs text-gray-600 font-black uppercase tracking-widest">사용 원두</span>
                      <span className="text-sm font-bold text-white text-center break-keep">
                        {product.variety}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Direct Purchase Button (Right Side) */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <a 
                  href={product.storeUrl || "https://smartstore.naver.com/archemist"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#03C75A] hover:bg-[#02b351] text-white py-5 rounded-2xl flex items-center justify-center gap-4 font-black text-base sm:text-lg tracking-widest transition-all shadow-[0_15px_30px_rgba(3,199,90,0.1)] hover:shadow-[0_20px_40px_rgba(3,199,90,0.3)] hover:-translate-y-1"
                >
                  <div className="bg-white text-[#03C75A] w-8 h-8 rounded-lg flex items-center justify-center font-black text-base shadow-sm">N</div>
                  네이버 스마트 스토어에서 구매하기
                  <ExternalLink size={18} className="opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* --- Tier 2: Analysis Row (Cup Notes & Sensory Profile) --- */}
          {['bean', 'dripbag', 'coldbrew', 'beverage'].includes(product.category) && (
            <div className="lg:col-span-6 grid grid-cols-1 lg:grid-cols-6 gap-4">
              {/* 1. Cup Notes Card */}
              {product.cupNotes && (
                <div 
                  ref={cupNotesHelpRef}
                  className={`lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-xl flex flex-col h-full relative group ${showCupNotesHelp ? 'z-50' : 'z-10'}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <img src="/logo-alchemist.png" alt="Logo" className="w-24 h-24 object-contain" />
                  </div>
                  <div className="flex items-center gap-3 mb-6 relative">
                    <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                      컵 노트
                    </h4>
                    <button 
                      onClick={() => setShowCupNotesHelp(!showCupNotesHelp)}
                      className="p-0.5 hover:text-white transition-colors text-gray-600 outline-none"
                      aria-label="Cup Notes Help"
                    >
                      <HelpCircle size={11} strokeWidth={2.5} />
                    </button>

                    {/* Cup Notes Help Popup */}
                    {showCupNotesHelp && (
                      <div className="absolute top-8 left-0 z-[9999] w-64 p-4 bg-[#1a1c1b]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] text-copper font-black uppercase tracking-widest">About Cup Notes</span>
                          <button onClick={() => setShowCupNotesHelp(false)} className="text-gray-500 hover:text-white">&times;</button>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep">
                          컵 노트(Cup Notes)는 커피를 마셨을 때 느낄 수 있는 대표적인 향미를 과일, 꽃, 견과류 등에 빗대어 표현한 것입니다. 아키미스트는 생두가 가진 고유의 테루아를 가장 잘 드러낼 수 있는 향미들을 엄선하여 기록합니다.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-6 flex-grow">
                    <div className="flex-grow">
                      {renderCupNotes(product.cupNotes)}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Sensory Profile Card */}
              <div className="lg:col-span-3 bg-[#181a19] border border-white/5 p-8 rounded-[2.5rem] hover:border-copper/20 transition-all duration-500 shadow-xl relative group flex flex-col h-full">
                <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                  센서리 프로파일
                </h4>
                <div className="flex flex-col gap-6 flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 flex-grow">
                    {[
                      { label: '향 (Flavor)', val: product.flavor || 0 },
                      { label: '후미 (Aftertaste)', val: product.aftertaste || 0 },
                      { label: '산미 (Acidity)', val: product.acidityRate || 0 },
                      { label: '단맛 (Sweetness)', val: product.sweetness || 0 },
                      { label: '바디 (Body)', val: product.bodyRate || 0 },
                      { label: '밸런스 (Balance)', val: product.balance || 0 }
                    ].map((s, idx) => (
                      <div key={idx} className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <span>{s.label}</span>
                          <span className="text-copper">{s.val > 0 ? s.val : '-'} / 5</span>
                        </div>
                        <div className="flex items-center gap-1.5 h-1.5">
                          {[1, 2, 3, 4, 5].map(v => (
                            <div key={v} className={`h-full flex-grow rounded-full transition-all ${v <= Number(s.val) ? 'bg-copper shadow-[0_0_8px_rgba(161,118,76,0.3)]' : 'bg-white/5'}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Roasting Point & Time Card */}
              {(isBean || product.category === 'dripbag') && (
                <div 
                  ref={agtronHelpRef}
                  className={`lg:col-span-6 bg-[#181a19] border border-white/5 p-6 rounded-[2.5rem] hover:border-copper/20 transition-all duration-500 shadow-xl relative group flex flex-col md:flex-row gap-6 md:gap-8 mt-0 items-center ${showAgtronHelp ? 'z-50' : 'z-10'}`}
                >
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Scale size={120} className="text-copper" />
                  </div>
                  
                  {/* Roasting Time (Left Side) */}
                  <div className="flex-shrink-0 flex flex-col justify-center min-w-[200px] border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8 w-full md:w-auto text-center md:text-left">
                     <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase mb-3 flex items-center justify-center md:justify-start gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                       로스팅 시간
                       <div className="relative inline-block" ref={roastTimeHelpRef}>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setShowRoastTimeHelp(!showRoastTimeHelp);
                           }}
                           className="p-1 hover:text-white transition-colors text-copper/40 outline-none"
                           aria-label="Roast Time Help"
                         >
                           <HelpCircle size={13} strokeWidth={2.5} />
                         </button>

                         {showRoastTimeHelp && (
                           <div className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 z-[100] w-64 p-5 bg-[#0b0c0b]/fb border border-copper/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in zoom-in duration-200 cursor-default">
                             <div className="flex justify-between items-start mb-3">
                               <span className="text-[11px] text-copper font-black uppercase tracking-widest leading-none">Philosophy of Roasting</span>
                               <button onClick={() => setShowRoastTimeHelp(false)} className="text-gray-600 hover:text-white leading-none">&times;</button>
                             </div>
                             <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep text-left normal-case tracking-normal">
                               로스팅 배출 시간은 생두가 원두로 완성되어 배출되는 시점을 의미하며, 1초의 차이만으로도 로스팅 포인트와 향미 발현이 달라질 만큼 절대적인 영향을 미칩니다. <br/><br/>
                               아키미스트 로스터스는 업계 표준인 <span className="text-gray-200 font-bold">스트롱홀드(Stronghold)</span> 로스터의 스마트 제어 시스템을 활용하여 정밀한 데이터 기반으로 일관된 최상의 퀄리티를 구현합니다.
                             </p>
                           </div>
                         )}
                       </div>
                     </h4>
                     <div className="flex flex-col gap-1">
                       <div className="text-[12px] font-black text-gray-600 uppercase tracking-widest mt-1 md:mt-2">총 소요 시간</div>
                       <div className="text-xl font-serif font-black text-white">{product.roastTime || '정보 없음'}</div>
                     </div>
                  </div>

                  {/* Roasting Point Guide (Right Side) */}
                  <div className="flex-grow flex flex-col justify-center w-full relative z-10 pt-2 md:pt-0">
                    <h4 className="text-copper font-serif font-black tracking-[0.2em] text-[15px] uppercase mb-2 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(161,118,76,0.6)]"></span>
                        로스팅 포인트 가이드
                    </h4>
                      <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2 opacity-60">* DiFluid Omni 측정 기준</p>
                      <div className="flex items-center gap-1.5 mb-6 relative">
                        <span className="text-[12px] text-copper/60 font-black tracking-widest uppercase">Agtron</span>
                        <button 
                          onClick={() => setShowAgtronHelp(!showAgtronHelp)}
                          className="p-0.5 hover:text-white transition-colors text-gray-600 outline-none"
                          aria-label="Agtron Help"
                        >
                          <HelpCircle size={11} strokeWidth={2.5} />
                        </button>

                        {/* Agtron Help Popup */}
                        {showAgtronHelp && (
                          <div className="absolute top-6 left-0 z-[9999] w-64 p-4 bg-[#1a1c1b]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[11px] text-copper font-black uppercase tracking-widest">What is Agtron?</span>
                              <button onClick={() => setShowAgtronHelp(false)} className="text-gray-500 hover:text-white">&times;</button>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-medium break-keep">
                              아그트론(Agtron)은 커피의 로스팅 정도(배전도)를 수치화한 글로벌 표준입니다. 숫자가 낮을수록 다크(강배전), 높을수록 라이트(약배전)를 의미하며, 디플루이드 옴니(DiFluid Omni) 등 정밀 측정기를 통해 객관적인 데이터를 도출합니다.
                            </p>
                          </div>
                        )}
                      </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 pt-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end mb-1 px-1">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">홀빈 (Whole Bean) AGTRON</span>
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
                            <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronWb) - 25) / 70 * 100))}%` }}>
                              {/* Large Speech Bubble - 30% smaller than previous 27px -> 19px */}
                              <div className="absolute -top-[85px] left-0 -translate-x-1/2 bg-white text-[#111] px-4 py-2 rounded-xl shadow-[0_6px_30px_rgba(0,0,0,0.6)] whitespace-nowrap flex flex-col items-center leading-none z-40 min-w-[55px]">
                                <span className="text-[19px] font-serif font-black">{product.agtronWb}</span>
                                {product.roastPointWb && <span className="text-[8.5px] font-black opacity-60 uppercase tracking-tighter mt-1">{product.roastPointWb}</span>}
                                {/* Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45"></div>
                              </div>
                              
                              {/* Marking Dot centered - also scaled slightly */}
                              <div className="w-4 h-4 bg-white border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.7)] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end mb-1 px-1">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">분쇄 (Ground) AGTRON</span>
                        </div>
                        <div className="relative h-10 flex items-center px-0">
                          <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#2B1B17] via-[#8B6242] to-[#D4B483] rounded-full opacity-20"></div>
                          <div className="flex justify-between w-full relative z-10" style={{ padding: '0 2px' }}>
                            {[25, 35, 45, 55, 65, 75, 85, 95].map((val) => {
                              const colors = { 95: '#D4B483', 85: '#C19A6B', 75: '#A67B5B', 65: '#8B6242', 55: '#6D4C3D', 45: '#4E362A', 35: '#3D2B1F', 25: '#2B1B17' };
                              return <div key={val} className="w-1 h-1 rounded-full bg-white/10" style={{ backgroundColor: colors[val] }} />;
                            })}
                          </div>
                          {product.agtronGround && !isNaN(parseFloat(product.agtronGround)) && (
                            <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: `${Math.max(0, Math.min(100, (parseFloat(product.agtronGround) - 25) / 70 * 100))}%` }}>
                              {/* Large Speech Bubble - 30% smaller than previous 27px -> 19px */}
                              <div className="absolute -top-[85px] left-0 -translate-x-1/2 bg-copper text-[#111] px-4 py-2 rounded-xl shadow-[0_6px_30px_rgba(0,0,0,0.6)] whitespace-nowrap flex flex-col items-center leading-none z-40 min-w-[55px]">
                                <span className="text-[19px] font-serif font-black">{product.agtronGround}</span>
                                {product.roastPointGround && <span className="text-[8.5px] font-black opacity-60 uppercase tracking-tighter mt-1">{product.roastPointGround}</span>}
                                {/* Arrow */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-copper rotate-45"></div>
                              </div>
                              
                              {/* Marking Dot centered - also scaled slightly */}
                              <div className="w-4 h-4 bg-copper border-2 border-copper shadow-[0_0_15px_rgba(161,118,76,0.7)] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>



        {/* Detail Information Sections */}
        <div className="mt-6 border-t border-white/5 pt-6 space-y-8">
          
          {/* 1. Shipping & Shelf Life Policy */}
          <div className="max-w-4xl mx-auto text-center px-4">
              <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                <div className="h-[1px] w-8 bg-copper/30"></div>
                배송 및 소비기한 안내
                <div className="h-[1px] w-8 bg-copper/30"></div>
              </h3>
              <div className="bg-copper/5 border border-copper/20 p-8 sm:p-12 rounded-[2.5rem] shadow-8xl backdrop-blur-sm">
                <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-[1.8] break-keep font-medium">
                  원두의 소비기한은 생산일로부터 1년이며, 로스팅 일자는 원두 뒷면에 별도 표기됩니다. 주문하신 상품은 주문일 기준 1~4일 이내에 로스팅 된 원두로 출고됩니다.
                </p>
              </div>
            </div>


          {/* 1.1 Detailed HTML Story (Moved from bottom) */}
          {product.recipe && (
             <div className="max-w-8xl mx-auto px-4 mt-6">
               <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                 <div className="h-[1px] w-8 bg-white/10"></div>
                 상세 스토리
                 <div className="h-[1px] w-8 bg-white/10"></div>
               </h3>
               <div className="bg-[#111211] border border-white/5 p-8 sm:p-12 lg:p-16 rounded-[3rem] prose prose-lg prose-invert max-w-none hover:border-copper/20 transition-all font-sans overflow-hidden break-words text-gray-200 text-base sm:text-lg md:text-xl html-content" dangerouslySetInnerHTML={{ __html: product.recipe }} />
            </div>
          )}



          {/* 4. Green Bean Analysis (Optional) */}
          {isBean && product.showAnalysisInfo !== false && (
            <div className="max-w-8xl mx-auto px-4 mt-6">
               <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
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
                    <div key={stat.label} className="bg-[#111211] border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-1 group hover:border-copper/30 transition-all">
                      <span className="text-[8.5px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</span>
                      <span className="text-base font-serif font-black text-white group-hover:text-copper transition-colors">
                        {stat.value}{stat.value !== '-' && stat.unit ? <span className="text-[8px] ml-0.5 opacity-50">{stat.unit}</span> : ''}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 4.1 Grind Guide Section */}
            {isBean && (
              <div className="max-w-8xl mx-auto px-4 mt-8">
                <h3 className="text-xl font-serif font-black text-white mb-2 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                  <div className="h-[1px] w-8 bg-white/10"></div>
                  분쇄 가이드
                  <div className="h-[1px] w-8 bg-white/10"></div>
                </h3>
                  <p className="text-center text-[8.5px] text-gray-600 font-black uppercase tracking-widest mb-10 opacity-60">* DiFluid 측정 기준</p>
                
                <div className="relative bg-[#111211] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-8xl group">
                  <img 
                    src="/images/grind/grind_guide_reference.png" 
                    alt="원두 분쇄 가이드" 
                    className="w-full h-auto object-cover opacity-90 transition-all duration-700 hover:opacity-100 hover:scale-[1.01]" 
                  />
                  {/* Subtle reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111211]/30 to-transparent pointer-events-none"></div>
                </div>

                <div className="mt-6 px-2 sm:px-6">
                    <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
                        {[
                            { name: '에스프레소', value: '200~400μm', desc: '고운 밀가루' },
                            { name: '모카포트', value: '400~600μm', desc: '고운 소금' },
                            { name: '핸드드립', value: '700~900μm', desc: '일반 꽃소금' },
                            { name: '커피메이커', value: '800~1000μm', desc: '중간 소금' },
                            { name: '더치', value: '900~1100μm', desc: '굵은 바다 소금' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group/item hover:translate-y-[-4px] transition-transform duration-300">
                                <span className="text-[16px] sm:text-[20px] md:text-[24px] font-black text-white uppercase tracking-widest block mb-2">{item.name}</span>
                                <span className="text-[12px] sm:text-[15px] font-bold text-copper/60 block">{item.value}</span>
                                <span className="text-[10px] sm:text-[12px] text-gray-600 block mt-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 whitespace-nowrap">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}

          {!isCafe && (
            <div className="max-w-8xl mx-auto text-center px-4">
              <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                <div className="h-[1px] w-8 bg-copper/30"></div>
                추천 추출 방식
                <div className="h-[1px] w-8 bg-copper/30"></div>
              </h3>
              <div className="bg-[#111211] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                {['dripbag', 'bean'].includes(product.category) ? (
                  <div className="relative z-10 space-y-12">
                    {/* Tab Switcher */}
                    <div className="flex justify-center gap-4 mb-8">
                      <button 
                        onClick={() => setRecipeTab('hot')}
                        className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 border ${recipeTab === 'hot' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-transparent text-gray-500 hover:text-gray-300'}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${recipeTab === 'hot' ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`}></div>
                        HOT RECIPE
                      </button>
                      <button 
                        onClick={() => setRecipeTab('ice')}
                        className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 border ${recipeTab === 'ice' ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' : 'bg-white/5 border-transparent text-gray-500 hover:text-gray-300'}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${recipeTab === 'ice' ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'}`}></div>
                        ICE RECIPE
                      </button>
                    </div>

                    {/* Recipe Content */}
                    {(() => {
                      const prefix = recipeTab === 'hot' ? 'hot_' : 'ice_';
                      const hasData = product[`${prefix}grind`] || product[`${prefix}bloom_water`];
                      
                      if (!hasData) {
                        return (
                          <div className="py-12 text-center text-gray-600 italic">
                            {recipeTab.toUpperCase()} 레시피가 아직 등록되지 않았습니다.
                          </div>
                        );
                      }

                      const pours = [
                        { label: '뜸 (Bloom)', time: product[`${prefix}bloom_time`], water: product[`${prefix}bloom_water`] },
                        { label: '1차 푸어', time: product[`${prefix}p1_time`], water: product[`${prefix}p1_water`] },
                        { label: '2차 푸어', time: product[`${prefix}p2_time`], water: product[`${prefix}p2_water`] },
                        { label: '3차 푸어', time: product[`${prefix}p3_time`], water: product[`${prefix}p3_water`] },
                        { label: '4차 푸어', time: product[`${prefix}p4_time`], water: product[`${prefix}p4_water`] },
                      ].filter(p => p.water);

                      const totalWater = pours.reduce((acc, p) => acc + Number(p.water || 0), 0);

                      return (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          {/* Summary Row */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                              { label: '원두량', value: product[`${prefix}coffee_amount`] ? (String(product[`${prefix}coffee_amount`]).toLowerCase().includes('g') ? product[`${prefix}coffee_amount`] : `${product[`${prefix}coffee_amount`]}g`) : '-', icon: <Coffee size={14} /> },
                              { label: '분쇄도', value: product[`${prefix}grind`], icon: <Scale size={14} /> },
                               { label: '물 온도', value: product[`${prefix}temp`] ? (String(product[`${prefix}temp`]).includes('℃') || String(product[`${prefix}temp`]).includes('C') || String(product[`${prefix}temp`]).includes('°') ? product[`${prefix}temp`] : `${product[`${prefix}temp`]}℃`) : '-', icon: <Thermometer size={14} /> },
                              { label: '드리퍼', value: product[`${prefix}dripper`], icon: <Droplet size={14} /> },
                              { 
                                label: recipeTab === 'ice' ? '얼음 중량' : '추출 비율', 
                                value: recipeTab === 'ice' 
                                  ? (product.ice_weight ? `${product.ice_weight}g` : '-') 
                                  : (product.hot_ratio ? (String(product.hot_ratio).includes(':') ? product.hot_ratio : `1:${product.hot_ratio}`) : '-'), 
                                icon: <Target size={14} /> 
                              }
                            ].map((item, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-1.5">
                                <div className="text-copper/50">{item.icon}</div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-bold text-white">{item.value || '-'}</span>
                              </div>
                            ))}
                          </div>

                          {/* Horizontal Step-by-Step Layout */}
                          <div className="relative pt-4 pb-4">
                            <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-0 md:gap-x-4">
                              {pours.map((pour, pIdx) => (
                                <div key={pIdx} className="flex-1 group relative">
                                  {/* Horizontal Connector Line (Hidden on mobile) */}
                                  {pIdx < pours.length - 1 && (
                                    <div className="absolute top-[45px] left-[50%] w-full h-[1px] bg-gradient-to-r from-copper/40 via-copper/10 to-transparent hidden md:block z-0"></div>
                                  )}
                                  
                                  <div className="flex flex-col items-center relative z-10">
                                    {/* Step Label */}
                                    <span className="text-copper font-black text-[12px] uppercase tracking-[0.2em] mb-4 opacity-100">{pour.label}</span>
                                    
                                    {/* Step Circle with Number */}
                                    <div className="w-[50px] h-[50px] rounded-full bg-[#181a19] border border-white/10 flex items-center justify-center mb-6 group-hover:border-copper/40 transition-all duration-500 shadow-xl relative overflow-hidden">
                                       <div className="absolute inset-0 bg-gradient-to-br from-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                       <span className="text-base font-serif font-black text-white group-hover:text-copper transition-colors">{pIdx + 1}</span>
                                       
                                       {/* Mobile Vertical Connector Line */}
                                       {pIdx < pours.length - 1 && (
                                         <div className="absolute top-1/2 left-1/2 translate-y-[25px] w-[1px] h-[48px] bg-copper/20 md:hidden"></div>
                                       )}
                                    </div>
                                    
                                    {/* Step Data */}
                                    <div className="flex flex-col items-center gap-1 pt-1">
                                      <div className="flex items-baseline gap-1.5">
                                        <span className="text-xl font-serif font-black text-white tabular-nums group-hover:text-copper transition-colors">{pour.water}</span>
                                        <span className="text-[8.5px] font-bold text-gray-500 tracking-widest">g</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <Timer size={14} className="opacity-30 group-hover:opacity-60 transition-opacity" />
                                        <span className="text-sm font-serif font-bold tabular-nums text-gray-400 group-hover:text-gray-200 transition-colors">{pour.time || '-'}</span>
                                        <span className="text-[8.5px] font-bold uppercase tracking-widest opacity-40">sec</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-10">
                            <div className="flex items-center gap-4">
                              <span className="text-[8.5px] font-black text-gray-600 uppercase tracking-widest">최종 추출량</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-serif font-black text-copper tabular-nums">{totalWater}</span>
                                <span className="text-xs font-bold text-gray-500">g</span>
                              </div>
                            </div>
                            
                            {product[`${prefix}comment`] && (
                              <div className="max-w-2xl text-center mx-auto">
                                 <div className="text-[8.5px] text-copper/40 font-black uppercase tracking-[0.2em] mb-2">Recipe Note</div>
                                 <div 
                                   className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-medium break-keep italic html-content"
                                   dangerouslySetInnerHTML={{ __html: product[`${prefix}comment`] }}
                                 />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                      <Droplet size={200} className="text-copper" />
                    </div>
                    <div 
                      className="text-gray-400 text-sm sm:text-base leading-[1.8] font-medium break-keep relative z-10 html-content prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.story || "정밀한 추출 가이드가 준비 중입니다. 매장에 방문하시면 바리스타가 직접 안내해 드립니다." }}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. Regulatory Product Information Notice (Table) */}
        {['bean', 'dripbag', 'coldbrew'].includes(product.category) && (
          <div className="max-w-4xl mx-auto px-4 mt-20 mb-32 border-t border-white/5 pt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 text-center">
            <h3 className="text-xl font-serif font-black text-white mb-10 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
              <div className="h-[1px] w-6 bg-white/10"></div>
              상품 정보 제공 고시
              <div className="h-[1px] w-6 bg-white/10"></div>
            </h3>
            <div className="bg-[#111211] rounded-2xl border border-white/5 overflow-hidden shadow-2xl text-left">
              <div className="flex flex-col">
                {[
                  { label: '식품유형', value: '커피 (Coffee)' },
                  { label: '업소명의 명칭 및 소재지', value: '아키미스트 로스터스 / 대구광역시 수성구 범어동 범어역' },
                  { label: '제조일자', value: '상품 후면 별도 표기' },
                  { label: '소비기한', value: '제조일로부터 1년' },
                  { label: '내용량', value: product.size ? (String(product.size).includes('g') || String(product.size).includes('개') ? product.size : `${product.size}g / ${product.size}개`) : '200g / 500g / 1000g (상품 전면 표기)' },
                  { label: '원재료명 및 함량', value: '커피원두 100%' },
                  { label: '포장재질', value: '폴리에틸렌 (내면)' },
                  { label: '품목보고번호', value: '상품 후면 별도 표기' },
                  { label: '반품 및 교환', value: '구입처 및 본사' },
                  { label: '보관방법', value: '건냉한 곳에 밀폐보관' },
                  { label: '고객 상담 전화', value: '010-0000-0000 (아키미스트)' },
                ].map((info, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                     <div className="w-full sm:w-1/3 bg-white/[0.01] p-4 text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center border-b sm:border-b-0 sm:border-r border-white/5">
                       {info.label}
                     </div>
                     <div className="w-full sm:w-2/3 p-4 text-xs font-medium text-gray-300 flex items-center break-keep">
                       {info.value}
                     </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/[0.01] border-t border-white/5">
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium mb-1.5 opacity-60 italic">
                  * 본 제품은 공정거래위원회 고시 소비자 분쟁 해결 기준에 의거 정당한 소비자 피해에 대해 교환 또는 보상받을 수 있습니다.
                </p>
                <p className="text-[10px] text-gray-500 leading-relaxed font-bold opacity-80">
                  * 부정·불량 식품 신고는 국번없이 1399
                </p>
              </div>
            </div>
          </div>
        )}
      
      {/* Visual Alchemy - Floating Particles */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-copper rounded-full blur-[2px] animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-copper rounded-full blur-[3px] animate-pulse delay-700 opacity-30"></div>
    </section>
  );
}

