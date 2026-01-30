import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Recipes from './pages/Recipes';
import Deals from './pages/Deals';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import UserOrders from './pages/UserOrders';
import NotFound from './pages/NotFound';
import { CartItem, Product } from './types';
import { auth } from './lib/firebase';
import * as firebaseAuthExports from 'firebase/auth';

const { onAuthStateChanged, signOut } = firebaseAuthExports as any;

/* ================= SAFARI-SAFE SCROLL ================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [mounted, setMounted] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'signup' }>({
    isOpen: false,
    type: 'login',
  });

  /* ================= SAFARI BODY SAFETY ================= */
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  /* ================= DELAY HEAVY OVERLAYS ================= */
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  /* ================= ONLINE / OFFLINE ================= */
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      if (currentUser) {
        const idTokenResult = await currentUser.getIdTokenResult();
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  /* ================= CART STORAGE ================= */
  useEffect(() => {
    const saved = localStorage.getItem('sustaina_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        console.error('Failed to load cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sustaina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /* ================= CART ACTIONS ================= */
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const openAuth = (type: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, type });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-[100dvh] bg-white selection:bg-sustaina-green selection:text-white">
        {/* ================= OFFLINE BANNER (NO ANIMATION) ================= */}
        {isOffline && (
          <div className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 text-center sticky top-0 z-[60]">
            <i className="fa-solid fa-cloud-showers-heavy mr-2"></i>
            You are currently offline. Browsing cached harvest.
          </div>
        )}

        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={openAuth}
          user={user}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Products onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout items={cartItems} clearCart={clearCart} user={user} />} />
            <Route path="/recipes" element={<Recipes onAddToCart={addToCart} />} />
            <Route path="/deals" element={<Deals onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <NotFound />} />
            <Route path="/orders" element={<UserOrders user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />

        {/* ================= DELAYED OVERLAYS ================= */}
        {mounted && (
          <>
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />

            <AuthModal
              isOpen={authModal.isOpen}
              onClose={() => setAuthModal({ ...authModal, isOpen: false })}
              type={authModal.type}
            />

            <ChatAssistant />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;