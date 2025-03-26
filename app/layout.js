import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
          <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link href="/recipes" style={{ marginRight: '1rem' }}>Recipes</Link>
          <Link href="/bookmarks" style={{ marginRight: '1rem' }}>Bookmarks</Link>
          <Link href="/profile">Profile</Link>
        </nav>
        <div style={{ padding: '1rem' }}>
          {children}
        </div>
      </body>
    </html>
  )
}