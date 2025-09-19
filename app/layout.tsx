import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker | Dashboard",
  description: "Track your expenses and manage your budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning={true}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full min-h-screen bg-background">
            <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="flex h-14 items-center px-4">
                <SidebarTrigger />
                <div className="ml-4">
                  <h1 className="text-lg font-semibold">Expense Tracker</h1>
                </div>
              </div>
            </div>
            <div className="p-6">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
