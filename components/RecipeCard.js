export default function RecipeCard({ recipe }) {
    return (
      <div className="border p-4 rounded-lg">
        <h3 className="text-xl font-bold">{recipe.title}</h3>
        <p>{recipe.description?.substring(0, 100)}...</p>
        <a href={`/recipes/${recipe._id}`} className="text-blue-500">
          View Recipe
        </a>
      </div>
    )
  }