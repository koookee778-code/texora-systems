import React, { useEffect, useState } from 'react';
import { 
  Sparkles, Cpu, Zap, Code2, ShieldCheck, Gauge, 
  Terminal, Database, Bot, ArrowDown 
} from 'lucide-react';
import type { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect states
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const fullTitle = isAr ? 'TEXORA SYSTEMS' : 'TEXORA SYSTEMS';
  const fullSubtitle = isAr ? 'هندسة الأنظمة الرقمية الفائقة' : 'Architects of Digital Dominance';

  useEffect(() => {
    let i = 0;
    setTypedTitle('');
    const timer = setInterval(() => {
      if (i < fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 70);
    return () => clearInterval(timer);
  }, [fullTitle]);

  useEffect(() => {
    let j = 0;
    setTypedSubtitle('');
    const delayTimer = setTimeout(() => {
      const subTimer = setInterval(() => {
        if (j < fullSubtitle.length) {
          setTypedSubtitle(fullSubtitle.slice(0, j + 1));
          j++;
        } else {
          clearInterval(subTimer);
        }
      }, 50);
      return () => clearInterval(subTimer);
    }, 900);
    return () => clearTimeout(delayTimer);
  }, [fullSubtitle]);

  // Track mouse for 3D reactive parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / (innerWidth / 2),
        y: (e.clientY - innerHeight / 2) / (innerHeight / 2),
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Long generous scroll track (2800px)
  const heroHeight = 2800;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= STAGE PROGRESSIONS =================
  // Stage 1 (0 to 0.25): Flanking texts actively EVADE outwards to left & right
  const evadeFactor = Math.min(progress / 0.18, 1);
  const leftTextTranslateX = -evadeFactor * 180; // Fly to left
  const rightTextTranslateX = evadeFactor * 180; // Fly to right
  const textOpacity = Math.max(1 - evadeFactor * 1.5, 0);

  // Stage 2 (0.22 to 0.55): Superpowers HUD (Speed, Languages, Features, Experience)
  const hudProgress = Math.min(Math.max((progress - 0.20) / 0.28, 0), 1);
  const hudFadeOut = Math.min(Math.max((progress - 0.48) / 0.12, 0), 1);
  const hudOpacity = hudProgress > 0 ? (hudProgress < 1 ? hudProgress : Math.max(1 - hudFadeOut * 2, 0)) : 0;

  // Stage 3 (0.55 to 0.95): The White Stage Transition
  // Entire screen becomes radiant, luxury white
  const whiteStageOpacity = Math.min(Math.max((progress - 0.52) / 0.22, 0), 1);

  // Brand Name Assembly: Left-to-Right (Logo is 'T' on LEFT, 'EXORA' to the RIGHT)
  const lettersProgress = Math.min(Math.max((progress - 0.62) / 0.24, 0), 1);

  // 3D Emblem Coordinates & Rotation
  const rotateX = mousePos.y * -15 + (progress < 0.5 ? progress * 30 : 0);
  const rotateY = mousePos.x * 20 + progress * 50;

  // Scale and Position calculation
  // In early stage: centers and scales down.
  // In white stage: glides to the LEFT (dir="ltr") to anchor as 'T'
  let logoTransform = '';
  if (progress < 0.55) {
    const scale = 1 + progress * 0.3;
    const translateY = progress * 240;
    logoTransform = `translate3d(0px, ${translateY}px, 0px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  } else {
    // Docking to the LEFT side of 'EXORA' in LTR layout
    const glideLeft = lettersProgress * -220; // Move emblem to the LEFT
    const scale = 1.3 - lettersProgress * 0.45;
    logoTransform = `translate3d(${glideLeft}px, ${progress * 70}px, 0px) scale(${scale}) perspective(1000px) rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
  }

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 400}px` }}>
      {/* Sticky Fullscreen Scrollytelling Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none">
        
        {/* ================= BACKGROUND 1: DEEP ROYAL BLUE WITH GEOMETRIC WIREFRAME ================= */}
        <div 
          className="absolute inset-0 bg-[#02091d] transition-opacity duration-500 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          {/* Deep Royal Blue Radial Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0c2d6b_0%,#04163d_50%,#02091d_100%)] opacity-90" />

          {/* Geometric Grid Overlay */}
          <div className="absolute inset-0 geometric-grid opacity-30" />

          {/* Radiant Cyan & Azure Bloom Centers */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/20 via-sky-500/25 to-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-[#02091d] via-[#04163d]/60 to-transparent pointer-events-none" />
        </div>

        {/* ================= BACKGROUND 2: RADIANT LUXURY PURE WHITE STAGE ================= */}
        <div 
          className="absolute inset-0 brand-white-stage transition-opacity duration-700 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          {/* Subtle light geometric grid on white canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-sky-100/70 via-white to-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ================= STAGE 1: EVADING TEXT (LEFT & RIGHT) ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 flex justify-between items-center pointer-events-none">
          
          {/* Left Flanking Block (Dodges to the far LEFT) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: textOpacity,
              filter: `blur(${evadeFactor * 10}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Systems</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-black text-white font-['Syne'] leading-tight tracking-tight">
              {typedTitle}
              <span className="inline-block w-2.5 h-8 md:h-12 bg-cyan-400 ml-1 animate-blink" />
            </h1>

            <p className="mt-3 text-sm md:text-base text-sky-200/80 max-w-sm font-light leading-relaxed">
              {typedSubtitle}
            </p>
          </div>

          {/* Center clearance for 3D Emblem */}
          <div className="w-2/12" />

          {/* Right Flanking Block (Dodges to the far RIGHT) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: textOpacity,
              filter: `blur(${evadeFactor * 10}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase shadow-[0_0_15px_rgba(96,165,250,0.2)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? 'ذكاء اصطناعي وأتمتة' : 'Autonomous Engineering'}</span>
            </div>

            <h2 className="text-2xl md:text-5xl font-black text-white font-['Cairo'] leading-tight tracking-tight">
              {isAr ? 'صناعة القوة الرقمية' : 'BEYOND CODE'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 via-sky-200 to-white">
                {isAr ? 'للشركات والمؤسسات' : 'BEYOND LIMITS'}
              </span>
            </h2>

            <p className="mt-3 text-xs md:text-sm text-sky-200/80 max-w-xs font-light text-right leading-relaxed">
              {isAr 
                ? 'أنظمة صيدليات متطورة • نقاط بيع متاجر وبرندات • منصات تعليمية تفاعلية • بوتات واتساب 24/7'
                : 'Enterprise Pharmacy POS • Multi-Branch Retail • DRM Protected LMS • 24/7 AI WhatsApp Agents'}
            </p>
          </div>
        </div>

        {/* ================= STAGE 2: HUD SHOWCASE (SPEED, LANGUAGES, EXPERIENCE, FEATURES) ================= */}
        {/* Appears during scroll in the deep blue stage */}
        <div 
          className="absolute z-15 w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-4 pointer-events-none transition-all duration-300"
          style={{
            opacity: hudOpacity,
            transform: `translateY(${(1 - hudProgress) * 60 - hudFadeOut * 40}px)`,
          }}
        >
          {/* Card 1: Extreme Velocity (السرعة) */}
          <div className="glow-card rounded-2xl bg-blue-950/70 border border-cyan-500/30 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Gauge className="w-5 h-5" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider">{isAr ? 'السرعة الخارقة' : 'Ultra Velocity'}</span>
            </div>
            <div className="text-2xl font-black text-white font-mono">18ms</div>
            <span className="text-xs text-sky-200/80 font-light mt-1 block">
              {isAr ? 'استجابة لحظية عالمية عبر شبكات Edge' : 'Sub-second global edge network latency'}
            </span>
          </div>

          {/* Card 2: Languages & Stack (اللغات والتقنيات) */}
          <div className="glow-card rounded-2xl bg-blue-950/70 border border-cyan-500/30 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Code2 className="w-5 h-5" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider">{isAr ? 'اللغات والترسانة' : 'Core Tech Stack'}</span>
            </div>
            <div className="text-sm font-bold text-white font-mono truncate">TypeScript • Python • Go</div>
            <span className="text-xs text-sky-200/80 font-light mt-1 block">
              React 19, Cloudflare Edge, Supabase, LLMs
            </span>
          </div>

          {/* Card 3: Enterprise Superpowers (المميزات) */}
          <div className="glow-card rounded-2xl bg-blue-950/70 border border-cyan-500/30 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider">{isAr ? 'المميزات الفائقة' : 'Superpowers'}</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">100% Offline-Ready</div>
            <span className="text-xs text-sky-200/80 font-light mt-1 block">
              {isAr ? 'نظام كاشير يواصل البيع دون انقطاع' : 'Uninterrupted offline POS resiliency'}
            </span>
          </div>

          {/* Card 4: Authority & Experience (الخبرة والموثوقية) */}
          <div className="glow-card rounded-2xl bg-blue-950/70 border border-cyan-500/30 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider">{isAr ? 'الخبرة والضمان' : 'Proven Mastery'}</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">99.99%</div>
            <span className="text-xs text-sky-200/80 font-light mt-1 block">
              {isAr ? 'ضمان أمان البيانات وتشغيل الأنظمة' : 'Enterprise SLA & daily automated backups'}
            </span>
          </div>
        </div>

        {/* ================= 3D EMBLEM & LEFT-TO-RIGHT 'TEXORA' REVELATION ================= */}
        {/* 
            Strictly LTR:
            The Logo is on the LEFT acting as 'T'
            The letters 'E X O R A' flow to the RIGHT!
        */}
        <div 
          className="absolute z-20 flex items-center justify-center transition-all duration-100 ease-out pointer-events-none"
          style={{ transform: logoTransform }}
          dir="ltr"
        >
          <div className="relative flex items-center justify-center">
            
            {/* Specular Aura Halo */}
            <div 
              className="absolute -inset-12 rounded-full blur-3xl transition-opacity duration-500"
              style={{
                background: whiteStageOpacity > 0.5 
                  ? 'radial-gradient(circle, rgba(148, 163, 184, 0.45) 0%, rgba(255,255,255,0) 70%)' 
                  : 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(30, 58, 138, 0.3) 50%, rgba(0,0,0,0) 70%)',
                opacity: 0.9
              }}
            />

            {/* The Majestic 3D Emblem (Letter 'T') */}
            <div className="relative group transition-transform duration-300">
              <img
                src={whiteStageOpacity > 0.5 ? '/assets/texora-logo-dark-tight.png' : '/assets/texora-logo-clean-tight.png'}
                alt="Texora Logo Emblem"
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 object-contain transition-all duration-500"
                style={{
                  filter: whiteStageOpacity > 0.5 
                    ? 'drop-shadow(0 20px 30px rgba(15, 23, 42, 0.3)) brightness(0.95)' 
                    : 'drop-shadow(0 0 40px rgba(56, 189, 248, 0.6)) drop-shadow(0 20px 35px rgba(2, 9, 29, 0.9))',
                }}
              />
            </div>

            {/* ================= THE LETTERS 'E X O R A' TO THE RIGHT (LTR) ================= */}
            <div 
              className="flex items-center tracking-tight transition-all duration-500 overflow-hidden"
              style={{
                width: `${lettersProgress * 460}px`,
                opacity: lettersProgress,
                marginLeft: '12px',
              }}
            >
              <span 
                className="font-black text-6xl sm:text-7xl md:text-9xl font-['Syne'] tracking-wider select-none"
                style={{
                  background: 'linear-gradient(135deg, #091328 0%, #172554 35%, #1e3a8a 65%, #0284c7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.12em',
                }}
              >
                EXORA
              </span>
            </div>

          </div>
        </div>

        {/* ================= WHITE STAGE VALUE BANNER ================= */}
        <div 
          className="absolute z-20 bottom-24 flex flex-col items-center text-center px-6 transition-all duration-500 max-w-3xl"
          style={{
            opacity: lettersProgress > 0.6 ? (lettersProgress - 0.6) * 2.5 : 0,
            transform: `translateY(${(1 - lettersProgress) * 40}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 text-slate-800 text-xs md:text-sm font-semibold mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
            <span>{isAr ? 'الشركة الرائدة في صناعة الأنظمة الرقمية الفائقة' : 'Engineered for Digital Supremacy'}</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-['Cairo']">
            {isAr 
              ? 'نحوّل الرؤى البرمجية إلى أنظمة استثنائية تقود السوق' 
              : 'Architecting Systems That Redefine Modern Commerce'}
          </h3>

          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
            {isAr 
              ? 'مواقع سريعة البرق • منصات تعليمية LMS بحماية DRM • أنظمة صيدليات ومتاجر POS • بوتات واتساب ذكية 24/7' 
              : 'High-Speed Web Platforms • DRM Protected LMS • Pharmacy & Retail POS • Autonomous WhatsApp AI'}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a 
              href="#systems" 
              className="px-7 py-3 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition shadow-xl hover:scale-105 pointer-events-auto flex items-center gap-2"
            >
              <span>{isAr ? 'استكشف الترسانة البرمجية' : 'Explore Software Ecosystem'}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <a 
              href="#calculator" 
              className="px-7 py-3 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 transition shadow-md pointer-events-auto"
            >
              {isAr ? 'احسب تكلفة مشروعك' : 'Calculate Estimate'}
            </a>
          </div>
        </div>

        {/* ================= SCROLL INVITATION INDICATOR ================= */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: progress < 0.15 ? 1 - progress * 6 : 0,
            transform: `translate(-50%, ${progress * 25}px)`
          }}
        >
          <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold font-['Syne'] animate-pulse">
            {isAr ? 'مرر للأسفل لاكتشاف القوة البرمجية' : 'SCROLL TO EXPLORE'}
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-cyan-400/50 flex justify-center p-1">
            <div className="w-1 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
};
