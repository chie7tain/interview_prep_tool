import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fldxysqhrcftvlxgskmk.supabase.co";

// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZHh5c3FocmNmdHZseGdza21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDYyMTQsImV4cCI6MjA3MjQ4MjIxNH0.1RhODrEcykWQuZh8PtgOvnINrU8cFo3CHpJhM5EJ_I0`;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
