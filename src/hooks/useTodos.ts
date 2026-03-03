'use client';

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";

const TODOS_KEY = 'practice-todos-v2';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load from storage once mounted
    useEffect(() => {
        setMounted(true);

        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(TODOS_KEY);
            if(saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setTodos(Array.isArray(parsed) ? parsed : []);
                } catch (e) {
                    console.error("Failed to load todos", e);
                }
            }
        }
    }, []);

    // Save whenever todos change (after mounted)
    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        }
    }, [todos, mounted]);

    // CRUD functions
    const addTodo = (text: string) => {
        if (text.trim().length < 3) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: text.trim(),
            done: false,
            createdAt: new Date().toISOString(),
        }

        setTodos(prev => [...prev, newTodo]);
    };

    const toggleTodo = (id: string) => {
         setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
         )
    }

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    const editTodo = (id: string, newText: string) => {
        if (newText.trim().length < 3) return

        setTodos(prev => 
            prev.map(todo => 
                todo.id === id ? { ...todo, text: newText.trim() } : todo
            )
        )
    }

    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.done));
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
        mounted,
    }
}