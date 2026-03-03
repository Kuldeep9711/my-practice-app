
import TodoItem from "./TodoItem"
import { Todo } from "@/types/todo"

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
    clearCompleted: () => void;
}


export default function TodoList({
    todos,
    onToggle,
    onDelete,
    onEdit,
    clearCompleted,
}: TodoListProps) {
   const pendingCount = todos.filter(t => !t.done).length;

  return (
      <div>
    <div className="flex justify-between items-center mb-4">
     <p className="text-sm text-gray-600 dark:text-gray-400">
        {pendingCount} {pendingCount === 1 ? 'task' : 'tasks'} left
        </p>     

       {todos.some(t => t.done) && (
        <button
        onClick={clearCompleted}
        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear completed 
        </button>
       )}
    </div>

    <div className="space-y-3">
       {todos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No todos yet -add one above!
        </p>
       ): (
        todos
        .sort((a, b) => Number(a.done) - Number(b.done))    // incomplete first
        .map(todo => (
            <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            />
        ))  
       )}
    </div>
    </div>
  )
}
