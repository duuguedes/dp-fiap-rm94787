import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  className,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={props.id}
          className={`text-md font-semibold ${
            error ? 'text-red-500' : 'text-zinc-100'
          }`}
        >
          {error ? error : label}
        </label>
      )}

      <input
        className={`bg-custom-gray-light h-10 rounded-sm px-3 text-zinc-100 disabled:bg-neutral-800 ${
          error ? 'border border-red-500' : ''
        } ${className}`}
        {...props}
      />
    </div>
  )
}
