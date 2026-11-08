import React, { useEffect, useState } from 'react';
import { 
  Sparkles, Cpu, Zap, Code2, ShieldCheck, Gauge, 
  Clock, CheckCircle2, ArrowDown, Award, Send
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
  const fullTitle = 'TEXORA SYSTEMS';
  const fullSubtitle = isAr ? 'هندسة الأنظمة والحلول البرمجية الفائقة' : 'Architects of High-Performance Systems';

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
    }, 60);
    return () => clearInterval(timer);
  }, []);

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
      }, 45);
      return () => clearInterval(subTimer);
    }, 800);
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

  // Long generous scroll track (3400px) for smooth scrollytelling
  const heroHeight = 3400;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= STAGE PROGRESSION MILESTONES =================
  // 1. Initial texts evade outwards (0 to 0.15)
  const evadeFactor = Math.min(progress / 0.12, 1);
  const leftTextTranslateX = -evadeFactor * 200; // Fly to left
  const rightTextTranslateX = evadeFactor * 200; // Fly to right
  const evadeTextOpacity = Math.max(1 - evadeFactor * 1.6, 0);

  // 2. Progressive Mini-Articles calculations (between 0.14 and 0.70)
  // Helper to calculate smooth fade in -> active -> fade out for each card
  const getCardOpacity = (start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) return (progress - start) / (peak - start);
    return 1 - (progress - peak) / (end - peak);
  };

  const card1Opacity = getCardOpacity(0.12, 0.20, 0.28); // الجودة والدقة (Right)
  const card2Opacity = getCardOpacity(0.24, 0.32, 0.40); // اللغات والترسانة (Left)
  const card3Opacity = getCardOpacity(0.36, 0.44, 0.52); // الإنجاز في أسبوعين (Right)
  const card4Opacity = getCardOpacity(0.48, 0.56, 0.64); // الخبرة والموثوقية (Left)
  const card5Opacity = getCardOpacity(0.60, 0.68, 0.76); // السرعة وسرعة الرد (Right)

  // 3. The Pure White Stage Transition (0.72 to 1.0)
  const whiteStageOpacity = Math.min(Math.max((progress - 0.70) / 0.18, 0), 1);

  // 4. LTR Brand Revelation: Logo locks as 'T' on LEFT, 'EXORA' to the RIGHT
  const lettersProgress = Math.min(Math.max((progress - 0.76) / 0.16, 0), 1);
  const whiteContentOpacity = Math.min(Math.max((progress - 0.84) / 0.12, 0), 1);

  // 3D Rotation Angles
  const rotateX = mousePos.y * -14 + (progress < 0.7 ? progress * 25 : 0);
  const rotateY = mousePos.x * 18 + (progress < 0.7 ? progress * 40 : 0);

  // 3D Logo Transform:
  // Starts near top center, descends smoothly down to the exact middle of the screen!
  // When white stage arrives, it glides to the LEFT to become the letter 'T'.
  let logoTransform = '';
  if (progress < 0.72) {
    // Descends from top to center (translateY up to 180px)
    const descentY = Math.min(progress / 0.5, 1) * 160;
    const scale = 1 + progress * 0.25;
    logoTransform = `translate3d(0px, ${descentY}px, 0px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  } else {
    // In white stage: glides to the LEFT (dir="ltr")
    const glideLeft = lettersProgress * -180;
    const scale = 1.25 - lettersProgress * 0.35;
    logoTransform = `translate3d(${glideLeft}px, 0px, 0px) scale(${scale}) perspective(1000px) rotateX(${rotateX * 0.15}deg) rotateY(${rotateY * 0.15}deg)`;
  }

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 400}px` }}>
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none">
        
        {/* ================= BACKGROUND 1: ROYAL DEEP BLUE & WIREFRAME ================= */}
        <div 
          className="absolute inset-0 bg-[#02091d] transition-opacity duration-700 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          {/* Royal Blue Radial Core */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#0c2d6b_0%,#04163d_50%,#02091d_100%)] opacity-95" />

          {/* Geometric Wireframe Grid */}
          <div className="absolute inset-0 geometric-grid opacity-35" />

          {/* Glowing Cobalt & Cyan Bloom Orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-cyan-500/20 via-sky-500/25 to-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        </div>

        {/* ================= BACKGROUND 2: PURE RADIANT WHITE CANVAS ================= */}
        <div 
          className="absolute inset-0 brand-white-stage transition-opacity duration-700 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          {/* Subtle light geometric texture on white */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-sky-100/60 via-white to-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ================= STAGE 1: INTRO TEXTS THAT DODGE AWAY ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 flex justify-between items-center pointer-events-none">
          
          {/* Left Text (Dodges far to the Left) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: evadeTextOpacity,
              filter: `blur(${evadeFactor * 10}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Architecture</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-['Syne'] leading-tight tracking-tight">
              {typedTitle}
              <span className="inline-block w-2.5 h-8 md:h-12 bg-cyan-400 ml-1 animate-blink" />
            </h1>

            <p className="mt-3 text-sm md:text-base text-sky-200/80 max-w-sm font-light leading-relaxed">
              {typedSubtitle}
            </p>
          </div>

          {/* Center Clearance for 3D Emblem */}
          <div className="w-2/12" />

          {/* Right Text (Dodges far to the Right) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: evadeTextOpacity,
              filter: `blur(${evadeFactor * 10}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase shadow-[0_0_15px_rgba(96,165,250,0.2)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? 'ذكاء اصطناعي وأتمتة' : 'Autonomous AI'}</span>
            </div>

            <h2 className="text-2xl md:text-5xl font-black text-white font-['Cairo'] leading-tight tracking-tight">
              {isAr ? 'صناعة القوة البرمجية' : 'BEYOND CODE'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 via-sky-200 to-white">
                {isAr ? 'للشركات والمؤسسات' : 'BEYOND HORIZONS'}
              </span>
            </h2>

            <p className="mt-3 text-xs md:text-sm text-sky-200/80 max-w-xs font-light text-right leading-relaxed">
              {isAr 
                ? 'أنظمة صيدليات متطورة • كاشير متاجر وبرندات • منصات تعليمية تفاعلية • بوتات واتساب 24/7'
                : 'Enterprise Pharmacy POS • Multi-Branch Retail • DRM Protected LMS • 24/7 AI WhatsApp Agents'}
            </p>
          </div>
        </div>

        {/* ================= STAGE 2: PROGRESSIVE MINI-ARTICLES (RIGHT & LEFT) ================= */}
        {/* As requested: Card 1 Right, Card 2 Left, Card 3 Right, Card 4 Left, Card 5 Right/Center */}
        <div className="absolute inset-0 z-15 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* LEFT COLUMN MINI-ARTICLES (تحتها من اليسار) */}
          <div className="w-5/12 flex flex-col items-start space-y-6">
            
            {/* 2. اللغات المستخدمة والترسانة التقنية */}
            {card2Opacity > 0 && (
              <div 
                className="glow-card rounded-2xl bg-blue-950/85 border border-cyan-400/40 p-6 backdrop-blur-2xl text-left max-w-md shadow-2xl transition-all duration-300"
                style={{ 
                  opacity: card2Opacity,
                  transform: `translateY(${(1 - card2Opacity) * 30}px)`
                }}
              >
                <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      {isAr ? 'اللغات والترسانة التقنية' : 'Modern Languages & Stack'}
                    </span>
                    <span className="block text-[11px] text-sky-300 font-mono">React 19 • Python • TypeScript • Go</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Cairo']">
                  {isAr ? 'بنية تحتية برمجية حديثة بلا أي قوالب جاهزة' : 'Engineered from Scratch with Modern Tech'}
                </h4>
                <p className="text-xs text-sky-100/80 font-light leading-relaxed">
                  {isAr 
                    ? 'نكتب كوداً نظيفاً مبنياً على TypeScript و Python مع نشر سحابي فائق السرعة على Cloudflare Edge وقواعد بيانات Supabase الموثوقة.'
                    : 'Clean modular TypeScript and Python microservices deployed on Cloudflare global edge with Supabase PostgreSQL cloud sync.'}
                </p>
              </div>
            )}

            {/* 4. الخبرة وسابقة الأعمال */}
            {card4Opacity > 0 && (
              <div 
                className="glow-card rounded-2xl bg-blue-950/85 border border-cyan-400/40 p-6 backdrop-blur-2xl text-left max-w-md shadow-2xl transition-all duration-300"
                style={{ 
                  opacity: card4Opacity,
                  transform: `translateY(${(1 - card4Opacity) * 30}px)`
                }}
              >
                <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      {isAr ? 'الخبرة وسابقة الأعمال' : 'Proven Track Record'}
                    </span>
                    <span className="block text-[11px] text-sky-300 font-mono">50,000+ Users • 100+ Production Systems</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Cairo']">
                  {isAr ? 'حلول عملية أثبتت كفاءتها في السوق' : 'Battle-Tested Enterprise Implementations'}
                </h4>
                <p className="text-xs text-sky-100/80 font-light leading-relaxed">
                  {isAr 
                    ? 'أنظمة إدارة سلاسل صيدليات كبرى، منصات تعليمية تخدم عشرات الآلاف بحماية ضد القرصنة، وأنظمة كاشير للمتاجر تتحمل أعلى ضغط بيع.'
                    : 'From high-traffic multi-branch pharmacy ERPs to DRM protected platforms handling tens of thousands of simultaneous users.'}
                </p>
              </div>
            )}

          </div>

          {/* CENTER SPACE (Clear for 3D Emblem to descend without colliding) */}
          <div className="w-2/12" />

          {/* RIGHT COLUMN MINI-ARTICLES (نصوص اليمين) */}
          <div className="w-5/12 flex flex-col items-end space-y-6">
            
            {/* 1. الجودة والدقة البرمجية */}
            {card1Opacity > 0 && (
              <div 
                className="glow-card rounded-2xl bg-blue-950/85 border border-cyan-400/40 p-6 backdrop-blur-2xl text-right max-w-md shadow-2xl transition-all duration-300"
                style={{ 
                  opacity: card1Opacity,
                  transform: `translateY(${(1 - card1Opacity) * 30}px)`
                }}
              >
                <div className="flex items-center justify-end gap-2.5 text-cyan-400 mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      {isAr ? 'الجودة والدقة البرمجية' : 'Quality & Engineering Precision'}
                    </span>
                    <span className="block text-[11px] text-sky-300 font-mono">Zero-Defect Standard • 99.99% SLA</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Cairo']">
                  {isAr ? 'معايير أمان واستقرار صارمة لنظامك' : 'Enterprise-Grade Rigor & Data Integrity'}
                </h4>
                <p className="text-xs text-sky-100/80 font-light leading-relaxed">
                  {isAr 
                    ? 'نظام خالي من الأخطاء، مشفر بالكامل ضد الثغرات، مع نسخ احتياطي دوري يضمن أمان كل فاتورة وكل عميل وكل دقيقة عمل.'
                    : 'Built with rigorous automated testing, full end-to-end data encryption, and zero-downtime daily backup policies.'}
                </p>
              </div>
            )}

            {/* 3. مدة الإنجاز والتسليم القياسية (خلال أسبوعين فقط) */}
            {card3Opacity > 0 && (
              <div 
                className="glow-card rounded-2xl bg-blue-950/85 border border-cyan-400/40 p-6 backdrop-blur-2xl text-right max-w-md shadow-2xl transition-all duration-300"
                style={{ 
                  opacity: card3Opacity,
                  transform: `translateY(${(1 - card3Opacity) * 30}px)`
                }}
              >
                <div className="flex items-center justify-end gap-2.5 text-cyan-400 mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                      {isAr ? 'سرعة الإنجاز والتسليم القياسية' : 'Rapid 14-Day Delivery Guarantee'}
                    </span>
                    <span className="block text-[11px] text-emerald-400 font-mono">خلال أسبوعين فقط • جاهز للعمل</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Cairo']">
                  {isAr ? 'نظامك مبرمج وجاهز للتشغيل في 14 يوماً' : 'Production-Ready Deployment Within 2 Weeks'}
                </h4>
                <p className="text-xs text-sky-100/80 font-light leading-relaxed">
                  {isAr 
                    ? 'منهجية Agile سريعة تضمن تسليم النظام، ربط أجهزة الكاشير والباركود، وتدريب فريقك بالكامل في خلال أسبوعين بدون أي تعطيل لأعمالك.'
                    : 'Agile sprints delivering complete tailored software, barcode hardware integration, and staff onboarding in just 14 business days.'}
                </p>
              </div>
            )}

            {/* 5. السرعة الفائقة وسرعة الرد */}
            {card5Opacity > 0 && (
              <div 
                className="glow-card rounded-2xl bg-blue-950/85 border border-cyan-400/40 p-6 backdrop-blur-2xl text-right max-w-md shadow-2xl transition-all duration-300"
                style={{ 
                  opacity: card5Opacity,
                  transform: `translateY(${(1 - card5Opacity) * 30}px)`
                }}
              >
                <div className="flex items-center justify-end gap-2.5 text-cyan-400 mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      {isAr ? 'السرعة الخارقة وسرعة الرد' : 'Sub-Second Velocity & Instant Response'}
                    </span>
                    <span className="block text-[11px] text-sky-300 font-mono">18ms Latency • رد في ثانيتين عبر AI</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Cairo']">
                  {isAr ? 'استجابة فائقة السرعة وبوت واتساب 24/7' : 'Instant Cloud Speed & 24/7 Response'}
                </h4>
                <p className="text-xs text-sky-100/80 font-light leading-relaxed">
                  {isAr 
                    ? 'صفحات تفتح في لمح البصر مع بوت واتساب ذكي يجيب على عملائك في ثانيتين تلقائياً دون موظفين ليلاً ونهاراً.'
                    : 'Sub-second page loading paired with autonomous AI WhatsApp reps answering inquiries within 2 seconds 24/7.'}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* ================= 3D EMBLEM & LTR 'T EXORA' LOGO REVELATION ================= */}
        {/*
            Centered in viewport.
            In Blue Stage: emblem descends to the center.
            In White Stage: emblem glides smoothly to the LEFT to become 'T',
            and 'EXORA' reveals to the RIGHT in LTR order!
        */}
        <div 
          className="absolute z-25 flex flex-col items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: progress > 0.72 ? 'translateY(-60px)' : 'none',
          }}
        >
          {/* Brand Mark Row (Strictly LTR: [Logo as 'T'] on LEFT, 'EXORA' on RIGHT) */}
          <div 
            className="flex items-center justify-center"
            dir="ltr"
            style={{ transform: logoTransform }}
          >
            {/* Ambient Specular Halo */}
            <div 
              className="absolute -inset-10 rounded-full blur-3xl transition-opacity duration-500"
              style={{
                background: whiteStageOpacity > 0.5 
                  ? 'radial-gradient(circle, rgba(148, 163, 184, 0.4) 0%, rgba(255,255,255,0) 70%)' 
                  : 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(30, 58, 138, 0.3) 50%, rgba(0,0,0,0) 70%)',
                opacity: 0.85
              }}
            />

            {/* The 3D Emblem (Letter 'T') */}
            <div className="relative group transition-transform duration-300">
              <img
                src={whiteStageOpacity > 0.5 ? '/assets/texora-logo-dark-tight.png' : '/assets/texora-logo-clean-tight.png'}
                alt="Texora 3D Emblem"
                className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 object-contain transition-all duration-500"
                style={{
                  filter: whiteStageOpacity > 0.5 
                    ? 'drop-shadow(0 20px 30px rgba(15, 23, 42, 0.25)) brightness(0.95)' 
                    : 'drop-shadow(0 0 40px rgba(56, 189, 248, 0.6)) drop-shadow(0 20px 35px rgba(2, 9, 29, 0.9))',
                }}
              />
            </div>

            {/* The Letters 'E X O R A' to the RIGHT in LTR */}
            <div 
              className="flex items-center tracking-tight transition-all duration-500 overflow-hidden"
              style={{
                width: `${lettersProgress * 420}px`,
                opacity: lettersProgress,
                marginLeft: '14px',
              }}
            >
              <span 
                className="font-black text-5xl sm:text-6xl md:text-8xl font-['Syne'] select-none tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #091328 0%, #172554 35%, #1e3a8a 70%, #0284c7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                EXORA
              </span>
            </div>
          </div>

          {/* ================= WHITE STAGE DESCRIPTION (WELL BELOW - ZERO COLLISION!) ================= */}
          <div 
            className="flex flex-col items-center text-center px-6 transition-all duration-500 max-w-2xl mt-12 md:mt-16 pointer-events-auto"
            style={{
              opacity: whiteContentOpacity,
              transform: `translateY(${(1 - whiteContentOpacity) * 35}px)`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 text-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
              <span>{isAr ? 'الشركة الرائدة في صناعة الأنظمة الرقمية الفائقة' : 'Leading High-Performance Software Engineering'}</span>
            </div>

            <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-['Cairo'] leading-tight">
              {isAr 
                ? 'نحوّل الرؤى البرمجية إلى أنظمة استثنائية تقود السوق' 
                : 'Architecting Systems That Redefine Industries'}
            </h3>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
              {isAr 
                ? 'مواقع سريعة البرق • منصات تعليمية LMS بحماية DRM • أنظمة صيدليات ومتاجر POS • بوتات واتساب ذكية 24/7' 
                : 'High-Speed Web Platforms • DRM Protected LMS • Pharmacy & Retail POS • Autonomous WhatsApp AI'}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a 
                href="#systems" 
                className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <span>{isAr ? 'استكشف الترسانة البرمجية' : 'Explore Systems'}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
              <a 
                href="#calculator" 
                className="px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 transition shadow-sm"
              >
                {isAr ? 'احسب تكلفة مشروعك' : 'Calculate Estimate'}
              </a>
            </div>
          </div>

        </div>

        {/* ================= SCROLL INVITATION INDICATOR ================= */}
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: progress < 0.10 ? 1 - progress * 9 : 0,
            transform: `translate(-50%, ${progress * 25}px)`
          }}
        >
          <span className="text-[11px] uppercase tracking-widest text-cyan-300 font-semibold font-['Syne'] animate-pulse">
            {isAr ? 'مرر للأسفل لاكتشاف القوة البرمجية' : 'SCROLL TO EXPLORE'}
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-cyan-400/50 flex justify-center p-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
};
