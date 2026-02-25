"use client"

import Button from "@/components/Button";
import { useState, useEffect } from "react";


export default function Home() {
  // 1. State with Typescript type
  const [count, setCount] = useState<number>(0);
 // const [step, setStep] = useState<number>(1);

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

     {/*  <input

        type="number"
        value={step}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStep(Number(e.target.value))}
        className="w-20 px-2 py-1 border rounded text-center text-black mt-2"
        min={1}
      />*/}

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
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                </li>
               ))}
            </ul>
          )}

          {!loading && !error && users.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}

      </section>

      <p className="mt-16 text-gray-500 text-sm">
        You built this from memory (or with struggle - that's okay!)
      </p>
    </main>
  )
}