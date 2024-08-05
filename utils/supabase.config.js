import { createClient } from '@supabase/supabase-js'


// Create Supabase client
export const supabase = createClient('https://dvjujuvyjyjkjoptpeft.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2anVqdXZ5anlqa2pvcHRwZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNDI2MzcsImV4cCI6MjAzMDkxODYzN30.s1-rN2RXhxMHIli7HqaOqXMDHMxo0c4LMUsquc000sg')


export const SupabaseStorage = 'https://dvjujuvyjyjkjoptpeft.supabase.co/storage/v1/object/public/perfil'

export const SupabaseStorage2 = 'https://dvjujuvyjyjkjoptpeft.supabase.co/storage/v1/object/public/comprovativo'

