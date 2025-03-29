import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  console.log('Token found:', !!token);

  if (!token) {
    return null;
  }

  try {
    // Decode the JWT token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    await dbConnect();
    const user = await User.findById(decoded.userId);
    console.log('Found user:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default async function Home() {
  const user = await getUser();
  console.log('User in Home component:', user);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">
        Welcome {user ? user.name : ''} to RecipeNest
      </h1>
      <p className="mt-4 text-lg">Your recipe collection app</p>
    </main>
  );
}
