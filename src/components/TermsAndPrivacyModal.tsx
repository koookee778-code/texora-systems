import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  language: Language;
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
  isOpen,
  onClose,
  type,
  language,
}) => {
  if (!isOpen) return null;
  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] bg-gray-950 border border-white/10 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            {type === 'terms' ? <FileText className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo']">
              {type === 'terms' 
                ? (isAr ? 'الشروط والأحكام واتفاقية مستوى الخدمة (SLA)' : 'Terms of Service & SLA') 
                : (isAr ? 'سياسة الخصوصية وحماية البيانات السحابية' : 'Privacy Policy & Cloud Data Protection')}
            </h3>
            <span className="text-xs text-gray-400 font-mono">
              TEXORA SYSTEMS • VERSION 2026.1 • OFFICIAL CONTRACT
            </span>
          </div>
        </div>

        {/* Content Body */}
        {type === 'terms' ? (
          <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed">
            <section>
              <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? '1. نطاق تقديم الخدمات البرمجية' : '1. Software Engineering Scope'}</span>
              </h4>
              <p>
                {isAr
                  ? 'تلتزم شركة Texora بتطوير وتسليم الأنظمة البرمجية (المواقع، المنصات التعليمية، أنظمة نقاط البيع POS، وبوتات الذكاء الاصطناعي) طبقاً لوثيقة المواصفات الفنية المتفق عليها بين الطرفين، مع تقديم التدريب اللازم للعميل وفريق عمله.'
                  : 'Texora commits to engineering and deploying custom software systems based on agreed technical specifications, including training and operational onboarding.'}
              </p>
            </section>

            <section>
              <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? '2. الملكية الفكرية وسورس كود المشروع' : '2. Intellectual Property & Source Rights'}</span>
              </h4>
              <p>
                {isAr
                  ? 'تؤول كافة البيانات الخاصة بقاعدة بيانات العميل، المحتوى التعليمي، وأسماء العملاء إلى المشتري بالكامل، مع ضمان عدم مشاركة أو استخدام بيانات نشاطه لأي طرف ثالث.'
                  : 'Clients retain full ownership of their underlying business data, user records, and custom content. Texora guarantees zero unauthorized third-party sharing.'}
              </p>
            </section>

            <section>
              <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? '3. الضمان والدعم الفني السحابي' : '3. Warranty & Cloud Uptime SLA'}</span>
              </h4>
              <p>
                {isAr
                  ? 'يحصل العميل على ضمان تشغيلي مجاني لمدة 12 شهراً يشمل معالجة أي ثغرات أو أخطاء برمجية قد تظهر، بالإضافة إلى نسخ احتياطي سحابي دوري تلقائي لضمان استمرارية العمل دون انقطاع.'
                  : 'All systems include a 12-month operational warranty covering technical bugs and automatic periodic cloud backups.'}
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed">
            <section>
              <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? '1. أمان وتشفير البيانات السحابية' : '1. Cloud Encryption & Security'}</span>
              </h4>
              <p>
                {isAr
                  ? 'يتم تخزين ومعالجة كافة البيانات في قواعد بيانات Supabase المشفرة على أحدث طبقات الأمان، مع تفعيل بروتوكولات حماية متقدمة عبر شبكات Cloudflare للتصدي لهجمات حجب الخدمة واختراق قواعد البيانات.'
                  : 'All client and transactional records are encrypted at rest and in transit using Supabase and Cloudflare enterprise firewalls.'}
              </p>
            </section>

            <section>
              <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? '2. حماية بيانات محادثات بوت الواتساب' : '2. WhatsApp Bot Data Privacy'}</span>
              </h4>
              <p>
                {isAr
                  ? 'تخضع محادثات الواتساب المؤتمتة لحماية مشددة؛ ولا يتم استخدام أي أرقام هواتف أو محادثات تجارية في تدريب نماذج عامة أو بيعها لأي جهات تسويقية خارجية بأي شكل من الأشكال.'
                  : 'Automated WhatsApp interactions are processed securely; customer phone numbers and messages are never sold or used for public AI training.'}
              </p>
            </section>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs transition"
          >
            {isAr ? 'موافق وإغلاق' : 'Acknowledge & Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
