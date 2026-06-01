'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Send, Sparkles, User, Loader2, MessageCircle, Zap, ArrowRight,
  Copy, ThumbsUp, ThumbsDown, Settings, Moon, Sun, RotateCcw, Download,
  Mic, Paperclip, Clock, Check, CheckCheck, MessageSquare, Pin, PinOff,
  AlertCircle, Wifi, WifiOff, Lightbulb, Search, Code2, BookOpen
} from 'lucide-react';

type Message = { 
  role: 'user' | 'ai'; 
  content: string;
  id: string;
  timestamp: Date;
  pinned?: boolean;
  feedback?: 'like' | 'dislike' | null;
  isStreaming?: boolean;
};

const QUICK_SUGGESTIONS = [
  { icon: '✨', text: 'Bantuan Produk', category: 'support' },
  { icon: '🚀', text: 'Fitur Terbaru', category: 'features' },
  { icon: '📊', text: 'Analitik', category: 'analytics' },
  { icon: '⚡', text: 'Optimasi', category: 'optimization' },
];

const SMART_SUGGESTIONS = {
  greeting: [
    'Bagaimana cara memulai?',
    'Apa fitur unggulannya?',
    'Berapa harganya?'
  ],
  technical: [
    'Bagaimana integrasi API?',
    'Dokumentasi tersedia?',
    'Keamanan data bagaimana?'
  ],
  general: [
    'Butuh bantuan?',
    'Ada pertanyaan?',
    'Ceritakan kebutuhan Anda'
  ]
};

export default function UltimateAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Halo! 👋 Saya Nexus AI Assistant Anda yang powered oleh AI terdepan. Siap membantu Anda dengan pertanyaan atau kebutuhan apapun. Pilih salah satu saran atau ketik pertanyaan langsung! 🚀',
      id: '1',
      timestamp: new Date(),
      pinned: false,
      feedback: null,
      isStreaming: false
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const playSound = () => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput('');
    setShowSuggestions(false);
    setShowSmartSuggestions(false);
    setApiError(null);
    
    const newUserMsg: Message = {
      role: 'user',
      content: suggestion,
      id: generateId(),
      timestamp: new Date(),
      pinned: false,
      feedback: null,
      isStreaming: false
    };
    setMessages(prev => [...prev, newUserMsg]);
    sendMessage(suggestion);
  };

  const sendMessage = async (messageText: string) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          history: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Gagal mengirim pesan');
      }

      const data = await response.json();
      
      playSound();

      const newAIMsg: Message = {
        role: 'ai',
        content: data.reply || data.message,
        id: generateId(),
        timestamp: new Date(),
        pinned: false,
        feedback: null,
        isStreaming: false
      };
      
      setMessages(prev => [...prev, newAIMsg]);
      setShowSmartSuggestions(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada server';
      setApiError(errorMessage);
      
      const errorMsg: Message = {
        role: 'ai',
        content: `⚠️ Error: ${errorMessage}. Silakan cek koneksi Anda atau coba lagi nanti.`,
        id: generateId(),
        timestamp: new Date(),
        pinned: false,
        feedback: null,
        isStreaming: false
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || !isOnline) return;

    const userMsg = input.trim();
    setInput('');
    setShowSmartSuggestions(false);
    
    const newUserMsg: Message = {
      role: 'user',
      content: userMsg,
      id: generateId(),
      timestamp: new Date(),
      pinned: false,
      feedback: null,
      isStreaming: false
    };
    setMessages(prev => [...prev, newUserMsg]);
    sendMessage(userMsg);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      playSound();
    });
  };

  const togglePin = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
    ));
    playSound();
  };

  const toggleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedback: msg.feedback === type ? null : type }
        : msg
    ));
    playSound();
  };

  const exportConversation = () => {
    const conversation = messages
      .map(msg => `[${msg.timestamp.toLocaleTimeString('id-ID')}] ${msg.role.toUpperCase()}:\n${msg.content}`)
      .join('\n\n---\n\n');
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(conversation));
    element.setAttribute('download', `conversation-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    playSound();
  };

  const clearConversation = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
      setMessages([
        { 
          role: 'ai', 
          content: 'Percakapan telah direset. Mari mulai obrolan baru! 😊',
          id: generateId(),
          timestamp: new Date(),
          pinned: false,
          feedback: null,
          isStreaming: false
        }
      ]);
      setShowSuggestions(true);
      setApiError(null);
      playSound();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const pinnedMessages = messages.filter(m => m.pinned);

  const bgClass = isDarkMode 
    ? 'from-slate-950/98 via-blue-900/30 to-slate-950/98' 
    : 'from-slate-50 via-blue-50/50 to-slate-50';
  const textClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryBgClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderClass = isDarkMode ? 'border-white/8' : 'border-black/10';
  const inputBgClass = isDarkMode ? 'bg-white/8' : 'bg-black/5';
  const hoverBgClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';

  return (
    <>
      {/* Background Blur Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-40 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-sm`}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 sm:gap-4">
        
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.85, filter: "blur(12px)" }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 25,
                duration: 0.4
              }}
              className={`w-[calc(100vw-32px)] sm:w-[460px] h-[85vh] sm:h-[720px] max-h-[85vh] flex flex-col bg-gradient-to-br ${bgClass} backdrop-blur-2xl border ${borderClass} rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden origin-bottom-right`}
              style={{
                boxShadow: isDarkMode 
                  ? '0 25px 50px -12px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.1)'
                  : '0 25px 50px -12px rgba(59, 130, 246, 0.08), 0 0 40px rgba(59, 130, 246, 0.05)'
              }}
            >
              {/* Online Status & Error Alert */}
              {!isOnline && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-4 py-2 flex items-center gap-2 text-xs ${isDarkMode ? 'bg-red-500/10' : 'bg-red-100/50'} border-b border-red-500/20`}
                >
                  <WifiOff size={14} className="text-red-400" />
                  <span className={isDarkMode ? 'text-red-300' : 'text-red-600'}>Offline Mode - Fitur terbatas</span>
                </motion.div>
              )}

              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-4 py-2 flex items-center gap-2 text-xs ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100/50'} border-b border-amber-500/20`}
                >
                  <AlertCircle size={14} className={isDarkMode ? 'text-amber-400' : 'text-amber-600'} />
                  <span className={isDarkMode ? 'text-amber-300' : 'text-amber-700'}>{apiError}</span>
                  <button 
                    onClick={() => setApiError(null)}
                    className="ml-auto text-xs opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                </motion.div>
              )}

              {/* Premium Header */}
              <div className={`relative px-4 sm:px-5 py-3 sm:py-4 border-b ${borderClass} bg-gradient-to-r ${isDarkMode ? 'from-blue-600/10 via-purple-600/5 to-blue-600/10' : 'from-blue-100/50 via-purple-50/30 to-blue-100/50'} backdrop-blur-xl flex items-center justify-between`}>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`relative flex-shrink-0 flex items-center justify-center w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-gradient-to-br ${isDarkMode ? 'from-blue-500/30 to-purple-500/20' : 'from-blue-200/50 to-purple-200/30'} ${borderClass} border`}>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Bot size={20} className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                    </motion.div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'} border-2 ${isDarkMode ? 'border-slate-950' : 'border-white'} rounded-full shadow-lg ${isDarkMode ? 'shadow-emerald-400/50' : 'shadow-emerald-500/40'} animate-pulse`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-xs sm:text-sm font-bold tracking-wider flex items-center gap-1.5 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      NEXUS AI
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                        <Sparkles size={11} className={isDarkMode ? 'text-purple-400' : 'text-purple-500'} />
                      </motion.div>
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-emerald-400/80' : 'text-emerald-600/80'} font-medium flex items-center gap-1`}>
                      <span className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'} rounded-full animate-pulse`} />
                      {isOnline ? 'Siap Membantu' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-1.5 sm:p-2 ${secondaryBgClass} ${hoverBgClass} rounded-lg transition-all duration-200`}
                    title="Toggle theme"
                  >
                    {isDarkMode ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-blue-600" />}
                  </motion.button>

                  {/* Settings Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-1.5 sm:p-2 ${secondaryBgClass} ${hoverBgClass} rounded-lg transition-all duration-200`}
                    title="Settings"
                  >
                    <Settings size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button 
                    whileHover={{ scale: 1.08, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className={`p-1.5 sm:p-2 ${secondaryBgClass} ${hoverBgClass} rounded-lg transition-all duration-200`}
                  >
                    <X size={14} />
                  </motion.button>
                </div>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-3 border-b ${borderClass} ${secondaryBgClass} backdrop-blur-sm space-y-2`}
                  >
                    <button 
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`w-full px-3 py-2 rounded-lg ${secondaryBgClass} ${hoverBgClass} text-left text-xs sm:text-sm transition-all flex items-center justify-between`}
                    >
                      <span>🔊 Suara Notifikasi</span>
                      <span className={soundEnabled ? 'text-green-400' : 'text-gray-500'}>
                        {soundEnabled ? 'On' : 'Off'}
                      </span>
                    </button>
                    <button 
                      onClick={exportConversation}
                      className={`w-full px-3 py-2 rounded-lg ${secondaryBgClass} ${hoverBgClass} text-left text-xs sm:text-sm transition-all flex items-center justify-between`}
                    >
                      <span className="flex items-center gap-2">
                        <Download size={12} />
                        Unduh Percakapan
                      </span>
                    </button>
                    <button 
                      onClick={clearConversation}
                      className={`w-full px-3 py-2 rounded-lg ${secondaryBgClass} ${hoverBgClass} text-left text-xs sm:text-sm transition-all flex items-center justify-between hover:text-red-400`}
                    >
                      <span className="flex items-center gap-2">
                        <RotateCcw size={12} />
                        Reset Percakapan
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pinned Messages */}
              <AnimatePresence>
                {pinnedMessages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-2 border-b ${borderClass} ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100/30'} backdrop-blur-sm`}
                  >
                    <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                      <Pin size={12} /> Disematkan ({pinnedMessages.length})
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar scroll-smooth"
              >
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                    onMouseEnter={() => setExpandedMessage(msg.id)}
                    onMouseLeave={() => setExpandedMessage(null)}
                  >
                    <div className={`flex gap-2 max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${secondaryBgClass} border ${borderClass} backdrop-blur-sm`}>
                        {msg.role === 'user' ? (
                          <User size={13} className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                        ) : (
                          <Bot size={13} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm leading-relaxed shadow-lg backdrop-blur-sm border ${borderClass} ${
                            msg.role === 'user' 
                              ? isDarkMode 
                                ? 'bg-blue-600/80 text-white rounded-tr-none' 
                                : 'bg-blue-500/70 text-white rounded-tr-none'
                              : isDarkMode
                                ? 'bg-white/5 text-gray-100 rounded-tl-none hover:bg-white/8 transition-colors'
                                : 'bg-gray-100/50 text-gray-800 rounded-tl-none hover:bg-gray-100/70 transition-colors'
                          }`}
                        >
                          {msg.content}
                          {msg.isStreaming && (
                            <span className="inline-block w-2 h-4 ml-1 bg-blue-400/70 animate-pulse rounded-sm" />
                          )}
                        </motion.div>

                        {/* Message Meta & Actions */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: expandedMessage === msg.id ? 1 : 0.7 }}
                          className={`px-2 flex items-center justify-between text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}
                        >
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {formatTime(msg.timestamp)}
                          </span>
                        </motion.div>

                        {/* Action Buttons */}
                        <AnimatePresence>
                          {expandedMessage === msg.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="flex items-center gap-1 flex-wrap"
                            >
                              {msg.role === 'ai' && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => copyToClipboard(msg.content)}
                                    className={`p-1 rounded-md ${secondaryBgClass} ${hoverBgClass} transition-all`}
                                    title="Copy"
                                  >
                                    <Copy size={12} />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => toggleFeedback(msg.id, 'like')}
                                    className={`p-1 rounded-md ${secondaryBgClass} ${hoverBgClass} transition-all ${msg.feedback === 'like' ? 'text-green-400' : ''}`}
                                    title="Like"
                                  >
                                    <ThumbsUp size={12} />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => toggleFeedback(msg.id, 'dislike')}
                                    className={`p-1 rounded-md ${secondaryBgClass} ${hoverBgClass} transition-all ${msg.feedback === 'dislike' ? 'text-red-400' : ''}`}
                                    title="Dislike"
                                  >
                                    <ThumbsDown size={12} />
                                  </motion.button>
                                </>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => togglePin(msg.id)}
                                className={`p-1 rounded-md ${msg.pinned ? 'bg-amber-500/30' : secondaryBgClass} ${hoverBgClass} transition-all`}
                                title={msg.pinned ? 'Unpin' : 'Pin'}
                              >
                                {msg.pinned ? (
                                  <PinOff size={12} className="text-amber-400" />
                                ) : (
                                  <Pin size={12} />
                                )}
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2 max-w-[90%] sm:max-w-[85%]">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${secondaryBgClass} border ${borderClass} backdrop-blur-sm`}>
                        <Bot size={13} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
                      </div>
                      <div className={`px-4 py-3 rounded-lg ${secondaryBgClass} border ${borderClass} rounded-tl-none backdrop-blur-sm flex items-center gap-2`}>
                        <div className="w-2 h-2 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Quick Suggestions */}
                {showSuggestions && messages.length <= 1 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className={`mt-4 pt-4 border-t ${borderClass}`}
                  >
                    <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>🎯 Saran untuk Anda:</p>
                    <div className="space-y-2">
                      {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4, backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`w-full px-3 py-2.5 rounded-lg ${secondaryBgClass} border ${borderClass} text-left text-xs sm:text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors flex items-center justify-between group`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{suggestion.icon}</span>
                            <span className="font-medium">{suggestion.text}</span>
                          </span>
                          <ArrowRight size={13} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Smart Suggestions */}
                {showSmartSuggestions && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`mt-4 pt-4 border-t ${borderClass}`}
                  >
                    <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>💡 Pertanyaan Lanjutan:</p>
                    <div className="space-y-2">
                      {(SMART_SUGGESTIONS.general || []).map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`w-full px-3 py-2 rounded-lg ${secondaryBgClass} border ${borderClass} text-left text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors group`}
                        >
                          <span className="flex items-center gap-2">
                            <Lightbulb size={12} className={isDarkMode ? 'text-yellow-400/50' : 'text-yellow-600/50'} />
                            <span>{suggestion}</span>
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`px-4 py-3 sm:py-4 bg-gradient-to-t ${isDarkMode ? 'from-slate-950/80 to-slate-950/40' : 'from-slate-100/80 to-slate-100/40'} border-t ${borderClass} backdrop-blur-xl space-y-2`}>
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={!isOnline}
                    className={`p-2 flex-shrink-0 ${secondaryBgClass} border ${borderClass} rounded-lg ${hoverBgClass} transition-all disabled:opacity-50`}
                    title="Attach file"
                  >
                    <Paperclip size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </motion.button>

                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isOnline ? "Ketik pesan Anda..." : "Offline - Tidak bisa mengirim"}
                    disabled={!isOnline || isLoading}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 ${inputBgClass} border ${borderClass} text-xs sm:text-sm rounded-lg focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'} backdrop-blur-sm ${hoverBgClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  />

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={!isOnline}
                    className={`p-2 flex-shrink-0 ${secondaryBgClass} border ${borderClass} rounded-lg ${hoverBgClass} transition-all disabled:opacity-50`}
                    title="Voice input"
                  >
                    <Mic size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!input.trim() || isLoading || !isOnline}
                    className="p-2 flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${isDarkMode ? 'from-blue-600 to-blue-500' : 'from-blue-500 to-blue-400'} text-white shadow-xl flex items-center justify-center relative group overflow-hidden flex-shrink-0`}
          style={{
            boxShadow: isDarkMode
              ? '0 0 25px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)'
              : '0 0 25px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)'
          }}
        >
          {/* Animated glow ring */}
          <motion.div 
            className={`absolute inset-0 rounded-full border-2 ${isDarkMode ? 'border-blue-400/50' : 'border-blue-300/50'}`}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(96, 165, 250, 0.7)',
                '0 0 0 12px rgba(96, 165, 250, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Icon with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X size={24} className="relative z-10" />
              ) : (
                <Bot size={24} className="relative z-10" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Hover glow effect */}
          <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-white/0 group-hover:bg-white/10' : 'bg-white/0 group-hover:bg-white/20'} transition-colors duration-300`} />

          {/* Notification badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse"
          >
            {messages.length}
          </motion.div>
        </motion.button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}