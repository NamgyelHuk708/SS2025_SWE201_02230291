"use client"

import { useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { supabase } from "../lib/supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        console.error("Sign in error:", error)
        Alert.alert("Sign In Error", error.message)
        return
      }

      if (data.user) {
        console.log("User signed in successfully:", data.user.id)
      }
    } catch (error) {
      console.error("Unexpected sign in error:", error)
      Alert.alert("Error", "An unexpected error occurred during sign in")
    } finally {
      setLoading(false)
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation for development
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        Alert.alert("Sign Up Error", error.message)
        return
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          console.log("User signed up and confirmed:", data.user.id)
          Alert.alert("Success", "Account created successfully!")
        } else {
          console.log("User signed up, confirmation needed:", data.user.id)
          Alert.alert("Success", "Please check your email to confirm your account!")
        }
      }
    } catch (error) {
      console.error("Unexpected sign up error:", error)
      Alert.alert("Error", "An unexpected error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isFormValid = () => {
    return email.trim() && password && isValidEmail(email.trim()) && password.length >= 6
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.form}>
        <Text style={styles.title}>Todo App</Text>
        <Text style={styles.subtitle}>{isSignUp ? "Create your account" : "Sign in to your account"}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isValidEmail(email) && email ? styles.inputError : null]}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
          {email && !isValidEmail(email) && <Text style={styles.errorText}>Please enter a valid email address</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, password && password.length < 6 ? styles.inputError : null]}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password (min 6 characters)"
            autoCapitalize={"none"}
            autoComplete="password"
            textContentType="password"
          />
          {password && password.length < 6 && (
            <Text style={styles.errorText}>Password must be at least 6 characters</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, (loading || !isFormValid()) && styles.buttonDisabled]}
          disabled={loading || !isFormValid()}
          onPress={isSignUp ? signUpWithEmail : signInWithEmail}
        >
          <Text style={styles.buttonText}>{loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.linkText}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
})
