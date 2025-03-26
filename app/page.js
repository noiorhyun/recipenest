import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to RecipeNest</h1>
        <p>Your personal recipe management system</p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/recipes" className={styles.card}>
            <h2>Browse Recipes →</h2>
            <p>Discover all your saved recipes</p>
          </Link>

          <Link href="/bookmarks" className={styles.card}>
            <h2>My Bookmarks →</h2>
            <p>View your favorite recipes</p>
          </Link>

          <Link href="/profile" className={styles.card}>
            <h2>My Profile →</h2>
            <p>Manage your account</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
