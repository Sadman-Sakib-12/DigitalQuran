import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import Navbar from "@/components/Navbar";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata: Metadata = {
  title: "Digital Quran",
  description: "Read the Holy Quran with Arabic text and English translation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100">
        <SettingsProvider>
          <Navbar />
          <SettingsSidebar />
          <main className="pt-16">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
