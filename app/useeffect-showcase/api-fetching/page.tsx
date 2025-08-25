'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default function ApiFetching() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ CORRECT: Use useEffect for API calls
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto enhanced-text-visibility">
        <div className="mb-8">
          <Link
            href="/useeffect-showcase"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to useEffect Showcase
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">✅ Fetching Data from API</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            Why useEffect is needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>API calls are side effects that happen outside of React's rendering</li>
            <li>We need to fetch data after the component mounts</li>
            <li>The fetch operation is asynchronous</li>
            <li>We want to avoid infinite re-renders</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            User Data from API
          </h2>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              <span className="ml-3">Loading users...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid gap-4">
              {users.slice(0, 5).map(user => (
                <div key={user.id} className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.company.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Code Example:</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
            {`useEffect(() => {
  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const userData = await response.json();
      setUsers(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchUsers();
}, []); // Empty deps = run once on mount`}
          </pre>
        </div>
      </main>
    </div>
  );
}
