import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Recipes from './pages/Recipes';
import Deals from './pages/Deals';
import About from './pages/About';
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import UserOrders from './pages/UserOrders';
import NotFound from './pages/NotFound';
import { CartItem, Product } from './types';
import { auth } from './lib/firebase';
import * as firebaseAuthExports from 'firebase/auth';
import { addUser, getUserById, getUsers, updateUser, deleteUser } from './lib/firestore';

const { onAuthStateChanged, signOut } = firebaseAuthExports as any;

/* ================= SAFARI-SAFE SCROLL ================= */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
  }, [pathname]);
  return null;
};

/* ================= CUSTOM HOOKS ================= */
const useOnlineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
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
  return isOffline;
};

const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);

      if (!currentUser) {
        setIsAdmin(false);
        return;
      }

      // Ensure user exists in Firestore
      let existingUser = await getUserById(currentUser.uid);
      if (!existingUser) {
        const users = await getUsers();
        const seeded = users.find(u => u.email === currentUser.email);

        if (seeded) {
          await updateUser(seeded.id, {
            name: currentUser.displayName || seeded.name,
            email: currentUser.email,
            role: seeded.role,
            createdAt: seeded.createdAt,
          });
          await deleteUser(seeded.id);
        } else {
          await addUser({
            name: currentUser.displayName || currentUser.email.split('@')[0],
            email: currentUser.email,
            role: 'user',
            createdAt: new Date(),
          });
        }

        existingUser = await getUserById(currentUser.uid);
      }

      const isAdminUser = existingUser?.role === 'admin' || currentUser.email === 'admin@sustaina.com';
      setIsAdmin(isAdminUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, isAdmin, logout };
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sustaina_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sustaina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, quantity: number) => setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { cartItems, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, cartCount };
};

/* ================= APP ================= */
const App: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const isOffline = useOnlineStatus();
  const [mounted, setMounted] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'signup' }>({ isOpen: false, type: 'login' });
  const { cartItems, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  useEffect(() => { document.body.style.overflowX = 'hidden'; }, []);
  useEffect(() => requestAnimationFrame(() => setMounted(true)), []);

  const openAuth = (type: 'login' | 'signup') => setAuthModal({ isOpen: true, type });

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-[100dvh] bg-white selection:bg-sustaina-green selection:text-white">

        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 text-center sticky top-0 z-[60]">
            <i className="fa-solid fa-cloud-showers-heavy mr-2"></i>
            You are currently offline. Browsing cached harvest.
          </div>
        )}

        {/* Routes */}
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            isAdmin ? (
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminOverview />} />
                  <Route path="/overview" element={<AdminOverview />} />
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/orders" element={<AdminOrders />} />
                </Routes>
              </AdminLayout>
            ) : <NotFound />
          } />

          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Navbar
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenAuth={openAuth}
                user={user}
                isAdmin={isAdmin}
                onLogout={logout}
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
                  <Route path="/orders" element={<UserOrders user={user} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>

        {/* Delayed overlays */}
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
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
