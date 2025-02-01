import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import AppProvider from "@/lib/react-query";

export const metadata: Metadata = {
  title: "do it!",
  description: "오늘의 할 일을 내일로 미루지 말자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
