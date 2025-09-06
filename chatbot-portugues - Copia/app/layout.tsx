import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Assistente Virtual do Evento",
  description: "Chatbot interativo para informações sobre eventos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="pt-br">
        <body className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-purple-900">
          <div
            className="absolute top-4 left-4 z-50 bg-purple-900/90 backdrop-blur-sm border border-purple-700/50 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 hover:bg-purple-800/90 hover:scale-105 text-white"
            style={{ userSelect: 'none' }}
          >
            <span className="block text-white text-sm font-bold leading-tight drop-shadow">FATEC SEBRAE</span>
          
          </div>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
      </body>
    </html>
  )
}
