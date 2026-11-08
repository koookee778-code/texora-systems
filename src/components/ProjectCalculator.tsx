import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ArrowLeft, MessageSquare, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface ProjectCalculatorProps {
  language: Language;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [projectType, setProjectType] = useState<'pharma' | 'retail' | 'edu' | 'web'>('pharma');
  const [scale, setScale] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [addons, setAddons] = useState<string[]>(['whatsapp-bot', 'cloudflare']);

  const basePrices = {
    pharma: { starter: 4800, growth: 9500, enterprise: 18000, days: { starter: 5, growth: 10, enterprise: 18 } },
    retail: { starter: 5500, growth: 11000, enterprise: 22000, days: { starter: 7, growth: 12, enterprise: 21 } },
    edu: { starter: 6500, growth: 13500, enterprise: 25000, days: { starter: 8, growth: 14, enterprise: 25 } },
    web: { starter: 4000, growth: 8500, enterprise: 17000, days: { starter: 5, growth: 9, enterprise: 16 } },
  };

  const addonPrices: { [key: string]: { price: number; days: number; ar: string; en: string } } = {
    'whatsapp-bot': {
      price: 2500,
      days: 3,
      ar: 'بوت واتساب ذكي مؤتمت 24/7 (AI Agent)',
      en: '24/7 Autonomous WhatsApp AI Bot',
    },
    'cloudflare': {
      price: 1200,
      days: 1,
      ar: 'نشر فائق السرعة على Cloudflare Edge وحماية WAF',
      en: 'Cloudflare Edge Deployment & DDoS Shield',
    },
    'mobile-app': {
      price: 6000,
      days: 10,
      ar: 'تطبيق هاتف محمول (iOS & Android)',
      en: 'Cross-Platform Mobile App (iOS & Android)',
    },
    'pos-hardware': {
      price: 3200,
      days: 2,
      ar: 'برمجة طابعات الإيصالات وقارئات الباركود والدرج',
      en: 'Thermal Printer & Barcode Scanner Hardware Setup',
    },
  };

  const toggleAddon = (key: string) => {
    setAddons((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Compute Total
  const currentBase = basePrices[projectType][scale];
  const currentDays = basePrices[projectType].days[scale];
  const addonsCost = addons.reduce((sum, key) => sum + (addonPrices[key]?.price || 0), 0);
  const addonsDays = addons.reduce((sum, key) => sum + (addonPrices[key]?.days || 0), 0);

  const totalCost = currentBase + addonsCost;
  const totalDays = currentDays + addonsDays;

  // WhatsApp Pre-filled link
  const buildWhatsAppLink = () => {
    const typeLabel = projectType === 'pharma' ? 'نظام صيدلية متكامل' : projectType === 'retail' ? 'نظام متجر وبراند' : projectType === 'edu' ? 'منصة تعليمية LMS' : 'موقع وتطبيق سحابي';
    const scaleLabel = scale === 'starter' ? 'مستوى مبتدئ' : scale === 'growth' ? 'مستوى نمو وفروع' : 'مستوى مؤسسي ضخم';
    const msg = `مرحباً Texora 👋 أرغب في حجز نظام: ${typeLabel} (${scaleLabel}) مع الإضافات المختارة. التكلفة التقديرية: ${totalCost} ج.م وموعد التسليم: ${totalDays} أيام. متى يمكننا البدء؟`;
    return `https://wa.me/201012345678?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="calculator" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>{isAr ? 'محرك تسعير المشاريع الذكي' : 'Interactive Project Cost Estimator'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cairo']">
          {isAr ? 'حدد متطلباتك واكتشف التكلفة فورياً' : 'Tailor Your Architecture & Instant Quote'}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
          {isAr
            ? 'شفافية برمجية مطلقة. اختر طبيعة نظامك، حجم عملك، والمميزات الذكية لتحصل على تقدير دقيق للوقت والتكلفة.'
            : 'Absolute architectural clarity. Configure project scope, add AI capabilities, and generate an immediate scope estimate.'}
        </p>
      </div>

      <div className="glow-card rounded-3xl bg-gray-950/90 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Options Selectors */}
          <div className="lg:col-span-7 space-y-8 text-right">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">
                {isAr ? '1. اختر نوع النظام أو المشروع المطلوب:' : '1. Select System Type:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'pharma', ar: '💊 نظام صيدليات (PharmaCare)', en: '💊 Pharmacy POS' },
                  { id: 'retail', ar: '👕 نظام متاجر وبرندات (RetailFlow)', en: '👕 Retail & Apparel POS' },
                  { id: 'edu', ar: '🎓 منصة تعليمية (EduVerse)', en: '🎓 EdTech DRM LMS' },
                  { id: 'web', ar: '⚡ موقع ومنصة سحابية مخصصة', en: '⚡ Enterprise Web App' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProjectType(t.id as any)}
                    className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-right ${
                      projectType === t.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isAr ? t.ar : t.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">
                {isAr ? '2. حجم ومستوى المشروع الحالي:' : '2. Project Scale & Branches:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'starter', ar: 'بسيط / فرع واحد', en: 'Single Branch' },
                  { id: 'growth', ar: 'متوسط / عدة فروع', en: 'Multi-Branch' },
                  { id: 'enterprise', ar: 'مؤسسي / سلسلة كبرى', en: 'Enterprise Network' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScale(s.id as any)}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-center ${
                      scale === s.id
                        ? 'bg-purple-500/20 border-purple-400 text-white shadow-md shadow-purple-500/10'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isAr ? s.ar : s.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">
                {isAr ? '3. الميزات الذكية والإضافات التقنية الموصى بها:' : '3. Advanced Engineering Add-ons:'}
              </label>
              <div className="space-y-2.5">
                {Object.entries(addonPrices).map(([key, item]) => {
                  const isChecked = addons.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleAddon(key)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-right text-xs sm:text-sm transition-all ${
                        isChecked
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                          : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-gray-950' : 'border-gray-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-white">{isAr ? item.ar : item.en}</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold shrink-0">
                        +{item.price} {isAr ? 'ج.م' : 'EGP'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quotation Summary Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  {isAr ? 'ملخص العرض التقديري الفوري' : 'ESTIMATED SPEC SHEET'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  TEXORA-QUOTE
                </span>
              </div>

              {/* Price Metric */}
              <div className="mb-6">
                <span className="text-xs text-gray-400 font-light block mb-1">
                  {isAr ? 'الاستثمار التقديري الإجمالي:' : 'Total Estimated Investment:'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-['Syne']">
                    {totalCost.toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-cyan-400 font-['Cairo']">
                    {isAr ? 'جنيه مصري' : 'EGP'}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 block mt-1">
                  {isAr ? 'يشمل الدعم الفني، التدريب الشامل، والتهيئة السحابية' : 'Includes onboarding, training, and deployment'}
                </span>
              </div>

              {/* Delivery Timeline */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs text-gray-300 font-medium">
                    {isAr ? 'مدة التسليم والتشغيل التجريبي:' : 'Deployment Timeline:'}
                  </span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {totalDays} {isAr ? 'أيام عمل' : 'Work Days'}
                </span>
              </div>

              {/* Included Highlights */}
              <div className="space-y-2 text-xs text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'ضمان أمان البيانات والنسخ الاحتياطي السحابي اليومي' : 'Daily automated cloud backups & zero-loss guarantee'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'بنية تحتية سريعة جداً على Cloudflare و Supabase' : 'Fast-edge deployment on Cloudflare & Supabase'}</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{isAr ? 'احجز هذا العرض فوراً عبر واتساب' : 'Claim Quote via WhatsApp'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>

          </div>

        </div>
      </div>

    </section>
  );
};
