'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Beranda', href: '#' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Portofolio', href: '#portofolio' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Efek Deteksi Scroll untuk Merubah Bentuk Navbar (Morphing)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        {/* CONTAINER UTAMA NAVBAR (MORPHING DOCK) */}
        <div
          className={`flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'max-w-4xl bg-[#050508]/70 backdrop-blur-xl border border-white/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] rounded-full px-6 py-2.5'
              : 'max-w-7xl bg-transparent px-4 py-2'
          }`}
        >
          {/* BRAND LOGO AREA */}
          <a href="#home" className="flex items-center gap-2.5 group cursor-pointer relative z-50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <Terminal size={18} className="text-white group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-tight text-base leading-none">DEV. LABS</span>
              <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest mt-1 group-hover:text-cyan-400 transition-colors">
                Integrator
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS WITH SLIDING HIGHLIGHT */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-full"
              >
                {/* Background Kapsul yang Mengikuti Kursor (Sliding Highlight) */}
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navbar-hover-bg"
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT SIDE: DESKTOP CTA BUTTON */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="group relative flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-bold text-xs md:text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-[0_8px_20px_-6px_rgba(255,255,255,0.3)]"
            >
              Hubungi Kami
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* BURGER BUTTON MOBILE (ANIMATED) */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 md:hidden relative z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between relative">
              <span className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-left ${isMobileOpen ? 'rotate-45 translate-x-[3px] -translate-y-[1px]' : ''}`} />
              <span className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 ${isMobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-left ${isMobileOpen ? '-rotate-45 translate-x-[3px] translate-y-[1px]' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU WITH PREMIUM STAGGER OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020202]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8"
          >
            {/* Grid background dekorasi halus di versi mobile */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="flex flex-col gap-5 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-block text-3xl font-black text-white tracking-tight hover:text-blue-400 transition-colors py-2 active:scale-95"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.08 }}
                className="mt-6 border-t border-white/10 pt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex justify-center items-center gap-3 w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-blue-500/10 active:scale-98 transition-all"
                >
                  Mulai Konsultasi
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}