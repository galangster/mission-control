import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./providers";
import { Navigation } from "./components/Navigation";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Your OpenClaw command center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConvexClientProvider>
          <div className="flex h-screen bg-[#FAFAF9]">
            <Navigation />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
