import { createClient } from '@supabase/supabase-js';

// Project URL derived from your project ref
const SUPABASE_URL = 'https://felqpsaxjpdqrchoriho.supabase.co';

// 1. ANON KEY (Public): Safe for frontend.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlbHFwc2F4anBkcXJjaG9yaWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3OTc0MzgsImV4cCI6MjA3OTM3MzQzOH0.WsfIVmyaIN4uIRHNwrgHzGG_F2-ZrK2eNIbcEwgx21Q';

// ------------------------------------------------------------------
// SECURITY UPDATE: Service Role Key removed.
// Client-side applications must strictly use the Anon key.
// Admin operations should be moved to a secure backend environment.
// ------------------------------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);