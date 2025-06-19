"use client"

import "react-native-url-polyfill/auto"
import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "./lib/supabase"
import Auth from "./components/Auth"
import TodoList from "./components/TodoList"

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <View style={styles.container} />
  }

  return <View style={styles.container}>{session && session.user ? <TodoList session={session} /> : <Auth />}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
