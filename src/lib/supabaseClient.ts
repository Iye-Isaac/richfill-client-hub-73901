import { createClient } from '@supabase/supabase-js'

// ✅ Paste your Supabase details here
const supabaseUrl = 'https://njnkazwexpoigkxnaigr.supabase.co' // from your Supabase dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbmthendleHBvaWdreG5haWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDQzNzUsImV4cCI6MjA3NTk4MDM3NX0.ajHDaVo2UhcGAKJgA885H4pdaWzGLg_k2Qeons6qLUY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// 🧾 Update Invoice URL
export async function updateInvoice(projectId: string, invoiceUrl: string) {
    const { data, error } = await supabase
        .from('projects')
        .update({ invoice_url: invoiceUrl })
        .eq('id', projectId)

    if (error) console.error('Error updating invoice:', error)
    return data
}

// 💬 Update or Add Message
export async function updateMessage(projectId: string, newMessage: string) {
    const { data, error } = await supabase
        .from('projects')
        .update({ message: newMessage })
        .eq('id', projectId)

    if (error) console.error('Error updating message:', error)
    return data
}
