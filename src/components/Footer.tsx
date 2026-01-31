import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const navigation = {
    shop: ['All Products', 'Seasonal Picks', 'Farm Directory', 'Bulk Orders'],
    about: ['Our Story', 'Sustainability', 'Farm Partners', 'Careers'],
    support: ['Help Center', 'Delivery Info', 'Returns', 'Contact Us'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  }

  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/Sustaina Logo@18x.png"
                alt="Sustaina Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">Sustaina</h2>
                <p className="text-sm text-stone-400 mt-1">Fresh from Ghana's farms</p>
              </div>
            </div>
            
            <p className="text-stone-300 max-w-md leading-relaxed">
              Connecting Ghana's finest smallholder farms with your kitchen. 
              Sustainable, traceable, and always fresh.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Join our newsletter</h3>
              <form className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sustaina-green"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-sustaina-green text-stone-900 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Shop Column - Commented out as links are not ready */}
          {/*
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              {navigation.shop.map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-stone-300 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}

        

          {/* Support Column - Commented out as links are not ready */}
          {/*
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item}>
                  <Link
                    to="/support"
                    className="text-stone-300 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links - Commented out as links are not ready */}
          {/*
          <div className="flex items-center gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors group"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors group"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.032 2C6.478 2 2 6.478 2 12.032s4.478 10.032 10.032 10.032c1.74 0 3.426-.474 4.878-1.355l3.562 1.044-1.044-3.562c.881-1.452 1.355-3.138 1.355-4.878C22 6.478 17.522 2 12.032 2zm5.918 14.732c-.248.694-1.398 1.272-1.909 1.346-.511.074-1.12.074-1.793-.248-.385-.17-1.181-.511-2.27-1.048-2.136-1.198-3.51-3.497-3.616-3.654-.106-.157-.85-1.12-.85-2.137s.511-1.527.638-1.754c.127-.227.385-.355.638-.355.17 0 .341 0 .489.017.148.017.341-.085.553.723.212.807.723 2.788.787 2.988.064.2.106.426.021.66-.085.234-.148.361-.319.553-.17.191-.341.425-.489.553-.148.127-.3.276-.127.553.17.277.77 1.181 1.655 1.908 1.143.957 2.113 1.25 2.39 1.38.277.13.438.106.598-.064.16-.17.723-.807.915-1.086.192-.278.383-.234.638-.17.255.064 1.613.766 1.889.915.277.148.468.212.533.33.064.117.064.68-.184 1.375z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors group"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors group"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
          */}

          {/* Legal & Copyright */}
          <div className="text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-3">
              {navigation.legal.map((item) => (
                <Link 
                  key={item} 
                  to="/legal" 
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
            <p className="text-sm text-stone-500">
              © {currentYear} Sustaina. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer