import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import Provider from "@/providers/provider";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Script - AI Chat",
  description: "Your learning Assistant for a brighter tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`font-sans antialiased bg-alabaster dark:bg-codGray text-base`}
      >
        <Provider>
          <main className="grid grid-cols-[280px,1fr] grid-rows-1">
            {/* Sidebar - Left*/}
            <Sidebar />
            {/* Navbar and Pages - Right */}
            <section className="flex flex-col row-span-1">
              <Navbar />
              <section className="bg-white dark:bg-background rounded-tl-3xl dark:border-codGray rounded-br-md shadow-lg border-t border-l h-full overflow-hidden">
                {children}
              </section>
            </section>
          </main>
        </Provider>
      </body>
    </html>
  );
}
