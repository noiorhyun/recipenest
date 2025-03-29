import Link from 'next/link'

export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img 
        src={recipe.image || '/placeholder-recipe.jpg'} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{recipe.title}</h3>
        <p className="text-gray-600 mt-2">
          {recipe.ingredients.length} ingredients • {recipe.saves || 0} saves
        </p>
        <Link 
          href={`/recipes/${recipe._id}`}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Recipe
        </Link>
      </div>
    </div>
  )
}