import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Terminal, Cpu, Globe } from 'lucide-react';
import { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  // Compute scroll progress stages (0 to 1 across hero scrollytelling range of 1400px)
  const heroHeight = 1400;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // Phase 1: Text parting / evading (0 to 0.45)
  // Left and Right text fly away outwards as scroll progresses
  const evadeFactor = Math.min(progress / 0.35, 1);
  const leftTextTranslateX = -evadeFactor * 160; // percentage
  const rightTextTranslateX = evadeFactor * 160; // percentage
  const textOpacity = Math.max(1 - evadeFactor * 1.5, 0);

  // Phase 2: Logo motion in 3D
  // Stage A (0 to 0.45): Center descending and scaling
  // Stage B (0.45 to 0.75): Gliding to the side to form 'T'
  // Stage C (0.75 to 1.0): Docking
  const logoProgress = progress;

  // White stage opacity (fades in between 0.35 and 0.55)
  const whiteStageOpacity = Math.min(Math.max((progress - 0.35) / 0.2, 0), 1);

  // Letter reveal progress (0.48 to 0.75)
  const lettersProgress = Math.min(Math.max((progress - 0.45) / 0.25, 0), 1);

  // 3D rotation angles with mouse interaction + scroll
  const rotateX = mousePos.y * -15 + (logoProgress < 0.5 ? logoProgress * 25 : 0);
  const rotateY = mousePos.x * 20 + logoProgress * 45;
  const logoScale = logoProgress < 0.45 
    ? 1 + logoProgress * 0.4 
    : 1.4 - (logoProgress - 0.45) * 1.2;

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 300}px` }}>
      {/* Sticky viewport frame that orchestrates the entire scrollytelling show */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none">
        
        {/* ================= BACKGROUND STAGE 1: DARK CYBER SPACE ================= */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-950 via-[#070b19] to-gray-950 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          {/* Radial cyan and purple glow centers */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/10 via-sky-500/15 to-purple-600/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-t from-cyan-950/20 to-transparent blur-3xl pointer-events-none" />
          
          {/* Subtle grid lines */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* ================= BACKGROUND STAGE 2: RADIANT WHITE LUXURY CANVAS ================= */}
        <div 
          className="absolute inset-0 brand-white-stage transition-opacity duration-500 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          {/* Subtle metallic silver aura and grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-sky-100/60 via-white to-purple-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ================= EVADING TEXT: LEFT & RIGHT ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 flex justify-between items-center pointer-events-none">
          
          {/* Left Flanking Block (Escapes to the Left) */}
          <div 
            className="w-1/3 transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: textOpacity,
              filter: `blur(${evadeFactor * 8}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Systems</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-['Syne'] leading-tight">
              TEXORA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                ARCHITECTURE
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400 max-w-xs font-light">
              {isAr 
                ? 'هندسة الأنظمة البرمجية الفائقة، منصات التعليم، وحلول المتاجر المتقدمة.'
                : 'Engineering high-performance enterprise platforms and retail architectures.'}
            </p>
          </div>

          {/* Center Space for the Floating 3D Logo */}
          <div className="w-1/3" />

          {/* Right Flanking Block (Escapes to the Right) */}
          <div 
            className="w-1/3 transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: textOpacity,
              filter: `blur(${evadeFactor * 8}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3 tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? 'ذكاء اصطناعي مؤتمت' : 'Autonomous AI'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-['Cairo'] leading-tight">
              {isAr ? 'هندسة المستقبل' : 'BEYOND CODE'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-purple-400 via-pink-300 to-sky-300">
                {isAr ? 'الرقمي المتكامل' : 'BEYOND HORIZONS'}
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400 max-w-xs font-light text-right">
              {isAr 
                ? 'أنظمة صيدليات، متاجر، برندات، وبوتات واتساب فورية بدون تدخل بشري.'
                : 'Pharmacies, retail brands, educational platforms and 24/7 AI WhatsApp bots.'}
            </p>
          </div>
        </div>

        {/* ================= 3D LOGO & DYNAMIC STAGE TRANSFORMATION ================= */}
        {/* 
            In the initial stage (0 - 0.4): Logo is at center (x: 0, y: 0)
            In the transition stage (0.4 - 0.7): Logo glides to the side to become the letter 'T'
            In the white stage: 'E X O R A' reveals beside it!
        */}
        <div 
          className="absolute z-20 flex items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
          style={{
            transform: progress < 0.45
              ? `translateY(${progress * 180}px) scale(${logoScale}) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              : `translate(${isAr ? (1 - lettersProgress) * 0 - (lettersProgress * 180) : -(1 - lettersProgress) * 0 - (lettersProgress * 240)}px, ${progress * 90}px) scale(${logoScale}) perspective(1000px) rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg)`,
          }}
        >
          {/* Logo container with specular lighting and glow */}
          <div className="relative flex items-center justify-center">
            {/* Ambient specular bloom */}
            <div 
              className="absolute -inset-10 rounded-full blur-2xl transition-opacity duration-300"
              style={{
                background: whiteStageOpacity > 0.5 
                  ? 'radial-gradient(circle, rgba(148, 163, 184, 0.4) 0%, rgba(255,255,255,0) 70%)' 
                  : 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(0,0,0,0) 70%)',
                opacity: 0.8
              }}
            />

            {/* The 3D Emblem Image */}
            <div className="relative group transition-transform duration-300">
              <img
                src={whiteStageOpacity > 0.5 ? '/assets/texora-logo-dark-tight.png' : '/assets/texora-logo-clean-tight.png'}
                alt="Texora 3D Emblem"
                className="w-32 h-32 md:w-56 md:h-56 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] transition-all duration-300"
                style={{
                  filter: whiteStageOpacity > 0.5 
                    ? 'drop-shadow(0 15px 25px rgba(15, 23, 42, 0.25)) brightness(0.95)' 
                    : 'drop-shadow(0 0 35px rgba(56, 189, 248, 0.45)) drop-shadow(0 20px 25px rgba(0,0,0,0.8))',
                }}
              />
              
              {/* Subtle 3D light reflection sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
            </div>

            {/* ================= THE WHITE STAGE: 'E X O R A' REVEAL ================= */}
            {/* 
                The emblem acts as the 'T', and beside it we reveal 'EXORA' in massive typography!
            */}
            <div 
              className="flex items-center tracking-tight transition-all duration-500 overflow-hidden"
              style={{
                width: `${lettersProgress * (isAr ? 380 : 440)}px`,
                opacity: lettersProgress,
                transform: `translateX(${isAr ? '-10px' : '15px'})`,
              }}
            >
              <span 
                className="font-black text-6xl md:text-8xl tracking-widest font-['Syne']"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 70%, #0284c7 100%)',
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

        {/* ================= WHITE STAGE SUBTITLE & VALUE PROPOSITION ================= */}
        <div 
          className="absolute z-20 bottom-24 flex flex-col items-center text-center px-6 transition-all duration-500 max-w-3xl"
          style={{
            opacity: lettersProgress > 0.6 ? (lettersProgress - 0.6) * 2.5 : 0,
            transform: `translateY(${(1 - lettersProgress) * 40}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 text-slate-800 text-xs md:text-sm font-semibold mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
            <span>{isAr ? 'الشركة الرائدة في صناعة الأنظمة الرقمية الفائقة' : 'Leading High-Performance Software Engineering'}</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-['Cairo']">
            {isAr 
              ? 'نبتكر الأنظمة التي تصنع الفارق.. من الفكرة إلى السيادة الرقمية' 
              : 'Architecting Systems That Redefine Industries'}
          </h3>

          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
            {isAr 
              ? 'مواقع متطورة • منصات تعليمية تفاعلية • أنظمة كاشير ونقاط بيع للصيدليات والمتاجر • بوتات واتساب ذكية مؤتمتة بدون موظفين' 
              : 'Enterprise Web Applications • LMS Educational Platforms • Pharmacy & Retail POS • Autonomous WhatsApp AI Bots'}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a 
              href="#systems" 
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition shadow-lg hover:shadow-xl pointer-events-auto flex items-center gap-2"
            >
              <span>{isAr ? 'استكشف الأنظمة البرمجية' : 'Explore Systems'}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <a 
              href="#calculator" 
              className="px-6 py-2.5 rounded-full bg-white/80 border border-slate-300 text-slate-800 font-medium text-sm hover:bg-white transition shadow-sm pointer-events-auto"
            >
              {isAr ? 'احسب تكلفة مشروعك' : 'Calculate Cost'}
            </a>
          </div>
        </div>

        {/* ================= SCROLL DOWN INVITATION INDICATOR ================= */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: progress < 0.25 ? 1 - progress * 4 : 0,
            transform: `translate(-50%, ${progress * 30}px)`
          }}
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold font-['Syne'] animate-pulse">
            {isAr ? 'مرر للأسفل لاكتشاف القوة البرمجية' : 'SCROLL TO EXPERIENCE'}
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-cyan-400/40 flex justify-center p-1">
            <div className="w-1 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
};
