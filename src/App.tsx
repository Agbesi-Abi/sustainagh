
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import AuthModal from './components/AuthModal';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean, type: 'login' | 'signup' }>({ isOpen: false, type: 'login' });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  useEffect(() => {
    const saved = localStorage.getItem('sustaina_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sustaina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

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
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openAuth = (type: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, type });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fdfdfd] selection:bg-sustaina-green selection:text-white">
        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 text-center animate-in fade-in slide-in-from-top duration-500 sticky top-0 z-[60]">
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

        <footer className="bg-stone-900 pt-20 pb-10 text-stone-400">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4 space-y-6">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-leaf text-sustaina-yellow text-2xl"></i>
                  <span className="text-2xl font-black text-white tracking-tighter">Sustaina</span>
                </div>
                <p className="text-sm leading-relaxed max-w-sm">
                  Connecting conscious consumers with Ghanaian soil. We bridge the gap between smallholder farms and your kitchen table.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition-colors text-white">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition-colors text-white">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition-colors text-white">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Market</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/shop" className="hover:text-white transition-colors">Our Produce</Link></li>
                  <li><Link to="/deals" className="hover:text-white transition-colors">Surplus Deals</Link></li>
                  <li><Link to="/recipes" className="hover:text-white transition-colors">Harvest Recipes</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Farmer Stories</Link></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Delivery FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Impact Report</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>

              <div className="md:col-span-4 space-y-6">
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Join the Harvest</h4>
                <p className="text-sm">Get seasonal recipes and first access to surplus deals in your inbox.</p>
                <div className="flex">
                  <input type="email" placeholder="you@example.com" className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 flex-1 focus:outline-none focus:ring-1 focus:ring-sustaina-yellow text-white text-sm" />
                  <button className="bg-sustaina-yellow text-stone-900 px-6 rounded-r-xl font-bold hover:bg-white transition-all text-sm">Join</button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-10 text-center text-xs font-bold uppercase tracking-widest opacity-40">
              <p>© 2024 Sustaina Ghana. Farm to Door — Fresh Always.</p>
            </div>
          </div>
        </footer>

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

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-24 right-6 w-12 h-12 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-lg transition-all z-40 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
          <i className="fa-solid fa-arrow-up text-stone-400"></i>
        </button>
      </div>
    </Router>
  );
};

export default App;
