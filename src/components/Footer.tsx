"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-dark text-white pt-20 pb-10 px-4 md:px-8 border-t border-brand-ash/20 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">VYANZO</h2>
            <p className="text-brand-ash/80 text-sm leading-relaxed max-w-xs font-sans font-normal">
              Premium casting solutions built for the world's most demanding infrastructure. Quality, service, and reliability with relentless consistency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-serif font-semibold tracking-widest text-brand-accent uppercase">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'Products', 'Services', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-brand-ash hover:text-white transition-colors text-sm font-sans font-normal">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-serif font-semibold tracking-widest text-brand-accent uppercase">Products</h3>
            <ul className="flex flex-col gap-3">
              {['Manhole Covers', 'Hydraulic Covers', 'Grates', 'Siphons', 'Surface Boxes'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-brand-ash hover:text-white transition-colors text-sm font-sans font-normal">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-serif font-semibold tracking-widest text-brand-accent uppercase">Stay Updated</h3>
            <p className="text-brand-ash/80 text-sm font-sans font-normal">
              Subscribe to our newsletter for the latest product updates and industry news.
            </p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2.5 w-full focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all text-sm font-sans font-normal text-white placeholder-brand-ash/50"
              />
              <button 
                type="submit"
                className="bg-brand-accent hover:opacity-90 text-bg-dark px-4 py-2.5 rounded-r-lg text-sm font-sans font-bold tracking-wider uppercase transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-ash/60 text-xs font-sans font-normal">
            &copy; {currentYear} Vyanzo. All rights reserved.
          </p>
          <div className="flex gap-6 text-brand-ash/60 text-xs font-sans font-normal">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
