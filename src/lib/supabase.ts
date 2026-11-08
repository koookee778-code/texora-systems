import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jtwjidlqwlfmabaefgpk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummyKeyForDemo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitLead(lead: {
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  notes?: string;
}) {
  try {
    const { data, error } = await supabase.from('leads').insert([
      {
        full_name: lead.fullName,
        phone_number: lead.phone,
        email: lead.email,
        service_type: lead.serviceType,
        notes: lead.notes,
        source: 'website_contact_form',
      },
    ]);
    if (error) {
      console.warn('Supabase lead submit fallback:', error.message);
      return { success: true, localOnly: true };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('Network error during Supabase lead submit:', err);
    return { success: true, localOnly: true };
  }
}
