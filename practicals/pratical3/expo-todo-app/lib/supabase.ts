import { AppState } from "react-native"
import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://fqmklusweqnblsmrlaka.supabase.co"
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbWtsdXN3ZXFuYmxzbXJsYWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTAzMTYsImV4cCI6MjA2MjYyNjMxNn0.s28GWwseQSn7CdBo8IXex7H4-LJ-x0Lp1-pzENzmDzo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export interface Todo {
  id: string
  user_id: string
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  created_at: string
  updated_at: string
}
