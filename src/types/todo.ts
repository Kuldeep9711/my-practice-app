
export interface Todo {
    id: string;
    text: string;
    done: boolean;
    createdAt?: string;   // optional, for sorting or display
}