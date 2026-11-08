import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Cpu } from 'lucide-react';
import type { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

interface Waypoint {
  p: number;      // Scroll progress [0..1]
  x: number;      // Horizontal offset (-1.0 = Far Left, +1.0 = Far Right)
  y: number;      // Vertical descent (0 = top/center, 1 = maximum descent)
  bank: number;   // 3D Roll angle (deg)
  yaw: number;    // 3D Yaw angle (deg)
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Track resize with debouncing for performance
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect for intro title
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
    }, 40);
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
      }, 30);
      return () => clearInterval(subTimer);
    }, 500);
    return () => clearTimeout(delayTimer);
  }, [fullSubtitle]);

  // Total scroll track (5000px) providing ample room for every stage
  const heroHeight = 5000;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= 1. INTRO TEXT EVASION (0 to 0.12) =================
  const evadeFactor = Math.min(progress / 0.10, 1);
  const leftTextTranslateX = -evadeFactor * 240;
  const rightTextTranslateX = evadeFactor * 240;
  const evadeTextOpacity = Math.max(1 - evadeFactor * 1.8, 0);

  // ================= 2. THE 5 PROGRESSIVE ARTICLES (0.12 to 0.62) =================
  // Non-overlapping visibility windows so text is always clear
  const getArticleOpacity = (start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) return (progress - start) / (peak - start);
    return 1 - (progress - peak) / (end - peak);
  };

  const art1Opacity = getArticleOpacity(0.12, 0.17, 0.22); // Article 1: Right
  const art2Opacity = getArticleOpacity(0.22, 0.27, 0.32); // Article 2: Left
  const art3Opacity = getArticleOpacity(0.32, 0.37, 0.42); // Article 3: Right
  const art4Opacity = getArticleOpacity(0.42, 0.47, 0.52); // Article 4: Left
  const art5Opacity = getArticleOpacity(0.52, 0.57, 0.62); // Article 5: Right

  // ================= 3. EMBLEM TRAJECTORY (FAR FROM TEXT & ENDS ON THE LEFT) =================
  // - Starts dead center
  // - Moves FAR to the opposite side of each article (never overlapping words!)
  // - In the end, arrives on the LEFT before the name appears ("وفي الاخر يوصل للشمال قبل ظهرو الاسم")
  const waypoints: Waypoint[] = useMemo(() => [
    { p: 0.00, x:  0.0, y:  0.00, bank:   0, yaw:   0 },
    { p: 0.10, x:  0.0, y:  0.00, bank:   0, yaw:   0 },
    // Article 1 is on RIGHT -> Emblem goes FAR to the LEFT
    { p: 0.17, x: -1.0, y:  0.22, bank: -16, yaw: -20 },
    // Crossing center towards Right
    { p: 0.22, x:  0.0, y:  0.42, bank:  12, yaw:  10 },
    // Article 2 is on LEFT -> Emblem goes FAR to the RIGHT
    { p: 0.27, x:  1.0, y:  0.58, bank:  16, yaw:  20 },
    // Crossing center towards Left
    { p: 0.32, x:  0.0, y:  0.72, bank: -12, yaw: -10 },
    // Article 3 is on RIGHT -> Emblem goes FAR to the LEFT
    { p: 0.37, x: -1.0, y:  0.84, bank: -16, yaw: -20 },
    // Crossing center towards Right
    { p: 0.42, x:  0.0, y:  0.92, bank:  12, yaw:  10 },
    // Article 4 is on LEFT -> Emblem goes FAR to the RIGHT
    { p: 0.47, x:  1.0, y:  0.97, bank:  16, yaw:  20 },
    // Crossing center towards Left
    { p: 0.52, x:  0.0, y:  0.99, bank: -12, yaw: -10 },
    // Article 5 is on RIGHT -> Emblem goes FAR to the LEFT
    { p: 0.57, x: -1.0, y:  1.00, bank: -16, yaw: -20 },
    // PREPARING FOR WHITE STAGE: Glides to the LEFT side of the brand name ("يوصل للشمال قبل ظهور الاسم")
    { p: 0.63, x: -0.65, y: 0.40, bank:  -8, yaw: -10 },
    { p: 0.67, x: -0.40, y: 0.00, bank:   0, yaw:   0 },
    { p: 1.00, x: -0.40, y: 0.00, bank:   0, yaw:   0 },
  ], []);

  // Smooth cosine easing interpolation through waypoints
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

  // Generous lateral distance so the emblem is completely far from the text
  const lateralBound = Math.min(Math.max(windowWidth * 0.34, 220), 460);
  const verticalBound = 220; // Natural descent height

  const logoX = flightState.x * lateralBound;
  const logoY = flightState.y * verticalBound;
  const bankAngleZ = flightState.bank;
  const yawAngleY = flightState.yaw;

  // ================= 4. THE PURE WHITE STAGE (0.68 to 0.96) =================
  const isWhiteStage = progress >= 0.68;
  const whiteStageOpacity = Math.min(Math.max((progress - 0.65) / 0.04, 0), 1);
  const heroFadeOut = progress > 0.96 ? Math.max(1 - (progress - 0.96) / 0.04, 0) : 1;

  // ================= 5. AUTOMATIC SEQUENTIAL LETTER REVEAL =================
  // Once entering the white stage, all 5 letters E-X-O-R-A reveal sequentially
  // and smoothly automatically beside the emblem on the left!
  const [lettersRevealed, setLettersRevealed] = useState<number>(0);

  useEffect(() => {
    if (isWhiteStage) {
      const timeouts = [
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 1)), 100),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 2)), 220),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 3)), 340),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 4)), 460),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 5)), 580),
      ];
      return () => timeouts.forEach((t) => clearTimeout(t));
    } else if (progress < 0.60) {
      setLettersRevealed(0);
    }
  }, [isWhiteStage, progress < 0.60]);

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 600}px` }}>
      {/* Sticky Fullscreen Frame - GPU hardware accelerated */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none will-change-transform"
        style={{ opacity: heroFadeOut }}
      >
        
        {/* ================= BACKGROUND 1: ROYAL BLUE WITH GEOMETRIC GRID ================= */}
        <div 
          className="absolute inset-0 bg-[#02091d] transition-opacity duration-500 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0c2d6b_0%,#04163d_50%,#02091d_100%)] opacity-95" />
          <div className="absolute inset-0 geometric-grid opacity-30" />
        </div>

        {/* ================= BACKGROUND 2: PURE RADIANT WHITE CANVAS ================= */}
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-500 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
        </div>

        {/* ================= CHAPTER 1: INTRO FLANKING TEXTS ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 flex justify-between items-center pointer-events-none">
          
          {/* Left Block (Dodges far to the Left) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: evadeTextOpacity,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Architecture</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white font-['Syne'] leading-tight tracking-tight">
              {typedTitle}
              <span className="inline-block w-2.5 h-8 bg-cyan-400 ml-1 animate-blink" />
            </h1>

            <p className="mt-2 text-sm text-sky-200/80 max-w-sm font-light leading-relaxed">
              {typedSubtitle}
            </p>
          </div>

          {/* Center Clearance for Emblem */}
          <div className="w-2/12" />

          {/* Right Block (Dodges far to the Right) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: evadeTextOpacity,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? 'ذكاء اصطناعي وأتمتة' : 'Autonomous Systems'}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white font-['Cairo'] leading-tight tracking-tight">
              {isAr ? 'صناعة القوة البرمجية' : 'BEYOND CODE'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 via-sky-200 to-white">
                {isAr ? 'للشركات والمؤسسات' : 'BEYOND HORIZONS'}
              </span>
            </h2>

            <p className="mt-2 text-xs md:text-sm text-sky-200/80 max-w-xs font-light text-right leading-relaxed">
              {isAr 
                ? 'أنظمة صيدليات متطورة • كاشير متاجر وبرندات • منصات تعليمية تفاعلية • بوتات واتساب 24/7'
                : 'Enterprise Pharmacy POS • Multi-Branch Retail • DRM Protected LMS • 24/7 AI WhatsApp Agents'}
            </p>
          </div>
        </div>

        {/* ================= CHAPTER 2: THE 5 PROGRESSIVE ARTICLES (FAR FROM EMBLEM) ================= */}
        {/* Written directly on the page background, pushed to edges for zero collision */}
        <div className="absolute inset-0 z-15 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* LEFT COLUMN ARTICLES (Articles 2 & 4) */}
          <div className="w-4/12 flex flex-col items-start space-y-8 text-left">
            
            {/* Article 2: اللغات والترسانة التقنية */}
            {art2Opacity > 0 && (
              <div 
                className="transition-opacity duration-200 max-w-sm"
                style={{ opacity: art2Opacity }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{isAr ? '02 // اللغات المستخدمة والترسانة' : '02 // Modern Languages & Stack'}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-['Cairo'] mb-2 leading-tight">
                  {isAr ? 'كود نقي بأحدث لغات البرمجة العالمية' : 'TypeScript • Python • React 19 • Supabase'}
                </h3>
                <p className="text-sm md:text-base text-sky-100/90 font-light leading-relaxed">
                  {isAr 
                    ? 'نكتب كوداً معيارياً نظيفاً باستخدام TypeScript و Python، مع نشر سحابي فائق السرعة على شبكات Cloudflare Edge العالمية وقواعد بيانات Supabase الموثوقة بدون قوالب جاهزة.'
                    : 'Clean modular TypeScript and Python microservices deployed across Cloudflare global edge and Supabase PostgreSQL with zero boilerplate.'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-cyan-300">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">TypeScript</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">Python</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">Cloudflare Edge</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">Supabase DB</span>
                </div>
              </div>
            )}

            {/* Article 4: الخبرة البرمجية وسابقة الأعمال */}
            {art4Opacity > 0 && (
              <div 
                className="transition-opacity duration-200 max-w-sm"
                style={{ opacity: art4Opacity }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{isAr ? '04 // الخبرة البرمجية وسابقة الأعمال' : '04 // Battle-Tested Experience'}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-['Cairo'] mb-2 leading-tight">
                  {isAr ? 'أنظمة تخدم أكثر من 50,000 مستخدم بنجاح' : 'Enterprise Scale with 50,000+ Users'}
                </h3>
                <p className="text-sm md:text-base text-sky-100/90 font-light leading-relaxed">
                  {isAr 
                    ? 'خبرة رائدة في بناء سلاسل صيدليات كبرى تضم أكثر من 25 ألف صنف، منصات تعليمية LMS بحماية مشددة ضد القرصنة، وأنظمة كاشير ومخازن لبرندات الملابس تتحمل ضغط البيع المكثف.'
                    : 'Proven enterprise footprint across major pharmacy chains, anti-piracy DRM platforms, and omnichannel apparel store networks.'}
                </p>
              </div>
            )}

          </div>

          {/* CENTER PASSAGE: Generous clear space */}
          <div className="w-4/12" />

          {/* RIGHT COLUMN ARTICLES (Articles 1, 3, 5) */}
          <div className="w-4/12 flex flex-col items-end space-y-8 text-right">
            
            {/* Article 1: الجودة والدقة البرمجية */}
            {art1Opacity > 0 && (
              <div 
                className="transition-opacity duration-200 max-w-sm"
                style={{ opacity: art1Opacity }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '01 // الجودة والدقة البرمجية' : '01 // Quality & Engineering Precision'}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-['Cairo'] mb-2 leading-tight">
                  {isAr ? 'معايير أمان صارمة وهندسة بلا ثغرات' : 'Zero-Defect Standard & Security'}
                </h3>
                <p className="text-sm md:text-base text-sky-100/90 font-light leading-relaxed">
                  {isAr 
                    ? 'نلتزم بأعلى معايير الجودة العالمية: اختبارات أوتوماتيكية شاملة، تشفير كامل لقواعد البيانات، ونسخ احتياطي سحابي تلقائي يضمن استقرار كل فاتورة وكل عميل.'
                    : 'Engineered with rigorous automated testing, enterprise encryption, and automated cloud backups guaranteeing zero downtime.'}
                </p>
              </div>
            )}

            {/* Article 3: مدة الإنجاز والتسليم في أسبوعين */}
            {art3Opacity > 0 && (
              <div 
                className="transition-opacity duration-200 max-w-sm"
                style={{ opacity: art3Opacity }}
              >
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '03 // مدة الإنجاز: خلال أسبوعين فقط' : '03 // Rapid 14-Day Delivery'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-['Cairo'] mb-2 leading-tight">
                  {isAr ? 'نظامك مبرمج وجاهز للتشغيل في 14 يوماً' : 'Production-Ready Within 14 Days'}
                </h3>
                <p className="text-sm md:text-base text-sky-100/90 font-light leading-relaxed">
                  {isAr 
                    ? 'منهجية Agile سريعة ومحكمة تضمن برمجة النظام، ربط أجهزة الكاشير والباركود، ونقل البيانات وتدريب فريقك بالكامل في خلال أسبوعين دون أي تعطيل لنشاطك.'
                    : 'Rapid agile delivery ensuring complete tailored software, barcode hardware setup, and full staff onboarding within 2 weeks.'}
                </p>
              </div>
            )}

            {/* Article 5: السرعة الفائقة وسرعة الرد */}
            {art5Opacity > 0 && (
              <div 
                className="transition-opacity duration-200 max-w-sm"
                style={{ opacity: art5Opacity }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '05 // السرعة الخارقة وسرعة الرد' : '05 // Velocity & Instant Response'}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-['Cairo'] mb-2 leading-tight">
                  {isAr ? 'استجابة 18ms وبوت واتساب ذكي 24/7' : '18ms Edge Latency & 2s Bot Replies'}
                </h3>
                <p className="text-sm md:text-base text-sky-100/90 font-light leading-relaxed">
                  {isAr 
                    ? 'سرعة تحميل خيالية تفتح في جزء من الثانية، مع مساعد ذكاء اصطناعي مؤتمت على الواتساب يجيب على كل استفسارات عملائك في ثانيتين ليلاً ونهاراً.'
                    : 'Blazing sub-second page performance combined with an autonomous WhatsApp AI agent qualifying leads in 2 seconds 24/7.'}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* ================= CHAPTER 3A: CLEAN, SIMPLE EMBLEM IN FLIGHT (BLUE STAGE) ================= */}
        {/* Plain & seamless without distracting background glows, ultra-smooth 60 FPS */}
        {!isWhiteStage && (
          <div 
            className="absolute z-20 flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${logoX}px, ${logoY}px, 0px) rotateY(${yawAngleY}deg) rotateZ(${bankAngleZ}deg)`,
              transition: 'transform 0.06s linear',
            }}
          >
            <img
              src="/assets/texora-logo-clean-tight.png"
              alt="Texora Emblem"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]"
            />
          </div>
        )}

        {/* ================= CHAPTER 3B: EMBLEM ARRIVES ON LEFT + SEQUENTIAL "TEXORA" (WHITE STAGE) ================= */}
        {/*
            Exact user request:
            - Pure radiant white background.
            - Emblem arrives on the LEFT before the name appears ("وفي الاخر يوصل للشمال قبل ظهرو الاسم تمام").
            - The name "TEXORA" appears sequentially with smooth load:
              [T Emblem on the left] -> E -> X -> O -> R -> A
            - Plain emblem integrated into the site, dead-center horizontal and vertical.
            - Stays complete and locks in place.
        */}
        {isWhiteStage && (
          <div 
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-400"
            style={{ opacity: whiteStageOpacity }}
          >
            {/* Centered LTR Brandmark Container */}
            <div 
              className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 select-none px-4"
              dir="ltr"
            >
              {/* 1. The 'T' Emblem on the LEFT (Arrives first on the left) */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/assets/texora-logo-dark-tight.png"
                  alt="T Emblem"
                  className="w-18 h-18 sm:w-26 sm:h-26 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-sm"
                />
              </div>

              {/* 2. The Letters 'E X O R A' revealed sequentially to the right of the emblem */}
              <div className="flex items-center tracking-wider font-['Syne'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#02091d]">
                {['E', 'X', 'O', 'R', 'A'].map((char, index) => {
                  const isRevealed = lettersRevealed > index;
                  return (
                    <span 
                      key={char}
                      className={`transition-all duration-300 transform ${
                        isRevealed 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-4 scale-95'
                      }`}
                      style={{
                        display: 'inline-block',
                        marginLeft: index > 0 ? '0.12em' : '0.04em',
                        color: '#02091d',
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>

            </div>
          </div>
        )}

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
