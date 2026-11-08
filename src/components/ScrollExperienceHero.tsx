import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Cpu } from 'lucide-react';
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

  // Generous scroll track (5000px) providing smooth progression
  const heroHeight = 5000;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= 1. INTRO TEXT (ALREADY PRESENT & FULLY RENDERED - NO TYPEWRITER) =================
  // User explicitly requested: "خلي النصوص تكون موجود مش تتولد"
  // Texts are immediately present on page load, smoothly fading and sliding out with scroll
  const evadeFactor = Math.min(progress / 0.10, 1);
  const leftTextTranslateX = -evadeFactor * 240;
  const rightTextTranslateX = evadeFactor * 240;
  const evadeTextOpacity = Math.max(1 - evadeFactor * 1.6, 0);

  // ================= 2. THE 5 PROGRESSIVE ARTICLES (SMOOTH CONTINUOUS SCROLL-LINKED OPACITY) =================
  // Smooth mountain curve (0 -> 1 -> 0) tied directly to scroll, zero sudden pops
  const getArticleOpacity = (center: number, spread: number = 0.06) => {
    const dist = Math.abs(progress - center);
    if (dist > spread) return 0;
    return 1 - (dist / spread);
  };

  const art1Opacity = getArticleOpacity(0.17); // Article 1: Physical Right
  const art2Opacity = getArticleOpacity(0.27); // Article 2: Physical Left
  const art3Opacity = getArticleOpacity(0.37); // Article 3: Physical Right
  const art4Opacity = getArticleOpacity(0.47); // Article 4: Physical Left
  const art5Opacity = getArticleOpacity(0.57); // Article 5: Physical Right

  // ================= 3. MAJESTIC BIG EMBLEM DESCENT & SIMPLE PROFESSIONAL 3D FLIGHT =================
  // User: "نزول الشعار بحجم أكبر وبأنميشن بسيط واحترافي"
  const waypoints: Waypoint[] = useMemo(() => [
    { p: 0.00, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
    { p: 0.10, x:  0.0, y: 0.00, bank:   0, yaw:   0 },
    // Article 1 is on RIGHT -> Emblem sways Left with calm dignified banking
    { p: 0.17, x: -1.0, y: 0.28, bank: -12, yaw: -18 },
    // Crossing center towards Right for Article 2
    { p: 0.22, x:  0.0, y: 0.50, bank:   8, yaw:   8 },
    // Article 2 is on LEFT -> Emblem sways Right
    { p: 0.27, x:  1.0, y: 0.68, bank:  12, yaw:  18 },
    // Crossing center towards Left for Article 3
    { p: 0.32, x:  0.0, y: 0.80, bank:  -8, yaw:  -8 },
    // Article 3 is on RIGHT -> Emblem sways Left
    { p: 0.37, x: -1.0, y: 0.90, bank: -12, yaw: -18 },
    // Crossing center towards Right for Article 4
    { p: 0.42, x:  0.0, y: 0.95, bank:   8, yaw:   8 },
    // Article 4 is on LEFT -> Emblem sways Right
    { p: 0.47, x:  1.0, y: 0.98, bank:  12, yaw:  18 },
    // Crossing center towards Left for Article 5
    { p: 0.52, x:  0.0, y: 1.00, bank:  -8, yaw:  -8 },
    // Article 5 is on RIGHT -> Emblem sways Left
    { p: 0.57, x: -1.0, y: 1.00, bank: -12, yaw: -18 },
    // DOCKING INTO THE BRAND NAME: Emblem returns smoothly to exact center (0, 0)
    { p: 0.63, x: -0.4, y: 0.45, bank:  -6, yaw:  -8 },
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

  // Dignified lateral travel bound (stays clear of articles by >500px)
  const lateralBound = Math.min(Math.max(windowWidth * 0.22, 180), 280);
  const verticalBound = 160;

  const isWhiteStage = progress >= 0.68;
  const whiteStageOpacity = Math.min(Math.max((progress - 0.64) / 0.04, 0), 1);
  const heroFadeOut = progress > 0.96 ? Math.max(1 - (progress - 0.96) / 0.04, 0) : 1;

  const logoX = isWhiteStage ? 0 : flightState.x * lateralBound;
  const logoY = isWhiteStage ? 0 : flightState.y * verticalBound;
  const bankAngleZ = isWhiteStage ? 0 : flightState.bank;
  const yawAngleY = isWhiteStage ? 0 : flightState.yaw;

  // ================= 4. SEQUENTIAL LETTER ADDITION AFTER EMBLEM LANDS =================
  // User: "لازم الشعار ده هوه الي يظهر في الاسم الي في المنتصف يحط مكانه وبعدين يتضاف باقي الاسم مش تستخدم شعار جاهز"
  // The emblem lands firmly in its place as 'T', then letters E-X-O-R-A are added sequentially beside it!
  const letters = ['E', 'X', 'O', 'R', 'A'];
  const [lettersCount, setLettersCount] = useState<number>(0);

  useEffect(() => {
    if (isWhiteStage) {
      const timers = [
        setTimeout(() => setLettersCount(1), 220), // 'E' added
        setTimeout(() => setLettersCount(2), 380), // 'X' added
        setTimeout(() => setLettersCount(3), 540), // 'O' added
        setTimeout(() => setLettersCount(4), 700), // 'R' added
        setTimeout(() => setLettersCount(5), 860), // 'A' added
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
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
        </div>

        {/* ================= CHAPTER 1: INTRO FLANKING TEXTS (IMMEDIATELY PRESENT - NO TYPEWRITER) ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-10 lg:px-14 flex justify-between items-center pointer-events-none">
          
          {/* Left Block: Pushed generously to left edge with ample center clearance */}
          <div 
            className="w-4/12 max-w-sm transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: evadeTextOpacity,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Architecture</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-['Syne'] leading-tight tracking-tight">
              TEXORA SYSTEMS
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-sky-200/80 max-w-xs font-light leading-relaxed">
              {isAr ? 'هندسة الأنظمة والحلول البرمجية الفائقة • أداء استثنائي بلا تنازلات' : 'Architects of High-Performance Systems & Enterprise Software'}
            </p>
          </div>

          {/* Center Clearance for Big Majestic Emblem (4/12 wide = >400px clearance) */}
          <div className="w-4/12" />

          {/* Right Block: Pushed generously to right edge */}
          <div 
            className="w-4/12 max-w-sm transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: evadeTextOpacity,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-xs font-mono font-bold mb-3 tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? 'أنظمة فائقة الأداء' : 'Autonomous Systems'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-['Cairo'] leading-tight tracking-tight">
              {isAr ? 'صناعة القوة البرمجية' : 'BEYOND CODE'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 via-sky-200 to-white">
                {isAr ? 'للشركات والمؤسسات' : 'BEYOND HORIZONS'}
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-sky-200/80 max-w-xs font-light text-right leading-relaxed">
              {isAr 
                ? 'أنظمة كاشير للمحلات • سلاسل الصيدليات الكبرى • منصات تعليمية DRM • بوتات واتساب 24/7'
                : 'Enterprise Pharmacy POS • Multi-Branch Retail • DRM Protected LMS • 24/7 AI WhatsApp Agents'}
            </p>
          </div>
        </div>

        {/* ================= CHAPTER 2: THE 5 PROGRESSIVE ARTICLES (SMOOTH SCROLL-TIED OPACITY) ================= */}
        
        {/* PHYSICAL LEFT COLUMN (Articles 2 & 4) */}
        <div 
          className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 w-80 sm:w-96 pointer-events-none z-15 flex flex-col items-start space-y-8"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Article 2: اللغات والترسانة التقنية */}
          {art2Opacity > 0 && (
            <div 
              className="transition-opacity duration-150"
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
              className="transition-opacity duration-150"
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

        {/* PHYSICAL RIGHT COLUMN (Articles 1, 3, 5) */}
        <div 
          className="absolute right-6 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-80 sm:w-96 pointer-events-none z-15 flex flex-col items-end space-y-8 text-right"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Article 1: الجودة والدقة البرمجية */}
          {art1Opacity > 0 && (
            <div 
              className="transition-opacity duration-150"
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
              className="transition-opacity duration-150"
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
              className="transition-opacity duration-150"
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

        {/* ================= CHAPTER 3: BIG EMBLEM LANDS FIRMLY + SEQUENTIAL NAME ADDITION ================= */}
        {/*
            Exact user request:
            1. BIG EMBLEM with simple, professional 3D descent.
            2. The SAME emblem lands in place as 'T' in the center ("يحط مكانه").
            3. Then the rest of the name is added sequentially ("يتضاف باقي الاسم مش شعار جاهز").
            4. The full name TEXORA is perfectly centered in pure white.
        */}
        <div 
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none px-4"
          dir="ltr"
        >
          {/* Centered Brandmark Master Container */}
          <div className="relative flex items-center justify-center">

            {/* 1. THE BIG MAJESTIC EMBLEM (Moves in 3D during scroll, lands firmly as 'T' in the white stage) */}
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
                    : 'w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-[0_14px_35px_rgba(0,0,0,0.65)]'
                }`}
                style={{
                  filter: isWhiteStage ? 'contrast(1.2) brightness(0.92)' : 'none',
                }}
              />
            </div>

            {/* 2. THE LETTERS 'E X O R A' - Added sequentially AFTER emblem lands in place */}
            <div 
              className="flex items-center tracking-wider font-['Syne'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#02091d] shrink-0"
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
                      color: '#02091d',
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
