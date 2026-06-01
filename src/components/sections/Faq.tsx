'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Terminal,
  ShieldCheck,
  Layers,
  MessageCircle,
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Semua', icon: Layers },
  { id: 'tech', name: 'Web 3D', icon: Terminal },
  { id: 'enterprise', name: 'Enterprise', icon: Sparkles },
  { id: 'logistics', name: 'Logistik', icon: ShieldCheck },
];

const faqs = [
  {
    category: 'tech',
    q: 'Bagaimana alur pengembangan Web 3D Immersive?',
    a: 'Kami memulai dari wireframe, desain visual, optimasi asset 3D, implementasi Three.js atau React Three Fiber, hingga optimasi performa agar tetap ringan di perangkat desktop maupun mobile.',
  },
  {
    category: 'enterprise',
    q: 'Apakah sistem mendukung integrasi API pihak ketiga?',
    a: 'Ya. Kami mendukung integrasi payment gateway, ERP, CRM, WhatsApp API, Email Automation, hingga custom REST API dan GraphQL.',
  },
  {
    category: 'logistics',
    q: 'Apakah dapat membantu digitalisasi dokumen perusahaan?',
    a: 'Tentu. Kami memiliki pengalaman membangun sistem administrasi, pelaporan, manajemen dokumen, tracking operasional, hingga dashboard monitoring real-time.',
  },
  {
    category: 'tech',
    q: 'Berapa lama pengerjaan proyek?',
    a: 'Landing page premium umumnya 1–2 minggu. Dashboard custom 3–6 minggu. Sistem enterprise kompleks dapat memerlukan waktu lebih panjang sesuai scope.',
  },
  {
    category: 'enterprise',
    q: 'Bagaimana keamanan data sistem?',
    a: 'Kami menerapkan JWT Authentication, HTTPS, Input Validation, Role Permission Management, Rate Limiting, dan enkripsi data sesuai kebutuhan proyek.',
  },
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCategory =
        category === 'all' || item.category === category;

      const matchSearch =
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28 bg-[#030305]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6">
            <HelpCircle size={14} className="text-purple-400" />
            Frequently Asked Questions
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Semua Jawaban
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ada di Sini
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Temukan jawaban mengenai pengembangan website,
            sistem enterprise, integrasi API, hingga digitalisasi
            proses bisnis perusahaan.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { value: '500+', label: 'Pertanyaan Terjawab' },
            { value: '99%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'Support Ready' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
            >
              <h3 className="text-3xl font-black text-white">
                {item.value}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full h-16
              rounded-2xl
              pl-14 pr-5
              bg-white/[0.03]
              border border-white/10
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-purple-500/40
              transition-all
            "
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`
                  px-5 py-3 rounded-2xl
                  flex items-center gap-2
                  text-sm font-semibold
                  transition-all duration-300

                  ${
                    active
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white'
                  }
                `}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((item, index) => {
              const expanded = openIndex === index;

              return (
                <motion.div
                  key={item.q}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    rounded-3xl
                    overflow-hidden
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                  "
                >
                  <button
                    onClick={() =>
                      setOpenIndex(
                        expanded ? null : index
                      )
                    }
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-6
                      text-left
                    "
                  >
                    <h3 className="font-bold text-white text-lg">
                      {item.q}
                    </h3>

                    <motion.div
                      animate={{
                        rotate: expanded ? 180 : 0,
                      }}
                    >
                      <ChevronDown
                        className="text-purple-400"
                        size={20}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-20">
          <div
            className="
            relative overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-white/[0.05]
            to-white/[0.02]
            backdrop-blur-2xl
            p-10
            text-center
          "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10" />

            <div className="relative z-10">
              <MessageCircle
                size={40}
                className="mx-auto text-purple-400 mb-4"
              />

              <h3 className="text-3xl font-black text-white mb-3">
                Masih Ada Pertanyaan?
              </h3>

              <p className="text-gray-400 mb-8">
                Konsultasikan kebutuhan proyek Anda secara
                langsung dengan tim kami.
              </p>

              <button
                className="
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                via-blue-500
                to-cyan-500
                text-white
                font-bold
                hover:scale-105
                transition-all
              "
              >
                Jadwalkan Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
