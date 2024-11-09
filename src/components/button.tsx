import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  isLoading?: boolean
}

export default function Button({
  variant = 'primary',
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        h-10
        rounded-sm
        px-4
        font-medium
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${
          variant === 'primary'
            ? 'bg-custom-primary text-white hover:bg-custom-primary/80'
            : ''
        }
        ${
          variant === 'secondary'
            ? 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800'
            : ''
        }
        ${
          variant === 'ghost'
            ? 'bg-transparent text-zinc-400 hover:text-zinc-300'
            : ''
        }
          ${
            variant === 'destructive'
              ? 'bg-red-500 text-white hover:bg-red-600'
              : ''
          }
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  )
}
