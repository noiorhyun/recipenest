import Link from 'next/link';
import { headers, cookies } from 'next/headers';

async function getRecipes() {
  try {
    console.log('Fetching recipes...');
    const headersList = headers();
    const cookieStore = cookies();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get the auth token from cookies
    const token = cookieStore.get('token');
    
    console.log('Using base URL:', baseUrl);
    
    const res = await fetch(`${baseUrl}/api/recipes`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token.value}` : '',
      },
      next: { revalidate: 0 }
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch recipes');
      } else {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
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