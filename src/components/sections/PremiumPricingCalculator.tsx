'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, FileText, Download, Check, Sparkles, Layout, ShieldCheck, ArrowRight, Layers, Smartphone, Bot, CreditCard } from 'lucide-react';

// Data Paket Utama
const BASE_PACKAGES = [
  { id: 'wedding', name: '💍 Wedding & Birthday', price: 299000, days: '2–5 Hari', desc: 'Abadikan momen spesial dengan website undangan elegan dan mikro animasi mulus.' },
  { id: 'landing', name: '🌐 Modern Landing Page', price: 1999000, days: '5–7 Hari', desc: 'Optimalkan konversi pengunjung menjadi pelanggan dengan halaman super cepat & SEO.' },
  { id: 'enterprise', name: '📱 Enterprise Web & Mobile', price: 4999000, days: '21–60 Hari', desc: 'Sistem bisnis kustom, ERP, CRM, atau aplikasi berskala enterprise yang aman dan modular.' }
];

// Data Fitur Tambahan (Add-ons) yang bisa dipilih dinamis
export const ADDONS = [
  // === SHARED ADD-ONS (Bisa dipilih di beberapa paket) ===
  { id: 'domain', name: 'Domain .com/.id Premium (1 Thn)', price: 150000, category: ['wedding', 'landing', 'enterprise'] },
  { id: 'hosting', name: 'Hosting (1 Thn)', price: 250000, category: ['wedding', 'landing', 'enterprise'] },
  { id: 'cms', name: 'CMS Admin Panel (Kelola Konten)', price: 500000, category: ['landing', 'enterprise'] },
  { id: 'payment', name: 'Payment Gateway (Midtrans/Xendit)', price: 500000, category: ['landing', 'enterprise'] },
  { id: 'ai_bot', name: 'AI Chatbot Integration (Nexus AI v2)', price: 750000, category: ['landing', 'enterprise'] },

  // === WEDDING & EVENT ADD-ONS ===
  { id: 'music', name: 'Premium Background Music & RSVP', price: 50000, category: ['wedding'] },
  { id: 'ewallet', name: 'Amplop Digital (E-Wallet)', price: 50000, category: ['wedding'] },
  { id: 'live_stream', name: 'Live Streaming Event', price: 100000, category: ['wedding'] },
  { id: 'custom_theme', name: 'Custom Theme Premium', price: 200000, category: ['wedding'] },
  { id: 'video_prewed', name: 'Video Prewedding Section', price: 150000, category: ['wedding'] },
  { id: 'guest_book', name: 'Guest Book Digital', price: 50000, category: ['wedding'] },

  // === LANDING PAGE / MODERN WEBSITE ADD-ONS ===
  { id: 'blog', name: 'Blog System (Artikel SEO)', price: 300000, category: ['landing'] },
  { id: 'multilang', name: 'Multi Language (ID/EN)', price: 400000, category: ['landing'] },
  { id: 'livechat', name: 'Live Chat Support Widget', price: 150000, category: ['landing'] },
  { id: 'analytics', name: 'Google Analytics & Pixel Setup', price: 100000, category: ['landing'] },
  { id: 'booking', name: 'Booking / Reservation System', price: 600000, category: ['landing'] },
  { id: 'copywriting', name: 'Copywriting Landing Page Premium', price: 400000, category: ['landing'] },

  // === ENTERPRISE / WEB & MOBILE APP ADD-ONS ===
  { id: 'cloud', name: 'Cloud Infrastructure Deployment', price: 1000000, category: ['enterprise'] },
  { id: 'android', name: 'Mobile Android App Version', price: 2500000, category: ['enterprise'] },
  { id: 'ios', name: 'Mobile iOS App Version', price: 3000000, category: ['enterprise'] },
  { id: 'ai_app', name: 'Custom AI Feature Integration', price: 1500000, category: ['enterprise'] },
  { id: 'push', name: 'Push Notification System', price: 350000, category: ['enterprise'] },
  { id: 'multirole', name: 'Multi Role User (Superadmin, Staff, dll)', price: 450000, category: ['enterprise'] },
  { id: 'export', name: 'Sistem Export Laporan (PDF & Excel)', price: 300000, category: ['enterprise'] },
  { id: 'qr', name: 'QR Code & Barcode Scanner System', price: 250000, category: ['enterprise'] },
  { id: 'chat', name: 'In-App Chat System (Real-time)', price: 800000, category: ['enterprise'] }
];

export default function PremiumPricingCalculator() {
  const [selectedPackage, setSelectedPackage] = useState('landing');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter add-ons berdasarkan paket yang dipilih aktif
  const availableAddons = useMemo(() => {
    return ADDONS.filter(addon => addon.category.includes(selectedPackage));
  }, [selectedPackage]);

  // Reset addons jika paket utama berpindah
  const handlePackageChange = (id: string) => {
    setSelectedPackage(id);
    setSelectedAddons([]);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Hitung Total Biaya secara Real-Time
  const totalCost = useMemo(() => {
    const basePrice = BASE_PACKAGES.find(p => p.id === selectedPackage)?.price || 0;
    const addonsPrice = ADDONS.filter(a => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
    return basePrice + addonsPrice;
  }, [selectedPackage, selectedAddons]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  // 🔥 CORE ENGINE: INSTANT PROPOSAL GENERATOR (Native Print & Save System)
  const handleGenerateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Mohon isi nama dan alamat email Anda untuk mengirim proposal.');
      return;
    }

    setIsGenerating(true);

    const activePkg = BASE_PACKAGES.find(p => p.id === selectedPackage);
    const chosenAddons = ADDONS.filter(a => selectedAddons.includes(a.id));

    // Membuat Dokumen Cetak Penawaran Formal Bersih secara Programmatic
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const invoiceCode = `PRP-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    printWindow.document.write(`
      <html>
        <head>
          <title>Proposal_${invoiceCode}_${formData.company || formData.name}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #222; padding: 40px; line-height: 1.6; }
            .header { display: flex; justify-content: space-between; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-title { font-size: 26px; font-weight: bold; color: #1e3a8a; letter-spacing: 1px; }
            .meta-info { text-align: right; font-size: 13px; color: #555; }
            .section-title { font-size: 16px; font-weight: bold; text-transform: uppercase; color: #1e3a8a; margin-top: 30px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
            th { background-color: #f3f4f6; text-align: left; padding: 12px; font-size: 14px; border-bottom: 2px solid #ddd; }
            td { padding: 12px; font-size: 14px; border-bottom: 1px solid #eee; }
            .total-row { font-weight: bold; background-color: #eff6ff; font-size: 16px; color: #1d4ed8; }
            .footer-note { margin-top: 50px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 15px; }
            .badge { background-color: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo-title">NEXT-GEN DIGITAL AGENCY</div>
              <div style="font-size: 12px; color: #666;">Software Architecture & Premium Development</div>
            </div>
            <div class="meta-info">
              <strong>Dokumen Dokumen Penawaran Resmi (SRS Blueprint)</strong><br/>
              Nomor: ${invoiceCode}<br/>
              Tanggal: ${dateStr}<br/>
              Valid Hingga: 30 Hari Sejak Diterbitkan
            </div>
          </div>

          <p>Masing-masing pihak yang bertanda tangan di bawah ini mengonfirmasi dokumen spesifikasi kebutuhan sistem perangkat lunak (*Software Requirement Specification*) yang dirancang khusus untuk:</p>
          
          <table>
            <tr><td style="width:180px; font-weight:bold;">Nama Klien Utama</td><td>${formData.name}</td></tr>
            <tr><td style="font-weight:bold;">Kontak Email</td><td>${formData.email}</td></tr>
            <tr><td style="font-weight:bold;">Perusahaan / Institusi</td><td>${formData.company || '-'}</td></tr>
          </table>

          <div class="section-title">Akurasi Cakupan Layanan & Rincian Fitur</div>
          <table>
            <thead>
              <tr>
                <th>Deskripsi Komponen Sistem</th>
                <th style="width: 120px;">Estimasi Waktu</th>
                <th style="text-align: right; width: 180px;">Biaya Proyek</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Paket Utama: ${activePkg?.name}</strong><br/><small style="color:#666;">${activePkg?.desc}</small></td>
                <td>${activePkg?.days}</td>
                <td style="text-align: right;">${formatCurrency(activePkg?.price || 0)}</td>
              </tr>
              ${chosenAddons.map(addon => `
                <tr>
                  <td><span class="badge">Add-on</span> ${addon.name}</td>
                  <td>Included</td>
                  <td style="text-align: right;">${formatCurrency(addon.price)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2" style="text-align: right; padding-right: 20px;">Total Estimasi Investasi Berjalan:</td>
                <td style="text-align: right;">${formatCurrency(totalCost)}</td>
              </tr>
            </tbody>
          </table>

          <div class="section-title">Metodologi Eksekusi & Jaminan Garansi</div>
          <ol style="font-size: 13px; color: #444; padding-left: 20px;">
            <li><strong>Fase Cetak Biru (Discovery):</strong> Penyusunan visual alur kerja, skema database modular, dan prototipe sistem interaktif (Figma).</li>
            <li><strong>Fase Produksi (Engineering):</strong> Penulisan baris kode berkinerja tinggi berbasis Next.js, React, Core Web Vitals optimal, dan enkripsi data server end-to-end.</li>
            <li><strong>Jaminan Pemeliharaan:</strong> Agensi memberikan garansi penuh 6 Bulan bebas kerusakan teknis (*Bug-Free Warranty*) terhitung sejak sistem live di domain production.</li>
          </ol>

          <div class="footer-note">
            Dokumen ini dihasilkan secara otomatis melalui Sistem Core Engine Portofolio Dewa Ahmad Gibran.<br/>
            Untuk konfirmasi penandatanganan kontrak kerja, berkas ini dapat langsung dilampirkan melalui email formal: <strong>devv.labss@gmail.com</strong>
          </div>

          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    setIsGenerating(false);
  };

  return (
    <section className="w-full min-h-screen py-20 px-4 bg-[#0A0A0F] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow Decor */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase">
            Pricing Engine v2.6
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Kalkulator Biaya & Pembuat Proposal Instan
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Rancang arsitektur website impian Anda, dapatkan transparansi harga instan, dan unduh berkas spesifikasi teknis (SRS) resmi secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: CONFIGURATOR (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* TAHAP 1: Pilih Paket Utama */}
            <div className="bg-[#12121A]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl">
              <label className="text-sm font-bold text-gray-400 tracking-wider flex items-center gap-2 mb-4">
                <Layers size={16} className="text-blue-400" /> 1. PILIH ARSITEKTUR PAKET UTAMA
              </label>
              <div className="space-y-3">
                {BASE_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageChange(pkg.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedPackage === pkg.id
                        ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                        : 'bg-[#161622]/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {pkg.name}
                        {selectedPackage === pkg.id && <Sparkles size={12} className="text-yellow-400 animate-pulse" />}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{pkg.desc}</p>
                      <span className="inline-block mt-2 text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-medium">
                        Waktu Produksi: {pkg.days}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-white block">{formatCurrency(pkg.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TAHAP 2: Tambahkan Fitur Spesifik (Add-ons) */}
            <AnimatePresence mode="wait">
              {availableAddons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#12121A]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl"
                >
                  <label className="text-sm font-bold text-gray-400 tracking-wider flex items-center gap-2 mb-4">
                    <Calculator size={16} className="text-purple-400" /> 2. KUSTOMISASI ADD-ONS INTEGRASI
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-purple-600/10 border-purple-500 text-white'
                              : 'bg-[#161622]/50 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              isChecked ? 'bg-purple-500 border-purple-500 text-black' : 'border-white/20'
                            }`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span className="text-xs font-semibold tracking-wide">{addon.name}</span>
                          </div>
                          <span className="text-xs font-bold text-right pl-2 shrink-0">+{formatCurrency(addon.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SISI KANAN: LIVE ESTIMATE & GENERATOR FORM (5 Kolom) */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="bg-gradient-to-b from-[#141420] to-[#0D0D15] border border-white/10 p-6 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none"></div>

              <div className="border-b border-white/5 pb-4 mb-6">
                <p className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">Estimasi Investasi Finansial</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-white tracking-tight transition-all">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">*Seluruh harga bersifat transparan dan dapat disesuaikan kembali.</p>
              </div>

              {/* Form Data Klien */}
              <form onSubmit={handleGenerateProposal} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Nama Lengkap / Kontak Utama *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Dewa Ahmad Gibran"
                    className="w-full px-4 py-3 bg-[#1A1A26] border border-white/5 focus:border-blue-500/50 rounded-xl text-sm focus:outline-none transition-all text-white placeholder-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Alamat Email Korporat *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-[#1A1A26] border border-white/5 focus:border-blue-500/50 rounded-xl text-sm focus:outline-none transition-all text-white placeholder-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Nama Perusahaan / Organisasi (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Contoh: PT. Cladhist Data Core"
                    className="w-full px-4 py-3 bg-[#1A1A26] border border-white/5 focus:border-blue-500/50 rounded-xl text-sm focus:outline-none transition-all text-white placeholder-gray-600"
                  />
                </div>

                {/* Tombol Eksekusi PDF & Order */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:opacity-95 text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50 cursor-pointer group"
                >
                  {isGenerating ? (
                    <>Menyusun Struktur Dokumen...</>
                  ) : (
                    <>
                      <FileText size={16} />
                      <span>Unduh Proposal SRS (PDF)</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Bukti Jaminan Agensi Tertera */}
              <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-3 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span>6 Bulan Garansi Bug</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layout size={14} className="text-blue-400 shrink-0" />
                  <span>Kode Modular Clean</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}