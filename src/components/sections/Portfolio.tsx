'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, ArrowRight, Terminal } from 'lucide-react';

// 1. CUSTOM GITHUB ICON (ANTI-ERROR LUCIDE)
const GithubIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Kategori Filter
const categories = ['Semua', 'Web 3D', 'Enterprise & API', 'Event'];

// Data Portofolio 
const portfolioData = [
  {
    id: 1,
    title: "Diva Phone - 3D Immersive",
    category: "Web 3D",
    description: "Landing page premium dengan konsep 3D immersive dan interaksi visual 4D. Menghadirkan pengalaman berselancar yang terasa nyata, hidup, dan futuristik.",
    techStack: ["Next.js", "Three.js", "WebGL"],
    bgImage: "from-indigo-600/20 via-purple-600/20 to-black",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]",
    repoLink: "https://github.com",
    liveLink: "#",
    colSpan: "col-span-1 md:col-span-2", 
  },
  {
    id: 2,
    title: "TTSS Maritime App",
    category: "Enterprise & API",
    description: "Aplikasi manajemen operasional logistik untuk PT Tujuh Tunas Satu Samudera. Mengintegrasikan UI modern dengan database maritim yang presisi.",
    techStack: ["React Native", "PostgreSQL"],
    bgImage: "from-cyan-600/20 via-blue-600/20 to-black",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]",
    repoLink: "https://github.com",
    liveLink: "#",
    colSpan: "col-span-1",
  },
  {
    id: 3,
    title: "Cladhist Data Core",
    category: "Enterprise & API",
    description: "Mendeploy solusi infrastruktur digital, optimasi manajemen data skala menengah, dan arsitektur integrasi API untuk ekosistem internal.",
    techStack: ["Node.js", "AWS", "REST API"],
    bgImage: "from-emerald-600/20 via-teal-600/20 to-black",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]",
    repoLink: "https://github.com",
    liveLink: "#",
    colSpan: "col-span-1",
  },
  {
    id: 4,
    title: "Sahara - Chapter 20",
    category: "Event",
    description: "Website undangan perayaan digital super eksklusif. Dilengkapi dengan animasi mikro yang mulus, tipografi elegan, dan performa web optimal.",
    techStack: ["React", "Tailwind", "GSAP"],
    bgImage: "from-rose-600/20 via-pink-600/20 to-black",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)]",
    repoLink: "https://github.com",
    liveLink: "#",
    colSpan: "col-span-1 md:col-span-2",
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProjects = portfolioData.filter(project => 
    activeCategory === 'Semua' || project.category === activeCategory
  );

  return (
    <section id="portofolio" className="py-32 bg-[#020202] relative z-10 min-h-screen">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white mb-6 backdrop-blur-xl shadow-2xl"
          >
            <Sparkles size={14} className="text-pink-400" /> Mahakarya Rekayasa
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6">
            Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Dimensi.</span>
          </h2>
          
          {/* Smart Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-white text-black shadow-lg scale-100'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* BENTO GRID SPATIAL UI */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[auto]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`group relative flex flex-col rounded-[2.5rem] bg-[#0A0A0F] border border-white/10 overflow-hidden transition-all duration-500 ${project.colSpan} ${project.glowColor}`}
              >
                {/* Visual Area Atas (Glassmorphism Header) */}
                <div className={`relative h-[260px] md:h-[300px] w-full bg-gradient-to-br ${project.bgImage} p-8 flex flex-col justify-between overflow-hidden`}>
                  
                  {/* Efek Noise Halus */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                  
                  {/* Floating Action Bar (Apple Vision Style) */}
                  <div className="relative z-20 flex justify-between items-center bg-black/20 backdrop-blur-md border border-white/10 p-2 pl-5 rounded-full shadow-2xl transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                      {project.category}
                    </span>

                    {/* DOCK IKON SUPER AMAN (CUSTOM SVG) */}
                    <div className="flex gap-2">
                      <a 
                        href={project.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all cursor-pointer shadow-lg"
                      >
                        <GithubIcon size={18} />
                      </a>
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:bg-gray-200 transition-all cursor-pointer shadow-lg"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Judul Timbul */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Area Konten Bawah */}
                <div className="p-8 flex flex-col flex-1 bg-[#050508] relative z-20 border-t border-white/5">
                  <p className="text-gray-400 text-base leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Terminal Style */}
                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Terminal size={16} className="text-gray-500" />
                    </div>
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[12px] font-mono text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tombol Arsip */}
        <div className="mt-20 flex justify-center relative z-20">
  <a 
    href="https://dew-portofolio.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group shadow-2xl backdrop-blur-md"
  >
    <Layers size={18} className="group-hover:text-black transition-colors" />
    Buka Repositori Lengkap
    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
  </a>
</div>

      </div>
    </section>
  );
}