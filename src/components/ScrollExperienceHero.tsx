import React, { useEffect, useState, useMemo } from 'react';
import { 
  Sparkles, Cpu, ShieldCheck, Layers, Clock, TrendingUp, Zap, CheckCircle2 
} from 'lucide-react';
import type { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

interface Waypoint {
  p: number;      // Scroll progress [0..1]
  x: number;      // -1.0 = Left, +1.0 = Right
  y: number;      // 0.0 = Top/Center, 1.0 = Maximum descent
  bank: number;   // 3D Roll angle (deg)
  yaw: number;    // 3D Yaw angle (deg)
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generous scroll track (5000px) providing ample dwell time
  const heroHeight = 5000;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= 1. MONUMENTAL HERO KEYNOTE DISSOLVE (0 to 0.12) =================
  const heroDissolve = Math.min(progress / 0.10, 1);
  const heroTextOpacity = Math.max(1 - heroDissolve * 1.5, 0);
  const heroTextTranslateY = -heroDissolve * 80;

  // ================= 2. THE 5 PROGRESSIVE CHAPTERS (HUD SHOWCASES) =================
  const getChapterOpacity = (center: number, spread: number = 0.055) => {
    const dist = Math.abs(progress - center);
    if (dist > spread) return 0;
    return 1 - (dist / spread);
  };

  const ch1Opacity = getChapterOpacity(0.18); // Chapter 1: Physical Right
  const ch2Opacity = getChapterOpacity(0.28); // Chapter 2: Physical Left
  const ch3Opacity = getChapterOpacity(0.38); // Chapter 3: Physical Right
  const ch4Opacity = getChapterOpacity(0.48); // Chapter 4: Physical Left
  const ch5Opacity = getChapterOpacity(0.58); // Chapter 5: Physical Right

  // ================= 3. MAJESTIC 3D EMBLEM FLIGHT =================
  const waypoints: Waypoint[] = useMemo(() => [
    { p: 0.00, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
    { p: 0.10, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
    // Chapter 1 is on RIGHT -> Emblem glides smoothly to LEFT
    { p: 0.18, x: -1.0, y: 0.20, bank: -14, yaw: -20 },
    // Crossing center towards Right for Chapter 2
    { p: 0.23, x:  0.0, y: 0.45, bank:  10, yaw:  10 },
    // Chapter 2 is on LEFT -> Emblem glides smoothly to RIGHT
    { p: 0.28, x:  1.0, y: 0.65, bank:  14, yaw:  20 },
    // Crossing center towards Left for Chapter 3
    { p: 0.33, x:  0.0, y: 0.80, bank: -10, yaw: -10 },
    // Chapter 3 is on RIGHT -> Emblem glides smoothly to LEFT
    { p: 0.38, x: -1.0, y: 0.90, bank: -14, yaw: -20 },
    // Crossing center towards Right for Chapter 4
    { p: 0.43, x:  0.0, y: 0.95, bank:  10, yaw:  10 },
    // Chapter 4 is on LEFT -> Emblem glides smoothly to RIGHT
    { p: 0.48, x:  1.0, y: 0.98, bank:  14, yaw:  20 },
    // Crossing center towards Left for Chapter 5
    { p: 0.53, x:  0.0, y: 1.00, bank: -10, yaw: -10 },
    // Chapter 5 is on RIGHT -> Emblem glides smoothly to LEFT
    { p: 0.58, x: -1.0, y: 1.00, bank: -14, yaw: -20 },
    // DOCKING INTO THE BRAND NAME: Returns smoothly to center (0, 0)
    { p: 0.63, x: -0.4, y: 0.40, bank:  -6, yaw:  -8 },
    { p: 0.68, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
    { p: 1.00, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
  ], []);

  // Smooth cosine easing interpolation
  const flightState = useMemo(() => {
    if (progress <= waypoints[0].p) return waypoints[0];
    if (progress >= waypoints[waypoints.length - 1].p) return waypoints[waypoints.length - 1];

    let i = 0;
    while (i < waypoints.length - 1 && waypoints[i + 1].p < progress) {
      i++;
    }

    const p0 = waypoints[i];
    const p1 = waypoints[i + 1];
    const range = p1.p - p0.p;
    const t = range > 0 ? (progress - p0.p) / range : 0;
    const ease = (1 - Math.cos(t * Math.PI)) / 2;

    return {
      p: progress,
      x: p0.x + (p1.x - p0.x) * ease,
      y: p0.y + (p1.y - p0.y) * ease,
      bank: p0.bank + (p1.bank - p0.bank) * ease,
      yaw: p0.yaw + (p1.yaw - p0.yaw) * ease,
    };
  }, [progress, waypoints]);

  const lateralBound = Math.min(Math.max(windowWidth * 0.24, 200), 320);
  const verticalBound = 140;

  const isWhiteStage = progress >= 0.68;
  const whiteStageOpacity = Math.min(Math.max((progress - 0.64) / 0.04, 0), 1);
  const heroFadeOut = progress > 0.96 ? Math.max(1 - (progress - 0.96) / 0.04, 0) : 1;

  const logoX = isWhiteStage ? 0 : flightState.x * lateralBound;
  const logoY = isWhiteStage ? 0 : flightState.y * verticalBound;
  const bankAngleZ = isWhiteStage ? 0 : flightState.bank;
  const yawAngleY = isWhiteStage ? 0 : flightState.yaw;

  // ================= 4. SEQUENTIAL LETTER ADDITION AFTER EMBLEM DOCKS =================
  const letters = ['E', 'X', 'O', 'R', 'A'];
  const [lettersCount, setLettersCount] = useState<number>(0);

  useEffect(() => {
    if (isWhiteStage) {
      const timers = [
        setTimeout(() => setLettersCount(1), 220), // 'E'
        setTimeout(() => setLettersCount(2), 380), // 'X'
        setTimeout(() => setLettersCount(3), 540), // 'O'
        setTimeout(() => setLettersCount(4), 700), // 'R'
        setTimeout(() => setLettersCount(5), 860), // 'A'
      ];
      return () => timers.forEach(clearTimeout);
    } else if (progress < 0.60) {
      setLettersCount(0);
    }
  }, [isWhiteStage, progress < 0.60]);

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 600}px` }}>
      {/* Sticky Fullscreen Frame - GPU hardware accelerated */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none will-change-transform"
        style={{ opacity: heroFadeOut }}
      >
        
        {/* ================= BACKGROUND 1: MIDNIGHT OBSIDIAN & SAPPHIRE DEPTH ================= */}
        <div 
          className="absolute inset-0 bg-[#020617] transition-opacity duration-600 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          {/* Deep Sapphire Radial Light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0f2b66_0%,#030e28_50%,#020617_100%)] opacity-95" />
          
          {/* High-Tech Perspective Wireframe Grid */}
          <div className="absolute inset-0 geometric-grid opacity-35" />

          {/* Luminous Ambient Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* ================= BACKGROUND 2: PRISTINE MINIMALIST WHITE STUDIO CANVAS ================= */}
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-600 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          {/* Subtle Designer Micro-Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
          {/* Soft Vignette Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,rgba(241,245,249,0.7)_100%)]" />
        </div>

        {/* ================= CHAPTER 1: MONUMENTAL CENTRAL KEYNOTE HERO (APPLE / STRIPE / LINEAR STYLE) ================= */}
        {/* Positioned at the upper half so the majestic 3D emblem sits proudly below it with zero overlap */}
        <div 
          className="absolute top-12 sm:top-16 md:top-20 z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center pointer-events-none transition-all duration-75"
          style={{ 
            opacity: heroTextOpacity,
            transform: `translateY(${heroTextTranslateY}px)`,
          }}
        >
          {/* Status Capsule Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-4 tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{isAr ? '✦ ترسانة هندسة الأنظمة والحلول البرمجية المتطورة' : '✦ NEXT-GEN ENTERPRISE SOFTWARE ARCHITECTURE'}</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Syne'] text-white tracking-tight leading-tight">
            TEXORA SYSTEMS
            <span className="block mt-1 text-2xl sm:text-4xl md:text-5xl font-black font-['Cairo'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-500">
              {isAr ? 'صناعة القوة البرمجية للمؤسسات' : 'ARCHITECTS OF DIGITAL POWER'}
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-sky-200/80 max-w-xl font-light leading-relaxed">
            {isAr 
              ? 'أنظمة كاشير ومخازن للمحلات • سلاسل الصيدليات الكبرى • منصات تعليمية DRM • وكلاء ذكاء اصطناعي 24/7'
              : 'Enterprise Pharmacy POS • Multi-Branch Retail • DRM Protected LMS • 24/7 Autonomous AI Agents'}
          </p>
        </div>

        {/* ================= CHAPTER 2: THE 5 CHAPTERS OF INNOVATION (GLASS HUD CARDS) ================= */}
        
        {/* PHYSICAL LEFT COLUMN (Chapters 2 & 4) */}
        <div 
          className="absolute left-6 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[420px] pointer-events-none z-15 flex flex-col items-start space-y-8"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Chapter 2: اللغات والترسانة التقنية */}
          {ch2Opacity > 0 && (
            <div 
              className="backdrop-blur-2xl bg-[#03091e]/80 border border-cyan-500/25 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-opacity duration-150 w-full"
              style={{ opacity: ch2Opacity }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>02 // CLOUD-NATIVE TECH STACK</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                  MODERN & CLEAN
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] mb-2.5 leading-tight">
                {isAr ? 'كود نقي بأحدث لغات البرمجة العالمية' : 'TypeScript • Python • React 19 • Supabase'}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/90 font-light leading-relaxed mb-4">
                {isAr 
                  ? 'نكتب كوداً معيارياً نظيفاً باستخدام TypeScript و Python، مع نشر سحابي فائق السرعة على شبكات Cloudflare Edge العالمية وقواعد بيانات Supabase الموثوقة بدون قوالب جاهزة.'
                  : 'Clean modular TypeScript and Python microservices deployed across Cloudflare global edge and Supabase PostgreSQL with zero boilerplate.'}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-cyan-300">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">TypeScript</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Python</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">React 19</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-200">Cloudflare Edge</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">Supabase DB</span>
              </div>
            </div>
          )}

          {/* Chapter 4: الخبرة البرمجية وسابقة الأعمال */}
          {ch4Opacity > 0 && (
            <div 
              className="backdrop-blur-2xl bg-[#03091e]/80 border border-cyan-500/25 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-opacity duration-150 w-full"
              style={{ opacity: ch4Opacity }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>04 // BATTLE-TESTED SCALE</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold">
                  50K+ USERS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] mb-2.5 leading-tight">
                {isAr ? 'أنظمة تخدم أكثر من 50,000 مستخدم بنجاح' : 'Enterprise Scale with 50,000+ Users'}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/90 font-light leading-relaxed mb-4">
                {isAr 
                  ? 'خبرة رائدة في بناء سلاسل صيدليات كبرى تضم أكثر من 25 ألف صنف، منصات تعليمية LMS بحماية مشددة ضد القرصنة، وأنظمة كاشير ومخازن لبرندات الملابس تتحمل ضغط البيع المكثف.'
                  : 'Proven enterprise footprint across major pharmacy chains, anti-piracy DRM platforms, and omnichannel apparel store networks.'}
              </p>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                <div>
                  <div className="text-base sm:text-lg font-black text-white font-['Syne']">50K+</div>
                  <div className="text-[10px] text-sky-200/70 font-mono">{isAr ? 'مستخدم نشط' : 'Active Users'}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-cyan-300 font-['Syne']">25K+</div>
                  <div className="text-[10px] text-sky-200/70 font-mono">{isAr ? 'دواء وصنف' : 'Pharmacy SKUs'}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 font-['Syne']">0</div>
                  <div className="text-[10px] text-sky-200/70 font-mono">{isAr ? 'تعطيل في الذروة' : 'Downtime'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PHYSICAL RIGHT COLUMN (Chapters 1, 3, 5) */}
        <div 
          className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[420px] pointer-events-none z-15 flex flex-col items-end space-y-8 text-right"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Chapter 1: الجودة والدقة البرمجية */}
          {ch1Opacity > 0 && (
            <div 
              className="backdrop-blur-2xl bg-[#03091e]/80 border border-cyan-500/25 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-opacity duration-150 w-full"
              style={{ opacity: ch1Opacity }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% PASS</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span>01 // ZERO-DEFECT STANDARD</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] mb-2.5 leading-tight">
                {isAr ? 'معايير أمان صارمة وهندسة بلا ثغرات' : 'Zero-Defect Standard & Security'}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/90 font-light leading-relaxed mb-4">
                {isAr 
                  ? 'نلتزم بأعلى معايير الجودة العالمية: اختبارات أوتوماتيكية شاملة، تشفير كامل لقواعد البيانات، ونسخ احتياطي سحابي تلقائي يضمن استقرار كل فاتورة وكل عميل.'
                  : 'Engineered with rigorous automated testing, enterprise encryption, and automated cloud backups guaranteeing zero downtime.'}
              </p>

              {/* Metrics Strip */}
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-200/90 pt-2 border-t border-white/10">
                <span>0.00% Defect Rate</span>
                <span>•</span>
                <span>99.99% SLA Uptime</span>
                <span>•</span>
                <span>End-to-End Vault</span>
              </div>
            </div>
          )}

          {/* Chapter 3: مدة الإنجاز والتسليم في أسبوعين */}
          {ch3Opacity > 0 && (
            <div 
              className="backdrop-blur-2xl bg-[#03091e]/80 border border-emerald-500/30 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-opacity duration-150 w-full"
              style={{ opacity: ch3Opacity }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                  14 DAYS SPRINT
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span>03 // RAPID SPRINT VELOCITY</span>
                  <Clock className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] mb-2.5 leading-tight">
                {isAr ? 'نظامك مبرمج وجاهز للتشغيل في 14 يوماً' : 'Production-Ready Within 14 Days'}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/90 font-light leading-relaxed mb-4">
                {isAr 
                  ? 'منهجية Agile سريعة ومحكمة تضمن برمجة النظام، ربط أجهزة الكاشير والباركود، ونقل البيانات وتدريب فريقك بالكامل في خلال أسبوعين دون أي تعطيل لنشاطك.'
                  : 'Rapid agile delivery ensuring complete tailored software, barcode hardware setup, and full staff onboarding within 2 weeks.'}
              </p>

              {/* Sprint Roadmap */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-center text-[10px] font-mono">
                <div className="p-1 rounded bg-white/5">
                  <div className="text-cyan-300 font-bold">Day 1-4</div>
                  <div className="text-sky-200/70">{isAr ? 'التخطيط والهيكلة' : 'Architecture'}</div>
                </div>
                <div className="p-1 rounded bg-white/5">
                  <div className="text-cyan-300 font-bold">Day 5-10</div>
                  <div className="text-sky-200/70">{isAr ? 'البرمجة والربط' : 'Dev & API'}</div>
                </div>
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  <div>Day 11-14</div>
                  <div>{isAr ? 'الإطلاق والتدريب' : 'Go Live!'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: السرعة الفائقة وسرعة الرد */}
          {ch5Opacity > 0 && (
            <div 
              className="backdrop-blur-2xl bg-[#03091e]/80 border border-cyan-500/25 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-opacity duration-150 w-full"
              style={{ opacity: ch5Opacity }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>18ms EDGE</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span>05 // AUTONOMOUS VELOCITY</span>
                  <Cpu className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] mb-2.5 leading-tight">
                {isAr ? 'استجابة 18ms وبوت واتساب ذكي 24/7' : '18ms Edge Latency & 2s Bot Replies'}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/90 font-light leading-relaxed mb-4">
                {isAr 
                  ? 'سرعة تحميل خيالية تفتح في جزء من الثانية، مع مساعد ذكاء اصطناعي مؤتمت على الواتساب يجيب على كل استفسارات عملائك في ثانيتين ليلاً ونهاراً.'
                  : 'Blazing sub-second page performance combined with an autonomous WhatsApp AI agent qualifying leads in 2 seconds 24/7.'}
              </p>

              {/* Bot Status Strip */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Cloud API Ready</span>
                </span>
                <span className="font-bold text-white">2s Reply SLA</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= CHAPTER 3: THE EMBLEM JOURNEY & KEYNOTE BRAND FORMATION ================= */}
        <div 
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none px-4"
          dir="ltr"
        >
          {/* Central Brand Unit */}
          <div className="relative flex flex-col items-center justify-center">

            {/* Emblem & Sequential Letters Row */}
            <div className="flex items-center justify-center">
              
              {/* 1. THE CONTINUOUS METALLIC EMBLEM */}
              <div
                className="relative will-change-transform flex items-center justify-center select-none shrink-0"
                style={{
                  transform: `translate3d(${logoX}px, ${logoY}px, 0px) perspective(1000px) rotateY(${yawAngleY}deg) rotateZ(${bankAngleZ}deg)`,
                  transition: isWhiteStage ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.06s linear',
                }}
              >
                <img
                  src="/assets/texora-logo-clean-tight.png"
                  alt="Texora Emblem"
                  className={`object-contain transition-all duration-500 ${
                    isWhiteStage 
                      ? 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-[0_15px_30px_rgba(15,23,42,0.2)]' 
                      : 'w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-[0_14px_35px_rgba(0,0,0,0.65)]'
                  }`}
                  style={{
                    filter: isWhiteStage ? 'contrast(1.25) brightness(0.9)' : 'none',
                  }}
                />
              </div>

              {/* 2. SEQUENTIAL LETTERS 'E X O R A' - Added sequentially after emblem lands */}
              <div 
                className="flex items-center tracking-wider font-['Syne'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#030712] shrink-0"
                style={{
                  width: isWhiteStage ? 'auto' : 0,
                  opacity: isWhiteStage ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'opacity 0.4s ease',
                }}
              >
                {letters.map((char, index) => {
                  const isAdded = lettersCount > index;
                  return (
                    <span 
                      key={char}
                      className={`inline-block transition-all transform ${
                        isAdded 
                          ? 'opacity-100 translate-x-0 scale-100' 
                          : 'opacity-0 -translate-x-8 scale-80'
                      }`}
                      style={{
                        marginLeft: index > 0 ? '0.12em' : '0.18em',
                        color: '#030712',
                        transitionDuration: '450ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>

            </div>

            {/* Sub-Brand Tagline on White Stage */}
            {isWhiteStage && lettersCount >= 5 && (
              <div className="mt-6 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] text-slate-800 uppercase">
                  ARCHITECTS OF DIGITAL INFRASTRUCTURE
                </p>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-600 text-[11px] font-mono">
                  <span>{isAr ? 'استكشف الترسانة البرمجية والحلول المتكاملة' : 'Explore Complete Systems & Solutions'}</span>
                  <span>↓</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= SCROLL INVITATION INDICATOR ================= */}
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: progress < 0.08 ? 1 - progress * 12 : 0,
            transform: `translate(-50%, ${progress * 20}px)`
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
