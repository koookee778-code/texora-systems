-- ====================================================================
-- TEXORA PRODUCTION ENTERPRISE SCHEMA (SUPABASE POSTGRESQL)
-- Systems: Web Platforms, PharmaCare POS, RetailFlow, EduVerse, WhatsApp AI
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. LEADS & CONTACT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    company_name TEXT,
    service_type TEXT NOT NULL, -- 'pharmacy', 'retail', 'edu', 'web', 'bot', 'marketing'
    project_scale TEXT DEFAULT 'growth', -- 'starter', 'growth', 'enterprise'
    estimated_budget NUMERIC(10, 2),
    notes TEXT,
    status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'qualified', 'closed_won'
    source TEXT DEFAULT 'website_form', -- 'website_form', 'whatsapp_bot', 'calculator'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WHATSAPP AI AGENT AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.whatsapp_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number TEXT NOT NULL,
    sender TEXT NOT NULL, -- 'user' or 'texora_ai'
    message_content TEXT NOT NULL,
    intent_detected TEXT, -- 'pharma_quote', 'edu_lms', 'retail_pos', 'human_request'
    confidence_score NUMERIC(3, 2) DEFAULT 0.95,
    message_sid TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVED QUOTES & ESTIMATES
CREATE TABLE IF NOT EXISTS public.project_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_ref TEXT UNIQUE NOT NULL,
    client_phone TEXT,
    system_type TEXT NOT NULL,
    scale TEXT NOT NULL,
    addons JSONB DEFAULT '[]'::jsonb,
    total_amount NUMERIC(10, 2) NOT NULL,
    estimated_days INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AI BOT KNOWLEDGE BASE
CREATE TABLE IF NOT EXISTS public.bot_knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    keyword_triggers TEXT[] NOT NULL,
    response_ar TEXT NOT NULL,
    response_en TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INDEXES FOR ULTRA-FAST LOOKUPS
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone_number);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_phone ON public.whatsapp_conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_created_at ON public.whatsapp_conversations(created_at DESC);

-- 7. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_knowledge_base ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous insert for website contact forms and quotes
CREATE POLICY "Allow public insert leads" ON public.leads 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert quotes" ON public.project_quotes 
    FOR INSERT WITH CHECK (true);

-- Conversations can be inserted and read by serverless backend (service role)
CREATE POLICY "Allow service role full access to whatsapp" ON public.whatsapp_conversations
    FOR ALL USING (true);

-- Seed Initial Bot Knowledge Base
INSERT INTO public.bot_knowledge_base (category, keyword_triggers, response_ar, response_en) VALUES
(
    'pharma', 
    ARRAY['صيدلية', 'صيدليات', 'دواء', 'ادوية', 'فارما', 'روشتة', 'باركود ادوية'],
    'نظام PharmaCare Pro للصيدليات من Texora: يشمل قاعدة بيانات 25,000 دواء ببدائل المادة الفعالة، جرد باركود سريع، وتنبيهات انتهاء الصلاحية. السعر يبدأ من 4,800 ج.م مع التركيب والتدريب. هل ترغب بحجز معاينة تجريبية؟',
    'PharmaCare Pro Pharmacy System: 25k+ drug database, active-ingredient alternatives, expiry alerts. Starting at $350. Shall we schedule a live demo?'
),
(
    'retail', 
    ARRAY['محل', 'متجر', 'براند', 'ملابس', 'كاشير', 'ريتيل'],
    'نظام RetailFlow لمتاجر وبرندات الملابس: ربط مركزي لجميع الفروع، جرد فوري بالمقاس واللون، طابعات إيصالات، وبرنامج ولاء بالنقاط. متى يناسبك بدء التشغيل؟',
    'RetailFlow for stores & fashion brands: multi-branch sync, size/color variant tracking, POS receipt printing, and loyalty program.'
),
(
    'edu', 
    ARRAY['منصة', 'تعليم', 'كورس', 'كورسات', 'مدرس', 'سنتر', 'lms'],
    'منصة EduVerse التعليمية: حماية فيديو ضد التصوير (DRM) بعلامة مائية متحركة برقم هاتف الطالب، امتحانات ذاتية التصحيح، وبوابات دفع إلكترونية. الباقة تبدأ من 6,500 ج.م.',
    'EduVerse LMS: Anti-piracy DRM video encryption, forensic watermarks, automated quiz grading, and payment gateways.'
);
