import Link from "next/link";

export default function TodoDetail({ params }: { params: {id: string} }) {
     // In real app you'd fetch from DB or pass via context
     // For practice: we can just show placeholder or fetch from jsonplaceholder if i want
    return (
        <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6"> 
          Todo Detail
        </h1>
        <p className="text-lg mb-8">
      Todo ID: {params.id}
      {/* In real version: show full todo data */}
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to list 
        </Link>
        </main>
    )
}