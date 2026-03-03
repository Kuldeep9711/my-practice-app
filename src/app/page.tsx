"use client"

import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import Link from "next/link";
import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";


// Todo form schema (seperate from contact form!)

const todoSchema = z.object({
  text: z.string()
    .min(3, { message: "Todo must be at least 3 characters" })
    .max(100, { message: "Todo is too long" }),
});

type TodoFormData = z.infer<typeof todoSchema>;

const formSchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name is too long" }),

  email: z.string()
    .email({ message: "Please enter a valid email" }),

  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message is too long" })
    .optional(),   // optional field example
})

// Typescript type from schema (auto-generated margin!)


type FormData = z.infer<typeof formSchema>

// Todo item shape
interface Todo {
  id: string;
  text: string;
  done: boolean;
}


const COUNTER_KEY = 'practice-counter-value';
const TODOS_KEY = 'practice-todos-list';

export default function Home() {

  const [count, setCount] = useState<number>(0);



  // 2. Handler functions (also typed)
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  }

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  }

  const handleReset = () => {
    setCount(0);
  }

  //NEW for Day 2: Fetched users list
  interface User {
    id: number;
    name: string;
    email: string;
    // add more fields if you want (phone, etc.)
  }


  const [users, setUsers] = useState<User[]>([]);  // empty array initially
  const [loading, setLoading] = useState<boolean>(true); // show loading while fetching
  const [error, setError] = useState<string | null>(null); // handle fetch errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: User[] = await response.json(); // type the data!
        setUsers(data.slice(0, 5));                 // show only first 5 to keep it simple
      } catch (err) {
        setError(err instanceof Error ? err.message : 'something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);  // empty array = run only once on mount

  const contactForm = useForm<FormData>({
    resolver: zodResolver(formSchema), // connect zod validation
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onChange', // validate as user types (good for UX)
  })


  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    mounted,
  } = useTodos();


  // Submit handler (runs only if validation passes)
  const onSubmit = (data: FormData) => {
    console.log("Form submiited successfully!", data)
    // Later: send to server, API, etc.
    alert("Thanks! Form data: " + JSON.stringify(data, null, 2))
    // Optional: form.reset(); to clear after submit
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-8">

      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-700">
          Simple Counter
        </h1>

        <div className="text-6xl font-mono mb-10 text-blue-600">
          {count}
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            label="Decrease"
            onClick={handleDecrement}
            variant="secondary"
          />

          <Button
            label="Increase"
            onClick={handleIncrement}
            variant="primary"
          />

          <Button
            label="Reset"
            onClick={handleReset}
            disabled={count === 0}
            variant="secondary"
          />
        </div>
      </section>


      {/* New Day 2: Fetched Users Section */}
      <section className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Users from API (Client-Side Fetch)
        </h2>

        {loading && <p className="text-center text-gray-600">Loading users...</p>}

        {error && <p className="text-center text-red-600 font-medium">{error}</p>}

        {!loading && !error && users.length > 0 && (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <Link href={`/users/${user.id}`} className="block">
                  <p className="font-semibold text-lg text-blue-700 hover:underline">
                    {user.name}
                  </p>
                  <p className="text-gray-600">{user.email}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}

      </section>

      <section className="w-full max-w-lg mt-16 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Form Practice
        </h2>

        <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-6">
          { /* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...contactForm.register("name")}  // magic: connects to validation
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${contactForm.formState.errors.name ? 'border-red-500 ' : 'border-gray-300'
                }`}
            />
            {contactForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.name.message}</p>
            )}
          </div>

          { /* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...contactForm.register("email")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${contactForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {contactForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.email.message}</p>

            )}
          </div>

          { /* Message Field (optional) */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={4}
              {...contactForm.register("message")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${contactForm.formState.errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {contactForm.formState.errors.message && (
              <p className="mt-1 text-sm text-red-600">{contactForm.formState.errors.message.message}</p>
            )}
          </div>

          { /* submit button */}
          <button
            type="submit"
            disabled={contactForm.formState.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {contactForm.formState.isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>

      <section className="w-full max-w-lg mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          My Todo App
        </h2>

        {mounted ? (
          <div className="w-full max-w-2xl">
            <TodoForm onAdd={addTodo} />

            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              clearCompleted={clearCompleted}
            />
          </div>
        ) : (
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Loading your todos...
          </p>
        )}
      </section>

      <p className="mt-16 text-gray-500 text-sm">
        You built this from memory (or with struggle - that's okay!)
      </p>
    </main>
  )
}