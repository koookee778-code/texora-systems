import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Cpu } from 'lucide-react';
import type { Language } from '../types';

interface ScrollExperienceHeroProps {
  scrollY: number;
  language: Language;
}

export const ScrollExperienceHero: React.FC<ScrollExperienceHeroProps> = ({ scrollY, language }) => {
  const isAr = language === 'ar';

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

  // Generous scroll track (5000px) providing smooth progression
  const heroHeight = 5000;
  const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  // ================= 1. INTRO TEXT EVASION (0 to 0.12) =================
  const evadeFactor = Math.min(progress / 0.10, 1);
  const leftTextTranslateX = -evadeFactor * 240;
  const rightTextTranslateX = evadeFactor * 240;
  const evadeTextOpacity = Math.max(1 - evadeFactor * 1.8, 0);

  // ================= 2. THE 5 PROGRESSIVE ARTICLES (0.12 to 0.62) =================
  // Positioned on Left and Right sides while emblem descends in the Center
  const getArticleOpacity = (start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) return (progress - start) / (peak - start);
    return 1 - (progress - peak) / (end - peak);
  };

  const art1Opacity = getArticleOpacity(0.12, 0.17, 0.22); // Article 1: Physical Right
  const art2Opacity = getArticleOpacity(0.22, 0.27, 0.32); // Article 2: Physical Left
  const art3Opacity = getArticleOpacity(0.32, 0.37, 0.42); // Article 3: Physical Right
  const art4Opacity = getArticleOpacity(0.42, 0.47, 0.52); // Article 4: Physical Left
  const art5Opacity = getArticleOpacity(0.52, 0.57, 0.62); // Article 5: Physical Right

  // ================= 3. EMBLEM ALWAYS IN CENTER WITH 3D DESCENT & ROTATION =================
  // User explicitly requested: "خلي الشعار دايماً في المنتصف"
  // Horizontal X is ALWAYS 0! The emblem stays dead center while descending in Y.
  const isTransitionToWhite = progress >= 0.62 && progress < 0.68;
  const isWhiteStage = progress >= 0.68;
  const whiteStageOpacity = Math.min(Math.max((progress - 0.64) / 0.04, 0), 1);
  const heroFadeOut = progress > 0.96 ? Math.max(1 - (progress - 0.96) / 0.04, 0) : 1;

  // Vertical descent: descends during articles, then returns smoothly to exact center (Y = 0)
  let logoY = 0;
  let yawAngleY = 0;
  let pitchAngleX = 0;
  let bankAngleZ = 0;

  if (progress < 0.12) {
    // Intro center
    logoY = 0;
    yawAngleY = 0;
    pitchAngleX = 0;
    bankAngleZ = 0;
  } else if (progress >= 0.12 && progress < 0.62) {
    // Descent in the center corridor (0 to 220px) with 3D rotation
    const t = (progress - 0.12) / 0.50; // 0 to 1
    logoY = Math.sin(t * Math.PI * 0.5) * 200;
    yawAngleY = Math.sin(t * Math.PI * 4) * 16;   // 3D periodic turn
    pitchAngleX = Math.sin(t * Math.PI * 2) * 8;  // Descent pitch
    bankAngleZ = Math.cos(t * Math.PI * 4) * 6;   // Gentle bank
  } else if (isTransitionToWhite) {
    // Returning smoothly to exact Y = 0 and 0 angles for laser-precise docking
    const t = (progress - 0.62) / 0.06;
    const ease = (1 - Math.cos(t * Math.PI)) / 2;
    logoY = 200 * (1 - ease);
    yawAngleY = 0;
    pitchAngleX = 0;
    bankAngleZ = 0;
  } else {
    // White Stage: Perfectly centered at 0 with 0 angles
    logoY = 0;
    yawAngleY = 0;
    pitchAngleX = 0;
    bankAngleZ = 0;
  }

  // ================= 4. FLUID STREAM OF LETTERS (تدفق الأحرف مش ظهور مفاجئ) =================
  // Once entering the white stage, all letters flow in sequentially with smooth fluid animation
  const letters = ['E', 'X', 'O', 'R', 'A'];

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

        {/* ================= CHAPTER 2: THE 5 PROGRESSIVE ARTICLES (FLANKING SIDES) ================= */}
        {/* Emblem stays locked in the center corridor while articles display on Left & Right */}
        
        {/* PHYSICAL LEFT COLUMN (Articles 2 & 4) */}
        <div 
          className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-72 sm:w-88 md:w-96 pointer-events-none z-15 flex flex-col items-start space-y-8"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Article 2: اللغات والترسانة التقنية */}
          {art2Opacity > 0 && (
            <div 
              className="transition-opacity duration-200"
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
              className="transition-opacity duration-200"
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
          className="absolute right-6 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 sm:w-88 md:w-96 pointer-events-none z-15 flex flex-col items-end space-y-8 text-right"
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
        >
          {/* Article 1: الجودة والدقة البرمجية */}
          {art1Opacity > 0 && (
            <div 
              className="transition-opacity duration-200"
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
              className="transition-opacity duration-200"
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
              className="transition-opacity duration-200"
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

        {/* ================= CHAPTER 3: CENTERED EMBLEM + FLUID STREAM OF LETTERS ================= */}
        {/*
            Exact user request:
            1. Emblem is ALWAYS IN THE CENTER horizontally (x = 0).
            2. At the final name: Emblem is positioned with laser precision as 'T'.
            3. Letters flow in smoothly and continuously ("يبدأ تدفق الأحرف مش ظهور مفاجئ").
            4. The full name TEXORA is perfectly centered in the screen.
        */}
        <div 
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none px-4"
          dir="ltr"
        >
          {/* Centered Brandmark Master Container */}
          <div className="relative flex items-center justify-center">

            {/* 1. THE EMBLEM: Always in the center horizontally, settles with laser precision */}
            <div
              className="relative will-change-transform flex items-center justify-center select-none shrink-0"
              style={{
                transform: `translate3d(0px, ${logoY}px, 0px) perspective(1000px) rotateX(${pitchAngleX}deg) rotateY(${yawAngleY}deg) rotateZ(${bankAngleZ}deg)`,
                transition: isWhiteStage ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.05s linear',
              }}
            >
              <img
                src="/assets/texora-logo-clean-tight.png"
                alt="Texora Emblem"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain"
                style={{
                  filter: isWhiteStage 
                    ? 'contrast(1.2) brightness(0.9) drop-shadow(0 14px 28px rgba(15,23,42,0.22))' 
                    : 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))',
                }}
              />
            </div>

            {/* 2. FLUID STREAM OF LETTERS 'E X O R A' */}
            {/*
                Smooth overlapping stream:
                Each letter flows in with progressive slide-in, gradual opacity, and optical focus
                creating a continuous typographic wave ("تدفق الأحرف مش ظهور مفاجئ")
            */}
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
                // Staggered continuous flow delay
                const delayMs = index * 140 + 120; // 120ms, 260ms, 400ms, 540ms, 680ms
                return (
                  <span 
                    key={char}
                    className="inline-block transition-all transform"
                    style={{
                      marginLeft: index > 0 ? '0.12em' : '0.16em',
                      color: '#02091d',
                      opacity: isWhiteStage ? 1 : 0,
                      transform: isWhiteStage ? 'translateX(0px) scale(1)' : 'translateX(-28px) scale(0.9)',
                      filter: isWhiteStage ? 'blur(0px)' : 'blur(6px)',
                      transitionDuration: '550ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: isWhiteStage ? `${delayMs}ms` : '0ms',
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
