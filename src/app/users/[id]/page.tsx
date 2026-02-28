// NO 'use client' needed here -this can be a Server Component

import Link from "next/link";
import { int } from "zod";

interface User {
    id: number;
    name: string;
    email: string;

}

async function getUser(id: string): Promise<User | null> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

        if (!res.ok) {
            return null;  // or throw new Error(...)
        }

        return res.json()
    } catch (error) {
        console.error('Error fetching user:', error)
        return null;
    }
}

export default async function UserDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);

    if (!user) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
             <h2 className="text-4xl font-bold text-red-600 mb-4">User Not Found</h2>
             <p className="text-lg text-gray-600 mb-8">
                No user with ID {id}
             </p>
             <Link href="/" className="text-blue-600 hover:underline">
                 ← Back to Home 
             </Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex flex-col items-center p-8 bg-gray-50">
            <h1 className="text-4xl font-bold mb-6 text-blue-700">
               User Details: {user.name}
            </h1>

            <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-lg text-gray-900">
              <p className="text-lg mb-2">
                <strong>ID:</strong> {user.id}
              </p>
              <p className="text-lg mb-2">
                  <strong>Name:</strong> {user.name}
              </p>
              <p className="text-lg mb-2">
                <strong>Email:</strong> {user.email}
              </p>

              <Link
                href="/"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                ← Back to Home 
              </Link>
            </div>
        </main>
    )
}
