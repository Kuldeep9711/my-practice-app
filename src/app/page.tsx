"use client"

import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from 'zod'
import Link from "next/link";
import { tr } from "zod/locales";
import { todo } from "node:test";



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

// Typescript type from schema (auto-generated magin!)
type FormData = z.infer<typeof  formSchema>

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
    const [mounted, setMounted] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    
    useEffect(() => {
      setMounted(true);

      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(TODOS_KEY);
        if (saved) {
          try {
            setTodos(JSON.parse(saved));
          } catch (e) {
            console.error("Failed to parse saved todos", e);
          }
        }
      }
    }, []);

    useEffect(() => {
      if (mounted && typeof window !== 'undefined') {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      }
    }, [todos, mounted]);
    
    // This function runs only once when the component first mounts
    useEffect(() => {
      setMounted(true);
    

    if (typeof window !== 'undefined') {            
      const saved = localStorage.getItem(COUNTER_KEY);
     if (saved !== null) {
        setCount(Number(saved));
     }    
    }
    }, []);     
 

  // other states like users, form data, etc.

   useEffect(() => {
      if (mounted && typeof window !== 'undefined') {
        localStorage.setItem(COUNTER_KEY, String(count));
      }
    }, [count, mounted]);


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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema), // connect zod validation
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onChange', // validate as user types (good for UX)
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

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

       { /* <input

        type="number"
        value={step}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStep(Number(e.target.value))}
        className="w-20 px-2 py-1 border rounded text-center text-black mt-2"
        min={1}
      />  */}

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

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            { /* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
               Name 
              </label>
              <input 
              id="name"
              type="text"
              {...register("name")}  // magic: connects to validation
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${errors.name ? 'border-red-500 ': 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
               {...register("email")}
               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>

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
               {...register("message")}
               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 ${errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            { /* submit button */}
            <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
             {isSubmitting ?  'Sending...': 'Submit'}
            </button>
           </form>
      </section>

      <section className="w-full max-w-lg mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
            Todo List 
        </h2>

        <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem('todoInput') as HTMLInputElement;
          const text = input.value.trim();

          if (!text) return;

          const newTodo: Todo = {
            id: crypto.randomUUID(),     // modern unique ID (or Date.now().toString())
            text,
            done: false,
          }

          setTodos((prev) => [...prev, newTodo]);
          input.value = '';    // clear input
        }}
        className="flex gap-2 mb-6"
        >
          <input 
           name="todoInput"
           type="text"
           placeholder="What needs to be done?"
           className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
           Add 
          </button>
        </form>

        <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
          No todos yet - add one above!
          </p>
        ): (
          todos.map((todo) => (
            <div 
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"
            >
            <div className="flex items-center gap-3 flex-1">
             <input 
             type="checkbox"
             checked={todo.done}
             onChange={() => 
              setTodos((prev) =>
              prev.map((t) => 
              t.id === todo.id ? { ...t, done: !t.done } : t
              )
              )
             }
             className="h-5 w-5 text-blue-600 rounded"
             />
             <span
             className={`flex-1 ${
              todo.done ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
             >
             {todo.text}
             </span>
              </div>

              <button
              onClick={() =>
               setTodos((prev) => prev.filter((t) => t.id !== todo.id))
              }
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
              >
              Delete 
              </button>
              </div>
          ))
        )}
        </div>
      </section>

      <p className="mt-16 text-gray-500 text-sm">
        You built this from memory (or with struggle - that's okay!)
      </p>
    </main>
  )
}