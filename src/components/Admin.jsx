import React, { useState, useEffect, useRef } from 'react';

const Admin = ({ isAdmin, setAdminAuth }) => {
  const [activeTab, setActiveTab] = useState('manage'); // 'register' or 'manage'
  const [editingId, setEditingId] = useState(null);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [beans, setBeans] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [githubToken, setGithubToken] = useState(() => sessionStorage.getItem('archemist_gh_token') || '');
  const [isPushing, setIsPushing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'success', 'error'
  const syncTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    category: 'bean', // 'bean', 'dripbag', 'coldbrew', 'beverage'
    name: '', price: '', country: '', region: '', variety: '', altitude: '', process: '', 
    roaster: '', agtronWb: '', agtronGround: '', roastPoint: '', roastTime: '', roastDate: '', degassing: '', 
    cupNotes: '', recipe: '', dripper: '', coffeeAmount: '', grind: '', temp: '', visible: true,
    recommended: false, image: '',
    englishName: '', size: '', isSpecial: false, subCategory: 'espresso' // beverage specific
  });
  const loadBeans = async (forceFetch = true) => {
    try {
      // Always fetch fresh data from server to ensure global sync
      const response = await fetch(`/products.json?t=${Date.now()}`);
      if (response.ok) {
        const serverData = await response.json();
        
        // Update local state and storage
        setBeans(serverData);
        localStorage.setItem('archemist_beans', JSON.stringify(serverData));
        console.log('Admin: Successfully synced with server data');
      } else {
        throw new Error('Server data not found');
      }
    } catch (error) {
      console.error('Admin: Failed to load products from server:', error);
      const localSaved = localStorage.getItem('archemist_beans');
      if (localSaved) {
        setBeans(JSON.parse(localSaved));
        console.log('Admin: Falling back to local storage');
      }
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(beans, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'products.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const syncWithGitHub = async (latestBeans) => {
    // Clear any pending sync to debounce
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(async () => {
      let token = githubToken;
      if (!token) {
        token = window.prompt('관리자 권한: GitHub Personal Access Token을 입력해주세요 (세션 유지):');
        if (!token) return;
        setGithubToken(token);
        sessionStorage.setItem('archemist_gh_token', token);
      }

      setSyncStatus('syncing');
      setIsPushing(true);
      const owner = 'nugen21';
      const repo = 'archemist';
      const path = 'public/products.json';

      try {
        // Use URL param for cache busting instead of header to avoid preflight CORS issues
        const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?t=${Date.now()}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (!getRes.ok) throw new Error('GitHub 인증 실패 또는 파일 정보 로드 실패');
        const fileData = await getRes.json();
        const sha = fileData.sha;

        const updatedContent = JSON.stringify(latestBeans, null, 2);
        const bytes = new TextEncoder().encode(updatedContent);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Content = btoa(binary);

        const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Admin: Auto-Sync products.json (${new Date().toLocaleString()})`,
            content: base64Content,
            sha: sha,
            branch: 'main'
          })
        });

        if (!putRes.ok) {
          const errorData = await putRes.json();
          if (putRes.status === 409) {
             console.warn('Admin: SHA Conflict during sync, retrying...');
             return syncWithGitHub(latestBeans);
          }
          setSyncStatus('error');
          throw new Error(errorData.message || 'GitHub 업데이트 실패');
        }
        setSyncStatus('success');
        console.log('Admin: Successfully auto-synced with GitHub');
        // Clear success message after 3 seconds
        setTimeout(() => setSyncStatus('idle'), 3000);
      } catch (error) {
        setSyncStatus('error');
        console.error('GitHub Auto-Sync Error:', error);
        alert(`자동 업데이트 실패: ${error.message}\n토큰을 다시 확인해주세요.`);
        setGithubToken(''); 
        sessionStorage.removeItem('archemist_gh_token');
      } finally {
        setIsPushing(false);
      }
    }, 2000); // 2-second debounce to group rapid changes
  };

  const handlePushToGitHub = () => {
    syncWithGitHub(beans);
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
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'agtronGround') {
      const agtronVal = parseFloat(value);
      let autoRoastPoint = formData.roastPoint;
      
      if (!isNaN(agtronVal)) {
        if (agtronVal >= 95) autoRoastPoint = 'Very Light';
        else if (agtronVal >= 85) autoRoastPoint = 'Light';
        else if (agtronVal >= 75) autoRoastPoint = 'Moderately Light';
        else if (agtronVal >= 65) autoRoastPoint = 'Medium Light';
        else if (agtronVal >= 55) autoRoastPoint = 'Medium';
        else if (agtronVal >= 45) autoRoastPoint = 'Medium Dark';
        else if (agtronVal >= 35) autoRoastPoint = 'Dark';
        else autoRoastPoint = 'Very Dark';
      } else if (value === '') {
        autoRoastPoint = '';
      }

      setFormData(prev => ({
        ...prev,
        [name]: newValue,
        roastPoint: autoRoastPoint
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for Base64 efficiency
        alert('파일 크기가 너무 큽니다. 2MB 이하의 이미지를 사용해 주세요.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
    let updated;
    
    if (editingId) {
      updated = existing.map(bean => 
        String(bean.id) === String(editingId) ? { ...formData, id: editingId } : bean
      );
      alert('정보가 성공적으로 수정되었습니다.');
    } else {
      const newBean = { ...formData, id: Date.now(), visible: true };
      updated = [...existing, newBean];
      alert('품목이 성공적으로 등록되었습니다.');
    }
    
    localStorage.setItem('archemist_beans', JSON.stringify(updated));
    resetForm();
    setBeans(updated);
    window.dispatchEvent(new Event('beansUpdated'));
    setActiveTab('manage'); // Automatically go back to list
    
    // Auto-Sync to GitHub
    syncWithGitHub(updated);
  };

  const resetForm = () => {
    setFormData({
      category: 'bean',
      name: '', price: '', country: '', region: '', variety: '', altitude: '', process: '', 
      roaster: '', agtronWb: '', agtronGround: '', roastPoint: '', roastTime: '', roastDate: '', degassing: '', 
      cupNotes: '', recipe: '', dripper: '', coffeeAmount: '', grind: '', temp: '', visible: true,
      recommended: false, image: '',
      englishName: '', size: '', isSpecial: false, subCategory: 'espresso'
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (bean) => {
    setFormData({
      ...bean,
      category: bean.category || 'bean',
      image: bean.image || ''
    });
    setEditingId(bean.id);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleVisibility = (id) => {
    const updated = beans.map(bean => 
      String(bean.id) === String(id) ? { ...bean, visible: !bean.visible } : bean
    );
    
    // Sync with formData if editing the same item
    if (editingId && String(editingId) === String(id)) {
      setFormData(prev => ({ ...prev, visible: !prev.visible }));
    }
    localStorage.setItem('archemist_beans', JSON.stringify(updated));
    setBeans(updated);
    window.dispatchEvent(new Event('beansUpdated'));
    
    // Auto-Sync to GitHub
    syncWithGitHub(updated);
  };

  const handleToggleRecommended = (id) => {
    console.log('Admin: Toggling Recommendation for ID:', id);
    const updated = beans.map(bean => 
      String(bean.id) === String(id) ? { ...bean, recommended: !bean.recommended } : bean
    );
    
    // Sync with formData if editing the same item
    if (editingId && String(editingId) === String(id)) {
      setFormData(prev => ({ ...prev, recommended: !prev.recommended }));
    }
    try {
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      console.log('Admin: Saved updated state to localStorage');
    } catch (e) {
      console.error('Admin: Failed to save to localStorage:', e);
      alert('저장 공간이 부족하여 설정을 저장할 수 없습니다.');
    }
    setBeans(updated);
    window.dispatchEvent(new Event('beansUpdated'));
    
    // Auto-Sync to GitHub
    syncWithGitHub(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('품목을 목록에서 영구적으로 삭제하시겠습니까? (숨기기 기능을 권장합니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.filter(b => String(b.id) !== String(id));
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      setBeans(updated);
      window.dispatchEvent(new Event('beansUpdated'));
      
      // Auto-Sync to GitHub
      syncWithGitHub(updated);
    }
  };

  const handleReturn = () => {
    window.location.hash = ''; // Back to main
  };

  useEffect(() => {
    if (isAdmin) loadBeans();
    // Removed storage listener to prevent recursive loops in Admin
  }, [isAdmin]);

  const filteredBeans = categoryFilter === 'all' 
    ? beans 
    : beans.filter(b => (b.category || 'bean') === categoryFilter);

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#111211]">
        <div className="max-w-md w-full bg-[#181a19] border border-copper/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-copper font-serif tracking-widest uppercase mb-2">관리자 접속</h2>
            <p className="text-gray-500 text-xs tracking-wider">로스터리를 위한 관리자 인증이 필요합니다.</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">ID</label>
              <input type="text" name="id" value={loginForm.id} onChange={handleLoginChange} required className="w-full bg-[#0b0c0b] border border-gray-800 rounded-xl px-4 py-3.5 text-gray-200 focus:outline-none focus:border-copper transition-all" placeholder="ID를 입력하세요" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Password</label>
              <input type="password" name="password" value={loginForm.password} onChange={handleLoginChange} required className="w-full bg-[#0b0c0b] border border-gray-800 rounded-xl px-4 py-3.5 text-gray-200 focus:outline-none focus:border-copper transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-copper text-[#111] font-bold py-4 rounded-xl hover:shadow-[0_0_15px_rgba(161,118,76,0.4)] transition-all uppercase tracking-widest text-sm">로그인</button>
          </form>
          <div className="mt-8 text-center"><button onClick={handleReturn} className="text-[10px] font-bold text-gray-600 hover:text-copper uppercase tracking-widest transition">← 로스터리 홈으로</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111211] text-gray-200 py-4 px-4 sm:px-6 lg:px-8 font-sans selection:bg-copper selection:text-white">
      <div className="max-w-5xl mx-auto bg-[#181a19] border border-copper/30 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-copper/20 pb-4 relative z-10 gap-4">
           <div className="flex items-center gap-4">
             <h2 className="text-3xl font-bold text-copper font-serif tracking-wide">관리자 패널</h2>
             <span className="bg-copper/10 text-copper text-[10px] font-bold px-3 py-1 rounded-full border border-copper/20 uppercase tracking-widest">
               {activeTab === 'manage' ? 'List Management' : 'Product Registration'}
             </span>
           </div>
           
           <div className="flex gap-4 items-center">
             <button 
               onClick={handlePushToGitHub} 
               disabled={isPushing}
               className={`text-[10px] px-4 py-1.5 rounded-lg border transition-all font-black uppercase tracking-[0.2em] shadow-lg ${isPushing ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-copper border-copper text-black hover:scale-105 active:scale-95'}`}
             >
               {isPushing ? '서버 반영 중...' : '🚀 서버에 즉시 반영하기'}
             </button>
             <button onClick={handleExportJSON} className="text-[9px] px-3 py-1 border border-gray-700 rounded-lg hover:border-copper transition-colors font-bold uppercase tracking-widest text-gray-400 hover:text-copper" title="현재 데이터를 JSON으로 내보냅니다">JSON 내보내기</button>
             <button onClick={() => setAdminAuth(false)} className="text-xs tracking-widest text-gray-500 hover:text-red-400 uppercase font-bold transition">로그아웃</button>
             <button onClick={handleReturn} className="text-xs tracking-widest text-gray-400 hover:text-copper uppercase font-bold transition flex items-center gap-2"><span>←</span> 홈으로</button>
           </div>
        </div>
        
        {activeTab === 'register' ? (
          <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-[#0b0c0b] p-6 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-copper/20 flex items-center justify-center text-copper">＋</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{editingId ? '상품 정보 수정' : '신규 상품 등록'}</h3>
              </div>
              <button 
                onClick={() => { resetForm(); setActiveTab('manage'); }}
                className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5"
              >
                ✕ 취소하고 목록으로 돌아가기
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-[#0b0c0b] p-6 rounded-2xl border border-gray-800">
              <label className="block text-xs font-bold text-copper tracking-widest uppercase mb-4">카테고리 선택 (Category)</label>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'bean', label: '원두 (Bean)', emoji: '🫘' },
                  { id: 'dripbag', label: '드립백 (Drip)', emoji: '📦' },
                  { id: 'coldbrew', label: '콜드브루 (Cold)', emoji: '🧪' },
                  { id: 'beverage', label: '매장음료 (Cafe)', emoji: '☕' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${formData.category === cat.id ? 'bg-copper border-copper text-black' : 'bg-black/40 border-gray-800 text-gray-500 hover:border-copper/40'}`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.category === 'beverage' && (
              <div className="bg-[#0b0c0b] p-6 rounded-2xl border border-gray-800">
                <label className="block text-xs font-bold text-copper tracking-widest uppercase mb-4">메뉴 구분 (Type)</label>
                <div className="flex gap-2">
                  {[
                    { id: 'espresso', label: '에스프레소', emoji: '☕' },
                    { id: 'handdrip', label: '핸드 드립', emoji: '💧' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, subCategory: sub.id }))}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${formData.subCategory === sub.id ? 'bg-copper border-copper text-black' : 'bg-black/40 border-gray-800 text-gray-500 hover:border-copper/40'}`}
                    >
                      {sub.emoji} {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={formData.category === 'beverage' ? "md:col-span-2 lg:col-span-2" : "md:col-span-2 lg:col-span-3"}>
                <InputField label="상품명" name="name" value={formData.name} onChange={handleChange} required placeholder="상품명을 입력하세요" />
              </div>

              {formData.category === 'beverage' && (
                <div className="md:col-span-2 lg:col-span-1">
                  <InputField label="영문명 (English Name)" name="englishName" value={formData.englishName} onChange={handleChange} placeholder="예: Americano" />
                </div>
              )}

              
              <div className="md:col-span-2 lg:col-span-2">
                <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wider uppercase">상품 이미지 업로드 (Recommended: Square, Max 2MB)</label>
                <div className="flex gap-4 items-start">
                  <div className="relative group flex-1">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload} 
                      accept="image/*"
                      className="hidden" 
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-40 bg-[#0b0c0b] border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer hover:border-copper transition-all p-4 group-hover:bg-[#111]"
                    >
                      {formData.image ? (
                        <div className="relative w-full h-full">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">이미지 변경</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <UploadIcon />
                          <p className="mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">클릭하여 이미지 업로드</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {formData.image && (
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="mt-2 text-[10px] font-bold text-gray-600 hover:text-red-500 uppercase tracking-widest transition"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <InputField label={formData.category === 'beverage' ? "가격 (Price)" : "가격"} name="price" value={formData.price} onChange={handleChange} placeholder="예: 3.5 또는 18,000" />
              </div>

              {formData.category === 'beverage' && (
                <div className="flex flex-col justify-end">
                  <InputField label="사이즈 (Size)" name="size" value={formData.size} onChange={handleChange} placeholder="예: 16oz" />
                </div>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag') && (
                <>
                  <div className="lg:col-span-1">
                    <InputField 
                      label="SCA 로스팅 포인트" 
                      name="roastPoint" 
                      value={formData.roastPoint} 
                      onChange={handleChange} 
                      placeholder="분쇄 점수 입력 시 자동 계산" 
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-1.5 bg-[#0b0c0b] border border-gray-800 p-4 rounded-xl md:col-span-2 lg:col-span-1">
                <input 
                  type="checkbox" 
                  id="recommended-check"
                  name="recommended" 
                  checked={formData.recommended} 
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-800 bg-black text-copper focus:ring-copper cursor-pointer"
                />
                <label htmlFor="recommended-check" className="text-xs font-bold text-gray-400 cursor-pointer uppercase tracking-widest">
                  {formData.category === 'beverage' ? '인기 메뉴로 설정 (Best)' : '추천 상품으로 설정'}
                </label>
              </div>

              {formData.category === 'beverage' && (
                <div className="flex items-center space-x-1.5 bg-[#0b0c0b] border border-gray-800 p-4 rounded-xl md:col-span-2 lg:col-span-1">
                  <input 
                    type="checkbox" 
                    id="isSpecial-check"
                    name="isSpecial" 
                    checked={formData.isSpecial} 
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-100 bg-black text-blue-500 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="isSpecial-check" className="text-xs font-bold text-gray-400 cursor-pointer uppercase tracking-widest">특별 시그니처 (Alchemy Effect)</label>
                </div>
              )}

              {formData.category !== 'beverage' && (
                <InputField label="로스팅/제조 날짜" name="roastDate" value={formData.roastDate} onChange={handleChange} placeholder="예: 2024.03.21" />
              )}

              {formData.category === 'bean' && (
                <>
                  <InputField label="국가" name="country" value={formData.country} onChange={handleChange} placeholder="예: 파나마" />
                  <InputField label="생산 지역" name="region" value={formData.region} onChange={handleChange} placeholder="예: 보케테" />
                  <InputField label="품종" name="variety" value={formData.variety} onChange={handleChange} placeholder="예: 게이샤" />
                  <InputField label="가공방식" name="process" value={formData.process} onChange={handleChange} placeholder="예: 워시드" />
                  <InputField label="로스팅 소요 시간" name="roastTime" value={formData.roastTime} onChange={handleChange} placeholder="예: 9분 15초" />
                </>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag') && (
                <>
                  <div className="lg:col-span-1">
                    <InputField 
                      label="아그트론 (홀빈)" 
                      name="agtronWb" 
                      value={formData.agtronWb} 
                      onChange={handleChange} 
                      placeholder="예: 70" 
                      type="number"
                      step="0.1"
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <InputField 
                      label="아그트론 (분쇄)" 
                      name="agtronGround" 
                      value={formData.agtronGround} 
                      onChange={handleChange} 
                      placeholder="예: 65" 
                      type="number"
                      step="0.1"
                    />
                  </div>
                </>
              )}

              <div className="lg:col-span-3">
                 <InputField 
                    label={formData.category === 'bean' ? "컵 노트" : "상품 설명"} 
                    name="cupNotes" 
                    value={formData.cupNotes} 
                    onChange={handleChange} 
                    placeholder={formData.category === 'bean' ? "예: 쟈스민, 복숭아, 베르가못, 꿀" : "상품 설명을 입력하세요"} 
                  />
              </div>

              {formData.category === 'bean' && (
                <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 border-t border-gray-800 pt-6">
                  <InputField label="추출 기구" name="dripper" value={formData.dripper} onChange={handleChange} placeholder="Hario V60" />
                  <InputField label="원두량" name="coffeeAmount" value={formData.coffeeAmount} onChange={handleChange} placeholder="18g" />
                  <InputField label="분쇄도" name="grind" value={formData.grind} onChange={handleChange} placeholder="25 clicks" />
                  <InputField label="추출 온도" name="temp" value={formData.temp} onChange={handleChange} placeholder="94°C" />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-copper tracking-widest mb-2 uppercase">상세 설명 / 추출 레시피</label>
              <textarea name="recipe" value={formData.recipe} onChange={handleChange} rows="5" className="w-full bg-[#0b0c0b] border border-gray-700/60 rounded-xl px-4 py-4 text-gray-200 focus:outline-none focus:border-copper focus:bg-[#111] transition-all duration-300 resize-none shadow-inner leading-relaxed" placeholder="상세한 제품 설명이나 레시피를 입력하세요."></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-yellow-700 via-copper to-yellow-600 text-[#111] font-bold py-5 rounded-xl hover:shadow-[0_0_20px_rgba(161,118,76,0.5)] hover:scale-[1.01] transition-all duration-300 text-lg tracking-widest uppercase">
              {editingId ? '정보 수정 완료' : '품목 등록 완료'}
            </button>
          </form>
        </div>
      ) : (
          <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
               {['all', 'bean', 'dripbag', 'coldbrew', 'beverage'].map(cat => (
                 <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${categoryFilter === cat ? 'bg-copper text-black border-copper' : 'bg-[#0b0c0b] text-gray-500 border-gray-800'}`}>
                   {cat === 'all' ? 'All Items' : cat}
                 </button>
               ))}
            </div>

            <button 
              onClick={() => { resetForm(); setActiveTab('register'); }}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-copper to-yellow-600 text-[#111] px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(161,118,76,0.3)] transition-all duration-300 font-bold tracking-widest text-xs uppercase"
            >
              <span className="text-lg">＋</span>
              신규 상품 등록하기
            </button>
          </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">이미지 / 종류</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">상품명</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">가격 / 로스팅 날짜</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredBeans.length === 0 ? (
                    <tr><td colSpan="4" className="py-12 text-center text-gray-600 italic">표시할 품목이 없습니다.</td></tr>
                  ) : (
                    filteredBeans.map((item) => (
                      <tr key={item.id} className={`hover:bg-white/[0.02] transition-colors group ${!item.visible ? 'opacity-50' : ''}`}>
                        <td className="py-5 px-4 flex items-center gap-3">
                           {item.image ? (
                             <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-gray-800" />
                           ) : (
                             <div className="w-10 h-10 rounded-lg bg-[#0b0c0b] flex items-center justify-center p-1.5 border border-gray-800">
                               <img 
                                 src={`/images/icons/${item.category || 'bean'}.jpg`} 
                                 className="w-full h-full object-contain opacity-50" 
                                 alt="category"
                               />
                             </div>
                           )}
                           <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter border ${
                             item.category === 'bean' ? 'bg-copper/20 text-copper border-copper/30' : 
                             item.category === 'dripbag' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' : 
                             item.category === 'beverage' ? 'bg-orange-900/20 text-orange-400 border-orange-900/30' : 
                             'bg-green-900/20 text-green-400 border-green-900/30'
                           }`}>
                             {item.category || 'bean'}
                           </span>
                        </td>
                        <td className="py-5 px-4">
                          <p className="font-bold text-gray-200 group-hover:text-copper transition-colors">{item.name}</p>
                          <div className="flex gap-2 items-center mt-1">
                            <span className={`text-[10px] ${item.visible ? 'text-gray-500' : 'text-red-900'}`}>{item.visible ? '공개됨' : '숨김'}</span>
                            {item.recommended && (
                              <span className="bg-copper/10 text-copper text-[8px] font-bold px-1.5 py-0.5 rounded border border-copper/20 uppercase tracking-tighter">추천 상품</span>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-4 text-xs text-gray-400">{item.price || item.roastDate || '-'}</td>
                        <td className="py-5 px-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => handleToggleRecommended(item.id)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${item.recommended ? 'bg-copper text-black' : 'bg-gray-800 text-gray-500 hover:text-white'}`}>{item.recommended ? '추천됨' : '추천하기'}</button>
                            <button onClick={() => handleToggleVisibility(item.id)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${item.visible ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-copper/40 text-white hover:bg-copper'}`}>{item.visible ? '숨기기' : '보이기'}</button>
                            <button onClick={() => handleEdit(item)} className="bg-blue-900/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">수정</button>
                            <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-500 px-2 py-1.5 transition-colors"><TrashIcon /></button>
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

      {/* Sync Status Overlay */}
      {(syncStatus !== 'idle' || githubToken) && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`backdrop-blur-md text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 transition-all ${
            syncStatus === 'syncing' ? 'bg-copper/90' : 
            syncStatus === 'success' ? 'bg-green-500/90' : 
            syncStatus === 'error' ? 'bg-red-500/90' : 'bg-gray-800/80 text-white'
          }`}>
            {syncStatus === 'syncing' ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : syncStatus === 'success' ? (
              <span className="text-lg">✓</span>
            ) : syncStatus === 'error' ? (
              <span className="text-lg">✕</span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            )}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {syncStatus === 'syncing' ? 'GitHub 동기화 중...' : 
               syncStatus === 'success' ? '서버 반영 성공!' : 
               syncStatus === 'error' ? '동기화 실패' : 'GitHub 연결됨'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A1764C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto block">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const InputField = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) => (
  <div className="w-full">
    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wider uppercase">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full bg-[#0b0c0b] border border-gray-700/60 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-copper focus:bg-[#111] transition-colors placeholder:text-gray-600 shadow-inner" />
  </div>
);

export default Admin;
