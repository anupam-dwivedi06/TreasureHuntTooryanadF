import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast"

export const metadata = { title: "Treasure Hunt" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster className="top-right" reverseOrder={false} />
        <nav className="sticky top-0 z-10 bg-yellow-200 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link href="/" className="font-bold text-[#A64B08] text-2xl ">Treasure Hunt</Link>
            <div className="space-x-3 text[#A64B08]">
              <Link className="px-3 py-1 rounded hover:bg-gray-100 text[#A64B08] font-semibold" href="/hunt">Hunt</Link>
              <Link className="px-3 py-1 rounded hover:bg-gray-100 text[#A64B08] font-semibold" href="/admin">Admin</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}