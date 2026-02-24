import { MouseEventHandler } from "react";


interface ButtonProps {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

export default function Button({
    label,
    onClick,
    disabled = false,
    variant = 'primary',
}: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = 
    variant === 'primary'
    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
    : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500";

    return (
        <button 
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {label}
        </button>
    );
}