import React, { useState } from 'react';
import { Send, MessageSquare, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'pharmacy',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
          <MessageSquare className="w-4 h-4" />
          <span>{isAr ? 'بدء شراكة النجاح البرمجي' : 'Initiate Partnership'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cairo']">
          {isAr ? 'دعنا نبني نظامك القادم بأعلى معايير القوة' : 'Ready to Engineer Your Digital Dominance?'}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
          {isAr
            ? 'تواصل مباشرة مع مهندسينا، أو اترك بياناتك ليتواصل معك خبير الأنظمة خلال دقائق معدودة.'
            : 'Speak with our lead system architects or submit your project details for an immediate technical blueprint.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Direct WhatsApp & Company Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main WhatsApp Card */}
          <div className="glow-card rounded-3xl bg-gradient-to-br from-emerald-950/40 via-gray-950 to-gray-900 border border-emerald-500/30 p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isAr ? 'مستشار الواتساب متصل 24/7' : 'WhatsApp Live 24/7'}</span>
              </span>
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-black text-white mb-3 font-['Cairo']">
              {isAr ? 'محادثة فورية مباشرة عبر الواتساب' : 'Direct VIP WhatsApp Channel'}
            </h3>

            <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
              {isAr
                ? 'تفضل التواصل المباشر السريع؟ فريق مهندسي Texora والبوت الذكي في انتظارك لمناقشة كافة التفاصيل وحجز موعد المعاينة.'
                : 'Need immediate response? Connect directly with our engineering team for instant scoping and quotes.'}
            </p>

            <a
              href="https://wa.me/201012345678?text=مرحباً%20Texora%2C%20أرغب%20في%20استشارة%20برمجية%20لنظام%20جديد"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{isAr ? 'افتح محادثة واتساب الآن' : 'Start WhatsApp Chat Now'}</span>
            </a>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Mail className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs text-gray-400 block">{isAr ? 'البريد الرسمي:' : 'Official Email:'}</span>
              <span className="text-xs font-mono font-bold text-white mt-1 block">contact@texora.systems</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-purple-400 mb-2" />
              <span className="text-xs text-gray-400 block">{isAr ? 'المقر الإداري:' : 'Headquarters:'}</span>
              <span className="text-xs font-semibold text-white mt-1 block">{isAr ? 'القاهرة • التجمع الخامس' : 'Cairo • Digital District'}</span>
            </div>
          </div>

          {/* Infrastructure Trust */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-gray-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {isAr
                ? 'جميع البيانات مشفرة بالكامل طبقاً لمعايير الأمان الدولية السحابية على Cloudflare و Supabase.'
                : 'Enterprise-grade encryption deployed across Cloudflare Edge and Supabase Postgres.'}
            </span>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glow-card rounded-3xl bg-gradient-to-b from-blue-950/40 via-[#04163d]/60 to-[#02091d]/90 border border-cyan-500/20 p-8 sm:p-10 backdrop-blur-2xl">
            
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Cairo']">
                  {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received Successfully!'}
                </h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'شكراً لتواصلك مع Texora. يقوم مهندس الأنظمة الآن بمراجعة متطلباتك وسيتواصل معك خلال أقل من ساعتين.'
                    : 'Thank you for reaching out to Texora. A systems architect is reviewing your spec and will contact you shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition"
                >
                  {isAr ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-white font-['Cairo']">
                    {isAr ? 'طلب دراسة مشروع واستشارة تقنية' : 'Project Blueprint & Tech Consultation'}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {isAr ? 'املأ البيانات وسيقوم مهندس الأنظمة بالرد عليك مباشرة' : 'Fill details for an engineered architectural review'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">
                      {isAr ? 'الاسم بالكامل أو اسم الشركة *' : 'Full Name or Company *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? 'مثال: د. محمد أحمد / شركة الأفق' : 'e.g. Dr. Mohamed / Horizon Ltd'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">
                      {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={isAr ? '01012345678' : '+20 1012345678'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {isAr ? 'نوع النظام المطلوب *' : 'Target System Solution *'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="pharmacy">{isAr ? '💊 نظام إدارة صيدلية متكامل (PharmaCare POS)' : 'Pharmacy POS & Inventory'}</option>
                    <option value="retail">{isAr ? '👕 نظام كاشير ومخازن للمتاجر والبرندات (RetailFlow)' : 'Retail & Multi-Branch POS'}</option>
                    <option value="edu">{isAr ? '🎓 منصة تعليمية تفاعلية للمدرسين (EduVerse LMS)' : 'Educational Video-DRM LMS'}</option>
                    <option value="web">{isAr ? '⚡ تطوير موقع أو منصة سحابية مخصصة' : 'Enterprise Web Platform'}</option>
                    <option value="bot">{isAr ? '🤖 بوت واتساب ذكي مؤتمت 24/7 (AI Agent)' : '24/7 WhatsApp AI Assistant'}</option>
                    <option value="marketing">{isAr ? '📈 حملات تسويق رقمي ونمو المبيعات' : 'Performance Marketing & SEO'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {isAr ? 'تفاصيل إضافية عن المشروع (اختياري)' : 'Additional Project Details (Optional)'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={isAr ? 'اذكر عدد الفروع، الميزات الخاصة التي تحتاجها، أو موعد التسليم المستهدف...' : 'Mention branch count, key features, or expected launch date...'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-gray-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  {submitting ? (
                    <span>{isAr ? 'جارٍ الإرسال والتسجيل السحابي...' : 'Transmitting to Cloud...'}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isAr ? 'إرسال طلب الاستشارة الفورية' : 'Submit Consultation Request'}</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};
