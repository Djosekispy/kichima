import { createClient } from '@supabase/supabase-js'

// Create Supabase client
export const supabase = createClient('https://bzoqkiaxcbjghdmwrfqr.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b3FraWF4Y2JqZ2hkbXdyZnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDQ5MDksImV4cCI6MjAzMTE4MDkwOX0.c1tOwzEsOtGro599xm8Jp8yWCel7UjGuAk5KVl5__aQ')


export const SupabaseStorage = 'https://bzoqkiaxcbjghdmwrfqr.supabase.co/storage/v1/object/public/perfil'

export const SupabaseStorage2 = 'https://bzoqkiaxcbjghdmwrfqr.supabase.co/storage/v1/object/public/compra'

