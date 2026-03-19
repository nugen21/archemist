import React, { useState, useEffect } from 'react';

const Admin = ({ isAdmin, setAdminAuth }) => {
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'manage'
  const [editingId, setEditingId] = useState(null);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [beans, setBeans] = useState([]);
  const [formData, setFormData] = useState({
    name: '', country: '', region: '', variety: '', altitude: '', process: '', 
    roaster: '', roastWb: '', roastGround: '', roastTime: '', roastDate: '', degassing: '', 
    cupNotes: '', recipe: '', dripper: '', coffeeAmount: '', grind: '', temp: '', visible: true
  });

  const loadBeans = () => {
    const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
    setBeans(saved);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.id === 'archemist' && loginForm.password === 'archemist77') {
      setAdminAuth(true);
      loadBeans();
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
    let updated;
    
    if (editingId) {
      updated = existing.map(bean => 
        bean.id === editingId ? { ...formData, id: editingId } : bean
      );
      alert('원두 정보가 성공적으로 수정되었습니다.');
    } else {
      const newBean = { ...formData, id: Date.now(), visible: true };
      updated = [...existing, newBean];
      alert('원두가 성공적으로 등록되었습니다.');
    }
    
    localStorage.setItem('archemist_beans', JSON.stringify(updated));
    resetForm();
    setBeans(updated);
    window.dispatchEvent(new Event('beansUpdated'));
    setActiveTab('manage');
  };

  const resetForm = () => {
    setFormData({
      name: '', country: '', region: '', variety: '', altitude: '', process: '', 
      roaster: '', roastWb: '', roastGround: '', roastTime: '', roastDate: '', degassing: '', 
      cupNotes: '', recipe: '', dripper: '', coffeeAmount: '', grind: '', temp: '', visible: true
    });
    setEditingId(null);
  };

  const handleEdit = (bean) => {
    setFormData(bean);
    setEditingId(bean.id);
    setActiveTab('register');
  };

  const handleToggleVisibility = (id) => {
    const updated = beans.map(bean => 
      bean.id === id ? { ...bean, visible: !bean.visible } : bean
    );
    localStorage.setItem('archemist_beans', JSON.stringify(updated));
    setBeans(updated);
    window.dispatchEvent(new Event('beansUpdated'));
  };

  const handleDelete = (id) => {
    if (window.confirm('원두를 목록에서 영구적으로 삭제하시겠습니까? (숨기기 기능을 권장합니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.filter(b => b.id !== id);
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      setBeans(updated);
      window.dispatchEvent(new Event('beansUpdated'));
    }
  };

  const handleReturn = () => {
    window.location.hash = ''; // Back to main
  };

  useEffect(() => {
    if (isAdmin) loadBeans();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#111211]">
        <div className="max-w-md w-full bg-[#181a19] border border-copper/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-copper font-serif tracking-widest uppercase mb-2">Admin Access</h2>
            <p className="text-gray-500 text-xs tracking-wider">로스터리를 위한 관리자 인증이 필요합니다.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">ID</label>
              <input
                type="text"
                name="id"
                value={loginForm.id}
                onChange={handleLoginChange}
                required
                className="w-full bg-[#0b0c0b] border border-gray-800 rounded-xl px-4 py-3.5 text-gray-200 focus:outline-none focus:border-copper transition-all"
                placeholder="ID를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="w-full bg-[#0b0c0b] border border-gray-800 rounded-xl px-4 py-3.5 text-gray-200 focus:outline-none focus:border-copper transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-copper text-[#111] font-bold py-4 rounded-xl hover:shadow-[0_0_15px_rgba(161,118,76,0.4)] transition-all uppercase tracking-widest text-sm"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button onClick={handleReturn} className="text-[10px] font-bold text-gray-600 hover:text-copper uppercase tracking-widest transition">
              ← Back to Roastery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111211] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-copper selection:text-white">
      <div className="max-w-5xl mx-auto bg-[#181a19] border border-copper/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-copper/20 pb-4 relative z-10 gap-4">
           <div>
             <h2 className="text-3xl font-bold text-copper font-serif tracking-wide">관리자 패널</h2>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Archemist Roasters Management</p>
           </div>
           
           <div className="flex bg-[#0b0c0b] p-1 rounded-xl border border-gray-800">
             <button 
               onClick={() => { setActiveTab('register'); resetForm(); }}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'register' && !editingId ? 'bg-copper text-[#111]' : 'text-gray-400 hover:text-gray-200'}`}
             >
               새 원두 등록
             </button>
             <button 
               onClick={() => { setActiveTab('manage'); resetForm(); }}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'manage' ? 'bg-copper text-[#111]' : 'text-gray-400 hover:text-gray-200'}`}
             >
               목록 관리 ({beans.length})
             </button>
           </div>

           <div className="flex gap-4">
             <button onClick={() => setAdminAuth(false)} className="text-xs tracking-widest text-gray-500 hover:text-red-400 uppercase font-bold transition">Logout</button>
             <button onClick={handleReturn} className="text-xs tracking-widest text-gray-400 hover:text-copper uppercase font-bold transition">← 홈으로</button>
           </div>
        </div>
        
        {activeTab === 'register' ? (
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {editingId ? (
                  <>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    원두 정보 수정 중
                  </>
                ) : '신규 원두 정보 입력'}
              </h3>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-bold"
                >
                  수정 취소
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <InputField label="1. 원두명" name="name" value={formData.name} onChange={handleChange} required placeholder="예: 파나마 에스메랄다 게이샤 워시드" />
              </div>
              <InputField label="2. 국가" name="country" value={formData.country} onChange={handleChange} placeholder="예: 파나마" />
              <InputField label="3. 생산 지역" name="region" value={formData.region} onChange={handleChange} placeholder="예: 보케테" />
              <InputField label="4. 품종" name="variety" value={formData.variety} onChange={handleChange} placeholder="예: 게이샤" />
              
              <InputField label="5. 재배 고도" name="altitude" value={formData.altitude} onChange={handleChange} placeholder="예: 1,500m" />
              <InputField label="6. 가공방식" name="process" value={formData.process} onChange={handleChange} placeholder="예: 워시드 (Washed)" />
              <InputField label="7. 로스터" name="roaster" value={formData.roaster} onChange={handleChange} placeholder="예: 아케미스트" />
              
              <InputField label="8. 홀빈 배전도" name="roastWb" value={formData.roastWb} onChange={handleChange} placeholder="예: 64.6" />
              <InputField label="9. 분쇄 배전도" name="roastGround" value={formData.roastGround} onChange={handleChange} placeholder="예: 77.4" />
              <InputField label="10. 로스팅 소요 시간" name="roastTime" value={formData.roastTime} onChange={handleChange} placeholder="예: 9분 15초" />
              <InputField label="11. 로스팅 날짜" name="roastDate" type="date" value={formData.roastDate} onChange={handleChange} />
              
              <div className="lg:col-span-3">
                 <InputField label="12. 추천 디개싱 기간" name="degassing" value={formData.degassing} onChange={handleChange} placeholder="예: 로스팅 후 7~14일" />
              </div>
              <div className="lg:col-span-3">
                 <InputField label="13. 컵 노트" name="cupNotes" value={formData.cupNotes} onChange={handleChange} placeholder="예: 쟈스민, 복숭아, 베르가못, 꿀" />
              </div>

              <div className="md:col-span-2 lg:col-span-3 mt-4 border-t border-gray-800 pt-6">
                <h4 className="text-copper font-bold text-xs uppercase tracking-widest mb-4">Advanced Alchemy Report Specs</h4>
              </div>
              
              <InputField label="14. 추출 기구" name="dripper" value={formData.dripper} onChange={handleChange} placeholder="예: Hario V60" />
              <InputField label="15. 원두량" name="coffeeAmount" value={formData.coffeeAmount} onChange={handleChange} placeholder="예: 18g" />
              <InputField label="16. 그라인더 세팅" name="grind" value={formData.grind} onChange={handleChange} placeholder="예: Comandante 25 clicks" />
              <InputField label="17. 추출 온도" name="temp" value={formData.temp} onChange={handleChange} placeholder="예: 94°C" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-copper tracking-widest mb-2 uppercase">13. 추천 추출법 (Brewing Recipe)</label>
              <textarea
                name="recipe"
                value={formData.recipe}
                onChange={handleChange}
                rows="5"
                className="w-full bg-[#0b0c0b] border border-gray-700/60 rounded-xl px-4 py-4 text-gray-200 focus:outline-none focus:border-copper focus:bg-[#111] transition-all duration-300 resize-none shadow-inner leading-relaxed"
                placeholder="상세한 추출 레시피를 입력하세요."
              ></textarea>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-700 via-copper to-yellow-600 text-[#111] font-bold py-5 rounded-xl hover:shadow-[0_0_20px_rgba(161,118,76,0.5)] hover:scale-[1.01] transition-all duration-300 text-lg tracking-widest uppercase">
                {editingId ? '정보 수정 완료' : '원두 등록 완료'}
              </button>
            </div>
          </form>
        ) : (
          <div className="relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Bean Name</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {beans.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-gray-600 italic">등록된 원두가 없습니다.</td>
                    </tr>
                  ) : (
                    beans.map((bean) => (
                      <tr key={bean.id} className={`hover:bg-white/[0.02] transition-colors group ${!bean.visible ? 'opacity-50' : ''}`}>
                        <td className="py-5 px-4">
                           <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter ${bean.visible ? 'bg-copper/20 text-copper border border-copper/30' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                             {bean.visible ? 'Visible' : 'Hidden'}
                           </span>
                        </td>
                        <td className="py-5 px-4">
                          <p className="font-bold text-gray-200 group-hover:text-copper transition-colors">{bean.name}</p>
                          <p className="text-[10px] text-gray-500">{bean.country} | {bean.variety}</p>
                        </td>
                        <td className="py-5 px-4 text-sm text-gray-400">{bean.roastDate}</td>
                        <td className="py-5 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleToggleVisibility(bean.id)}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${bean.visible ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-copper/40 text-white hover:bg-copper'}`}
                            >
                              {bean.visible ? '숨기기' : '보이기'}
                            </button>
                            <button 
                              onClick={() => handleEdit(bean)}
                              className="bg-blue-900/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all"
                            >
                              수정
                            </button>
                            <button 
                              onClick={() => handleDelete(bean.id)}
                              className="text-gray-600 hover:text-red-500 px-2 py-1.5 transition-colors"
                              title="영구 삭제"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) => (
  <div>
    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wider uppercase">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#0b0c0b] border border-gray-700/60 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-copper focus:bg-[#111] transition-colors placeholder:text-gray-600 shadow-inner"
    />
  </div>
);

export default Admin;
