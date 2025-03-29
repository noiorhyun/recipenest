export const fetchRecipes = async (query = '') => {
    const res = await fetch(`/api/recipes?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return await res.json();  
  };
  
  export const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();  
  };
  
  export const createRecipe = async (recipeData) => {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
    if (!res.ok) throw new Error('Failed to create recipe');
    return await res.json();  
  };