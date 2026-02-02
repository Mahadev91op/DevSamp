import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white text-center px-4">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2">Oops! The page you are looking for does not exist.</p>
      
      <Link href="/">
        <button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}