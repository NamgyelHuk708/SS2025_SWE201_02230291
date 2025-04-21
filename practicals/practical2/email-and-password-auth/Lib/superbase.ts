import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpopyejxnhvxdvtdrcor.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwb3B5ZWp4bmh2eGR2dGRyY29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODU1MTIsImV4cCI6MjA1OTc2MTUxMn0.pBRSZYK3QRnvS7Y7mxg93AdIjreifroSMHGxE7kq1us'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})