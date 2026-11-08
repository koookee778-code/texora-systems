import React, { useState } from 'react';
import { 
  Menu, X, MessageSquare, Globe, Volume2, VolumeX 
} from 'lucide-react';
import type { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  scrollY: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenPrivacy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  scrollY,
  soundEnabled,
  onToggleSound,
}) => {
  const isAr = language === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean top bar: Kept completely hidden during the 3D scrollytelling so screen is 100% uncluttered!
  const isScrolledPastHero = scrollY > 4800;
  const isLogoDocked = scrollY > 4800;

  const navLinks = [
    { href: '#systems', labelAr: 'الأنظمة والحلول', labelEn: 'Systems' },
    { href: '#sandbox', labelAr: 'تجربة حية (Sandbox)', labelEn: 'Live Demos' },
    { href: '#projects', labelAr: 'المشاريع والمنصات', labelEn: 'Portfolio' },
    { href: '#calculator', labelAr: 'حاسبة التكلفة', labelEn: 'Estimator' },
    { href: '#contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolledPastHero
          ? 'bg-[#02091d]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl py-3 opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo (LTR formatted) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group transition-transform duration-300"
          dir="ltr"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <img
              src="/assets/texora-logo-clean-tight.png"
              alt="Texora"
              className={`w-full h-full object-contain transition-all duration-500 ${
                isLogoDocked ? 'scale-100 opacity-100' : 'scale-90 opacity-85'
              } group-hover:scale-110 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]`}
            />
          </div>
          <div className="flex items-center tracking-widest font-black text-xl font-['Syne'] text-white">
            <span className="text-cyan-400">T</span>EXORA
          </div>
        </a>

        {/* Desktop Nav Links (Visible when scrolled or hovered) */}
        <div className={`hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full transition-opacity duration-300 ${
          isScrolledPastHero ? 'bg-white/5 border border-white/10 opacity-100' : 'opacity-0 hover:opacity-100'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-sky-100/90 hover:text-cyan-300 hover:bg-white/5 rounded-full transition"
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </div>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle ambient sound"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-sky-300 hover:text-white hover:bg-white/10 transition"
            title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت التفاعلي'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-200 hover:text-white hover:bg-white/10 transition font-['Outfit']"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* WhatsApp Direct CTA Button */}
          <a
            href="https://wa.me/201012345678?text=مرحباً%20Texora%2C%20أرغب%20في%20استشارة%20برمجية%20لنظام%20جديد"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs lg:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transition-all overflow-hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'واتساب فوري' : 'Instant WhatsApp'}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#02091d]/95 border-b border-cyan-500/20 px-6 py-6 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-sky-100 hover:text-cyan-400 py-1 transition"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
