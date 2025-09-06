import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Treasure Hunt" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link href="/" className="font-bold">Treasure Hunt</Link>
            <div className="space-x-3">
              <Link className="px-3 py-1 rounded hover:bg-gray-100" href="/hunt">Hunt</Link>
              <Link className="px-3 py-1 rounded hover:bg-gray-100" href="/admin">Admin</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}