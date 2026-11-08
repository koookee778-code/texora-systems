import React, { useState } from 'react';
import { 
  Code, ShoppingBag, GraduationCap, Pill, Bot, TrendingUp, 
  CheckCircle2, ArrowRight, ArrowLeft, Shield, Zap, Sparkles, Database 
} from 'lucide-react';
import { Language, ServiceItem } from '../types';

interface SystemsShowcaseProps {
  language: Language;
}

export const SystemsShowcase: React.FC<SystemsShowcaseProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      id: 'pharmacy-pos',
      titleAr: 'أنظمة الصيدليات الذكية (PharmaCare Pro)',
      titleEn: 'Smart Pharmacy Ecosystem (PharmaCare Pro)',
      categoryAr: 'أنظمة طبية متخصصة',
      categoryEn: 'Healthcare & POS',
      descriptionAr: 'نظام سحابي متكامل لإدارة الصيدليات مع كشف بدائل الأدوية بالمادة الفعالة، تنبيهات تواريخ الصلاحية، الجرد بالباركود، ونواقص المخزن التلقائية.',
      descriptionEn: 'End-to-end pharmacy management suite featuring active-ingredient medicine alternatives, expiry alerts, barcode rapid checkout, and auto-restock.',
      featuresAr: [
        'قاعدة بيانات ضخمة لأكثر من 25,000 دواء ومكمل وبدائلها الفعالة',
        'نظام باركود فائق السرعة متوافق مع كافة أجهزة الكاشير وقارئات الليزر',
        'تنبيهات فورية لتواريخ انتهاء الصلاحية والجرد الدوري دون إيقاف العمل',
        'إصدار الفواتير الضريبية والإلكترونية المتوافقة مع هيئات الضرائب'
      ],
      featuresEn: [
        'Comprehensive database of 25,000+ medicines with active ingredient alternatives',
        'High-speed barcode scanner compatibility with thermal receipt printers',
        'Automatic expiration date tracking & zero-downtime physical audit audits',
        'Compliant electronic and tax invoice generation'
      ],
      icon: 'Pill',
      badgeAr: 'الأكثر طلباً للصيدليات',
      badgeEn: 'Best for Pharmacies',
      color: 'from-emerald-500 to-teal-700'
    },
    {
      id: 'retail-brands',
      titleAr: 'أنظمة المحلات والبرندات والمتاجر (RetailFlow POS)',
      titleEn: 'Retail & Multi-Branch Brand Systems (RetailFlow POS)',
      categoryAr: 'نقاط البيع والمخازن',
      categoryEn: 'Retail & Inventory',
      descriptionAr: 'نظام إدارة شامل لمتاجر الملابس، البرندات، ومحلات التجزئة مع ربط الفروع المتعددة، مزامنة المخزون اللحظية، وتطبيق مبيعات للهواتف والتابلت.',
      descriptionEn: 'Complete omnichannel retail infrastructure for apparel brands and stores with real-time multi-branch inventory sync and mobile POS.',
      featuresAr: [
        'ربط مركزي لعدد غير محدود من الفروع والمستودعات في شاشة واحدة',
        'دعم مقاسات، ألوان، وموديلات ملابس مع طباعة باركود مخصص للعلامة التجارية',
        'برامج ولاء العملاء، كروت الخصم، ونقاط الشراء المسترجعة',
        'ربط مباشر مع شركات الشحن والدفع الإلكتروني والموقع الأونلاين'
      ],
      featuresEn: [
        'Centralized dashboard managing unlimited branches and warehouses',
        'Variant management (Sizes/Colors/SKUs) with custom branded barcode tag printing',
        'Customer loyalty points, gift cards, and automated promotional discounts',
        'Direct integration with shipping couriers and payment gateways'
      ],
      icon: 'ShoppingBag',
      badgeAr: 'للمتاجر والعلامات التجارية',
      badgeEn: 'For Retail & Brands',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'edu-platforms',
      titleAr: 'المنصات التعليمية المتطورة (EduVerse LMS)',
      titleEn: 'Next-Gen Educational Platforms (EduVerse LMS)',
      categoryAr: 'تكنولوجيا التعليم',
      categoryEn: 'EdTech & Learning',
      descriptionAr: 'منصات تعليمية تفاعلية للمدرسين، الأكاديميات، والجامعات مع حماية مشددة للفيديوهات ضد التسجيل، بنوك أسئلة وامتحانات مؤتمتة التصحيح.',
      descriptionEn: 'Interactive learning management platforms with multi-layer video DRM anti-piracy protection, automated grading quizzes, and student analytics.',
      featuresAr: [
        'حماية قصوى لمحتوى الفيديو (DRM) وعلامات مائية متحركة لمنع التصوير والسرقة',
        'نظام امتحانات تفاعلية مع تصحيح تلقائي وإظهار النتائج والشهادات الفورية',
        'بوابات دفع إلكترونية ذكية واشتراكات شهرية أو دفع لكل كورس',
        'لوحة تحكم للمدرس لمتابعة وقت مشاهدة كل طالب ونقاط تفوقه'
      ],
      featuresEn: [
        'Dynamic DRM video encryption and forensic dynamic watermarking',
        'Interactive quiz engine with auto-grading and instant verifiable certificates',
        'Multi-currency payment gateways and subscription management',
        'Teacher analytics tracking precise watch-time and drop-off rates'
      ],
      icon: 'GraduationCap',
      badgeAr: 'حماية متطورة للمحتوى',
      badgeEn: 'Military-Grade DRM',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'web-platforms',
      titleAr: 'تطوير المواقع والمنصات السحابية (Enterprise Web)',
      titleEn: 'Enterprise Web & Custom Cloud Architecture',
      categoryAr: 'هندسة الويب المتقدمة',
      categoryEn: 'Custom Software & SaaS',
      descriptionAr: 'بناء مواقع شركات، منصات ويب سريعة البرق، وتطبيقات ويب سحابية بهندسة Edge Computing تضمن أعلى معدلات الأمان وتحويل الزوار إلى عملاء.',
      descriptionEn: 'High-converting corporate websites and web apps built on edge infrastructure for sub-second loading, top-tier SEO, and enterprise security.',
      featuresAr: [
        'سرعة تحميل فائقة على مستوى العالم عبر شبكات Cloudflare Edge',
        'تصاميم ثلاثية الأبعاد تفاعلية وتجربة مستخدم لا تُنسى لترسيخ الهوية',
        'تهيئة برمجية عميقة لمحركات البحث (Technical SEO) لتصدر النتائج الأولى',
        'بنية تحتية سحابية مرنة تتحمل مئات الآلاف من الزوار المتزامنين'
      ],
      featuresEn: [
        'Sub-second global load times via Cloudflare Edge network deployment',
        'Immersive interactive 3D UI experiences that captivate clients',
        'Deep technical SEO architecture ensuring premier Google rankings',
        'Auto-scaling cloud infrastructure handling millions of concurrent requests'
      ],
      icon: 'Code',
      badgeAr: 'سرعة وأمان فائق',
      badgeEn: 'Edge Powered',
      color: 'from-cyan-500 to-sky-600'
    },
    {
      id: 'ai-whatsapp',
      titleAr: 'بوتات الواتساب والذكاء الاصطناعي المؤتمت (Texora AI)',
      titleEn: 'Autonomous AI WhatsApp Bots & CRM Integration',
      categoryAr: 'أتمتة ذكية بدون تدخل بشري',
      categoryEn: 'Autonomous Automation',
      descriptionAr: 'مساعد ذكي مدعوم بالذكاء الاصطناعي يعمل 24/7 على الواتساب للرد الفوري على استفسارات العملاء، حجز المواعيد، تقديم عروض الأسعار، وإدخال البيانات تلقائياً في الـ CRM.',
      descriptionEn: '24/7 AI-driven WhatsApp virtual agents that qualify leads, quote projects, book appointments, and sync data into CRM without human intervention.',
      featuresAr: [
        'ردود فورية طبيعية ومقنعة باللهجة العربية العامية والفصحى والإنجليزية',
        'تأهيل العملاء تلقائياً وتحديد الميزانية ونوع الخدمة المطلوبة بدقة',
        'إرسال العروض والفواتير وملفات الـ PDF مباشرة داخل محادثة الواتساب',
        'ربط مباشر مع قواعد بيانات Supabase وإرسال إشعارات فورية للإدارة'
      ],
      featuresEn: [
        'Natural Arabic (all dialects) & English conversational comprehension',
        'Autonomous lead qualification, budgeting, and project scoping',
        'Automated dispatch of PDF proposals, quotes, and catalog links in-chat',
        'Real-time Supabase database synchronization and instant alert triggers'
      ],
      icon: 'Bot',
      badgeAr: 'أتمتة 24/7 بدون موظف',
      badgeEn: 'Zero Human Needed',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'marketing-growth',
      titleAr: 'التسويق الرقمي وهندسة النمو (Performance Marketing)',
      titleEn: 'Performance Marketing & Digital Growth Engine',
      categoryAr: 'نمو المبيعات والعائد',
      categoryEn: 'Marketing & ROI',
      descriptionAr: 'استراتيجيات تسويقية رقمية مبنية على البيانات لتحقيق أعلى عائد على الإنفاق الإعلاني (ROAS)، إدارة حملات Meta و Google، وتحسين معدل التحويل.',
      descriptionEn: 'Data-engineered performance marketing driving unmatched ROAS across Google, Meta, and TikTok with high-conversion landing page funnels.',
      featuresAr: [
        'إدارة احترافية لحملات Google Search و Facebook و Instagram و TikTok Ads',
        'تصميم مسارات بيعية (Sales Funnels) ترفع معدل الشراء بنسبة تصل إلى 340%',
        'تتبع وتحليل متقدم للبيانات وتتبع سلوك الزوار باستخدام أدوات Semrush و AI',
        'كتابة محتوى إعلاني سيكولوجي يخاطب رغبة العميل ويحفز القرار الفوري'
      ],
      featuresEn: [
        'High-precision campaign management across Google Ads, Meta, and TikTok',
        'Custom sales funnels elevating conversion rates by up to 340%',
        'Advanced conversion tracking, attribution modeling, and Semrush analytics',
        'High-impact psychological copywriting triggering immediate buyer intent'
      ],
      icon: 'TrendingUp',
      badgeAr: 'مضاعفة المبيعات',
      badgeEn: 'High ROAS',
      color: 'from-rose-500 to-red-600'
    }
  ];

  const current = services[activeTab];

  return (
    <section id="systems" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'الترسانة التقنية والأنظمة المتكاملة' : 'Our Engineering Ecosystem'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cairo']">
          {isAr ? 'حلول برمجية تبني ريادة أعمالك' : 'Engineered for Digital Supremacy'}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
          {isAr
            ? 'نصمم ونبني أنظمة مصممة خصيصاً للنمو الفعلي، من الصيدليات والمتاجر إلى المنصات التعليمية وتطبيقات السحاب الذكية.'
            : 'Tailor-crafted software architectures built for unmatched scalability, from medical POS to automated learning platforms.'}
        </p>
      </div>

      {/* Interactive Tabs Navigator */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-12 bg-gray-900/40 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
        {services.map((item, index) => {
          const isSelected = activeTab === index;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all duration-300 relative ${
                isSelected
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl border border-white/10 scale-102'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              )}
              <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-white/5 text-cyan-400">
                {index === 0 && <Pill className="w-5 h-5" />}
                {index === 1 && <ShoppingBag className="w-5 h-5" />}
                {index === 2 && <GraduationCap className="w-5 h-5" />}
                {index === 3 && <Code className="w-5 h-5" />}
                {index === 4 && <Bot className="w-5 h-5" />}
                {index === 5 && <TrendingUp className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold leading-snug">
                {isAr ? item.titleAr.split('(')[0] : item.titleEn.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Service Card Details */}
      <div className="relative glow-card rounded-3xl bg-gradient-to-b from-gray-900/80 to-gray-950/90 border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden backdrop-blur-xl">
        
        {/* Ambient Gradient Corner Glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${current.color} opacity-15 rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Info & Features */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                {isAr ? current.categoryAr : current.categoryEn}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                {isAr ? current.badgeAr : current.badgeEn}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 font-['Cairo']">
              {isAr ? current.titleAr : current.titleEn}
            </h3>

            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
              {isAr ? current.descriptionAr : current.descriptionEn}
            </p>

            {/* Checklist of Superpowers */}
            <div className="space-y-3 w-full mb-8">
              {(isAr ? current.featuresAr : current.featuresEn).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200 font-normal leading-normal">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-gray-950 font-bold text-sm hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
              >
                <span>{isAr ? 'اطلب استشارة مجانية لهذا النظام' : 'Request Consultation'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
              <a
                href="#sandbox"
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition"
              >
                {isAr ? 'جرّب النظام لايف في الـ Sandbox' : 'Try Live in Sandbox'}
              </a>
            </div>

          </div>

          {/* Right Column: Visual Technical Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-950 to-gray-900 border border-white/10 p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TEXORA-CORE-V3.4</span>
                </div>
              </div>

              {/* Dynamic Mockup stats */}
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 font-mono">{isAr ? 'زمن الاستجابة والمزامنة' : 'Latency & Sync'}</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">18ms • Ultra Low</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[94%]" />
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 font-mono">{isAr ? 'معدل الأمان والجاهزية' : 'Security & Uptime'}</span>
                    <span className="text-xs font-bold text-cyan-400 font-mono">99.99% • Enterprise</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[99%]" />
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 font-mono">{isAr ? 'قواعد البيانات المدعومة' : 'Database Cloud'}</span>
                    <span className="text-xs font-bold text-purple-400 font-mono">Supabase Postgres</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full w-[98%]" />
                  </div>
                </div>

                {/* Architecture badge */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 text-center">
                  <p className="text-xs text-cyan-300 font-medium">
                    {isAr 
                      ? '⚡ يدعم العمل سحابياً ومحلياً (Offline-First) لمنع أي تعطل في البيع'
                      : '⚡ Offline-First Edge Resilient: Never stops selling even during disconnects'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
