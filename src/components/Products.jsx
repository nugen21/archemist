import React from 'react';

const PRODUCT_DATA = {
  dripbag: {
    title: 'DRIP BAGS',
    subtitle: '언제 어디서나 즐기는 아케미스트의 향기',
    items: [
      { id: 'db1', name: 'Archemist Blend Dripbag', desc: '견과류의 고소함과 깨끗한 후미', price: '12,000원 (8개입)' },
      { id: 'db2', name: 'Ethiopia Sidamo Dripbag', desc: '내추럴 프로세싱의 풍부한 베리 향', price: '14,000원 (8개입)' }
    ]
  },
  coldbrew: {
    title: 'COLD BREW',
    subtitle: '저온 추출로 완성한 부드러운 깊이감',
    items: [
      { id: 'cb1', name: 'Signature Cold Brew (500ml)', desc: '12시간 저온 침출로 완성된 다크 초콜렛 풍미', price: '15,000원' },
      { id: 'cb2', name: 'Floral Blend Cold Brew (500ml)', desc: '꽃향기와 은은한 시트러스의 조화', price: '16,000원' }
    ]
  },
  beverage: {
    title: 'SIGNATURE BEVERAGES',
    subtitle: '아케미스트 쇼룸에서 만나는 특별한 메뉴',
    items: [
      { id: 'bv1', name: 'Copper Latte', desc: '아케미스트만의 특제 구리색 시럽이 들어간 시그니처 라떼', price: '6,500원' },
      { id: 'bv2', name: 'The Alchemist', desc: '스모키한 향과 부드러운 크림이 조화를 이루는 창작 메뉴', price: '7,000원' }
    ]
  }
};

export default function Products({ category }) {
  const data = PRODUCT_DATA[category];
  if (!data) return null;

  return (
    <section id={category} className="py-24 px-4 sm:px-8 bg-[#0b0c0b] border-t border-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 tracking-tight uppercase">{data.title}</h2>
          <p className="text-copper font-serif italic text-lg sm:text-xl">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.items.map((item) => (
            <div key={item.id} className="bg-[#111211] border border-gray-800 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group shadow-xl">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold text-gray-100 group-hover:text-copper transition-colors">{item.name}</h3>
                 <span className="text-copper font-serif italic text-sm">{item.price}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
              <div className="mt-6 pt-6 border-t border-gray-800/50 flex justify-end">
                 <button className="text-[10px] text-gray-500 hover:text-copper font-bold uppercase tracking-widest transition-colors">
                    Learn More →
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
