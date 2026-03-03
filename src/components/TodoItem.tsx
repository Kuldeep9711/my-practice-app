'use client';

import { useState } from "react";
import { Todo } from "@/types/todo";
import { tr } from "zod/locales";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit}: TodoItemProps) {
const [isEditing, setisEditing] = useState(false);
const [editText, seteditText] = useState(todo.text);

const handleSave = () => {
    if (editText.trim().length >= 3) {
        onEdit(todo.id, editText);
        setisEditing(false);
    }
}

return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md border">
        <div className="flex items-center gap-3 flex-1">
          <input 
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 text-blue-600 rounded"
          />

          {isEditing ? (
            <input 
            value={editText}
            onChange={e => seteditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:
            ring-blue-500"
            autoFocus
            />
          ): (
          <span
          className={`flex-1 ${todo.done ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
          onDoubleClick={() => setisEditing(true)}
          >
           {todo.text}
          </span>
          )}
        </div>

        <button
        onClick={() => onDelete(todo.id)}
        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
        >
         Delete 
        </button>
    </div> 
   )
 }