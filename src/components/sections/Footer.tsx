'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowUp, ArrowRight, Mail } from 'lucide-react';

const currentYear = new Date().getFullYear();

// Custom SVG Icons untuk menjamin 100% render tanpa error library
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = {
  navigasi: [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Portofolio', href: '#portofolio' },
    { name: 'FAQ', href: '#faq' },
  ],
  keahlian: [
    { name: 'Web 3D Immersive', href: '#services' },
    { name: 'Fullstack Integration', href: '#services' },
    { name: 'Logistics Automation', href: '#services' },
    { name: 'Cloud Infrastructure', href: '#services' },
  ],
  sosmed: [
    { name: 'GitHub', href: 'https://github.com/dewaahmad', icon: GithubIcon },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/dewaahmad', icon: LinkedinIcon },
    { name: 'Email', href: 'mailto:contact@example.com', icon: Mail },
  ]
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020202] pt-12 pb-8 overflow-hidden z-10" id="contact">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* =========================================
            1. BIG CTA BANNER (SUPERPOWER FEATURE) 
        ============================================= */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 md:p-16 mb-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
          {/* Efek Hover Glow pada Banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              Mari Bangun Sesuatu yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Luar Biasa.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base">
              Punya proyek web 3D, integrasi sistem enterprise, atau digitalisasi dokumen yang perlu dieksekusi dengan standar tinggi? Mari diskusikan.
            </p>
          </div>

          <a 
            href="mailto:contact@example.com" 
            className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] whitespace-nowrap"
          >
            Mulai Konsultasi
            <ArrowRight size={18} />
          </a>
        </div>

        {/* =========================================
            2. MAIN FOOTER CONTENT
        ============================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Terminal size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tight text-lg leading-none">DEV. LABS</span>
                <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-1">Integrator</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Pengembang solusi arsitektur digital dan optimasi sistem skala menengah untuk efisiensi operasional dan interaksi visual kelas atas.
            </p>

            {/* Social Media Pills (Icon dijamin muncul) */}
            <div className="flex flex-wrap gap-3 mt-2">
              {footerLinks.sosmed.map((link) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-xs font-semibold"
                  >
                    <Icon />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Spacer untuk memisahkan Layout agar seimbang di Desktop */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-6 font-bold">Navigasi Utama</h4>
              <ul className="space-y-4">
                {footerLinks.navigasi.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block text-sm transition-transform duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-6 font-bold">Area Keahlian</h4>
              <ul className="space-y-4">
                {footerLinks.keahlian.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block text-sm transition-transform duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================
            3. COPYRIGHT & BOTTOM BAR
        ============================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {currentYear} Dewa Ahmad Gibran.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistem Berjalan Normal.
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0F] border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
          >
            Kembali ke Atas
            <ArrowUp size={14} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}