'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check, Copy, X, CheckCircle } from 'lucide-react'; // Tambahkan X dan CheckCircle

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 1. STATE UNTUK MENGONTROL POPUP SUCCESS
  const [showSuccess, setShowSuccess] = useState(false);
  
  const emailAddress = "devv.labss@gmail.com"; 

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget; 
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      // 🚀 HIT KE API ASLI
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Terjadi kesalahan transmisi data.');
      }

      // 2. MUNCULKAN POPUP PREMIUM DAN RESET FORM
      setShowSuccess(true);
      form.reset(); 
      
      // Otomatis tutup popup setelah 5 detik
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error: any) {
      console.error('Frontend Error:', error);
      alert(error.message || 'Gagal mengirim pesan, silakan coba beberapa saat lagi.'); // Error masih pakai alert, atau bisa Anda buatkan toast error juga
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-24 bg-[#020202] relative z-10 overflow-hidden">
      
      {/* 3. KOMPONEN POPUP SUCCESS (MODAL) */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-6">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)} // Tutup jika background diklik
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              className="relative w-full max-w-md p-8 bg-[#0F0F15] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col items-center text-center z-10 overflow-hidden"
            >
              {/* Efek Cahaya di Modal */}
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
              <div className="absolute -top-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"></div>

              {/* Tombol Close */}
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Ikon Sukses Animasi */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Pesan Berhasil Terkirim!</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                Terima kasih telah menghubungi kami. Tim eksekutif kami telah menerima pesan Anda dan akan segera membalasnya.
              </p>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white hover:text-black transition-all"
              >
                Kembali ke Beranda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Neon Orbs */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          
          {/* KOLOM KIRI (Tetap sama seperti sebelumnya) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Tersedia untuk Project Baru
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                Mari Bangun Sesuatu yang <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Luar Biasa Bersama.
                </span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
                Punya ide besar, kebutuhan restrukturisasi sistem, atau paket kustomisasi perangkat lunak? Hubungi kami langsung melalui email eksekutif atau isi formulir di samping.
              </p>
            </div>

            <div className="space-y-4">
              {/* KARTU EMAIL UTAMA */}
              <a 
                href={`mailto:${emailAddress}`}
                className="block p-6 rounded-2xl bg-[#0A0A10]/60 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all shrink-0">
                      <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email Eksekutif</p>
                      <p className="text-lg md:text-xl text-white font-black tracking-tight group-hover:text-blue-400 transition-colors mt-0.5">
                        {emailAddress}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Salin alamat email"
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer shrink-0 z-20 relative"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                          <Check className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </a>

              {/* KARTU ALAMAT OPERASIONAL */}
              <div className="p-6 rounded-2xl bg-[#0A0A10]/40 border border-white/5 flex items-center gap-5 shadow-2xl">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Base of Operations</p>
                  <p className="text-base md:text-lg text-white font-bold mt-0.5">Jakarta Selatan, Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: FORM (Sama seperti sebelumnya) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <form 
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[2.5rem] bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="John Doe" 
                      className="w-full px-5 py-4 rounded-xl bg-[#0F0F15] border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alamat Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@company.com" 
                      className="w-full px-5 py-4 rounded-xl bg-[#0F0F15] border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jenis Layanan / Sistem</label>
                  <select 
                    name="serviceType"
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 rounded-xl bg-[#0F0F15] border border-white/5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="" disabled className="bg-[#0F0F15] text-gray-600">Pilih Kebutuhan Anda...</option>
                    <option value="wedding" className="bg-[#0F0F15] text-white">💍 Website Wedding & Ulang Tahun</option>
                    <option value="modern-web" className="bg-[#0F0F15] text-white">🌐 Modern Website</option>
                    <option value="mobile-app" className="bg-[#0F0F15] text-white">📱 Aplikasi Mobile & Web App</option>
                    <option value="consult" className="bg-[#0F0F15] text-white">💡 Konsultasi Arsitektur IT / Kustom</option>
                  </select>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ceritakan Rencana Besar Anda</label>
                  <textarea 
                    name="projectDetails"
                    required
                    rows={4} 
                    placeholder="Kami membutuhkan platform berskala enterprise untuk..." 
                    className="w-full px-5 py-4 rounded-xl bg-[#0F0F15] border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-sm"
                  ></textarea>
                </div>
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white text-black font-black text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors group cursor-pointer shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed select-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim Data Penawaran...
                    </span>
                  ) : (
                    <>
                      Kirim Pesan Penawaran
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-gray-600 mt-4">
                  Data yang dikirim dilindungi enkripsi end-to-end server production.
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}