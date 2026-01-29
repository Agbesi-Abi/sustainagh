import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (type: 'login' | 'signup') => void;
  user: any | null;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  isAdmin,
  onLogout,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
    setSearchValue('');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/Sustaina Logo@18x.png" alt="Sustaina Logo" className="w-8 h-8" />
            <span className="text-xl md:text-2xl font-bold text-sustaina-green">
              Sustaina
            </span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:block flex-1 max-w-xl mx-10"
          >
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for yam, shito, tilapia..."
                className="w-full bg-stone-50 border border-stone-100 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sustaina-green/10"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">

            <Link to="/shop" className="hover:text-sustaina-green">Shop</Link>
            <Link to="/deals" className="hover:text-sustaina-green">Deals</Link>
            <Link to="/recipes" className="hover:text-sustaina-green">Recipes</Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border"
                >
                  <div className="w-6 h-6 bg-sustaina-yellow rounded-full flex items-center justify-center text-[10px] font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                  <span className="font-bold text-stone-800">
                    {user.displayName || 'Account'}
                  </span>
                  <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border p-2">
                    <Link to="/orders" className="block px-4 py-2 hover:bg-stone-50 rounded-lg">
                      My Orders
                    </Link>

                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-stone-50 rounded-lg">
                        Admin Dashboard
                      </Link>
                    )}

                    <hr className="my-2" />

                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-lg font-bold"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 border rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 bg-sustaina-green text-white rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Cart */}
            <button onClick={onOpenCart} className="relative">
              <i className="fa-solid fa-cart-shopping text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-sustaina-yellow text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={onOpenCart} className="relative">
              <i className="fa-solid fa-cart-shopping text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-sustaina-yellow text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className="fa-solid fa-bars text-2xl" />
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-6 animate-in slide-in-from-top-2">

            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-stone-50 border rounded-lg px-4 py-3"
              />
            </form>

            <div className="flex flex-col gap-4 text-stone-700 font-medium">
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/deals" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
              <Link to="/recipes" onClick={() => setMobileMenuOpen(false)}>Recipes</Link>
            </div>

            {!user ? (
              <div className="flex gap-3">
                <button onClick={() => onOpenAuth('login')} className="flex-1 border rounded-lg py-2">
                  Log In
                </button>
                <button onClick={() => onOpenAuth('signup')} className="flex-1 bg-sustaina-green text-white rounded-lg py-2">
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={onLogout}
                className="w-full text-left text-rose-500 font-bold"
              >
                Log Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;