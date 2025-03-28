import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [''],
    instructions: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Get the stored user ID and token
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (!userId || !token) {
        alert('Please login first');
        return router.push('/login');
      }

      // 2. Make the API call with headers
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,  // ← Critical header
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to create recipe');
      
      const newRecipe = await res.json();
      router.push(`/recipes/${newRecipe._id}`);
      
    } catch (error) {
      console.error('Recipe creation failed:', error);
      alert(error.message);
    }
  };

  // ... (your existing form JSX)
}