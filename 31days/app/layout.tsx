//@ts-nocheck

"use client";


import { ChaptersProvider } from "../app/context/ChaptersContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ChaptersProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
      </ChaptersProvider>
  )
}
