import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('archemist_is_admin') === 'true');
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [lastScrollPos, setLastScrollPos] = useState(0);

  const loadProducts = async () => {
    // 1. First, quickly load from localStorage if available for instant UI response
    const localSaved = localStorage.getItem('archemist_beans');
    if (localSaved) {
      try {
        setProducts(JSON.parse(localSaved));
        setIsLoading(false); // Set to false so deep-links can work instantly
      } catch (e) {
        console.error('App: Failed to parse local storage cache:', e);
      }
    }

    // 2. Then proceed to fetch fresh data from server
    try {
      const response = await fetch(`/products.json?t=${Date.now()}`);
      if (response.ok) {
        const serverData = await response.json();
        setProducts(serverData);
        localStorage.setItem('archemist_beans', JSON.stringify(serverData));
      }
    } catch (error) {
      console.error('App: Failed to load products from server:', error);
      // Fallback is already handled by initial load from local storage
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    const handleUpdate = (e) => {
      if (e.detail) {
        setProducts(e.detail);
        localStorage.setItem('archemist_beans', JSON.stringify(e.detail));
        console.log('App: Products state updated via local data');
      } else {
        loadProducts();
      }
    };
    window.addEventListener('beansUpdated', handleUpdate);
    return () => window.removeEventListener('beansUpdated', handleUpdate);
  }, []);

  // Reset scroll on refresh/load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash;
      const oldHash = currentPath;
      
      // If navigating TO product detail center from something else, save scroll position
      if (newHash.startsWith('#product/') && !oldHash.startsWith('#product/')) {
        setLastScrollPos(window.scrollY);
        console.log('Saving scroll position:', window.scrollY);
      }
      
      setCurrentPath(newHash);
      
      // Handle back or home navigation
      if (newHash === '' || newHash === '#' || newHash === '#home') {
        // Only restore if we have a saved position AND we came from a product
        if (oldHash.startsWith('#product/')) {
          setTimeout(() => {
            window.scrollTo({ top: lastScrollPos, behavior: 'instant' });
            console.log('Restoring scroll position:', lastScrollPos);
          }, 0);
        } else {
          window.scrollTo(0, 0);
        }
      } else if (newHash === '#menu') {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [currentPath, lastScrollPos]);

  // Handle scrolling to specific sections (like #bean, #brand, etc.)
  useEffect(() => {
    if (currentPath && currentPath.length > 1 && !currentPath.startsWith('#product/') && currentPath !== '#admin' && currentPath !== '#menu') {
      const elementId = currentPath.substring(1);
      // Use a slightly longer timeout to ensure content is fully rendered
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPath]);

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
    setActiveSection('home');
    setEditingId(null);
    window.location.hash = '#home';
  };

  // Route: Admin
  if (currentPath === '#admin') {
    return <Admin isAdmin={isAdmin} setAdminAuth={handleAdminAuth} externalProducts={products} setProducts={setProducts} handleLogout={() => handleAdminAuth(false)} onEditTriggered={setEditingId} initialEditingId={editingId} clearEditingId={() => setEditingId(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-matte-black text-white selection:bg-copper font-sans overflow-x-hidden">
      <Header isAdmin={isAdmin} onAdminNav={() => setEditingId(null)} />
      
      <main className="flex-grow">
        {(() => {
          // Route: Subscribe
          if (currentPath === '#subscribe') {
            return <EmailSubscription />;
          }

          // Route: Product Detail
          if (currentPath.startsWith('#product/')) {
            const id = parseInt(currentPath.split('/')[1]);
            const sortedProducts = [...products].sort((a,b) => (Number(a.order) || 999) - (Number(b.order) || 999));
            const product = sortedProducts.find(p => String(p.id) === String(id));
            const archiveNumber = sortedProducts.findIndex(p => String(p.id) === String(id)) + 1;

            if (product) {
              return <ProductDetail product={product} onBack={handleBack} isAdmin={isAdmin} onEdit={handleEdit} archiveNumber={archiveNumber} />;
            } else if (!isLoading) {
              window.location.hash = '#home';
              return null;
            }
          }

          // Default: Home Page
          return (
            <>
              <Hero id="home" />
              <RecommendedBeans isAdmin={isAdmin} onEdit={handleEdit} products={products} />
              <Products products={products} isAdmin={isAdmin} onEdit={handleEdit} />
              <Events />
              <Brand />
              <Contact />
            </>
          );
        })()}
      </main>

      <Footer isAdmin={isAdmin} />
    </div>
  );
}

export default App;
