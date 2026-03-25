import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, Trash2, Edit2, Star, Eye, EyeOff } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const FLAVOR_CATEGORIES = [
  { label: '베리류 (Berries)', items: ['딸기', '라즈베리', '블루베리', '블랙베리', '크랜베리'] },
  { label: '시트러스 (Citrus)', items: ['레몬', '라임', '오렌지', '자몽', '베르가못', '귤', '깔라만시'] },
  { label: '핵과류 (Stone Fruit)', items: ['복숭아', '자두', '살구', '체리', '넥타린'] },
  { label: '열대과일 (Tropical)', items: ['망고', '파인애플', '패션후르츠', '리치', '파파야', '코코넛', '멜론', '바나나'] },
  { label: '과일 (Orchard)', items: ['사과', '배', '청포도', '적포도', '건포도', '무화과'] },
  { label: '플로럴 (Floral)', items: ['장미', '자스민', '히비스커스', '오렌지 블로썸', '아카시아', '국화', '라벤더'] },
  { label: '허브 (Herbal)', items: ['허브', '라벤더', '카모마일', '민트', '세이지', '로즈마리', '딜', '레몬그라스'] },
  { label: '달콤함 (Sweet)', items: ['흑설탕', '백설탕', '시럽', '캐러멜', '당밀', '아카시아 꿀', '잡화 꿀', '바닐라', '마시멜로'] },
  { label: '초콜릿 (Chocolate)', items: ['다크 초콜릿', '밀크 초콜릿', '카카오', '화이트 초콜릿'] },
  { label: '견과류 (Nuts)', items: ['구운 아몬드', '헤이즐넛', '피넛', '호두', '캐슈넛', '피스타치오'] },
  { label: '곡물 (Grains)', items: ['보리', '구운 빵', '시리얼', '호밀', '맥아', '볶은 곡물'] },
  { label: '향신료 (Spices)', items: ['시나몬', '정향', '육두구', '블랙 페퍼', '생강'] },
  { label: '커핑 (Cupping Descriptor)', items: [
      '긴 여운', '깔끔한 마무리', '달콤한 잔향', '차와 같은', '밝은 산미', '섬세한 산미', '와이니한', 
      '실키한 바디', '벨벳 같은', '주스 같은', '크리미한', '시리얼 같은', '단맛의 균형', 
      '뛰어난 균형감', '조화로운', '투명한', '정돈된', '깔끔한 클린컵'
    ] 
  },
  { label: '기타 (Others)', items: ['버터', '크림', '치즈', '요거트'] }
];

const getInitialFormData = () => ({
  category: 'bean', // 'bean', 'dripbag', 'coldbrew', 'beverage'
  name: '', price: '', country: '', region: '', farm: '', micromill: '', variety: '', altitude: '', process: '', 
  roaster: '', agtronWb: '', agtronGround: '', roastPointWb: '', roastPointGround: '', roastTime: '', roastDate: '', degassing: '', 
  cupNotes: '', recipe: '', dripper: '', coffeeAmount: '', grind: '', temp: '', visible: true,
  recommended: false, image: '', order: '', storeUrl: '', agingDays: '', story: '',
  englishName: '', size: '', isSpecial: false, subCategory: 'espresso', beanType: 'single', // beverage specific
  moisture: '', density: '', aw: '', cropYear: '',
  greenBeanName: '', importer: '', scaScore: '',
  flavor: 3, aftertaste: 3, acidityRate: 3, sweetness: 3, bodyRate: 3, balance: 3,
  showBasicInfo: true, showAnalysisInfo: true,
  blend1: '', ratio1: '', blend2: '', ratio2: '', blend3: '', ratio3: '', blend4: '', ratio4: '',
  // Extraction Recipe (Hot)
  hot_coffee_amount: '20g', hot_grind: '', hot_temp: '', hot_ratio: '', hot_dripper: '',
  hot_bloom_time: '', hot_bloom_water: '',
  hot_p1_time: '', hot_p1_water: '',
  hot_p2_time: '', hot_p2_water: '',
  hot_p3_time: '', hot_p3_water: '',
  hot_p4_time: '', hot_p4_water: '',
  hot_comment: '',
  // Extraction Recipe (Ice)
  ice_coffee_amount: '20g', ice_grind: '', ice_temp: '', ice_ratio: '', ice_dripper: '',
  ice_bloom_time: '', ice_bloom_water: '',
  ice_p1_time: '', ice_p1_water: '',
  ice_p2_time: '', ice_p2_water: '',
  ice_p3_time: '', ice_p3_water: '',
  ice_p4_time: '', ice_p4_water: '',
  ice_weight: '',
  ice_comment: ''
});

const Admin = ({ isAdmin, setAdminAuth, initialEditingId, clearEditingId, externalProducts, onEditTriggered }) => {
  const [activeTab, setActiveTab] = useState('manage'); // 'register' or 'manage'
  const [editingId, setEditingId] = useState(null);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [beans, setBeans] = useState(externalProducts || []);
  // 1. Sync local beans with external products prop whenever prop changes
  useEffect(() => {
    if (externalProducts && Array.isArray(externalProducts) && externalProducts.length > 0) {
      setBeans(externalProducts);
    }
  }, [externalProducts]);

  const mergeProductData = (bean) => {
    const freshData = getInitialFormData();
    if (!bean) return freshData;
    
    // Copy all properties from existing bean, ensuring no null/undefined values for controlled inputs
    Object.keys(freshData).forEach(key => {
      // Prioritize bean property, but fallback to freshData default (usually empty string)
      if (bean[key] !== undefined && bean[key] !== null) {
        freshData[key] = bean[key];
      }
    });
    
    // Ensure ID and category are preserved even if not in template
    if (bean.id) freshData.id = bean.id;
    if (bean.category) freshData.category = bean.category;
    
    return freshData;
  };
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [githubToken, setGithubToken] = useState(() => sessionStorage.getItem('archemist_gh_token') || '');
  const [isPushing, setIsPushing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'success', 'error'
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isCupNoteExpanded, setIsCupNoteExpanded] = useState(false);
  const syncTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState(getInitialFormData());

  const handleCupNoteToggle = (note) => {
    const currentNotes = (formData.cupNotes || "").split(/[,/|]+/).map(n => n.trim()).filter(Boolean);
    const index = currentNotes.indexOf(note);
    let newNotes;
    if (index > -1) {
      newNotes = currentNotes.filter(n => n !== note);
    } else {
      newNotes = [...currentNotes, note];
    }
    setFormData(prev => ({ ...prev, cupNotes: newNotes.join(', ') }));
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
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
             console.error('Admin: Sync conflict. Remote content was modified. Aborting sync.');
             setSyncStatus('error');
             alert('다른 장치나 터미널에서 데이터가 수정되어 현재 창의 데이터가 동기화되지 않았습니다. 페이지를 새로고침하여 최신 데이터를 불러온 후 다시 시도해주세요.');
             return; 
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
    if (loginForm.id === 'archemist' && loginForm.password === 'roasters00!') {
      setAdminAuth(true);
      loadBeans();
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'agtronGround' || name === 'agtronWb') {
      const agtronVal = parseFloat(value);
      const isGround = name === 'agtronGround';
      let autoRoastPoint = '';
      
      if (!isNaN(agtronVal)) {
        if (agtronVal >= 95) autoRoastPoint = 'Very Light';
        else if (agtronVal >= 85) autoRoastPoint = 'Light';
        else if (agtronVal >= 75) autoRoastPoint = 'Moderately Light';
        else if (agtronVal >= 65) autoRoastPoint = 'Medium Light';
        else if (agtronVal >= 55) autoRoastPoint = 'Medium';
        else if (agtronVal >= 45) autoRoastPoint = 'Medium Dark';
        else if (agtronVal >= 35) autoRoastPoint = 'Dark';
        else autoRoastPoint = 'Very Dark';
      }

      setFormData(prev => ({
        ...prev,
        [name]: newValue,
        [isGround ? 'roastPointGround' : 'roastPointWb']: autoRoastPoint
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
    window.dispatchEvent(new CustomEvent('beansUpdated', { detail: updated }));
    setActiveTab('manage'); // Automatically go back to list
    
    // Auto-Sync to GitHub
    syncWithGitHub(updated);
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setEditingId(null);
    if (clearEditingId) clearEditingId();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (beanOrId) => {
    if (!beanOrId) return;
    const id = typeof beanOrId === 'object' ? beanOrId.id : beanOrId;
    
    // Just trigger the global state update. 
    // The useEffect below will handle finding the data and setting the form.
    if (onEditTriggered) {
      onEditTriggered(id);
    } else {
      // Fallback if not used inside App with direct prop drill
      setEditingId(id);
      const bean = beans.find(b => String(b.id) === String(id));
      if (bean) {
        setFormData(mergeProductData(bean));
        setActiveTab('register');
      }
    }
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
    window.dispatchEvent(new CustomEvent('beansUpdated', { detail: updated }));
    
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
    window.dispatchEvent(new CustomEvent('beansUpdated', { detail: updated }));
    
    // Auto-Sync to GitHub
    syncWithGitHub(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('품목을 목록에서 영구적으로 삭제하시겠습니까? (숨기기 기능을 권장합니다)')) {
      const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
      const updated = saved.filter(b => String(b.id) !== String(id));
      localStorage.setItem('archemist_beans', JSON.stringify(updated));
      setBeans(updated);
      window.dispatchEvent(new CustomEvent('beansUpdated', { detail: updated }));
      
      // Auto-Sync to GitHub
      syncWithGitHub(updated);
    }
  };

  const handleReturn = () => {
    window.location.hash = ''; // Back to main
  };

  const handleDownloadQR = (item) => {
    const url = `${window.location.origin}${window.location.pathname}#product/${item.id}`;
    
    // Create a temporary container for high-res generation
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    
    // We'll manualy trigger a download by creating a canvas and drawing on it
    // But since we have QRCodeCanvas component, it's easier to just use it once.
    // However, to do it synchronously or via a hidden element:
    const canvas = document.getElementById(`qr-hidden-${item.id}`);
    if (canvas) {
      const link = document.createElement('a');
      link.download = `QR_Archemist_${item.name.replace(/\//g, '_')}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleDownloadAllQRs = () => {
    if (window.confirm(`${filteredBeans.length}개의 QR 코드를 모두 다운로드하시겠습니까? (브라우저 설정에 따라 여러 개의 다운로드 창이 뜰 수 있습니다)`)) {
      filteredBeans.forEach((item, index) => {
        setTimeout(() => {
          handleDownloadQR(item);
        }, index * 300);
      });
    }
  };

  useEffect(() => {
    if (isAdmin) loadBeans();
  }, [isAdmin]);

  // Handle direct edit requests from other components AND local list edits
  useEffect(() => {
    // 1. If we have an ID to edit from props
    if (initialEditingId) {
      // Only proceed if it's different from what we're already doing 
      // OR if we are not in the register tab yet
      if (String(editingId) !== String(initialEditingId) || activeTab !== 'register') {
        const idToFind = String(initialEditingId);
        const dataToSearch = (beans && beans.length > 0) ? beans : (externalProducts || []);
        const beanToEdit = dataToSearch.find(b => String(b.id) === idToFind);
        
        if (beanToEdit) {
          console.log('Admin: Loading product data into form for ID:', idToFind);
          const mergedData = mergeProductData(beanToEdit);
          setFormData(mergedData);
          setEditingId(beanToEdit.id);
          setActiveTab('register');
          // Only scroll if we just switched to register tab
          if (activeTab !== 'register') window.scrollTo(0, 0);
        }
      }
    } 
    // 2. If initialEditingId is cleared from outside but we are still "editing" locally
    else if (!initialEditingId && editingId && activeTab === 'register') {
      setEditingId(null);
      setActiveTab('manage');
      setFormData(getInitialFormData());
    }
  }, [initialEditingId, beans, externalProducts, editingId, activeTab]);

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Visual feedback for dragging
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const currentSort = categoryFilter === 'all' 
      ? [...beans].sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
      : [...beans].filter(b => (b.category || 'bean') === categoryFilter).sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
    
    const reordered = [...currentSort];
    const item = reordered[draggedIndex];
    reordered.splice(draggedIndex, 1);
    reordered.splice(dropIndex, 0, item);

    // Apply new order to the global beans list
    const updatedGlobal = beans.map(b => {
      const newPos = reordered.findIndex(f => f.id === b.id);
      if (newPos !== -1) {
        return { ...b, order: newPos + 1 };
      }
      return b;
    });

    setBeans(updatedGlobal);
    localStorage.setItem('archemist_beans', JSON.stringify(updatedGlobal));
    syncWithGitHub(updatedGlobal);
    setDraggedIndex(null);
  };
  // -----------------------------

  const filteredBeans = (categoryFilter === 'all' 
    ? beans 
    : beans.filter(b => (b.category || 'bean') === categoryFilter))
    .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));

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
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border border-copper/20 uppercase tracking-widest ${activeTab === 'manage' ? 'bg-copper/10 text-copper' : (editingId ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30')}`}>
                {activeTab === 'manage' ? '품목 리스트 관리' : (editingId ? '기존 상품 정보 수정' : '신규 상품 등록')}
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
                  <InputField label="사용 원두 (Coffee Bean)" name="variety" value={formData.variety} onChange={handleChange} placeholder="예: 아키미스트 다크 하우스 블렌드" />
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

              {(formData.category === 'beverage' || formData.category === 'coldbrew' || formData.category === 'dripbag' || formData.category === 'bean') && (
                <div className="flex flex-col justify-end">
                  <InputField 
                    label={
                      formData.category === 'beverage' ? "사이즈 (Size)" : 
                      formData.category === 'dripbag' ? "수량 (Quantity)" : 
                      formData.category === 'bean' ? "중량 (Weight)" : 
                      "중량/수량"
                    } 
                    name="size" 
                    value={formData.size} 
                    onChange={handleChange} 
                    placeholder={
                      formData.category === 'beverage' ? "예: 16oz" : 
                      formData.category === 'bean' ? "예: 200g, 500g" :
                      formData.category === 'coldbrew' ? "예: 500ml" : "예: 10개"
                    } 
                  />
                </div>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag') && (
                <>
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

              {formData.recommended && (
                <div className="md:col-span-2 lg:col-span-1">
                  <InputField label="노출 순서 (낮을수록 먼저)" name="order" value={formData.order} onChange={handleChange} placeholder="예: 1, 2, 3" type="number" />
                </div>
              )}

              <div className="md:col-span-2 lg:col-span-1">
                <InputField label="네이버 스마트 스토어 URL (선택)" name="storeUrl" value={formData.storeUrl} onChange={handleChange} placeholder="https://smartstore.naver.com/..." />
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
                <div className={`md:col-span-2 lg:col-span-1 grid grid-cols-1 ${formData.category === 'bean' ? 'md:grid-cols-2' : ''} gap-4`}>
                  <InputField label="로스팅/제조 날짜" name="roastDate" value={formData.roastDate} onChange={handleChange} placeholder="예: 2024.03.21" />
                  {formData.category === 'bean' && (
                    <InputField label="에이징 (로스팅 후 며칠)" name="agingDays" value={formData.agingDays} onChange={handleChange} type="number" placeholder="예: 7" />
                  )}
                </div>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag' || formData.category === 'coldbrew' || (formData.category === 'beverage' && formData.subCategory === 'handdrip')) && (
                <>
                  <div className="md:col-span-2 lg:col-span-1 bg-[#0b0c0b] border border-gray-800 p-4 rounded-xl flex flex-col justify-center">
                    <label className="text-[10px] font-black text-copper uppercase tracking-widest mb-3">블렌드 여부</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="beanType" value="single" checked={formData.beanType === 'single' || !formData.beanType} onChange={handleChange} className="text-copper focus:ring-copper bg-black border-gray-700" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">싱글 오리진</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="beanType" value="blend" checked={formData.beanType === 'blend'} onChange={handleChange} className="text-copper focus:ring-copper bg-black border-gray-700" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">블렌드</span>
                      </label>
                    </div>
                  </div>
                  <InputField label="국가" name="country" value={formData.country} onChange={handleChange} placeholder="예: 파나마" />
                  <InputField label="생산 지역" name="region" value={formData.region} onChange={handleChange} placeholder="예: 보케테" />
                  <InputField label="농장 (Farm)" name="farm" value={formData.farm} onChange={handleChange} placeholder="예: 엘리다 농장" />
                  <InputField label="마이크로랏 (Micro-lot)" name="micromill" value={formData.micromill} onChange={handleChange} placeholder="예: 엘리다 랏" />
                  <InputField label="재배 고도" name="altitude" value={formData.altitude} onChange={handleChange} placeholder="예: 1,800m" />
                  {formData.beanType === 'blend' ? (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-copper/5 p-6 rounded-2xl border border-copper/10 my-4">
                       <p className="col-span-1 md:col-span-2 lg:col-span-4 text-[10px] font-black text-copper uppercase tracking-[0.2em] mb-2 border-b border-copper/10 pb-2">블렌딩 구성 및 비율 (%)</p>
                       {[1, 2, 3, 4].map(num => (
                         <div key={num} className="flex flex-col gap-2 bg-black/20 p-3 rounded-xl border border-white/5">
                           <InputField label={`품종 ${num}`} name={`blend${num}`} value={formData[`blend${num}`]} onChange={handleChange} placeholder="예: 브라질" />
                           <InputField label="비율 (%)" name={`ratio${num}`} value={formData[`ratio${num}`]} onChange={handleChange} placeholder="50" type="number" />
                         </div>
                       ))}
                    </div>
                  ) : (
                    <InputField label="품종" name="variety" value={formData.variety} onChange={handleChange} placeholder="예: 게이샤" />
                  )}
                  <InputField label="가공방식" name="process" value={formData.process} onChange={handleChange} placeholder="예: 워시드" />
                  {formData.category !== 'beverage' && (
                    <InputField label="로스팅 소요 시간" name="roastTime" value={formData.roastTime} onChange={handleChange} placeholder="예: 9분 15초" />
                  )}
                </>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag' || formData.category === 'coldbrew') && (
                <div className="md:col-span-2 lg:col-span-3 space-y-6 bg-[#0b0c0b]/50 p-6 rounded-2xl border border-gray-800/50 mt-4 mb-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 pl-1 mb-1">
                      <input 
                        type="checkbox"
                        id="showBasicInfo"
                        checked={formData.showBasicInfo}
                        onChange={() => setFormData(prev => ({ ...prev, showBasicInfo: !prev.showBasicInfo }))}
                        className="w-4 h-4 rounded border-gray-700 bg-black text-copper focus:ring-copper"
                      />
                      <label htmlFor="showBasicInfo" className="text-[10px] font-black text-copper/60 uppercase tracking-widest cursor-pointer hover:text-copper transition-colors">생두 기본 정보 (상세 페이지 노출)</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField label="생두 정식 명칭" name="greenBeanName" value={formData.greenBeanName} onChange={handleChange} placeholder="예: Ethiopia Sidamo Hamela G1 Natural" />
                      <InputField label="수입사" name="importer" value={formData.importer} onChange={handleChange} placeholder="예: 그린비알" />
                      <InputField label="SCA 점수" name="scaScore" value={formData.scaScore} onChange={handleChange} placeholder="예: 88.5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gray-800/50 pt-6">
                    <div className="flex items-center gap-3 pl-1 mb-1">
                      <input 
                        type="checkbox"
                        id="showAnalysisInfo"
                        checked={formData.showAnalysisInfo}
                        onChange={() => setFormData(prev => ({ ...prev, showAnalysisInfo: !prev.showAnalysisInfo }))}
                        className="w-4 h-4 rounded border-gray-700 bg-black text-copper focus:ring-copper"
                      />
                      <label htmlFor="showAnalysisInfo" className="text-[10px] font-black text-copper/60 uppercase tracking-widest cursor-pointer hover:text-copper transition-colors">생두 분석 (상세 페이지 노출)</label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <InputField label="수분율 (%)" name="moisture" value={formData.moisture} onChange={handleChange} placeholder="11.2" type="number" step="0.1" />
                      <InputField label="밀도 (g/L)" name="density" value={formData.density} onChange={handleChange} placeholder="840" type="number" />
                      <InputField label="수분 활성도 (aw)" name="aw" value={formData.aw} onChange={handleChange} placeholder="0.58" type="number" step="0.01" />
                      <InputField label="수확 연도 (Crop)" name="cropYear" value={formData.cropYear} onChange={handleChange} placeholder="2023/24" />
                    </div>
                  </div>
                </div>
              )}

              {(formData.category === 'bean' || formData.category === 'dripbag' || formData.category === 'coldbrew') && (
                <div className={`md:col-span-2 lg:col-span-3 grid grid-cols-1 ${formData.category === 'bean' ? 'md:grid-cols-2' : ''} gap-6 bg-[#0b0c0b]/50 p-6 rounded-2xl border border-gray-800/50 mt-4 mb-4`}>
                  {formData.category === 'bean' && (
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[10px] font-black text-copper/60 uppercase tracking-widest pl-1 mb-1">홀빈 분석</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <InputField 
                          label="아그트론 (홀빈)" 
                          name="agtronWb" 
                          value={formData.agtronWb} 
                          onChange={handleChange} 
                          placeholder="70.0" 
                          type="number"
                          step="0.1"
                        />
                        <InputField 
                          label="SCA 포인트 (홀빈)" 
                          name="roastPointWb" 
                          value={formData.roastPointWb} 
                          onChange={handleChange} 
                          placeholder="자동 계산" 
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black text-copper/60 uppercase tracking-widest pl-1 mb-1">분쇄 분석</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField 
                        label="아그트론 (분쇄)" 
                        name="agtronGround" 
                        value={formData.agtronGround} 
                        onChange={handleChange} 
                        placeholder="65.0" 
                        type="number"
                        step="0.1"
                      />
                      <InputField 
                        label="SCA 포인트 (분쇄)" 
                        name="roastPointGround" 
                        value={formData.roastPointGround} 
                        onChange={handleChange} 
                        placeholder="자동 계산" 
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="lg:col-span-3">
                { (formData.category !== 'beverage' || formData.subCategory === 'handdrip') && (
                  <div className="bg-[#0b0c0b] border border-gray-800 p-6 rounded-2xl">
                    <div 
                      className="flex justify-between items-center cursor-pointer group mb-1" 
                      onClick={() => setIsCupNoteExpanded(!isCupNoteExpanded)}
                    >
                      <label className="block text-[11px] font-black text-copper uppercase tracking-widest cursor-pointer group-hover:text-yellow-500 transition-colors">컵 노트 선택 (Multi-select)</label>
                      <button type="button" className="text-xs font-bold text-gray-500 group-hover:text-copper transition-colors">
                        {isCupNoteExpanded ? '▲ 접기' : '▼ 펼치기'}
                      </button>
                    </div>
                    
                    {isCupNoteExpanded && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                        {FLAVOR_CATEGORIES.map((cat, catIdx) => (
                          <div key={catIdx} className="space-y-3">
                            <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">{cat.label}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {cat.items.map((item, itemIdx) => {
                                const isSelected = formData.cupNotes.split(/[,/|]+/).map(n => n.trim()).includes(item);
                                return (
                                  <button
                                    key={itemIdx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCupNoteToggle(item);
                                    }}
                                    className={`px-3 py-2 rounded-lg text-[10px] font-bold text-left transition-all border ${
                                      isSelected 
                                        ? 'bg-copper/20 border-copper text-copper shadow-[0_0_15px_rgba(161,118,76,0.2)]' 
                                        : 'bg-black/40 border-gray-800 text-gray-500 hover:border-gray-600'
                                    }`}
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`mt-4 pt-4 border-t border-gray-800 transition-all ${!isCupNoteExpanded ? 'mt-2 pt-2 border-t-0' : ''}`}>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">선택된 컵 노트:</p>
                      <p className="text-copper font-bold text-sm leading-relaxed">{formData.cupNotes || '선택된 항목이 없습니다.'}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 lg:col-span-3 pb-6 border-b border-gray-800">
                <h4 className="text-[10px] font-black text-copper/60 uppercase tracking-[0.3em] pl-1 mb-6 flex items-center gap-4">
                  센서리 분석
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  <RatingSlider label="플레이버 (Flavor)" name="flavor" value={formData.flavor} onChange={handleChange} />
                  <RatingSlider label="애프터 (Aftertaste)" name="aftertaste" value={formData.aftertaste} onChange={handleChange} />
                  <RatingSlider label="단맛 (Sweetness)" name="sweetness" value={formData.sweetness} onChange={handleChange} />
                  <RatingSlider label="산미 (Acidity)" name="acidityRate" value={formData.acidityRate} onChange={handleChange} />
                  <RatingSlider label="바디 (Body)" name="bodyRate" value={formData.bodyRate} onChange={handleChange} />
                  <RatingSlider label="밸런스 (Balance)" name="balance" value={formData.balance} onChange={handleChange} />
                </div>
              </div>


              {(formData.category === 'bean' || formData.category === 'dripbag') && (
                <div className="md:col-span-2 lg:col-span-3 space-y-12 mt-8 border-t border-gray-800 pt-10">
                  <h4 className="text-sm font-black text-copper uppercase tracking-[0.3em] flex items-center gap-4">
                    추출 레시피 설정
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                  </h4>

                  {/* HOT Recipe */}
                  <div className="bg-[#0b0c0b] border border-gray-800 p-8 rounded-[2rem] shadow-xl space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                       <h5 className="text-xs font-black text-white uppercase tracking-widest">HOT 레시피</h5>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                      <InputField label="원두량" name="hot_coffee_amount" value={formData.hot_coffee_amount} onChange={handleChange} placeholder="예: 20g" />
                      <InputField label="분쇄도" name="hot_grind" value={formData.hot_grind} onChange={handleChange} placeholder="예: 25 clicks" />
                      <InputField label="물 온도" name="hot_temp" value={formData.hot_temp} onChange={handleChange} placeholder="예: 94°C" />
                      <div className="w-full">
                        <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wider uppercase">추출 비율</label>
                        <div className="flex items-center gap-3">
                          <div className="flex-grow flex items-center bg-[#0b0c0b] border border-gray-700/60 rounded-lg px-4 transition-colors focus-within:border-copper">
                            <span className="text-gray-500 text-xs font-bold mr-2 whitespace-nowrap">1 :</span>
                            <input 
                              name="hot_ratio" 
                              value={String(formData.hot_ratio || '').replace('1:', '')} 
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9.]/g, '');
                                handleChange({ target: { name: 'hot_ratio', value: val } });
                              }} 
                              className="w-full bg-transparent border-none py-3 text-gray-200 focus:outline-none placeholder:text-gray-700"
                              placeholder="15"
                            />
                          </div>
                          <span className="text-copper font-serif font-black text-xs whitespace-nowrap">
                            ({Math.round((parseFloat(String(formData.hot_coffee_amount || '0').replace(/[^0-9.]/g, '')) || 0) * (parseFloat(formData.hot_ratio) || 0))}g)
                          </span>
                        </div>
                      </div>
                      <InputField label="추천 드리퍼" name="hot_dripper" value={formData.hot_dripper} onChange={handleChange} placeholder="예: Hario V60" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">뜸 (Bloom)</p>
                        <InputField label="시간 (초)" name="hot_bloom_time" value={formData.hot_bloom_time} onChange={handleChange} placeholder="30" type="number" />
                        <InputField label="물량 (g)" name="hot_bloom_water" value={formData.hot_bloom_water} onChange={handleChange} placeholder="40" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">1차 푸어</p>
                        <InputField label="시간 (초)" name="hot_p1_time" value={formData.hot_p1_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="hot_p1_water" value={formData.hot_p1_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">2차 푸어</p>
                        <InputField label="시간 (초)" name="hot_p2_time" value={formData.hot_p2_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="hot_p2_water" value={formData.hot_p2_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">3차 푸어</p>
                        <InputField label="시간 (초)" name="hot_p3_time" value={formData.hot_p3_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="hot_p3_water" value={formData.hot_p3_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">4차 푸어</p>
                        <InputField label="시간 (초)" name="hot_p4_time" value={formData.hot_p4_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="hot_p4_water" value={formData.hot_p4_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">예상 최종 추출량 (HOT)</span>
                      <span className="text-xl font-serif font-black text-copper">
                        {(Number(formData.hot_bloom_water || 0) + Number(formData.hot_p1_water || 0) + Number(formData.hot_p2_water || 0) + Number(formData.hot_p3_water || 0) + Number(formData.hot_p4_water || 0))} g
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-2 tracking-wider uppercase">HOT 레시피 추가 코멘트</label>
                      <div className="bg-[#0b0c0b] border border-gray-700/60 rounded-xl overflow-hidden min-h-[150px]">
                        <ReactQuill 
                          theme="snow" 
                          value={formData.hot_comment} 
                          onChange={(content) => setFormData(prev => ({ ...prev, hot_comment: content }))}
                          modules={quillModules}
                          style={{ height: '100px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ICE Recipe */}
                  <div className="bg-[#0b0c0b] border border-gray-800 p-8 rounded-[2rem] shadow-xl space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                       <h5 className="text-xs font-black text-white uppercase tracking-widest">ICE 레시피</h5>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                      <InputField label="원두량" name="ice_coffee_amount" value={formData.ice_coffee_amount} onChange={handleChange} placeholder="예: 20g" />
                      <InputField label="분쇄도" name="ice_grind" value={formData.ice_grind} onChange={handleChange} placeholder="예: 22 clicks" />
                      <InputField label="물 온도" name="ice_temp" value={formData.ice_temp} onChange={handleChange} placeholder="예: 92°C" />
                      <div className="w-full">
                        <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wider uppercase">추출 비율</label>
                        <div className="flex items-center gap-3">
                          <div className="flex-grow flex items-center bg-[#0b0c0b] border border-gray-700/60 rounded-lg px-4 transition-colors focus-within:border-copper">
                            <span className="text-gray-500 text-xs font-bold mr-2 whitespace-nowrap">1 :</span>
                            <input 
                              name="ice_ratio" 
                              value={String(formData.ice_ratio || '').replace('1:', '')} 
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9.]/g, '');
                                handleChange({ target: { name: 'ice_ratio', value: val } });
                              }} 
                              className="w-full bg-transparent border-none py-3 text-gray-200 focus:outline-none placeholder:text-gray-700"
                              placeholder="12"
                            />
                          </div>
                          <span className="text-copper font-serif font-black text-xs whitespace-nowrap">
                            ({Math.round((parseFloat(String(formData.ice_coffee_amount || '0').replace(/[^0-9.]/g, '')) || 0) * (parseFloat(formData.ice_ratio) || 0))}g)
                          </span>
                        </div>
                      </div>
                      <InputField label="추천 드리퍼" name="ice_dripper" value={formData.ice_dripper} onChange={handleChange} placeholder="예: Hario V60" />
                      <InputField label="얼음 중량 (g)" name="ice_weight" value={formData.ice_weight} onChange={handleChange} placeholder="120" type="number" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">뜸 (Bloom)</p>
                        <InputField label="시간 (초)" name="ice_bloom_time" value={formData.ice_bloom_time} onChange={handleChange} placeholder="30" type="number" />
                        <InputField label="물량 (g)" name="ice_bloom_water" value={formData.ice_bloom_water} onChange={handleChange} placeholder="40" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">1차 푸어</p>
                        <InputField label="시간 (초)" name="ice_p1_time" value={formData.ice_p1_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="ice_p1_water" value={formData.ice_p1_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">2차 푸어</p>
                        <InputField label="시간 (초)" name="ice_p2_time" value={formData.ice_p2_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="ice_p2_water" value={formData.ice_p2_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">3차 푸어</p>
                        <InputField label="시간 (초)" name="ice_p3_time" value={formData.ice_p3_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="ice_p3_water" value={formData.ice_p3_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">4차 푸어</p>
                        <InputField label="시간 (초)" name="ice_p4_time" value={formData.ice_p4_time} onChange={handleChange} placeholder="60" type="number" />
                        <InputField label="물량 (g)" name="ice_p4_water" value={formData.ice_p4_water} onChange={handleChange} placeholder="60" type="number" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">예상 최종 추출량 (ICE)</span>
                      <span className="text-xl font-serif font-black text-copper">
                        {(Number(formData.ice_bloom_water || 0) + Number(formData.ice_p1_water || 0) + Number(formData.ice_p2_water || 0) + Number(formData.ice_p3_water || 0) + Number(formData.ice_p4_water || 0))} g
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-2 tracking-wider uppercase">ICE 레시피 추가 코멘트</label>
                      <div className="bg-[#0b0c0b] border border-gray-700/60 rounded-xl overflow-hidden min-h-[150px]">
                        <ReactQuill 
                          theme="snow" 
                          value={formData.ice_comment} 
                          onChange={(content) => setFormData(prev => ({ ...prev, ice_comment: content }))}
                          modules={quillModules}
                          style={{ height: '100px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-8 pt-4 border-t border-gray-800">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-copper tracking-widest mb-3 uppercase">생두 상세 정보 / 상품 스토리 (HTML Editor)</label>
                <div className="bg-[#0b0c0b] border border-gray-700/60 rounded-xl overflow-hidden min-h-[400px]">
                  <style>{`
                    .quill { height: 350px; display: flex; flex-direction: column; }
                    .ql-container { flex-grow: 1; font-family: 'Pretendard', sans-serif; font-size: 14px; background: #0b0c0b; color: #e5e7eb; border: none !important; }
                    .ql-toolbar { background: #1a1c1a; border: none !important; border-bottom: 1px solid #2d2f2d !important; }
                    .ql-editor { min-height: 300px; padding: 20px; }
                    .ql-snow.ql-toolbar button { stroke: #9ca3af; fill: #9ca3af; }
                    .ql-snow.ql-toolbar button:hover, .ql-snow.ql-toolbar button.ql-active { color: #A1764C !important; }
                    .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #A1764C !important; }
                    .ql-snow.ql-toolbar .ql-picker { color: #9ca3af; }
                    .ql-align-center { text-align: center !important; }
                    .ql-align-right { text-align: right !important; }
                    .ql-align-justify { text-align: justify !important; }
                    .ql-align-center img { display: block; margin-left: auto !important; margin-right: auto !important; }
                    .ql-align-right img { display: block; margin-left: auto !important; margin-right: 0 !important; }
                    .ql-editor img { max-width: 100%; height: auto; border-radius: 12px; margin: 1rem 0; }
                  `}</style>
                  <ReactQuill 
                    theme="snow" 
                    value={formData.recipe} 
                    onChange={(content) => setFormData(prev => ({ ...prev, recipe: content }))}
                    modules={quillModules}
                  />
                </div>
              </div>
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

            <div className="flex gap-2">
              <button 
                onClick={handleDownloadAllQRs} 
                className="flex items-center justify-center gap-2 bg-indigo-600 border border-indigo-500 text-white px-5 py-2 rounded-xl hover:bg-indigo-500 transition-all font-bold tracking-widest text-[10px] uppercase shadow-lg shadow-indigo-500/20 active:scale-95"
                title="현재 표시된 모든 품목의 QR 코드를 다운로드합니다"
              >
                <QrCode size={14} />
                전체 QR 다운로드
              </button>
              <button 
                onClick={() => { resetForm(); setActiveTab('register'); }}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-copper to-yellow-600 text-[#111] px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(161,118,76,0.3)] transition-all duration-300 font-bold tracking-widest text-xs uppercase"
              >
                <span className="text-lg">＋</span>
                신규 상품 등록하기
              </button>
            </div>
          </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-10 text-center">순서</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">이미지 / 종류</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">상품명</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">가공 / 로스팅</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredBeans.length === 0 ? (
                    <tr><td colSpan="5" className="py-12 text-center text-gray-600 italic">표시할 품목이 없습니다.</td></tr>
                  ) : (
                    filteredBeans.map((item, index) => {
                      const formattedPrice = item.category === 'beverage' 
                        ? (Number(item.price) / 1000).toFixed(1)
                        : (Number(item.price) || 0).toLocaleString();
                      
                      return (
                        <tr 
                          key={item.id} 
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className={`hover:bg-white/[0.02] transition-colors group cursor-move ${!item.visible ? 'opacity-50' : ''} ${draggedIndex === index ? 'opacity-20 border-2 border-copper/50 border-dashed rounded-xl' : ''}`}
                        >
                          <td className="py-5 px-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <GripIcon />
                              <span className="text-[9px] font-black text-gray-600 tabular-nums">#{item.order || index + 1}</span>
                            </div>
                          </td>
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
                            <a 
                              href={`#product/${item.id}`}
                              className="font-bold text-gray-200 hover:text-copper transition-colors hover:underline underline-offset-4 block"
                              title="상품 상세 페이지 보기"
                            >
                              {item.name}
                            </a>
                            <div className="flex gap-2 items-center mt-1">
                              <span className={`text-[10px] ${item.visible ? 'text-gray-500' : 'text-red-900'}`}>{item.visible ? '공개됨' : '숨김'}</span>
                              {item.recommended && (
                                <span className="bg-copper/10 text-copper text-[8px] font-bold px-1.5 py-0.5 rounded border border-copper/20 uppercase tracking-tighter">추천 상품</span>
                              )}
                              <span className="text-copper font-serif font-black text-[13px] tracking-tight">{formattedPrice}</span>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-xs text-gray-400">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-gray-200 font-bold">{item.process || '-'}</span>
                              <span className="text-[10px] opacity-60 tabular-nums">{item.roastDate || '날짜 미지정'}</span>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-right">
                            <div className="flex justify-end gap-1">
                              <div className="hidden">
                                <QRCodeCanvas 
                                  id={`qr-hidden-${item.id}`}
                                  value={`${window.location.origin}${window.location.pathname}#product/${item.id}`}
                                  size={512}
                                  level={"H"}
                                  includeMargin={true}
                                />
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDownloadQR(item); }} 
                                className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 active:scale-95" 
                                title="QR 코드 다운로드"
                              >
                                <QrCode size={12} />
                                QR
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleToggleRecommended(item.id); }} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${item.recommended ? 'bg-copper text-black' : 'bg-gray-800 text-gray-500 hover:text-white'}`}>{item.recommended ? '추천됨' : '추천하기'}</button>
                              <button onClick={(e) => { e.stopPropagation(); handleToggleVisibility(item.id); }} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${item.visible ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-copper/40 text-white hover:bg-copper'}`}>{item.visible ? '숨기기' : '보이기'}</button>
                              <button onClick={(e) => { e.stopPropagation(); handleEdit(item); }} className="bg-blue-900/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">수정</button>
                              <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-gray-600 hover:text-red-500 px-2 py-1.5 transition-colors"><TrashIcon /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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

const RatingSlider = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-center px-1">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-[14px] font-black text-copper tabular-nums">{value} / 5</span>
    </div>
    <div className="relative h-6 flex items-center">
      <input 
        type="range" 
        name={name} 
        min="0" 
        max="5" 
        step="0.5"
        value={value || 0} 
        onChange={onChange}
        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-copper transition-all hover:bg-gray-700"
      />
    </div>
  </div>
);

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
    <input type={type} name={name} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} className="w-full bg-[#0b0c0b] border border-gray-700/60 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-copper focus:bg-[#111] transition-colors placeholder:text-gray-600 shadow-inner" />
  </div>
);

const GripIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-copper transition-colors cursor-grab active:cursor-grabbing">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export default Admin;
