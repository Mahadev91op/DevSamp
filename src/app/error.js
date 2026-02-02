'use client'; 

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white text-center">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
      >
        Try again
      </button>
    </div>
  );
}