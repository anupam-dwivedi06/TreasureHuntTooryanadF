"use client"
import React from 'react';

export default function success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border-2 border-amber-200 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 leading-tight mb-4 animate-bounce">
          Tooryanad
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-stone-700 mb-8">
          Thanks for participating in the Treasure Hunt!
        </p>
        <p className="text-lg text-stone-600 mb-10">
          You successfully completed all your tasks.
        </p>
        <a 
          href="/" 
          className="inline-block px-8 py-4 rounded-full bg-amber-600 text-white font-bold text-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
