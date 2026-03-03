'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    text: z.string().min(3).max(100),
})

type FormData = z.infer<typeof schema>;

interface TodoFormProps {
 onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
 } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { text: ''},
 })

 const onSubmit = ( data: FormData) => {
    onAdd(data.text);
    reset();
 }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <div className="flex-1">
        <input 
        {...register('text')}
        placeholder="Add a new todo..."
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
            errors.text ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
        />
        {errors.text && (
            <p className="mt-1 text-sm text-red-600 dark:bg-red-400">
             {errors.text.message}
            </p>
        )}
        </div>
        <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
         Add 
        </button>
    </form>
  )
}
