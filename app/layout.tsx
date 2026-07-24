import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'HisabKitab PK',
  description: 'Simple Hisab Kitab App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
