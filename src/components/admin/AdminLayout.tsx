import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/admin/overview', label: 'Dashboard', icon: 'fa-chart-line' },
    { path: '/admin/products', label: 'Inventory', icon: 'fa-boxes-stacked' },
    { path: '/admin/orders', label: 'Orders', icon: 'fa-bag-shopping' },
  ];

  return (
    <div className="min-h-screen flex bg-stone-50">
      
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg rounded-tr-3xl rounded-br-3xl transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <div className=" flex items-center justify-center rounded-lg">
              <img
            src="/Sustaina Logo@18x.png"
            alt="Sustaina Logo"
            className="w-9 h-9 object-contain"
          />
            </div>
            <span className="ml-3 text-lg font-semibold text-stone-900">Sustaina</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition
                    ${active ? 'bg-emerald-100 text-emerald-700 font-semibold shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}
                  `}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center ${active ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span className="ml-3 text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer / Sync */}
          <div className="mt-auto pt-6">
            <div className="bg-stone-100 p-4 rounded-xl">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span>Sync Active</span>
                <span>85%</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className="lg:hidden w-full bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-lg">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <span className="font-semibold text-stone-900">Sustaina Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition"
        >
          <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
