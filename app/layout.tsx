"use client";

import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {isAuthPage ? (
            <div className="min-h-screen">{children}</div>
          ) : (
            <div className="min-h-screen grid grid-cols-[260px_1fr]">
              {/* Sidebar */}
              <Sidebar />

              {/* Main section */}
              <div className="flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
                  {children}
                </main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
