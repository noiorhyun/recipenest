'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createRecipe } from '@/lib/api'

export default function NewRecipePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    category: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newRecipe = await createRecipe(formData)
      router.push(`/recipes/${newRecipe._id}`)
    } catch (error) {
      alert('Failed to create recipe')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Select a category</option>
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
            {/* Add more categories */}
          </select>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Recipe
        </button>
      </form>
    </div>
  )
}