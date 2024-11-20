'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export function ThemeClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}
