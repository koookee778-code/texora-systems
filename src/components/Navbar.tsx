import React, { useState } from 'react';
import { 
  Menu, X, MessageSquare, Globe, Volume2, VolumeX, 
  Sparkles, Layers, Terminal, Calculator, Send, ShieldCheck
} from 'lucide-react';
import { Language } from '../types';

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
  onOpenPrivacy
}) => {
  const isAr = language === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // When scroll passes 700px, logo is docked in navbar
  const isLogoDocked = scrollY > 650;
  const isScrolled = scrollY > 50;

  const navLinks = [
    { href: '#systems', labelAr: 'الأنظمة والحلول', labelEn: 'Systems & Solutions' },
    { href: '#sandbox', labelAr: 'تجربة حية (Sandbox)', labelEn: 'Live Sandbox' },
    { href: '#projects', labelAr: 'المشاريع والمنصات', labelEn: 'Portfolio' },
    { href: '#calculator', labelAr: 'حاسبة التكلفة', labelEn: 'Cost Estimator' },
    { href: '#contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Docked Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group transition-transform duration-300"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img
              src="/assets/texora-logo-clean-tight.png"
              alt="Texora"
              className={`w-full h-full object-contain transition-all duration-500 ${
                isLogoDocked ? 'scale-100 opacity-100' : 'scale-90 opacity-80'
              } group-hover:scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center tracking-widest font-black text-xl font-['Syne'] text-white">
              <span className="text-cyan-400">T</span>EXORA
            </div>
            <span className="text-[10px] tracking-wider text-gray-400 font-normal uppercase -mt-1 font-['Outfit']">
              {isAr ? 'للأنظمة والبرمجيات' : 'Digital Systems'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition"
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </div>

        {/* Action Controls & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle ambient sound"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition"
            title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت التفاعلي'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition font-['Outfit']"
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
            <span>{isAr ? 'محادثة فورية (WhatsApp)' : 'Instant WhatsApp'}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleLanguage}
            className="p-2 rounded-lg bg-white/5 text-xs font-bold text-gray-300 border border-white/10"
          >
            {isAr ? 'EN' : 'ع'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-b border-white/10 px-6 py-6 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-cyan-400 py-1 transition"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/201012345678?text=مرحباً%20Texora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا واتساب' : 'WhatsApp Us'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
