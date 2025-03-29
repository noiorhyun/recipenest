import Link from 'next/link';

async function getRecipes() {
  try {
    console.log('Fetching recipes...');
    const res = await fetch('http://localhost:3000/api/recipes', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.error || 'Failed to fetch recipes');
    }
    
    const data = await res.json();
    console.log('Fetched recipes:', data);
    return data;
  } catch (error) {
    console.error('Error in getRecipes:', error);
    throw error;
  }
}

export default async function RecipesPage() {
  try {
    const recipes = await getRecipes();

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
        
        {recipes.length === 0 ? (
          <p className="text-gray-500">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created by: {recipe.user?.name || 'Unknown'}
                  </span>
                  <Link 
                    href={`/recipes/${recipe._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error in RecipesPage:', error);
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading recipes: {error.message}</p>
        </div>
      </div>
    );
  }
} 