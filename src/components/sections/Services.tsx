'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Code2, CheckCircle2, ArrowRight, Sparkles, PlusCircle, Workflow, Zap } from 'lucide-react';

const WHATSAPP_NUMBER = "62881025020924"; 
// Data Service dari Anda
const SERVICES = [
  {
    id: 'wedding',
    emoji: '💍',
    title: 'Wedding & Birthday Website',
    shortDesc: 'Abadikan momen spesial dengan website elegan yang tak terlupakan.',
    longDesc: 'Website personal premium untuk momen pernikahan & ulang tahun. Dirancang dengan animasi halus, galeri interaktif, dan fitur sosial yang membuat tamu merasa dekat meski dari jauh.',
    basePrice: 299000,
    priceLabel: 'Rp299.000',
    color: '#f43f5e',
    colorRgb: '244,63,94',
    duration: '3–5 Hari',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Cloudinary'],
    badge: 'Terlaris',
    features: [
      { id: 'rsvp', label: 'RSVP System Online', price: 0, included: true },
      { id: 'invitation', label: 'Digital Invitation Card', price: 0, included: true },
      { id: 'gallery', label: 'Photo Gallery', price: 0, included: true },
      { id: 'timeline', label: 'Love Story Timeline', price: 150000, included: false },
      { id: 'envelope', label: 'Amplop Digital', price: 100000, included: false },
      { id: 'music', label: 'Background Music Player', price: 75000, included: false },
      { id: 'livestream', label: 'Live Streaming Embed', price: 200000, included: false },
      { id: 'countdown', label: 'Animated Countdown', price: 50000, included: true },
    ],
    workflow: ['Brief & Konsultasi', 'Desain Mockup', 'Revisi & Approval', 'Development', 'Deploy & Launch'],
  },
  {
    id: 'landing',
    emoji: '🌐',
    title: 'Landing Page Development',
    shortDesc: 'Konversi pengunjung menjadi pelanggan dengan halaman yang dioptimalkan.',
    longDesc: 'Landing page berperforma tinggi yang dirancang untuk konversi maksimal. Setiap elemen dioptimalkan secara strategis — dari copywriting hingga call-to-action.',
    basePrice: 1999000,
    priceLabel: 'Rp1.999.000',
    color: '#3b82f6',
    colorRgb: '59,130,246',
    duration: '5–7 Hari',
    techStack: ['Next.js', 'SEO', 'Analytics', 'WhatsApp API'],
    badge: 'Populer',
    features: [
      { id: 'seo', label: 'SEO Optimization', price: 0, included: true },
      { id: 'wa', label: 'WhatsApp Integration', price: 0, included: true },
      { id: 'form', label: 'Lead Capture Form', price: 0, included: true },
      { id: 'analytics', label: 'Google Analytics', price: 0, included: true },
      { id: 'copy', label: 'Profesional Copywriting', price: 500000, included: false },
      { id: 'chatbot', label: 'AI Chatbot', price: 800000, included: false },
      { id: 'ab', label: 'A/B Testing Setup', price: 400000, included: false },
      { id: 'heatmap', label: 'Heatmap Integration', price: 300000, included: false },
    ],
    workflow: ['Discovery Call', 'Wireframe', 'Copywriting', 'Design & Dev', 'Testing', 'Launch'],
  },
  {
    id: 'company',
    emoji: '🏢',
    title: 'Company Profile Website',
    shortDesc: 'Bangun kepercayaan korporat dengan website profil yang premium.',
    longDesc: 'Website company profile yang memancarkan profesionalisme dan kepercayaan. Dirancang untuk meningkatkan kredibilitas brand di mata klien dan investor.',
    basePrice: 2999000,
    priceLabel: 'Rp2.999.000',
    color: '#8b5cf6',
    colorRgb: '139,92,246',
    duration: '7–10 Hari',
    techStack: ['Next.js', 'CMS', 'SEO', 'Multi-language'],
    features: [
      { id: 'cms', label: 'Content Management System', price: 0, included: true },
      { id: 'blog', label: 'Blog & Artikel', price: 0, included: true },
      { id: 'team', label: 'Halaman Tim & Karir', price: 0, included: true },
      { id: 'multilang', label: 'Multi-bahasa (EN/ID)', price: 500000, included: false },
      { id: 'portofolio', label: 'Portfolio / Projects Page', price: 300000, included: false },
      { id: 'live-chat', label: 'Live Chat Integration', price: 400000, included: false },
      { id: 'testimonial', label: 'Testimonial System', price: 200000, included: true },
      { id: 'map', label: 'Interactive Map', price: 150000, included: false },
    ],
    workflow: ['Brief & Konsultasi', 'Sitemap Planning', 'Design System', 'Development', 'QA', 'Deploy'],
  },
  {
    id: 'ecommerce',
    emoji: '🛒',
    title: 'E-Commerce Website',
    shortDesc: 'Toko online bertenaga penuh dengan sistem pembayaran terintegrasi.',
    longDesc: 'Platform e-commerce full-featured yang siap bersaing di pasar digital. Dari manajemen produk hingga checkout yang mulus — semuanya dibangun untuk penjualan yang optimal.',
    basePrice: 4999000,
    priceLabel: 'Rp4.999.000',
    color: '#f59e0b',
    colorRgb: '245,158,11',
    duration: '14–21 Hari',
    techStack: ['Next.js', 'Midtrans', 'PostgreSQL', 'Redis'],
    features: [
      { id: 'catalog', label: 'Product Catalog & Filter', price: 0, included: true },
      { id: 'cart', label: 'Shopping Cart & Checkout', price: 0, included: true },
      { id: 'payment', label: 'Payment Gateway (Midtrans)', price: 0, included: true },
      { id: 'admin', label: 'Admin Dashboard', price: 0, included: true },
      { id: 'promo', label: 'Promo & Diskon System', price: 500000, included: false },
      { id: 'review', label: 'Review & Rating System', price: 300000, included: false },
      { id: 'loyalty', label: 'Loyalty Points', price: 600000, included: false },
      { id: 'wishlist', label: 'Wishlist & Compare', price: 250000, included: false },
    ],
    workflow: ['Requirements', 'DB Design', 'Backend API', 'Frontend', 'Payment Integration', 'Testing', 'Launch'],
  },
  {
    id: 'app',
    emoji: '📱',
    title: 'Web & Mobile Application',
    shortDesc: 'Aplikasi cross-platform enterprise yang cepat, aman, dan skalabel.',
    longDesc: 'Pengembangan aplikasi web dan mobile berkelas enterprise. Arsitektur bersih, performa tinggi, keamanan enkripsi berlapis — siap skala dari startup hingga korporasi.',
    basePrice: 4999000,
    priceLabel: 'Mulai Rp4.999.000',
    color: '#10b981',
    colorRgb: '16,185,129',
    duration: '21–60 Hari',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Flutter', 'Dart'],
    features: [
      { id: 'dashboard-admin', label: 'Admin Dashboard', price: 0, included: true },
      { id: 'multiuser', label: 'Multi User & Roles', price: 0, included: true },
      { id: 'api', label: 'REST API Integration', price: 0, included: true },
      { id: 'notif', label: 'Push Notification', price: 500000, included: false },
      { id: 'payment-app', label: 'Payment Gateway', price: 800000, included: false },
      { id: 'ai', label: 'AI Features (ChatGPT API)', price: 1500000, included: false },
      { id: 'android', label: 'Android App (APK)', price: 2000000, included: false },
      { id: 'ios', label: 'iOS App (TestFlight)', price: 2500000, included: false },
    ],
    workflow: ['System Design', 'API Architecture', 'Mobile Dev', 'Web Dashboard', 'Security Audit', 'Deploy'],
  },
  {
    id: 'ai',
    emoji: '🤖',
    title: 'AI Integration & Automation',
    shortDesc: 'Integrasikan kecerdasan buatan ke dalam bisnis dan workflow Anda.',
    longDesc: 'Solusi AI custom yang mengotomasi proses bisnis, meningkatkan produktivitas, dan memberikan insight cerdas dari data Anda. Powered by GPT-4, Claude, dan model terdepan lainnya.',
    basePrice: 3999000,
    priceLabel: 'Mulai Rp3.999.000',
    color: '#06b6d4',
    colorRgb: '6,182,212',
    duration: '10–30 Hari',
    techStack: ['OpenAI API', 'Claude API', 'LangChain', 'Python'],
    badge: 'Trending',
    features: [
      { id: 'chatbot-ai', label: 'AI Chatbot Custom', price: 0, included: true },
      { id: 'rag', label: 'RAG (Knowledge Base)', price: 1000000, included: false },
      { id: 'automation', label: 'Workflow Automation', price: 800000, included: false },
      { id: 'analysis', label: 'Data Analysis & Report', price: 600000, included: false },
      { id: 'image-ai', label: 'AI Image Generation', price: 700000, included: false },
      { id: 'voice', label: 'Voice AI Integration', price: 1200000, included: false },
      { id: 'prediction', label: 'Predictive Analytics', price: 1500000, included: false },
      { id: 'training', label: 'Custom Model Fine-tuning', price: 3000000, included: false },
    ],
    workflow: ['Use-case Analysis', 'Model Selection', 'Integration', 'Testing & Tuning', 'Deploy'],
  },
  {
    id: 'dashboard',
    emoji: '📊',
    title: 'Dashboard & Management System',
    shortDesc: 'Pantau, kelola, dan analisa bisnis Anda dalam satu platform terpadu.',
    longDesc: 'Sistem manajemen internal yang powerful dengan visualisasi data real-time, laporan otomatis, dan kontrol akses granular untuk tim Anda.',
    basePrice: 5999000,
    priceLabel: 'Mulai Rp5.999.000',
    color: '#a855f7',
    colorRgb: '168,85,247',
    duration: '21–45 Hari',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    features: [
      { id: 'realtime', label: 'Real-time Dashboard', price: 0, included: true },
      { id: 'report', label: 'Auto Report Generator', price: 0, included: true },
      { id: 'rbac', label: 'Role-based Access Control', price: 0, included: true },
      { id: 'export', label: 'Export PDF / Excel', price: 300000, included: false },
      { id: 'notif-dash', label: 'Alert & Notification', price: 400000, included: false },
      { id: 'api-dash', label: 'Third-party API Sync', price: 700000, included: false },
      { id: 'mobile-dash', label: 'Mobile Responsive View', price: 500000, included: false },
      { id: 'audit', label: 'Audit Trail Logging', price: 600000, included: false },
    ],
    workflow: ['Requirements', 'Data Modeling', 'API Development', 'Dashboard UI', 'Integration', 'Deploy'],
  },
  {
    id: 'custom',
    emoji: '🚀',
    title: 'Custom Software Development',
    shortDesc: 'Solusi perangkat lunak enterprise yang dirancang khusus.',
    longDesc: 'Pengembangan software bespoke dari nol. Kami merancang arsitektur yang skalabel, tahan banting, dan siap tumbuh bersama bisnis Anda — tanpa batasan platform atau template.',
    basePrice: 0,
    priceLabel: 'Custom Pricing',
    color: '#f97316',
    colorRgb: '249,115,22',
    duration: 'Sesuai Scope',
    techStack: ['Microservices', 'Docker', 'Kubernetes', 'Any Stack'],
    badge: 'Enterprise',
    features: [
      { id: 'discovery', label: 'Discovery & Architecture', price: 0, included: true },
      { id: 'microservice', label: 'Microservices Architecture', price: 0, included: true },
      { id: 'ci-cd', label: 'CI/CD Pipeline', price: 0, included: true },
      { id: 'devops', label: 'DevOps & Monitoring', price: 0, included: true },
      { id: 'load-test', label: 'Load Testing', price: 0, included: false },
      { id: 'security-audit', label: 'Security Audit', price: 0, included: false },
      { id: 'sla', label: 'SLA & Support Contract', price: 0, included: false },
      { id: 'doc', label: 'Full Documentation', price: 0, included: true },
    ],
    workflow: ['Discovery', 'Architecture', 'Sprint Planning', 'Development', 'QA', 'Deployment', 'Maintenance'],
  },
];

export default function ServicesShowcase() {
  const [activeId, setActiveId] = useState(SERVICES[1].id); // Default ke Landing Page

  const activeService = useMemo(() => {
    return SERVICES.find((s) => s.id === activeId) || SERVICES[0];
  }, [activeId]);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
`Halo Tim,

Saya tertarik dengan layanan ${activeService.title}.

Detail Layanan:
• Harga mulai: ${activeService.priceLabel}
• Estimasi pengerjaan: ${activeService.duration}

Mohon informasi lebih lanjut mengenai:
1. Detail paket
2. Timeline pengerjaan
3. Proses kerja
4. Penawaran harga

Terima kasih.`
)}`;

  return (
    <section id= "layanan" className="w-full min-h-screen py-24 bg-[#030305] text-white relative flex flex-col items-center">
      
      {/* Dynamic Background Glow based on active service */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 70% 30%, rgba(${activeService.colorRgb}, 0.4), transparent 50%)`
        }}
      />
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start md:items-center text-left md:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 mb-6 shadow-inner">
            <Zap size={14} style={{ color: activeService.color }} className="transition-colors duration-500" /> 
            Eksplorasi Solusi Digital
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Layanan <span style={{ color: activeService.color }} className="transition-colors duration-500">Keahlian</span> Kami
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl text-sm md:text-base leading-relaxed">
            Dari landing page berkonversi tinggi hingga infrastruktur cloud skala enterprise. Pilih cetak biru yang sesuai dengan visi bisnis Anda.
          </p>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT PANEL: Navigation Sidebar */}
          <div className="w-full lg:w-1/3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 custom-scrollbar snap-x">
            {SERVICES.map((service) => {
              const isActive = activeId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 min-w-[260px] lg:min-w-0 snap-start border ${
                    isActive 
                      ? 'bg-white/10' 
                      : 'bg-white/5 border-transparent hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                  style={{
                    borderColor: isActive ? service.color : 'transparent',
                    boxShadow: isActive ? `0 0 20px rgba(${service.colorRgb}, 0.15)` : 'none'
                  }}
                >
                  <div className="text-2xl md:text-3xl">{service.emoji}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-sm md:text-base ${isActive ? 'text-white' : ''}`}>
                      {service.title}
                    </h3>
                    <p className="text-[10px] md:text-xs mt-1 opacity-70 truncate max-w-[200px]">{service.shortDesc}</p>
                  </div>
                  {service.badge && (
                    <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 text-[9px] font-black uppercase px-2 py-1 rounded border border-white/20 bg-[#111]" style={{ color: service.color }}>
                      {service.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: Deep Dive Data */}
          <div className="w-full lg:w-2/3 relative min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-[#0C0C14] border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Header Kanan */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-8 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{activeService.emoji}</span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black">{activeService.title}</h3>
                        <div className="flex items-center gap-3 mt-2 text-xs font-mono font-medium text-gray-400">
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <Clock size={12} style={{ color: activeService.color }} /> {activeService.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                      {activeService.longDesc}
                    </p>
                  </div>
                  
                  {/* Price Tag Box */}
                  <div className="shrink-0 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-center items-start md:items-end w-full md:w-auto">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Mulai Dari</span>
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tight" style={{ color: activeService.color }}>
                      {activeService.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Tech Stack Horizontal Ticker style */}
                <div className="mb-10">
                  <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code2 size={14} /> Teknologi yang Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeService.techStack.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-gray-300 hover:bg-white/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features & Addons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 border-t border-white/10 pt-8">
                  
                  {/* Core Included Features */}
                  <div>
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Core Features (Termasuk)
                    </h4>
                    <ul className="space-y-3">
                      {activeService.features.filter(f => f.included).map(feat => (
                        <li key={feat.id} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeService.color }} />
                          {feat.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Premium Addons */}
                  <div>
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                      <PlusCircle size={14} className="text-indigo-400" /> Premium Add-ons (Opsional)
                    </h4>
                    <ul className="space-y-3">
                      {activeService.features.filter(f => !f.included).map(feat => (
                        <li key={feat.id} className="flex items-center justify-between text-sm text-gray-400 group">
                          <span className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 border rounded-full border-gray-600 group-hover:border-indigo-400 transition-colors" />
                            {feat.label}
                          </span>
                          <span className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded opacity-50 group-hover:opacity-100 transition-opacity">
                            +{feat.price / 1000}k
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Workflow Stepper */}
                <div className="bg-[#151520] p-6 rounded-2xl border border-white/5 mb-10">
                  <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                    <Workflow size={14} /> Pipeline Pengerjaan
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-400">
                    {activeService.workflow.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-3 py-1.5 bg-black/40 rounded-md border border-white/5">{step}</span>
                        {idx !== activeService.workflow.length - 1 && (
                          <ArrowRight size={10} className="text-gray-600 mx-1" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

               <a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
  style={{ backgroundColor: activeService.color }}
>
  <Sparkles size={18} />
  Konsultasikan {activeService.title}
</a>

              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}