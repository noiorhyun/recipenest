import Image from 'next/image';
import Link from 'next/link';

// Recipe card component to display recipe preview
export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/recipes/${recipe._id}`}>
        <div className="relative h-48">
          <Image
            src={recipe.image || '/placeholder-food.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
          <div className="mt-3 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-600">
              {recipe.rating || '4.5'} ({recipe.reviewCount || 10})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}