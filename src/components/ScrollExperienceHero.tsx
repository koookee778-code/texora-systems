import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Cpu } from 'lucide-react';
import type { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

interface Waypoint {
  p: number;      // Scroll progress [0..1]
  x: number;      // Horizontal offset (-1 to +1 normalized)
  y: number;      // Vertical descent (-0.1 to +1 normalized)
  bank: number;   // 3D Roll angle (deg)
  yaw: number;    // 3D Yaw angle (deg)
  pitch: number;  // 3D Pitch angle (deg)
  z: number;      // 3D Depth forward/back (px)
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900
  });

  // Track window resize for responsive flight trajectory
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
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
    }, 45);
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
      }, 35);
      return () => clearInterval(subTimer);
    }, 600);
    return () => clearTimeout(delayTimer);
  }, [fullSubtitle]);

  // Gentle reactive mouse tracking for subtle 3D tilt
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / (innerWidth / 2),
        y: (e.clientY - innerHeight / 2) / (innerHeight / 2),
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Generous scroll track (5000px) providing ample dwell time for every phase
  const heroHeight = 5000;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= 1. INTRO TEXT EVASION (0 to 0.12) =================
  const evadeFactor = Math.min(progress / 0.10, 1);
  const leftTextTranslateX = -evadeFactor * 220;
  const rightTextTranslateX = evadeFactor * 220;
  const evadeTextOpacity = Math.max(1 - evadeFactor * 1.8, 0);

  // ================= 2. THE 5 PROGRESSIVE ARTICLES (0.12 to 0.64) =================
  const getCardOpacity = (start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) return (progress - start) / (peak - start);
    return 1 - (progress - peak) / (end - peak);
  };

  const art1Opacity = getCardOpacity(0.12, 0.17, 0.23); // Article 1: Right
  const art2Opacity = getCardOpacity(0.22, 0.27, 0.33); // Article 2: Left
  const art3Opacity = getCardOpacity(0.32, 0.37, 0.43); // Article 3: Right
  const art4Opacity = getCardOpacity(0.42, 0.47, 0.53); // Article 4: Left
  const art5Opacity = getCardOpacity(0.52, 0.57, 0.63); // Article 5: Right

  // ================= 3. ADVANCED 3D FLIGHT DYNAMICS & AERODYNAMIC DODGING =================
  // Defines a continuous, aerodynamic 3D flight trajectory with banking, yaw, pitch, and depth
  const waypoints: Waypoint[] = useMemo(() => [
    { p: 0.00, x:  0.0, y:  0.0, bank:   0, yaw:   0, pitch:  0, z:  0 },
    { p: 0.10, x:  0.0, y:  0.0, bank:   0, yaw:   0, pitch:  0, z:  0 },
    // Article 1 (Right): Emblem swoops DOWN-LEFT with aggressive 3D bank and yaw
    { p: 0.17, x: -0.9, y:  0.35, bank: -24, yaw: -32, pitch: 14, z: 35 },
    // Crossing center towards Right for Article 2
    { p: 0.22, x:  0.0, y:  0.55, bank:  18, yaw:  15, pitch:  8, z: 65 },
    // Article 2 (Left): Emblem swoops DOWN-RIGHT
    { p: 0.27, x:  0.9, y:  0.70, bank:  24, yaw:  32, pitch: 12, z: 35 },
    // Crossing center towards Left for Article 3
    { p: 0.32, x:  0.0, y:  0.80, bank: -18, yaw: -15, pitch:  8, z: 65 },
    // Article 3 (Right): Emblem swoops DOWN-LEFT
    { p: 0.37, x: -0.9, y:  0.88, bank: -24, yaw: -32, pitch: 10, z: 35 },
    // Crossing center towards Right for Article 4
    { p: 0.42, x:  0.0, y:  0.93, bank:  18, yaw:  15, pitch:  6, z: 65 },
    // Article 4 (Left): Emblem swoops DOWN-RIGHT
    { p: 0.47, x:  0.9, y:  0.96, bank:  24, yaw:  32, pitch:  8, z: 35 },
    // Crossing center towards Left for Article 5
    { p: 0.52, x:  0.0, y:  0.98, bank: -18, yaw: -15, pitch:  6, z: 65 },
    // Article 5 (Right): Emblem swoops DOWN-LEFT
    { p: 0.57, x: -0.9, y:  1.00, bank: -22, yaw: -30, pitch:  6, z: 35 },
    // Smooth transition pulling up and returning to center for White Stage
    { p: 0.63, x: -0.4, y:  0.50, bank: -12, yaw: -16, pitch:  2, z: 20 },
    { p: 0.68, x:  0.0, y:  0.00, bank:   0, yaw:   0, pitch:  0, z:  0 },
    { p: 1.00, x:  0.0, y:  0.00, bank:   0, yaw:   0, pitch:  0, z:  0 },
  ], []);

  // Continuous smooth Hermite/Cosine interpolation through waypoints
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
    // Cosine smoothing for zero-jerk acceleration
    const ease = (1 - Math.cos(t * Math.PI)) / 2;

    return {
      p: progress,
      x: p0.x + (p1.x - p0.x) * ease,
      y: p0.y + (p1.y - p0.y) * ease,
      bank: p0.bank + (p1.bank - p0.bank) * ease,
      yaw: p0.yaw + (p1.yaw - p0.yaw) * ease,
      pitch: p0.pitch + (p1.pitch - p0.pitch) * ease,
      z: p0.z + (p1.z - p0.z) * ease,
    };
  }, [progress, waypoints]);

  // Responsive lateral & vertical pixel bounds
  const lateralBound = Math.min(Math.max(windowSize.w * 0.26, 180), 340);
  const verticalBound = Math.min(Math.max(windowSize.h * 0.28, 140), 260);

  const logoX = flightState.x * lateralBound;
  const logoY = flightState.y * verticalBound;
  const bankAngleZ = flightState.bank;
  const yawAngleY = flightState.yaw + mousePos.x * 8;
  const pitchAngleX = flightState.pitch + mousePos.y * -6;
  const depthZ = flightState.z;

  // ================= 4. THE PURE WHITE STAGE (0.68 to 0.96) =================
  // White stage lasts across 1400px of scrolling for an extended, comfortable dwell
  const isWhiteStage = progress >= 0.68;
  const whiteStageOpacity = Math.min(Math.max((progress - 0.65) / 0.05, 0), 1);
  const heroFadeOut = progress > 0.96 ? Math.max(1 - (progress - 0.96) / 0.04, 0) : 1;

  // ================= 5. AUTOMATIC SEQUENTIAL LETTER REVEAL (LOAD ON ARRIVAL) =================
  // Once the user reaches the white stage, all 5 letters E-X-O-R-A reveal smoothly
  // and sequentially automatically, locking in place permanently!
  const [lettersRevealed, setLettersRevealed] = useState<number>(0);

  useEffect(() => {
    if (isWhiteStage) {
      // Automatic staggered cascade: E -> X -> O -> R -> A
      const timeouts = [
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 1)), 120),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 2)), 260),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 3)), 400),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 4)), 540),
        setTimeout(() => setLettersRevealed((prev) => Math.max(prev, 5)), 680),
      ];
      return () => timeouts.forEach((t) => clearTimeout(t));
    } else if (progress < 0.60) {
      // Only reset if user scrolls well back up into the blue stage
      setLettersRevealed(0);
    }
  }, [isWhiteStage, progress < 0.60]);

  return (
    <div className="relative w-full" style={{ height: `${heroHeight + 600}px` }}>
      {/* Sticky Fullscreen Frame */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none will-change-transform"
        style={{ opacity: heroFadeOut }}
      >
        
        {/* ================= BACKGROUND 1: ROYAL BLUE WITH GEOMETRIC WIREFRAME ================= */}
        <div 
          className="absolute inset-0 bg-[#02091d] transition-opacity duration-700 pointer-events-none"
          style={{ opacity: 1 - whiteStageOpacity }}
        >
          {/* Royal Blue Radial Core */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0c2d6b_0%,#04163d_50%,#02091d_100%)] opacity-95" />

          {/* Geometric Grid Overlay */}
          <div className="absolute inset-0 geometric-grid opacity-35" />

          {/* Cyan Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* ================= BACKGROUND 2: PURE RADIANT WHITE CANVAS ================= */}
        {/* Only pure white and the brand name dead center! */}
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-700 pointer-events-none"
          style={{ opacity: whiteStageOpacity }}
        >
          {/* Subtle light geometric grid on white */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
        </div>

        {/* ================= CHAPTER 1: INTRO FLANKING TEXTS ================= */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 flex justify-between items-center pointer-events-none">
          
          {/* Left Block (Dodges far to the Left) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-start text-left"
            style={{ 
              transform: `translateX(${leftTextTranslateX}%)`,
              opacity: evadeTextOpacity,
              filter: `blur(${evadeFactor * 8}px)`
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

          {/* Center Clearance for 3D Emblem */}
          <div className="w-2/12" />

          {/* Right Block (Dodges far to the Right) */}
          <div 
            className="w-5/12 transition-all duration-75 flex flex-col items-end text-right"
            style={{ 
              transform: `translateX(${rightTextTranslateX}%)`,
              opacity: evadeTextOpacity,
              filter: `blur(${evadeFactor * 8}px)`
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

        {/* ================= CHAPTER 2: THE 5 PROGRESSIVE ARTICLES (NO BOXES / DIRECT CLEAN TYPOGRAPHY) ================= */}
        {/* Written directly on the page background without containers */}
        <div className="absolute inset-0 z-15 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* LEFT COLUMN ARTICLES (Articles 2 & 4) */}
          <div className="w-5/12 flex flex-col items-start space-y-8 text-left">
            
            {/* Article 2: اللغات والترسانة التقنية */}
            {art2Opacity > 0 && (
              <div 
                className="transition-all duration-300 max-w-md"
                style={{ 
                  opacity: art2Opacity,
                  transform: `translateY(${(1 - art2Opacity) * 20}px)`
                }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
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
                className="transition-all duration-300 max-w-md"
                style={{ 
                  opacity: art4Opacity,
                  transform: `translateY(${(1 - art4Opacity) * 20}px)`
                }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
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

          {/* CENTER CLEARANCE FOR 3D EMBLEM */}
          <div className="w-2/12" />

          {/* RIGHT COLUMN ARTICLES (Articles 1, 3, 5) */}
          <div className="w-5/12 flex flex-col items-end space-y-8 text-right">
            
            {/* Article 1: الجودة والدقة البرمجية */}
            {art1Opacity > 0 && (
              <div 
                className="transition-all duration-300 max-w-md"
                style={{ 
                  opacity: art1Opacity,
                  transform: `translateY(${(1 - art1Opacity) * 20}px)`
                }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '01 // الجودة والدقة البرمجية' : '01 // Quality & Engineering Precision'}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
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
                className="transition-all duration-300 max-w-md"
                style={{ 
                  opacity: art3Opacity,
                  transform: `translateY(${(1 - art3Opacity) * 20}px)`
                }}
              >
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '03 // مدة الإنجاز: خلال أسبوعين فقط' : '03 // Rapid 14-Day Delivery'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
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
                className="transition-all duration-300 max-w-md"
                style={{ 
                  opacity: art5Opacity,
                  transform: `translateY(${(1 - art5Opacity) * 20}px)`
                }}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-1 flex items-center justify-end gap-2">
                  <span>{isAr ? '05 // السرعة الخارقة وسرعة الرد' : '05 // Velocity & Instant Response'}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
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

        {/* ================= CHAPTER 3A: THE 3D AERODYNAMIC DODGING EMBLEM (BLUE STAGE) ================= */}
        {/* Active while in the Blue Stage (< 0.68) */}
        {!isWhiteStage && (
          <div 
            className="absolute z-20 flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${logoX}px, ${logoY}px, ${depthZ}px) perspective(1200px) rotateX(${pitchAngleX}deg) rotateY(${yawAngleY}deg) rotateZ(${bankAngleZ}deg)`,
              transition: 'transform 0.08s cubic-bezier(0.2, 0.8, 0.4, 1)',
            }}
          >
            <div className="relative flex items-center justify-center">
              
              {/* Floor projection shadow: tilts and moves with banking */}
              <div 
                className="absolute -bottom-14 w-48 h-8 rounded-full bg-cyan-500/25 blur-xl pointer-events-none transition-all duration-100"
                style={{
                  transform: `scale(${1 - depthZ * 0.003}) translateX(${-logoX * 0.12}px) skewX(${-bankAngleZ * 0.8}deg)`,
                  opacity: Math.max(0.65 - (logoY / verticalBound) * 0.25, 0.2),
                }}
              />

              {/* Aerodynamic Plasma Thruster / Wake: illuminates opposite to dodge direction */}
              <div 
                className="absolute -inset-6 rounded-full pointer-events-none transition-all duration-150"
                style={{
                  filter: 'blur(16px)',
                  background: bankAngleZ !== 0
                    ? `radial-gradient(ellipse at ${bankAngleZ < 0 ? '75% 50%' : '25% 50%'}, rgba(56,189,248,0.55), transparent 70%)`
                    : 'radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)',
                  opacity: 0.85,
                }}
              />

              {/* Cyan ambient core aura */}
              <div className="absolute -inset-10 rounded-full blur-3xl bg-cyan-400/35 opacity-75 animate-pulse" />

              {/* 3D Multi-Layer Extrusion Shadow for true 3D depth */}
              <div className="relative">
                {/* 3D Emblem with dynamic specular highlights and atmospheric shadow */}
                <img
                  src="/assets/texora-logo-clean-tight.png"
                  alt="Texora 3D Emblem"
                  className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.75)] drop-shadow-[0_20px_45px_rgba(2,9,29,0.95)]"
                  style={{
                    filter: `brightness(${1.02 + Math.abs(bankAngleZ) * 0.008}) contrast(1.1)`,
                  }}
                />

                {/* Dynamic Metallic Light Sweep / Sheen reflecting 3D angle */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden mix-blend-overlay"
                  style={{
                    background: `linear-gradient(${120 + bankAngleZ * 2}deg, rgba(255,255,255,0) 25%, rgba(255,255,255,${0.35 + Math.abs(bankAngleZ) * 0.02}) 50%, rgba(255,255,255,0) 75%)`,
                    transform: `translateX(${bankAngleZ * 2.5}px)`,
                  }}
                />
              </div>

            </div>
          </div>
        )}

        {/* ================= CHAPTER 3B: DEAD-CENTER PURE WHITE "TEXORA" (WHITE STAGE) ================= */}
        {/*
            Exact user request:
            1. PURE RADIANT WHITE BACKGROUND.
            2. ONLY THE NAME "TEXORA" ON THE ENTIRE SCREEN!
            3. Positioned DEAD-CENTER OF THE SCREEN (not top, not bottom)!
            4. Letters reveal sequentially and automatically upon arrival:
               [T Emblem] -> E -> X -> O -> R -> A
            5. Dwells and stays complete for a comfortable scroll span without vanishing!
        */}
        {isWhiteStage && (
          <div 
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-500"
            style={{ opacity: whiteStageOpacity }}
          >
            {/* Centered LTR Brand Container */}
            <div 
              className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 select-none px-4"
              dir="ltr"
            >
              {/* 1. The 'T' Emblem (Locks firmly into position first) */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/assets/texora-logo-dark-tight.png"
                  alt="T Emblem"
                  className="w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.22)] animate-in fade-in zoom-in duration-300"
                />
              </div>

              {/* 2. The Letters 'E X O R A' - Revealed sequentially and automatically! */}
              <div className="flex items-center tracking-wider font-['Syne'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                
                {/* Letter E */}
                <span 
                  className={`transition-all duration-500 transform ${
                    lettersRevealed >= 1 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #02091d 0%, #0f172a 35%, #1e3a8a 70%, #0284c7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  E
                </span>

                {/* Letter X */}
                <span 
                  className={`transition-all duration-500 transform ml-1 sm:ml-2 md:ml-3 ${
                    lettersRevealed >= 2 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #02091d 0%, #0f172a 35%, #1e3a8a 70%, #0284c7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  X
                </span>

                {/* Letter O */}
                <span 
                  className={`transition-all duration-500 transform ml-1 sm:ml-2 md:ml-3 ${
                    lettersRevealed >= 3 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #02091d 0%, #0f172a 35%, #1e3a8a 70%, #0284c7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  O
                </span>

                {/* Letter R */}
                <span 
                  className={`transition-all duration-500 transform ml-1 sm:ml-2 md:ml-3 ${
                    lettersRevealed >= 4 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #02091d 0%, #0f172a 35%, #1e3a8a 70%, #0284c7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  R
                </span>

                {/* Letter A */}
                <span 
                  className={`transition-all duration-500 transform ml-1 sm:ml-2 md:ml-3 ${
                    lettersRevealed >= 5 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #02091d 0%, #0f172a 35%, #1e3a8a 70%, #0284c7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  A
                </span>

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
