"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/userContext';

export default function Login() {
  const { setUsername, setPassword } = useUser();
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the global context with the user details
    setUsername(localEmail);
    setPassword(localPassword);
    setIsLoggedIn(true);
    router.push('/hub');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="mb-8">
        <img 
          src="/cnb-logo.png" 
          alt="CNB Logo" 
          width={200} 
          height={200} 
          className="object-contain"
        />
      </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
              value={localPassword}
              onChange={(e) => setLocalPassword(e.target.value)}
              required
            />
          </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
        </form>
        {isLoggedIn && (
          <p className="text-center text-sm text-green-600 font-bold mt-4">
            User logged in successfully!
          </p>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link href="/register" className="text-indigo-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
