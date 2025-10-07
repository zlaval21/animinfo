import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animinfo",
  description: "Your go to for Anime Info!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="font-[family-name:var(--font-onest)] bg-violet-950 text-fuchsia-200 text-xl shadow-xl">
        <div className="flex justify-between text-shadow-md items-center font-semibold">
          <div className="mr-[1.234rem]">
            <img
              className="inline-flex -mr-2.5"
              src="/photos/logo.png"
              alt="My icon"
              width={80}
            />
            <p className="inline-flex shrink items-center">Animinfo</p>
          </div>
          <p className="mx-[1.234rem]">Anime</p>
          {/* <p className="mx-[1.234rem]">Manga</p> */}
          <p className="mx-[1.234rem]">Search</p>
        </div>
      </header>
      <html lang="en">
        <body className={`${onest.variable} antialiased`}>{children}</body>
      </html>
    </>
  );
}
