'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareCode, Palette, Terminal, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

// Tipe Data untuk Langkah Workflow
type StepType = {
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  deliverables: string[];
};

const workflowSteps: StepType[] = [
  {
    phase: "01",
    title: "Discovery & Strategy (Cetak Biru)",
    description: "Kami duduk bersama Anda untuk membedah visi bisnis, menganalisis kebutuhan arsitektur database, menetapkan cakupan fungsional sistem, dan merancang dokumen SRS (Software Requirement Specification) yang matang.",
    icon: <MessageSquareCode className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.15)]",
    deliverables: ["Dokumen Spek Sistem", "Analisis Target Budget", "Timeline Gantt Chart"]
  },
  {
    phase: "02",
    title: "High-Fidelity UI/UX (Prototipe Visual)",
    description: "Mengonversi ide abstrak menjadi cetak biru visual interaktif di Figma. Kami merancang tata letak premium dengan fokus mendalam pada konversi user journey, aksesibilitas responsif, dan animasi mikro pra-koding.",
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-400",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    deliverables: ["Link Prototipe Figma", "Aset Visual Teroptimasi", "Panduan Style Guide"]
  },
  {
    phase: "03",
    title: "Full-Stack Engineering (Produksi Kode)",
    description: "Tahap di mana arsitektur digital mulai bernapas. Kami menulis baris kode yang bersih, aman, dan modular menggunakan Next.js tingkat lanjut, TypeScript, Tailwind CSS, serta mengintegrasikan database dan API pihak ketiga.",
    icon: <Terminal className="w-6 h-6" />,
    color: "from-pink-500 to-rose-400",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    deliverables: ["Source Code Bersih (GitHub)", "Arsitektur API Skalabel", "Optimasi Core Web Vitals"]
  },
  {
    phase: "04",
    title: "QA & Deployment (Peluncuran Sistem)",
    description: "Sistem diuji secara ekstrem melalui serangkaian pengujian stress-test, audit celah keamanan, dan verifikasi lintas browser. Setelah dinyatakan sempurna, sistem langsung di-deploy ke server cloud production Anda.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "from-emerald-500 to-green-400",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    deliverables: ["Sistem Live di Domain Utama", "6 Bulan Garansi Bug-Free", "Dokumentasi Handover Lengkap"]
  }
];

export default function Workflow() {
  return (
    <section id="alur-kerja" className="py-32 bg-[#020202] relative z-10 overflow-hidden">
      
      {/* Background Subtle Ambient Aura */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-20">
        
        {/* Header Title */}
        <div className="text-center mb-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-cyan-400 mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} /> Pipeline Eksekusi Presisi
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Bagaimana Kami Mengeksekusi <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Ide Besar Anda Menjadi Nyata.
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Metodologi kerja transparan, terstruktur, dan tanpa tebak-tebakan. Setiap tahap dirancang untuk menjaga kualitas kode tertinggi dan ketepatan waktu rilis.
          </p>
        </div>

        {/* PIPELINE CONTAINER JALUR KERJA */}
        <div className="relative border-l border-white/5 md:border-l-0 ml-4 md:ml-0 space-y-16 md:space-y-0">
          
          {/* Garis Tengah Penghubung Otomatis di Desktop */}
          <div className="hidden md:block absolute top-[140px] bottom-[140px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-emerald-500/30 -z-10"></div>

          {workflowSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={step.phase} className="relative w-full flex flex-col md:flex-row items-stretch md:justify-between group">
                
                {/* 1. BLOK SISI KIRI (Hanya muncul jika indeks genap di desktop) */}
                <div className={`w-full md:w-[45%] flex flex-col justify-center ${isEven ? 'md:text-right md:items-end' : 'md:opacity-0 pointer-events-none order-last md:order-none'}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="p-8 rounded-[2rem] bg-[#0A0A0F]/80 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all duration-300"
                    >
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">{step.description}</p>
                      
                      {/* Deliverables Output Box */}
                      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                        {step.deliverables.map((del, i) => (
                          <span key={i} className="text-[10px] md:text-xs font-semibold px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-300">
                            ✓ {del}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 2. NODUS / NODE PIN TENGAH */}
                <div className="absolute -left-4 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className={`w-9 h-9 rounded-xl bg-black border-2 border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/30 transition-all text-gray-400 ${step.glow}`}
                  >
                    <div className={`w-2 h-2 rounded-md bg-gradient-to-r ${step.color} animate-pulse`}></div>
                  </motion.div>
                </div>

                {/* 3. BLOK SISI KANAN (Hanya muncul jika indeks ganjil di desktop) */}
                <div className={`w-full md:w-[45%] pl-8 md:pl-0 flex flex-col justify-center ${!isEven ? 'md:text-left md:items-start' : 'md:opacity-0 pointer-events-none'}`}>
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="p-8 rounded-[2rem] bg-[#0A0A0F]/80 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all duration-300"
                    >
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">{step.description}</p>
                      
                      {/* Deliverables Output Box */}
                      <div className="flex flex-wrap gap-2 justify-start">
                        {step.deliverables.map((del, i) => (
                          <span key={i} className="text-[10px] md:text-xs font-semibold px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-300">
                            ✓ {del}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* NOMOR INDEKS BACKDROP RAKSASA (Mewah & Transparan) */}
                <span className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.01] select-none pointer-events-none group-hover:text-white/[0.02] group-hover:scale-105 transition-all duration-700 font-sans tracking-tighter">
                  {step.phase}
                </span>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}