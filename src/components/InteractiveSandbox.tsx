import React, { useState } from 'react';
import { 
  Play, ShoppingCart, Printer, Check, Plus, Minus, Trash2, 
  Bot, Send, Sparkles, Award, ShieldAlert, Film, Terminal, 
  Smartphone, CheckCircle, RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, POSProduct, ChatMessage } from '../types';

interface InteractiveSandboxProps {
  language: Language;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeSandbox, setActiveSandbox] = useState<'pos' | 'edu' | 'whatsapp'>('pos');

  // ================= 1. POS DEMO STATE =================
  const initialProducts: POSProduct[] = [
    { id: '1', nameAr: 'بنادول إكسترا 500 مجم (24 قرص)', nameEn: 'Panadol Extra 500mg (24 Tab)', category: 'Pharma', price: 45, barcode: '622100458921', stock: 120, icon: '💊' },
    { id: '2', nameAr: 'كونجستال للأعراض ونزلات البرد', nameEn: 'Congestal Cold & Flu Tabs', category: 'Pharma', price: 38, barcode: '622100874120', stock: 85, icon: '💉' },
    { id: '3', nameAr: 'هودي أوفر سايز - براند تكسورا', nameEn: 'Oversized Branded Hoodie - Black', category: 'Retail', price: 650, barcode: '741258963012', stock: 45, icon: '👕' },
    { id: '4', nameAr: 'حذاء سنيكرز كاجوال مقاوم للماء', nameEn: 'Waterproof Urban Sneakers', category: 'Retail', price: 890, barcode: '852963741025', stock: 30, icon: '👟' },
    { id: '5', nameAr: 'سيروم فيتامين C للنضارة 30 مل', nameEn: 'Vitamin C Brightening Serum 30ml', category: 'Cosmetics', price: 290, barcode: '963852741147', stock: 60, icon: '✨' },
  ];

  const [cart, setCart] = useState<{ product: POSProduct; qty: number }[]>([
    { product: initialProducts[0], qty: 2 },
    { product: initialProducts[2], qty: 1 },
  ]);
  const [receiptPrinted, setReceiptPrinted] = useState(false);
  const [lastScannedItem, setLastScannedItem] = useState<string | null>(null);

  const addToCart = (product: POSProduct) => {
    setLastScannedItem(isAr ? product.nameAr : product.nameEn);
    setReceiptPrinted(false);
    setTimeout(() => setLastScannedItem(null), 1500);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setReceiptPrinted(false);
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: POSProduct; qty: number }[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setReceiptPrinted(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setReceiptPrinted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // ================= 2. EDU DEMO STATE =================
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuiz = (optionIndex: number) => {
    setQuizAnswered(optionIndex);
    if (optionIndex === 1) {
      setQuizScore(100);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  // ================= 3. WHATSAPP AI BOT DEMO STATE =================
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: isAr
        ? 'أهلاً بك في شركة Texora للأنظمة البرمجية 🚀 أنا المساعد الذكي الآلي (AI Agent) المدرب للرد فورياً. كيف يمكنني خدمتك اليوم؟'
        : 'Welcome to Texora Digital Systems 🚀 I am your autonomous AI Agent ready 24/7. How can I empower your business today?',
      timestamp: '10:00 AM',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses: { [key: string]: { ar: string; en: string } } = {
    pharma: {
      ar: 'نظام PharmaCare Pro للصيدليات يشمل: قاعدة بيانات 25,000 دواء ببدائل المادة الفعالة، جرد باركود فوري، تنبيه انتهاء الصلاحية، ودعم فواتير ضريبية. السعر يبدأ من 4,500 ج.م مع تدريب مجاني ودعم سحابي. هل تحب نحدد موعد تجربة عملية على جهازك؟',
      en: 'PharmaCare Pro includes 25,000+ drug database with active-ingredient alternatives, instant barcode inventory, expiry tracking, and tax invoice compliance. Starting at $350 with full onboarding. Would you like a live demo?'
    },
    retail: {
      ar: 'نظام RetailFlow لمتاجر وبرندات الملابس يوفر لك: ربط مركزي لجميع الفروع، جرد فوري بالمقاس واللون، طابعات إيصالات، وبرنامج ولاء بالنقاط. يمكنك تجربته فوراً على التابلت أو الكمبيوتر. ما هو عدد الفروع لديكم؟',
      en: 'RetailFlow for apparel & retail stores provides multi-branch inventory sync, size/color variant tracking, POS receipt printing, and loyalty points. How many branches do you operate?'
    },
    edu: {
      ar: 'منصة EduVerse التعليمية تتضمن: حماية عسكرية للفيديوهات ضد التصوير (DRM) بعلامة مائية متحركة برقم هاتف الطالب، بنك أسئلة بامتحانات ذاتية التصحيح، وبوابات دفع إلكترونية. تكلفة الباقة المتكاملة تبدأ من 6,000 ج.م. هل المنصة لمدرس فردي أم لأكاديمية كاملة؟',
      en: 'EduVerse LMS features military-grade dynamic watermark video protection, automated grading quizzes, and automated online payments. Perfect for independent educators and large academies!'
    },
    bot: {
      ar: 'بوت الواتساب الذكي من Texora يعمل 24/7 بدون موظف، يفهم اللهجة العامية، يرسل عروض أسعار PDF، ويحجز المواعيد مباشرة في التقويم وقاعدة بياناتك. يمكن ربطه في خلال 48 ساعة فقط!',
      en: 'Texora Autonomous WhatsApp AI Bot operates 24/7 with zero human intervention, answers custom inquiries, books meetings, and syncs directly to your Supabase/CRM!'
    },
    default: {
      ar: 'تم استلام طلبك باهتمام فائق! مهندس الأنظمة في Texora متاح للتواصل معك فورياً لتجهيز العرض الفني والمالي المناسب لمشروعك. يمكنك الضغط على زر الواتساب للتحدث مباشرة.',
      en: 'Your inquiry has been logged! A Texora systems architect is ready to assist you with a customized blueprint and quotation.'
    }
  };

  const sendBotMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = isAr ? botResponses.default.ar : botResponses.default.en;
      const lower = text.toLowerCase();

      if (lower.includes('صيدل') || lower.includes('pharma') || lower.includes('دواء')) {
        replyText = isAr ? botResponses.pharma.ar : botResponses.pharma.en;
      } else if (lower.includes('محل') || lower.includes('متجر') || lower.includes('براند') || lower.includes('retail') || lower.includes('ملابس')) {
        replyText = isAr ? botResponses.retail.ar : botResponses.retail.en;
      } else if (lower.includes('منص') || lower.includes('تعليم') || lower.includes('كورس') || lower.includes('مدرس') || lower.includes('edu')) {
        replyText = isAr ? botResponses.edu.ar : botResponses.edu.en;
      } else if (lower.includes('بوت') || lower.includes('bot') || lower.includes('واتساب') || lower.includes('ذكاء')) {
        replyText = isAr ? botResponses.bot.ar : botResponses.bot.en;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="sandbox" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
          <Terminal className="w-4 h-4" />
          <span>{isAr ? 'بيئة الاختبار البرمجية الحية (Live Interactive Sandbox)' : 'Interactive System Simulator'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cairo']">
          {isAr ? 'عاين الأنظمة البرمجية قيد العمل الحقيقي' : 'Test-Drive Our Live Production Engines'}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
          {isAr
            ? 'لا نكتفي بوعود التصميم؛ تفاعل بنفسك مع نظام الكاشير ونقاط البيع، منصة الطلاب، وبوت الواتساب الذكي مباشرة في متصفحك.'
            : 'Experience the responsiveness, ergonomics, and architectural strength of our live software modules.'}
        </p>
      </div>

      {/* Sandbox Selector Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-gray-900/80 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setActiveSandbox('pos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSandbox === 'pos'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAr ? '🛒 محاكي كاشير ونقاط البيع (POS)' : '🛒 Live POS Terminal'}</span>
          </button>

          <button
            onClick={() => setActiveSandbox('edu')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSandbox === 'edu'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{isAr ? '🎓 محاكي منصة الطلاب (LMS)' : '🎓 Interactive LMS'}</span>
          </button>

          <button
            onClick={() => setActiveSandbox('whatsapp')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSandbox === 'whatsapp'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-gray-950 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{isAr ? '🤖 بوت الواتساب الذكي (AI Bot)' : '🤖 WhatsApp AI Live'}</span>
          </button>
        </div>
      </div>

      {/* ================= SANDBOX 1: POS CASHIER TERMINAL ================= */}
      {activeSandbox === 'pos' && (
        <div className="glow-card rounded-3xl bg-gray-950/90 border border-white/10 p-6 lg:p-8 backdrop-blur-2xl">
          
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                POS
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isAr ? 'محاكي كاشير الصيدليات والمتاجر (Texora Cloud POS Terminal)' : 'Texora Cloud POS Terminal'}
                </h3>
                <span className="text-xs text-emerald-400 font-mono">
                  ● Status: Cloud Synced • Active Station #01
                </span>
              </div>
            </div>

            {lastScannedItem && (
              <div className="px-4 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono animate-pulse flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? `تم مسح الباركود: ${lastScannedItem}` : `Scanned: ${lastScannedItem}`}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Products Inventory Grid */}
            <div className="lg:col-span-7">
              <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>{isAr ? 'انقر على أي منتج لإضافته فورياً إلى الفاتورة (محاكاة ماسح الباركود):' : 'Click item to scan barcode into cart:'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {initialProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-500/30 text-right transition-all flex items-center justify-between group active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                          {isAr ? p.nameAr : p.nameEn}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {isAr ? `باركود: ${p.barcode}` : `Barcode: ${p.barcode}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        {p.price} {isAr ? 'ج.م' : 'EGP'}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {isAr ? `مخزون: ${p.stock}` : `Stock: ${p.stock}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3 text-xs text-cyan-300">
                <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>
                  {isAr
                    ? 'في النظام الحقيقي، يتم استخدام ماسح الباركود اللاسلكي أو كاميرا الهاتف لإضافة المنتجات في جزء من الثانية مع خصمها التلقائي من المخزن المركزي.'
                    : 'In production, bluetooth wireless scanners or mobile cameras scan items with zero lag and instant multi-branch decrement.'}
                </span>
              </div>
            </div>

            {/* Live Cart & Receipt Generator */}
            <div className="lg:col-span-5 bg-black/40 rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'سلة المبيعات الحالية' : 'Current Active Ticket'}</span>
                  </span>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تفريغ' : 'Clear'}</span>
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">
                    {isAr ? 'الفاتورة فارغة. انقر على المنتجات على اليسار لبدء البيع!' : 'Ticket empty. Click items to scan!'}
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs"
                      >
                        <div className="flex flex-col text-right max-w-[140px]">
                          <span className="font-semibold text-white truncate">
                            {isAr ? item.product.nameAr : item.product.nameEn}
                          </span>
                          <span className="text-gray-400 font-mono">
                            {item.product.price} × {item.qty} = {(item.product.price * item.qty).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.product.id, -1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-white font-mono w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, 1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals & Checkout Button */}
              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{isAr ? 'المجموع الجزئي:' : 'Subtotal:'}</span>
                  <span className="font-mono text-white">{subtotal.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{isAr ? 'ضريبة القيمة المضافة (14%):' : 'VAT (14%):'}</span>
                  <span className="font-mono text-white">{tax.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white mb-4 pt-2 border-t border-white/5">
                  <span>{isAr ? 'الإجمالي النهائي:' : 'Net Total:'}</span>
                  <span className="font-mono text-emerald-400 text-lg">{total.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    cart.length > 0
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-98'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'إتمام البيع وطباعة الفاتورة الإلكترونية' : 'Complete Sale & Print Receipt'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Thermal Receipt Simulation Animation */}
          {receiptPrinted && (
            <div className="mt-8 p-6 rounded-2xl bg-white text-gray-900 max-w-sm mx-auto shadow-2xl font-mono text-xs animate-in slide-in-from-top-6 duration-500">
              <div className="text-center pb-3 border-b-2 border-dashed border-gray-400">
                <div className="font-black text-base tracking-wider mb-1 font-['Syne']">TEXORA POS PHARMACARE</div>
                <div>فاتورة ضريبية مبسطة معتمدة</div>
                <div className="text-[10px] text-gray-500 mt-1">الرقم الضريبي: 394-821-492</div>
              </div>

              <div className="py-3 border-b-2 border-dashed border-gray-400 space-y-1">
                {cart.map((c) => (
                  <div key={c.product.id} className="flex justify-between">
                    <span>{isAr ? c.product.nameAr : c.product.nameEn} (x{c.qty})</span>
                    <span className="font-bold">{(c.product.price * c.qty).toFixed(2)} EGP</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>الإجمالي المدفوع:</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
                <div className="text-center text-[10px] text-gray-500 pt-3">
                  شكراً لتعاملكم معنا • نظام تكسورا للحلول السحابية
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= SANDBOX 2: EDUVERSE LMS SIMULATOR ================= */}
      {activeSandbox === 'edu' && (
        <div className="glow-card rounded-3xl bg-gray-950/90 border border-white/10 p-6 lg:p-8 backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* DRM Video Player Simulation */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900 border border-white/10 shadow-2xl flex flex-col justify-between p-6">
                
                {/* Anti-Piracy Floating Watermark */}
                <div className="absolute top-1/3 left-1/3 p-2 rounded bg-black/40 text-cyan-400/60 font-mono text-xs pointer-events-none animate-float-slow select-none border border-cyan-500/20">
                  ID: #STU-94021 • 01012345678 • TEXORA-DRM-SHIELD
                </div>

                <div className="flex justify-between items-center z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حماية مشددة: التسجيل محظور' : 'DRM Protected: Screen Recording Blocked'}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">1080p 60FPS</span>
                </div>

                {/* Center Play Graphic */}
                <div className="self-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer hover:scale-110 transition">
                    <Play className="w-7 h-7 fill-cyan-400 ml-1" />
                  </div>
                  <span className="mt-3 text-sm font-semibold text-white">
                    {isAr ? 'المحاضرة 04: هندسة النظم السحابية الفائقة' : 'Lecture 04: Cloud Architecture Masterclass'}
                  </span>
                </div>

                {/* Player Controls Bar */}
                <div className="z-10 space-y-2">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[42%]" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>18:24 / 45:00</span>
                    <span>{isAr ? 'تم حفظ تقدم الطالب في السحابة' : 'Progress Auto-Saved'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quiz Engine Interactive Widget */}
            <div className="lg:col-span-5 bg-white/[0.03] rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  {isAr ? 'اختبار تفاعلي فوري' : 'Automated Interactive Quiz'}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {isAr ? `الدرجة: ${quizScore}/100` : `Score: ${quizScore}/100`}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-4 leading-snug">
                {isAr
                  ? 'سؤال: ما هي الميزة الأساسية لنظام الحماية DRM في منصة EduVerse؟'
                  : 'Question: What is the primary purpose of EduVerse DRM video protection?'}
              </h4>

              <div className="space-y-3 mb-6">
                {[
                  { ar: 'أ) تقليل جودة الفيديو لحفظ المساحة', en: 'A) Lower video resolution' },
                  { ar: 'ب) منع سرقة المحتوى وتصوير الشاشة بعلامة مائية ديناميكية برقم الطالب', en: 'B) Prevent screen recording with dynamic forensic watermarking' },
                  { ar: 'ج) تشغيل الفيديو بدون إنترنت فقط', en: 'C) Offline playback only' },
                ].map((opt, idx) => {
                  const isChosen = quizAnswered === idx;
                  const isCorrect = idx === 1;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuiz(idx)}
                      className={`w-full p-3.5 rounded-xl text-right text-xs sm:text-sm font-medium transition-all border ${
                        quizAnswered !== null
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : isChosen
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : 'bg-white/5 border-white/5 text-gray-400'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                      }`}
                    >
                      {isAr ? opt.ar : opt.en}
                    </button>
                  );
                })}
              </div>

              {quizAnswered !== null && (
                <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                  quizAnswered === 1 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}>
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {quizAnswered === 1
                      ? (isAr ? 'إجابة صحيحة! تم تسجيل 100 نقطة وإصدار شهادة اجتياز فورية للطالب.' : 'Correct! 100 points recorded and verifiable certificate unlocked.')
                      : (isAr ? 'إجابة غير دقيقة. النظام يصحح الأخطاء تلقائياً ويوضح التفسير للطالب.' : 'Incorrect. The system auto-explains the concepts instantly.')}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= SANDBOX 3: WHATSAPP AUTONOMOUS AI BOT ================= */}
      {activeSandbox === 'whatsapp' && (
        <div className="glow-card rounded-3xl bg-gray-950/90 border border-white/10 p-6 lg:p-8 backdrop-blur-2xl">
          <div className="max-w-xl mx-auto">
            
            {/* Phone Screen Mockup Frame */}
            <div className="rounded-3xl border-4 border-gray-700 bg-[#0b141a] overflow-hidden shadow-2xl">
              
              {/* WhatsApp Header */}
              <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between text-white border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/assets/texora-logo-clean-tight.png"
                      alt="Texora AI Bot"
                      className="w-10 h-10 rounded-full bg-gray-900 p-1 border border-cyan-400/40 object-contain"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1f2c34]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <span>Texora AI Assistant</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                        OFFICIAL BOT
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      {isTyping ? (isAr ? 'يكتب الآن...' : 'Typing...') : (isAr ? 'متصل 24/7 (ذكاء اصطناعي)' : 'Online 24/7 (AI Engine)')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages Container */}
              <div className="p-4 h-96 overflow-y-auto space-y-3 bg-[#0b141a] text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        m.sender === 'user'
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#202c33] text-gray-200 rounded-tl-none border border-white/5'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line text-sm">{m.text}</p>
                      <span className="block text-[9px] text-gray-400 text-left mt-1 font-mono">
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#202c33] text-gray-400 w-20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200" />
                  </div>
                )}
              </div>

              {/* Quick Questions Pills */}
              <div className="p-2.5 bg-[#1f2c34]/80 border-t border-white/5 flex gap-2 overflow-x-auto text-xs">
                <button
                  onClick={() => sendBotMessage(isAr ? 'عايز نظام متكامل لصيدلية مع باركود وبدائل' : 'I need a complete pharmacy POS system')}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/20 text-gray-200 hover:text-emerald-300 whitespace-nowrap transition"
                >
                  {isAr ? '💊 نظام صيدلية' : '💊 Pharmacy POS'}
                </button>
                <button
                  onClick={() => sendBotMessage(isAr ? 'عايز منصة تعليمية للمدرسين وكورسات محمية' : 'I want an educational DRM platform')}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/20 text-gray-200 hover:text-emerald-300 whitespace-nowrap transition"
                >
                  {isAr ? '🎓 منصة تعليمية' : '🎓 Educational LMS'}
                </button>
                <button
                  onClick={() => sendBotMessage(isAr ? 'عايز نظام كاشير ومخازن لبراند ومحل ملابس' : 'I need retail POS for apparel brand')}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/20 text-gray-200 hover:text-emerald-300 whitespace-nowrap transition"
                >
                  {isAr ? '👕 كاشير محل وبراند' : '👕 Brand Retail POS'}
                </button>
                <button
                  onClick={() => sendBotMessage(isAr ? 'كم تكلفة بوت الواتساب الذكي للرد التلقائي؟' : 'How much for an autonomous AI WhatsApp bot?')}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/20 text-gray-200 hover:text-emerald-300 whitespace-nowrap transition"
                >
                  {isAr ? '🤖 تكلفة بوت واتساب' : '🤖 WhatsApp Bot Cost'}
                </button>
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendBotMessage(inputMsg);
                }}
                className="bg-[#1f2c34] p-3 flex items-center gap-2 border-t border-white/5"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder={isAr ? 'اكتب رسالتك للبوت الذكي...' : 'Type message to AI assistant...'}
                  className="flex-1 bg-[#2a3942] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim()}
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 flex items-center justify-center transition disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
