import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqcmpwzsktogvrevaznb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY21wd3pza3RvZ3ZyZXZhem5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjIxMTMsImV4cCI6MjA3NDA5ODExM30.Qig4EM0AMmkuHkr_9bksVdzUN3vaf_J1Ga0JpTTedPo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
