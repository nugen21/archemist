import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RecommendedBeans from './components/RecommendedBeans';
import Events from './components/Events';
import Brand from './components/Brand';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import Admin from './components/Admin';
import DrinkMenu from './components/DrinkMenu';
import EmailSubscription from './components/EmailSubscription';
import Products from './components/Products';
import DripBagGuide from './components/DripBagGuide';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('archemist_is_admin') === 'true');
  const [editingId, setEditingId] = useState(null);

  // Reset scroll on refresh/load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      if (key === 'archemist_beans') {
        process.env.NODE_ENV !== 'production' && console.log('DEBUG: localStorage.setItem for archemist_beans');
        // Actually log to production console for this final debug run
        console.count(`WRITES to archemist_beans:`);
      }
      originalSetItem.apply(this, arguments);
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(window.location.hash);
      // Auto-scroll to top when navigating to major pages or returning home
      if (window.location.hash === '' || window.location.hash === '#' || window.location.hash === '#home' || window.location.hash === '#menu') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleAdminAuth = (state) => {
    setIsAdmin(state);
    localStorage.setItem('archemist_is_admin', state ? 'true' : 'false');
  };

  const handleEdit = (id) => {
    setEditingId(id);
    window.location.hash = '#admin';
    setCurrentPath('#admin');
  };

  const handleBack = () => {
    window.location.hash = '#home';
    setCurrentPath('#home');
    window.scrollTo(0, 0);
  };

  // Route: Admin
  if (currentPath === '#admin') {
    return (
      <Admin 
        isAdmin={isAdmin} 
        setAdminAuth={handleAdminAuth} 
        initialEditingId={editingId} 
        clearEditingId={() => setEditingId(null)} 
      />
    );
  }

  // Route: Drink Menu
  if (currentPath === '#menu') {
    return <DrinkMenu onBack={handleBack} />;
  }

  // Route: Subscribe
  if (currentPath === '#subscribe') {
    return <EmailSubscription />;
  }

  // Route: Product Detail
  if (currentPath.startsWith('#product/')) {
    const id = parseInt(currentPath.split('/')[1]);
    const saved = JSON.parse(localStorage.getItem('archemist_beans') || '[]');
    const product = saved.find(p => p.id === id);
    if (product) {
      return <ProductDetail product={product} onBack={handleBack} isAdmin={isAdmin} onEdit={handleEdit} />;
    }
  }

  // Route: Drip Bag Guide
  if (currentPath === '#guide/dripbag') {
    return <DripBagGuide onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-matte-black text-white selection:bg-copper font-sans overflow-x-hidden">
      {/* Landing Page Content */}
      <main className="flex-grow">
        <Header isAdmin={isAdmin} />
        <Hero id="home" />
        <RecommendedBeans isAdmin={isAdmin} onEdit={handleEdit} />
        <Products />
        <Events />
        <Brand />
        <Contact />
      </main>

      {/* Global Footer with Admin Link */}
      <footer className="py-6 bg-[#0b0c0b] border-t border-gray-900 w-full mt-auto relative z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8">
           <div className="flex flex-col gap-1">
             <p className="text-gray-600 text-[10px] sm:text-xs">© 2026 Archemist Roasters. All rights reserved.</p>
             {isAdmin && (
               <p className="text-copper text-[9px] font-bold tracking-widest uppercase">Admin Session Active</p>
             )}
           </div>
           <div className="flex gap-6 items-center">
             {isAdmin && (
               <button 
                 onClick={() => handleAdminAuth(false)}
                 className="text-gray-600 hover:text-red-400 text-[10px] sm:text-xs tracking-widest font-bold uppercase transition-colors"
                >
                  Logout
                </button>
             )}
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
// Trigger Build Sat Mar 21 17:26:45 KST 2026
