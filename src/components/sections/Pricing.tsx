'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Monitor, 
  Smartphone,
  CheckSquare,
  Square
} from 'lucide-react';

// --- DATA KONFIGURASI HARGA & FITUR ---
const plans = [
  {
    name: "Website Wedding & Ulang Tahun",
    description: "Cocok untuk acara personal dan momen spesial yang tak terlupakan.",
    icon: <Heart className="w-6 h-6 text-pink-400" />,
    basePrice: 299000,
    badge: "Spesial",
    color: "from-pink-500 to-rose-400",
    glow: "rgba(244, 63, 94, 0.4)",
    baseFeatures: [
      "Desain elegan dan responsif",
      "Countdown acara",
      "Galeri foto",
      "RSVP kehadiran",
      "Lokasi Google Maps",
      "Background music",
      "Love story / timeline acara"
    ],
    addons: [
      { id: "domain_wed", label: "Domain .com/.id", price: 150000 },
      { id: "hosting_wed", label: "Hosting 1 tahun", price: 250000 },
      { id: "ewallet", label: "Amplop digital (E-Wallet)", price: 50000 },
      { id: "live_stream", label: "Live Streaming Event", price: 100000 },
      { id: "custom_theme", label: "Custom Theme Premium", price: 200000 },
      { id: "video_prewed", label: "Video Prewedding Section", price: 150000 },
      { id: "guest_book", label: "Guest Book Digital", price: 50000 },
    ]
  },
  {
    name: "Modern Website / Landing Page",
    description: "Cocok untuk UMKM, personal branding, startup, dan perusahaan.",
    icon: <Monitor className="w-6 h-6 text-blue-400" />,
    basePrice: 1999000,
    badge: "Terpopuler",
    isPopular: true,
    color: "from-blue-500 via-indigo-500 to-purple-500",
    glow: "rgba(99, 102, 241, 0.4)",
    baseFeatures: [
      "Desain UI/UX modern",
      "Mobile responsive",
      "SEO dasar",
      "Form kontak",
      "Integrasi WhatsApp",
      "Keamanan SSL",
      "Optimasi performa"
    ],
    addons: [
      { id: "cms", label: "CMS Admin Panel", price: 500000 },
      { id: "blog", label: "Blog System", price: 300000 },
      { id: "multilang", label: "Multi Language", price: 400000 },
      { id: "livechat", label: "Live Chat", price: 150000 },
      { id: "analytics", label: "Google Analytics", price: 100000 },
      { id: "pg_web", label: "Payment Gateway", price: 500000 },
      { id: "booking", label: "Booking System", price: 600000 },
      { id: "ai_bot", label: "AI Chatbot", price: 750000 },
      { id: "copywriting", label: "Copywriting Landing Page", price: 400000 },
    ]
  },
  {
    name: "Aplikasi Web / Mobile App",
    description: "Sistem bisnis, ERP, CRM, inventory, dan aplikasi custom.",
    icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
    basePrice: 4999000,
    badge: "Enterprise Ready",
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16, 185, 129, 0.4)",
    baseFeatures: [
      "UI/UX Premium",
      "Database Management",
      "Login & Authentication",
      "Dashboard Admin",
      "Manajemen User",
      "API Integration",
      "Responsive Design"
    ],
    addons: [
      { id: "android", label: "Mobile Android Version", price: 2500000 },
      { id: "ios", label: "Mobile iOS Version", price: 3000000 },
      { id: "pg_app", label: "Payment Gateway", price: 500000 },
      { id: "push", label: "Push Notification", price: 350000 },
      { id: "multirole", label: "Multi Role User", price: 450000 },
      { id: "export", label: "Laporan PDF & Excel", price: 300000 },
      { id: "qr", label: "QR Code System", price: 250000 },
      { id: "chat", label: "Chat System", price: 800000 },
      { id: "ai_app", label: "AI Integration", price: 1500000 },
      { id: "cloud", label: "Cloud Deployment", price: 1000000 },
    ]
  }
];

// --- HELPER FUNCTION ---
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function Pricing() {
  // State untuk melacak kartu yang sedang difokuskan (default: kartu tengah/1)
  const [activeCard, setActiveCard] = useState<number>(1);
  
  // State untuk melacak add-ons yang dicentang per index kartu
  // Contoh: { 0: ['domain_wed'], 1: ['cms', 'blog'], 2: [] }
  const [selectedAddons, setSelectedAddons] = useState<Record<number, string[]>>({
    0: [],
    1: [],
    2: []
  });

  // Handler toggle checkbox add-ons
  const toggleAddon = (cardIndex: number, addonId: string) => {
    setSelectedAddons(prev => {
      const currentList = prev[cardIndex];
      if (currentList.includes(addonId)) {
        return { ...prev, [cardIndex]: currentList.filter(id => id !== addonId) };
      } else {
        return { ...prev, [cardIndex]: [...currentList, addonId] };
      }
    });
  };

  // Kalkulasi total harga berdasarkan kartu dan add-ons
  const calculateTotal = (cardIndex: number) => {
    const plan = plans[cardIndex];
    const checkedAddons = selectedAddons[cardIndex] || [];
    const addonsTotal = plan.addons
      .filter(addon => checkedAddons.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
    return plan.basePrice + addonsTotal;
  };

  // Checkout WhatsApp Logic
  const handleCheckoutWA = (cardIndex: number) => {
    const plan = plans[cardIndex];
    const checkedAddonIds = selectedAddons[cardIndex] || [];
    const checkedAddonDetails = plan.addons.filter(addon => checkedAddonIds.includes(addon.id));
    const totalPrice = calculateTotal(cardIndex);

    // Format list addon untuk pesan WA
    const addonText = checkedAddonDetails.length > 0
      ? checkedAddonDetails.map(a => `- ${a.label}`).join('%0A')
      : '- (Tanpa fitur tambahan)';

    const message = `Halo, saya tertarik dengan paket *${plan.name}*.%0A%0A*Fitur tambahan yang saya pilih:*%0A${addonText}%0A%0A*Total Estimasi Harga:* ${formatRupiah(totalPrice)}%0A%0AMohon informasi lebih lanjut dan estimasi pengerjaannya. Terima kasih.`;
    
    // Ganti nomor WA di bawah ini dengan nomor bisnis Anda
    const waNumber = "62881025020924"; 
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="harga" className="py-32 bg-[#050505] relative z-10 overflow-hidden font-sans">
      
      {/* Background Effect Premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 max-w-[1400px] relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-yellow-400" /> Transparansi Harga Tanpa Biaya Tersembunyi
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Pilih Paket Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Sesuai Kebutuhan Anda.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
          >
            Mulai dari website personal hingga sistem enterprise. Kustomisasi fitur sesuka Anda dan lihat estimasi biaya secara real-time.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, index) => {
            const isActive = activeCard === index;
            const currentTotal = calculateTotal(index);
            
            return (
              <motion.div
                key={index}
                onClick={() => setActiveCard(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-[2rem] bg-[#0A0A0F] border flex flex-col cursor-pointer transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'border-white/20 scale-[1.02] md:scale-105 z-30 shadow-2xl' 
                    : 'border-white/5 scale-100 z-10 hover:border-white/10 opacity-70 hover:opacity-100 hover:scale-[1.01]'
                }`}
                style={{
                  boxShadow: isActive ? `0 20px 80px -20px ${plan.glow}` : 'none'
                }}
              >
                {/* Highlight Glow Dalam (Hanya di Card Aktif) */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r w-full z-20" style={{ backgroundImage: `linear-gradient(to right, transparent, ${plan.color.split(' ')[0].replace('from-', '')}, transparent)` }}></div>
                )}

                <div className="p-8 md:p-10 flex flex-col h-full">
                  
                  {/* Badge & Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {plan.badge}
                    </div>
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 transition-transform duration-300 ${isActive ? 'scale-110 shadow-lg' : ''}`}>
                      {plan.icon}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className={`text-2xl font-black mb-3 transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>{plan.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 min-h-[40px]">{plan.description}</p>

                  {/* Realtime Pricing Display */}
                  <div className="mb-8 pb-8 border-b border-white/10 relative">
                    <span className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-2 block">Total Estimasi</span>
                    <div className="flex flex-col gap-1">
                      {/* Animasi Perubahan Harga */}
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={currentTotal}
                          initial={{ y: -10, opacity: 0, filter: "blur(4px)" }}
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: 10, opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.3 }}
                          className={`text-4xl lg:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${plan.color}`}
                        >
                          {formatRupiah(currentTotal)}
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Tampilkan harga awal jika ada addon yang dipilih */}
                      {currentTotal > plan.basePrice && (
                        <span className="text-xs text-gray-500 mt-1 line-through">
                          Base: {formatRupiah(plan.basePrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scrollable Features Area */}
                  <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                    
                    {/* Bawaan (Fixed) */}
                    <div>
                      <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                        Fitur Bawaan
                      </h4>
                      <ul className="space-y-3">
                        {plan.baseFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-sm text-gray-400">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Add-ons (Checkbox) */}
                    <div className="pb-4">
                      <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                        Fitur Tambahan (Opsional)
                      </h4>
                      <ul className="space-y-3">
                        {plan.addons.map((addon) => {
                          const isChecked = selectedAddons[index]?.includes(addon.id);
                          return (
                            <li 
                              key={addon.id} 
                              onClick={(e) => {
                                e.stopPropagation(); // Mencegah card tertrigger berkali-kali
                                toggleAddon(index, addon.id);
                                setActiveCard(index); // Otomatis aktifkan card ini jika addon di-klik
                              }}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                isChecked 
                                  ? 'bg-white/10 border-white/20 shadow-inner' 
                                  : 'bg-[#0F0F15] border-white/5 hover:border-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isChecked ? (
                                  <CheckSquare className={`w-5 h-5 bg-clip-text ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                ) : (
                                  <Square className="w-5 h-5 text-gray-600" />
                                )}
                                <span className={`text-sm ${isChecked ? 'text-gray-200 font-medium' : 'text-gray-500'}`}>
                                  {addon.label}
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-gray-500">
                                +{formatRupiah(addon.price).replace(',00', '')}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckoutWA(index);
                      }}
                      className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`
                          : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Pesan Sekarang
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Tambahan CSS langsung untuk scrollbar tipis di dalam card */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}} />
    </section>
  );
}