import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            RecipeNest
          </Link>
          
          <div className="flex items-center space-x-4">
            <SearchBar />
            <Link href="/" className="px-3 py-2">Home</Link>
            <Link href="/my-recipes" className="px-3 py-2">My Recipes</Link>
            <Link href="/recipes/new" className="px-3 py-2">Add Recipe</Link>
            <Link href="/profile" className="px-3 py-2">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}