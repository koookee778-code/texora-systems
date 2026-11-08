/**
 * TEXORA AUTONOMOUS WHATSAPP AI BOT - VERCEL SERVERLESS EDGE HANDLER
 * Ready for Meta WhatsApp Cloud API / Twilio Webhook
 */

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  // 1. Webhook Verification for Meta WhatsApp Cloud API
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'texora_secret_bot_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WhatsApp Webhook verified successfully!');
      return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: 'Verification token mismatch' });
  }

  // 2. Incoming Messages Processing
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Check if this is an incoming WhatsApp message payload
      if (body.object === 'whatsapp_business_account') {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const message = value?.messages?.[0];

        if (message && message.type === 'text') {
          const fromPhone = message.from; // Sender phone number
          const userText = message.text.body;

          console.log(`Received WhatsApp message from ${fromPhone}: "${userText}"`);

          // AI Agent Logic & Intent Scoping
          const lower = userText.toLowerCase();
          let botReply = 'أهلاً بك في شركة Texora للأنظمة والبرمجيات! أنا المساعد الذكي الآلي 🤖 كيف أستطيع خدمتك اليوم؟';

          if (lower.includes('صيدل') || lower.includes('pharma') || lower.includes('دواء')) {
            botReply = '💊 نظام PharmaCare Pro للصيدليات يشمل: قاعدة بيانات 25,000 دواء ببدائل المادة الفعالة، جرد باركود سريع، وتنبيهات الصلاحية. السعر يبدأ من 4,800 ج.م مع التركيب والتدريب.';
          } else if (lower.includes('محل') || lower.includes('متجر') || lower.includes('براند') || lower.includes('كاشير')) {
            botReply = '👕 نظام RetailFlow لمتاجر وبرندات الملابس: ربط مركزي لجميع الفروع، جرد فوري بالمقاس واللون، طابعات إيصالات، وبرنامج ولاء بالنقاط. كم عدد الفروع لديكم؟';
          } else if (lower.includes('منص') || lower.includes('تعليم') || lower.includes('كورس') || lower.includes('مدرس')) {
            botReply = '🎓 منصة EduVerse التعليمية: حماية فيديو مشددة ضد التصوير (DRM) بعلامة مائية متحركة برقم هاتف الطالب، امتحانات ذاتية التصحيح، وبوابات دفع إلكترونية.';
          } else if (lower.includes('تكلف') || lower.includes('سعر') || lower.includes('quote')) {
            botReply = '⚡ تبدأ أسعار أنظمتنا المتكاملة من 4,000 ج.م للمشاريع الفردية وتصل إلى 25,000 ج.م للسلاسل المؤسسية الكبرى مع دعم فني 12 شهراً مجاناً.';
          }

          // Optional: Send reply back via Meta Graph API if access token provided
          const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
          const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

          if (WHATSAPP_ACCESS_TOKEN && PHONE_NUMBER_ID) {
            await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: fromPhone,
                type: 'text',
                text: { body: botReply },
              }),
            });
          }

          return res.status(200).json({ status: 'success', reply: botReply });
        }
      }

      return res.status(200).json({ status: 'no_message_handled' });
    } catch (err: any) {
      console.error('Error handling WhatsApp webhook:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
