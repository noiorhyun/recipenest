import RecipeCard from '@/components/RecipeCard'
import CategoryCard from '@/components/CategoryCard'
import { fetchRecipes, fetchCategories } from '@/lib/api'

export default async function Home() {
  const [recipes, categories] = await Promise.all([
    fetchRecipes(),
    fetchCategories()
  ])

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {categories.slice(0, 4).map(category => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}