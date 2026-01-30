import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
            <img
              src="/Sustaina Logo@18x.png"
              alt="Sustaina logo"
              className="h-14 mb-6"
            />

            <p className="text-sm leading-relaxed">
              Connecting conscious consumers with Ghanaian soil.
              We bridge the gap between smallholder farms and your kitchen table.
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition text-white"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition text-white"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sustaina-green transition text-white"
                aria-label="X"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4 text-center lg:text-left">
              Join the Harvest
            </h4>

            <p className="text-sm mb-6 text-center lg:text-left">
              Seasonal recipes and first access to surplus deals — straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sustaina-yellow"
              />

              <button
                type="submit"
                className="bg-sustaina-yellow text-stone-900 font-bold px-6 py-3 rounded-xl hover:bg-white transition text-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs uppercase tracking-widest opacity-40">
          © 2024 Sustaina Ghana · Farm to Door · Fresh Always
        </div>
      </div>
    </footer>
  );
};

export default Footer;
