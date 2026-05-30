import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto ml-0 sm:ml-14">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
