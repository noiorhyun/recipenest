import Link from 'next/link'

export default function CategoryCard({ category }) {
  return (
    <Link 
      href={`/categories/${category}`}
      className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
    >
      <h3 className="text-lg font-medium">{category}</h3>
    </Link>
  )
}