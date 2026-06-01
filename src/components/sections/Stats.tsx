'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Rocket, Users, Server, Code2 } from 'lucide-react';

// --- KOMPONEN ANIMATED COUNTER ---
// Komponen ini bertugas menghitung angka dari 0 ke target secara mulus saat masuk layar
const AnimatedNumber = ({ 
  value, 
  decimals = 0, 
  suffix = "" 
}: { 
  value: number; 
  decimals?: number; 
  suffix?: string; 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 40, 
    stiffness: 80,
    restDelta: 0.001 
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("id-ID", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return <span ref={ref} className="tabular-nums block">0{suffix}</span>;
};

// --- DATA STATISTIK ---
const statsData = [
  {
    id: 1,
    title: "Project Selesai",
    value: 124,
    suffix: "+",
    decimals: 0,
    icon: <Rocket size={24} />,
    color: "from-blue-400 to-cyan-400",
    bgIcon: "bg-blue-500/10",
    borderIcon: "border-blue-500/20",
    textColor: "text-blue-400",
    shadow: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
  },
  {
    id: 2,
    title: "Klien Enterprise & UMKM",
    value: 85,
    suffix: "+",
    decimals: 0,
    icon: <Users size={24} />,
    color: "from-purple-400 to-indigo-400",
    bgIcon: "bg-purple-500/10",
    borderIcon: "border-purple-500/20",
    textColor: "text-purple-400",
    shadow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
  },
  {
    id: 3,
    title: "Uptime Server",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    icon: <Server size={24} />,
    color: "from-emerald-400 to-green-400",
    bgIcon: "bg-emerald-500/10",
    borderIcon: "border-emerald-500/20",
    textColor: "text-emerald-400",
    shadow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
  },
  {
    id: 4,
    title: "Baris Kode Ditulis",
    value: 500,
    suffix: "k+",
    decimals: 0,
    icon: <Code2 size={24} />,
    color: "from-pink-400 to-rose-400",
    bgIcon: "bg-pink-500/10",
    borderIcon: "border-pink-500/20",
    textColor: "text-pink-400",
    shadow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]"
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#020202] relative z-20">
      
      {/* Background Tech Grid Pattern & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Kontainer Grid Glassmorphism Utama */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 rounded-[2.5rem] bg-[#0A0A10]/60 backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Garis Gradasi Atas */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>

          {statsData.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`flex flex-col items-center text-center p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 group cursor-default ${stat.shadow}`}
            >
              {/* Ikon dengan Glow Effect */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 ${stat.bgIcon} ${stat.borderIcon} ${stat.textColor}`}>
                {stat.icon}
              </div>

              {/* Angka Berjalan Dinamis */}
              <h3 className={`text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b ${stat.color} drop-shadow-sm`}>
                <AnimatedNumber 
                  value={stat.value} 
                  decimals={stat.decimals} 
                  suffix={stat.suffix} 
                />
              </h3>
              
              {/* Label Title */}
              <p className="text-gray-400 text-sm md:text-base font-semibold uppercase tracking-wider">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}