'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  type Variants
} from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Award, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// DATA & CONFIGURATION
// ============================================

const testimonials = [
  {
    id: 1,
    name: "Ibu Yeni",
    role: "Direktur Operasional",
    company: "CV. Anugerah",
    image: "https://ui-avatars.com/api/?name=Ibu+Yeni&background=0EA5E9&color=fff&bold=true&size=128",
    review: "Sistem administrasi dokumen pelayaran dan manajemen demurrage yang dikembangkan sangat akurat. Proses birokrasi dan penerbitan faktur menjadi jauh lebih efisien dan minim human error berkat alur kerja yang terstruktur.",
    rating: 5,
    metric: "+95% Efisiensi",
    verified: true,
    duration: "5 bulan"
  },
  {
    id: 2,
    name: "Pak Indra",
    role: "Project Stakeholder",
    company: "Enterprise System",
    image: "https://ui-avatars.com/api/?name=Pak+Indra&background=06B6D4&color=fff&bold=true&size=128",
    review: "Sebagai seseorang dengan background non-IT, cara penjelasan alur arsitektur dan proposal bisnis sangat mudah dipahami. Solusi integrasi backend yang diberikan sangat skalabel untuk kebutuhan jangka panjang kami.",
    rating: 5,
    metric: "10x Skalabilitas",
    verified: true,
    duration: "8 bulan"
  },
  {
    id: 3,
    name: "Manajemen TTSS",
    role: "Tim Logistik & Armada",
    company: "PT Tujuh Tunas Satu Samudera",
    image: "https://ui-avatars.com/api/?name=TTSS&background=0891B2&color=fff&bold=true&size=128",
    review: "Pembuatan aplikasi maritim berjalan sangat lancar. Perhatian terhadap detail UI/UX di level perusahaan logistik sangat luar biasa, terutama pada integrasi assets dan identitas visual aplikasi kami.",
    rating: 5,
    metric: "50+ Fitur Maritim",
    verified: true,
    duration: "12 bulan"
  },
  {
    id: 4,
    name: "Diana",
    role: "Creative Director",
    company: "Diva Phone",
    image: "https://ui-avatars.com/api/?name=Diana&background=164E63&color=fff&bold=true&size=128",
    review: "Landing page marketing dengan konsep 3D immersive experience yang dibuat benar-benar premium, futuristik, dan interaktif (4D). Sangat merepresentasikan identitas modern brand kami.",
    rating: 5,
    metric: "+300% Engagement",
    verified: true,
    duration: "3 bulan"
  }
];

const trustMetrics = [
  { icon: Users, label: "Klien Puas", value: "1000+", color: "from-cyan-400 to-blue-500" },
  { icon: Award, label: "Rating Rata-rata", value: "4.9/5", color: "from-blue-400 to-indigo-500" },
  { icon: TrendingUp, label: "Pertumbuhan", value: "98%", color: "from-indigo-400 to-purple-500" }
];

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants: Variants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const starVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
    },
  }),
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function UltraPremiumTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Mount state untuk prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-carousel logic dengan proper cleanup
  useEffect(() => {
    if (!isPlaying || !isMounted) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPlaying, isMounted]);

  // Handlers dengan useCallback untuk optimization
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
  setActiveIndex(index);
  setIsPlaying(false);
}, []);

  const currentTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-slate-950" id="testimonials">
      {/* ========== BACKGROUND ELEMENTS ========== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Animated blur circles */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl opacity-40" />

        {/* Gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-300">Dipercaya oleh 1000+ Klien di Seluruh Indonesia</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white">
              Suara Kepercayaan
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-3">
                Dari Ribuan Klien Kami
              </span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl font-light"
          >
            Ribuan perusahaan telah mempercayai solusi inovatif kami untuk mentransformasi bisnis mereka. Dengarkan kisah sukses mereka.
          </motion.p>
        </motion.div>

        {/* MAIN CONTENT AREA */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* LEFT SIDE: TESTIMONIAL CARD */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="group relative"
              >
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl" />

                {/* Main card container */}
                <div className="relative p-8 md:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl opacity-50" />

                  {/* Quote icon watermark */}
                  <div className="absolute -top-8 -right-8 text-white/5 pointer-events-none">
                    <Quote size={240} strokeWidth={1} />
                  </div>

                  <div className="relative z-10">
                    {/* Rating stars with animation */}
                    <motion.div className="flex gap-2 mb-8" initial={{ opacity: 0 }}>
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={starVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="relative">
                            <Star
                              size={24}
                              className="fill-amber-400 text-amber-400 drop-shadow-lg"
                            />
                            <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md animate-pulse" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Review text */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-xl md:text-2xl font-light text-white leading-relaxed mb-10"
                    >
                      "{currentTestimonial.review}"
                    </motion.blockquote>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="h-1 w-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full mb-10"
                    />

                    {/* Client info section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="flex items-start justify-between gap-6 flex-wrap"
                    >
                      {/* Left: Avatar + Info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-cyan-400/40 ring-offset-2 ring-offset-slate-950 group/avatar">
                            <img
                              src={currentTestimonial.image}
                              alt={currentTestimonial.name}
                              className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                          </div>

                          {/* Verification badge */}
                          {currentTestimonial.verified && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                              className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full ring-2 ring-white/30 flex items-center justify-center"
                            >
                              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                        </div>

                        {/* Info text */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-bold text-white mb-1 truncate">
                            {currentTestimonial.name}
                          </h4>
                          <p className="text-sm text-cyan-300 font-medium mb-1">
                            {currentTestimonial.role}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {currentTestimonial.company}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Sejak {currentTestimonial.duration} lalu
                          </p>
                        </div>
                      </div>

                      {/* Right: Metric badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="flex-shrink-0 px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-400/30 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300"
                      >
                        <p className="text-sm font-bold text-cyan-300 whitespace-nowrap">
                          {currentTestimonial.metric}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: TRUST METRICS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {trustMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-lg border border-white/15 cursor-pointer hover:border-white/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-transparent" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} p-3 mb-4 shadow-lg group-hover:shadow-cyan-500/50 transition-shadow duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>

                    {/* Label */}
                    <p className="text-sm text-gray-400 font-medium mb-2">
                      {metric.label}
                    </p>

                    {/* Value */}
                    <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {metric.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CONTROLS SECTION */}
        <div className="flex flex-col items-center gap-8">
          {/* Progress indicator */}
          <div className="w-full max-w-md h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <motion.div
              key={activeIndex}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: isPlaying ? 7 : 0.5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full shadow-lg shadow-cyan-400/50"
            />
          </div>

          {/* Navigation & controls */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Previous button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white"
              aria-label="Testimonial sebelumnya"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Thumbnail carousel */}
            <div className="flex gap-3 flex-wrap justify-center max-w-lg">
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.button
                    key={testimonial.id}
                    onClick={() => handleThumbnailClick(index)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${
                      isActive ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : 'hover:ring-1 hover:ring-white/30'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative w-14 h-14 md:w-16 md:h-16">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isActive ? '' : 'group-hover:brightness-125'
                        }`}
                      />

                      {/* Active indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 backdrop-blur-sm"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      whileHover={{ opacity: 1, y: -32, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-gray-900 rounded-lg whitespace-nowrap text-xs font-semibold text-white border border-white/20 pointer-events-none shadow-lg z-50"
                    >
                      {testimonial.name}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white"
              aria-label="Testimonial berikutnya"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Play/Pause and indicator */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/60 backdrop-blur-sm transition-all duration-300 text-sm font-semibold text-white flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause size={16} />
                  Jeda
                </>
              ) : (
                <>
                  <Play size={16} />
                  Lanjut
                </>
              )}
            </motion.button>

            {/* Counter indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-gray-400 font-medium px-3 py-2 rounded-full bg-white/5 border border-white/10"
            >
              {activeIndex + 1} / {testimonials.length}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50" />
    </section>
  );
}