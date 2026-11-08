import React from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import type { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenTerms, onOpenPrivacy }) => {
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-950 border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <img
                src="/assets/texora-logo-clean-tight.png"
                alt="Texora"
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              />
              <span className="text-2xl font-black tracking-widest font-['Syne'] text-white">
                <span className="text-cyan-400">T</span>EXORA
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm leading-relaxed">
              {isAr
                ? 'شركة متخصصة في هندسة البرمجيات المتطورة، بناء منصات التعليم LMS، أنظمة إدارة الصيدليات ونقاط البيع، وتطوير بوتات الذكاء الاصطناعي على الواتساب.'
                : 'Architects of high-performance software, DRM-protected educational platforms, pharmacy/retail POS suites, and autonomous WhatsApp AI agents.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/201012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Core Systems */}
          <div className="space-y-3 text-right">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'الأنظمة والحلول' : 'Core Systems'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#systems" className="hover:text-cyan-400 transition">{isAr ? 'أنظمة الصيدليات (PharmaCare)' : 'Pharmacy POS System'}</a></li>
              <li><a href="#systems" className="hover:text-cyan-400 transition">{isAr ? 'أنظمة المتاجر والبرندات' : 'Retail Brand & Store POS'}</a></li>
              <li><a href="#systems" className="hover:text-cyan-400 transition">{isAr ? 'المنصات التعليمية (EduVerse)' : 'Educational LMS Platform'}</a></li>
              <li><a href="#systems" className="hover:text-cyan-400 transition">{isAr ? 'بوتات الواتساب المؤتمتة' : 'Autonomous WhatsApp AI'}</a></li>
              <li><a href="#systems" className="hover:text-cyan-400 transition">{isAr ? 'المواقع السحابية عالية التحويل' : 'High-Speed Web Apps'}</a></li>
            </ul>
          </div>

          {/* Column 2: Tech Capabilities */}
          <div className="space-y-3 text-right">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'البنية التحتية' : 'Architecture'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-1.5 justify-end">
                <span>Cloudflare Edge Networks</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </li>
              <li className="flex items-center gap-1.5 justify-end">
                <span>Supabase PostgreSQL DB</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </li>
              <li className="flex items-center gap-1.5 justify-end">
                <span>Meta WhatsApp Cloud API</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </li>
              <li className="flex items-center gap-1.5 justify-end">
                <span>Vercel Serverless AI Functions</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-3 text-right">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {isAr ? 'الضمان والسياسات' : 'Legal & SLA'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={onOpenTerms} className="hover:text-cyan-400 transition">
                  {isAr ? 'الشروط والأحكام (Terms)' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-cyan-400 transition">
                  {isAr ? 'سياسة الخصوصية وأمان البيانات' : 'Privacy & Security'}
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition">
                  {isAr ? 'تسعير المشاريع وضمان SLA' : 'Pricing & SLA Guarantee'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} TEXORA SYSTEMS INC. All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
