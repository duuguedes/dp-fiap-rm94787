'use client'

import { ReactNode } from 'react'
import Button from './button'

interface AlertProps {
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

export default function Alert({
  title,
  description,
  isOpen,
  onClose,
  children,
}: AlertProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-custom-gray rounded-lg p-6 max-w-md w-full cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
          </div>

          <div className="flex flex-col gap-2">
            {children}

            <Button onClick={onClose} variant="secondary">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
