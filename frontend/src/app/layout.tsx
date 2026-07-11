import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoiceHire - Modern Recruitment Platform",
  description: "A modern recruitment platform powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col min-w-0">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-violet-200/60 bg-white/70 px-4 backdrop-blur-md md:hidden">
              <SidebarTrigger />
              <span className="text-lg font-extrabold font-mono bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">VoiceHire</span>
              <div className="ml-auto"><ThemeToggle /></div>
            </header>
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
