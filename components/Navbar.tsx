
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Fix: Use any for user to resolve missing member error in firebase/auth types

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (type: 'login' | 'signup') => void;
  user: any | null;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAuth, user, onLogout }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-100 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center h-20 gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <i className="fa-solid fa-leaf text-sustaina-green text-2xl"></i>
          <span className="text-2xl font-bold tracking-tight text-sustaina-green">Sustaina</span>
        </Link>

        {/* Search Bar */}
        <form className="flex-1 hidden md:block" onSubmit={handleSearch}>
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"></i>
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for yam, shito, tilapia..."
              className="w-full bg-stone-50 border border-stone-100 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sustaina-green/10 transition-all"
            />
          </div>
        </form>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm font-medium text-stone-600">
          <Link to="/shop" className="hover:text-sustaina-green transition-colors">Shop</Link>
          <Link to="/deals" className="hover:text-sustaina-green transition-colors">Deals</Link>
          <Link to="/recipes" className="hover:text-sustaina-green transition-colors">Recipes</Link>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-100 hover:bg-stone-100 transition-all"
              >
                <div className="w-6 h-6 bg-sustaina-yellow rounded-full flex items-center justify-center text-[10px] font-bold text-stone-800">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline text-stone-800 font-bold">{user.displayName || 'Account'}</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showUserMenu ? 'rotate-180' : ''}`}></i>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 p-2 z-[60] animate-in fade-in slide-in-from-top-2">
                  <Link 
                    to="/orders" 
                    onClick={() => setShowUserMenu(false)}
                    className="block w-full text-left px-4 py-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <hr className="my-2 border-stone-100" />
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors font-bold"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button onClick={() => onOpenAuth('login')} className="hidden sm:inline-block px-4 py-2 text-stone-800 font-semibold border border-stone-200 rounded-lg hover:bg-stone-50 transition-all">Log In</button>
              <button onClick={() => onOpenAuth('signup')} className="px-4 py-2 bg-sustaina-green text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md shadow-sustaina-green/10">Sign Up</button>
            </div>
          )}
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-stone-800 hover:text-sustaina-green transition-colors"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-sustaina-yellow rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;