'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}
