import React, { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { Language, ProjectItem } from '../types';

interface ProjectsPortfolioProps {
  language: Language;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [filter, setFilter] = useState<'all' | 'pharma' | 'edu' | 'pos' | 'web'>('all');

  const projects: ProjectItem[] = [
    {
      id: 'pharma-chain',
      titleAr: 'سلسلة صيدليات النخبة (Elite Pharma Chain)',
      titleEn: 'Elite Pharma Multi-Branch ERP & POS',
      category: 'pharma',
      categoryLabelAr: 'أنظمة صيدليات ذكية',
      categoryLabelEn: 'Smart Pharmacy POS',
      descriptionAr: 'نظام إدارة سحابي متكامل يربط 18 فرع صيدلية مع قاعدة بيانات موحدة، جرد بالباركود، ونظام اقتراح بدائل الأدوية عند النقص.',
      descriptionEn: 'Unified cloud ERP linking 18 pharmacy branches with real-time barcode inventory and active-ingredient drug alternative matching.',
      metricsAr: 'مزامنة 18 فرع • كشف 25,000 صنف • انعدام العجز في النواقص',
      metricsEn: '18 Branches Synced • 25k Drug Database • Zero Discrepancy',
      tags: ['Cloud POS', 'Supabase DB', 'Barcode Engine', 'Tax Invoicing'],
      image: '/assets/texora-logo-clean-tight.png',
      gradient: 'from-emerald-600/30 via-teal-900/20 to-gray-950',
    },
    {
      id: 'edu-academy',
      titleAr: 'منصة أكاديمية النجوم التعليمية (Star Academy LMS)',
      titleEn: 'Star Academy Video-DRM Platform',
      category: 'edu',
      categoryLabelAr: 'منصات تعليمية تفاعلية',
      categoryLabelEn: 'Interactive EdTech',
      descriptionAr: 'منصة تعليمية متطورة تخدم أكثر من 45,000 طالب مع حماية مشددة للفيديوهات ضد التسجيل وتصحيح تلقائي للامتحانات مع بوابات دفع.',
      descriptionEn: 'High-throughput LMS empowering 45,000+ students with DRM video encryption, dynamic watermarking, and automated grading.',
      metricsAr: '45,000+ طالب نشط • حماية DRM 100% • بوابات دفع فورية',
      metricsEn: '45k+ Active Students • 100% DRM Protected • Automated Grading',
      tags: ['React 19', 'Cloudflare Stream', 'Anti-Piracy DRM', 'Paymob'],
      image: '/assets/texora-logo-clean-tight.png',
      gradient: 'from-blue-600/30 via-indigo-900/20 to-gray-950',
    },
    {
      id: 'brand-apparel',
      titleAr: 'براند أزياء فوغ الحضرية (Vogue Urban Apparel)',
      titleEn: 'Vogue Urban Apparel Omnichannel POS & Web',
      category: 'pos',
      categoryLabelAr: 'أنظمة متاجر وبرندات',
      categoryLabelEn: 'Retail & Fashion POS',
      descriptionAr: 'نظام متكامل يربط متجر البيع بالتجزئة مع المتجر الإلكتروني، مع إدارة المقاسات والألوان ومزامنة المخزون التلقائية لحظة بلحظة.',
      descriptionEn: 'Omnichannel POS and luxury e-commerce uniting brick-and-mortar stores with instant size/color inventory synchronization.',
      metricsAr: 'زيادة المبيعات +320% • مزامنة لحظية للمخزن • 0 خطأ شحن',
      metricsEn: '+320% Revenue Surge • Real-time SKU Sync • Automated Fulfillment',
      tags: ['Omnichannel POS', 'Tailwind', 'Stripe', 'Thermal Printing'],
      image: '/assets/texora-logo-clean-tight.png',
      gradient: 'from-amber-600/30 via-orange-900/20 to-gray-950',
    },
    {
      id: 'ai-whatsapp-bot',
      titleAr: 'نظام خدمة العملاء المؤتمت بالواتساب (AutoCare AI)',
      titleEn: 'AutoCare 24/7 Autonomous WhatsApp Agent',
      category: 'web',
      categoryLabelAr: 'ذكاء اصطناعي وأتمتة',
      categoryLabelEn: 'Autonomous AI Agent',
      descriptionAr: 'بوت ذكاء اصطناعي يعمل على الواتساب للرد التلقائي على العملاء، حجز المواعيد، وتقديم عروض الأسعار بدون أي موظف بشري.',
      descriptionEn: '24/7 AI-driven WhatsApp virtual sales rep qualifying prospects, quoting pricing, and writing directly into CRM.',
      metricsAr: 'رد فوري في 2 ثانية • وفر 4 موظفي خدمة عملاء • 24/7 متاح',
      metricsEn: 'Sub-2s Responses • 4 Full-time Reps Saved • 24/7 Uptime',
      tags: ['WhatsApp Cloud API', 'Gemini AI', 'Supabase CRM', 'Vercel Edge'],
      image: '/assets/texora-logo-clean-tight.png',
      gradient: 'from-cyan-600/30 via-sky-900/20 to-gray-950',
    },
    {
      id: 'enterprise-saas',
      titleAr: 'بوابة الأعمال السحابية للمؤسسات (Nexus Enterprise)',
      titleEn: 'Nexus Cloud Enterprise Portal & CMS',
      category: 'web',
      categoryLabelAr: 'مواقع ومنصات سحابية',
      categoryLabelEn: 'Enterprise Cloud Portal',
      descriptionAr: 'موقع مؤسسي فائق السرعة بهندسة Edge مخصص لتحقيق أعلى معدلات التحويل وحماية البيانات من هجمات DDoS.',
      descriptionEn: 'Edge-rendered corporate platform with sub-second page loads, enterprise WAF firewall, and deep SEO optimization.',
      metricsAr: 'سرعة تحميل 0.4s • معدل ارتداد منخفض 18% • حماية كاملة',
      metricsEn: '0.4s Load Time • 18% Bounce Rate • Cloudflare Enterprise WAF',
      tags: ['Cloudflare Pages', 'TypeScript', 'SEO Dominance', 'Modern 3D'],
      image: '/assets/texora-logo-clean-tight.png',
      gradient: 'from-purple-600/30 via-pink-900/20 to-gray-950',
    },
  ];

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'سجل الإنجاز والأنظمة الحية' : 'Case Studies & Production Milestones'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cairo']">
            {isAr ? 'مشاريع حقيقية تصنع فارقاً رقمياً' : 'Engineered for Proven Real-World Impact'}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', labelAr: 'جميع الأنظمة', labelEn: 'All Systems' },
            { id: 'pharma', labelAr: 'الصيدليات', labelEn: 'Pharmacies' },
            { id: 'edu', labelAr: 'التعليم والـ LMS', labelEn: 'EdTech' },
            { id: 'pos', labelAr: 'المتاجر والبرندات', labelEn: 'Retail & POS' },
            { id: 'web', labelAr: 'الويب والذكاء الاصطناعي', labelEn: 'Web & AI' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === btn.id
                  ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {isAr ? btn.labelAr : btn.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glow-card rounded-3xl bg-gray-900/60 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl"
          >
            {/* Top Visual Banner */}
            <div className={`relative h-48 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/5`}>
              <div className="flex justify-between items-start z-10">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                  {isAr ? item.categoryLabelAr : item.categoryLabelEn}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-gray-950 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Watermark Logo in background */}
              <img
                src={item.image}
                alt=""
                className="absolute -bottom-8 -right-8 w-44 h-44 object-contain opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              />

              {/* Metrics Badge */}
              <div className="z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 inline-flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                <span>{isAr ? item.metricsAr : item.metricsEn}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col flex-1 justify-between text-right">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-gray-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
