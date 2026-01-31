import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  cartCount: number
  onOpenCart: () => void
  onOpenAuth: (type: 'login' | 'signup') => void
  user: any | null
  onLogout: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  onLogout
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue.trim()) return
    navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`)
    setSearchValue('')
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-stone-100">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/Sustaina Logo@18x.png"
            alt="Sustaina Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-extrabold tracking-tight text-sustaina-green">
            Sustaina
          </span>
        </Link>

        {/* SEARCH (DESKTOP) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl"
        >
          <div className="relative w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search fresh groceries…"
              className="w-full rounded-full bg-stone-50 border border-stone-200 py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sustaina-green/20"
            />
          </div>
        </form>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* CART */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-stone-100 transition"
          >
            <i className="fa-solid fa-cart-shopping text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sustaina-yellow text-[10px] font-bold text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* USER */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(v => !v)}
                className="flex items-center gap-2 rounded-full border border-stone-200 px-2 py-1.5 hover:bg-stone-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-sustaina-yellow text-stone-800 flex items-center justify-center text-xs font-bold">
                  {(user.displayName || user.email)?.charAt(0).toUpperCase()}
                </div>
                <i className="fa-solid fa-chevron-down text-[10px]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-white shadow-xl border border-stone-100 p-2">
                  <Link
                    to="/orders"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 rounded-lg text-sm hover:bg-stone-50"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 rounded-lg text-sm hover:bg-stone-50"
                  >
                    Admin Dashboard
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      onLogout()
                      setShowUserMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-rose-500 hover:bg-rose-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline text-sm font-semibold px-4 py-2 rounded-full border border-stone-200 hover:bg-stone-50"
              >
                Log in
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-sm font-semibold px-4 py-2 rounded-full bg-sustaina-green text-white hover:opacity-90 shadow"
              >
                Sign up
              </button>
            </>
          )}

          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-full hover:bg-stone-100"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>
        </div>
      </nav>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white border-t border-stone-100">
          <form onSubmit={handleSearch}>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search groceries…"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
            />
          </form>

          <div className="flex flex-col gap-3 font-medium text-stone-700">
            <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/deals" onClick={() => setMobileOpen(false)}>Deals</Link>
            <Link to="/recipes" onClick={() => setMobileOpen(false)}>Recipes</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
