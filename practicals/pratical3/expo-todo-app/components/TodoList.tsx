"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native"
import type { Session } from "@supabase/supabase-js"
import { supabase, type Todo } from "../lib/supabase"

interface TodoListProps {
  session: Session
}

export default function TodoList({ session }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      Alert.alert("Error", "Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  async function addTodo() {
    if (!newTodo.trim()) return

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            title: newTodo.trim(),
            user_id: session.user.id,
            completed: false,
          },
        ])
        .select()

      if (error) throw error
      if (data) {
        setTodos([data[0], ...todos])
        setNewTodo("")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add todo")
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const { error } = await supabase.from("todos").update({ completed: !completed }).eq("id", id)

      if (error) throw error

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
    } catch (error) {
      Alert.alert("Error", "Failed to update todo")
    }
  }

  async function deleteTodo(id: string) {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id)

      if (error) throw error

      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      Alert.alert("Error", "Failed to delete todo")
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) Alert.alert("Error", error.message)
  }

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity style={styles.todoContent} onPress={() => toggleTodo(item.id, item.completed)}>
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo..."
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading todos...</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id}
          style={styles.todoList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  signOutButton: {
    padding: 8,
  },
  signOutText: {
    color: "#007AFF",
    fontSize: 16,
  },
  addTodoContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
})
