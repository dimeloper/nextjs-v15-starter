'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ExternalState() {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ CORRECT: Use useEffect for localStorage sync
  useEffect(() => {
    // Read from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    const savedUsername = localStorage.getItem('username');
    const savedCount = localStorage.getItem('count');

    if (savedTheme) setTheme(savedTheme);
    if (savedUsername) setUsername(savedUsername);
    if (savedCount) setCount(parseInt(savedCount, 10));
  }, []);

  // ✅ CORRECT: Use useEffect to sync state to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  // ✅ CORRECT: Use useEffect for URL params sync
  useEffect(() => {
    const searchFromUrl = searchParams.get('search') || '';
    setSearchText(searchFromUrl);
  }, [searchParams]);

  // ✅ CORRECT: Use useEffect to sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchText) {
      params.set('search', searchText);
    } else {
      params.delete('search');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [searchText, searchParams, router]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const clearData = () => {
    setTheme('light');
    setUsername('');
    setCount(0);
    setSearchText('');
    localStorage.clear();
  };

  return (
    <div
      className={`min-h-screen p-8 font-[family-name:var(--font-geist-sans)] transition-colors ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <main className="max-w-4xl mx-auto enhanced-text-visibility">
        <div className="mb-8">
          <Link
            href="/useeffect-showcase"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to useEffect Showcase
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">✅ Syncing External State</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            Why useEffect is needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>localStorage and URL params exist outside React's state system</li>
            <li>We need to read external state on component mount</li>
            <li>We need to sync React state changes back to external systems</li>
            <li>These operations are side effects that should happen after render</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Theme Management */}
          <div
            className={`border rounded-lg p-6 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Theme Persistence
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current theme:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {theme}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Toggle Theme
              </button>
              <p className="text-sm opacity-70">
                Theme preference is saved to localStorage and persists across page reloads.
              </p>
            </div>
          </div>

          {/* User Data */}
          <div
            className={`border rounded-lg p-6 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              User Data
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={`w-full p-2 border rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Counter: {count}</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCount(prev => prev - 1)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm opacity-70">
                User data is automatically saved to localStorage.
              </p>
            </div>
          </div>
        </div>

        {/* URL Search Params */}
        <div
          className={`border rounded-lg p-6 mb-8 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            URL Search Parameters
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Text:</label>
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Type to update URL..."
                className={`w-full p-2 border rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              />
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm">
                <strong>Current URL:</strong>{' '}
                <code className="break-all">
                  {typeof window !== 'undefined' ? window.location.href : ''}
                </code>
              </p>
            </div>
            <p className="text-sm opacity-70">
              The search text is synced with URL parameters. Try refreshing the page or sharing the
              URL.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <button
            onClick={clearData}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>

        <div
          className={`mt-8 border rounded-lg p-6 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <h3 className="text-lg font-semibold mb-3">Code Examples:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-900 bg-gray-100 px-3 py-1 rounded">
                Reading from localStorage on mount:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`useEffect(() => {
  // Read from localStorage on mount
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
}, []); // Empty deps = run once on mount`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 bg-gray-100 px-3 py-1 rounded">
                Syncing state to localStorage:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]); // Run when theme changes`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 bg-gray-100 px-3 py-1 rounded">
                Syncing with URL parameters:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`useEffect(() => {
  const params = new URLSearchParams();
  if (searchText) params.set('search', searchText);
  
  const newUrl = \`\${pathname}?\${params}\`;
  router.replace(newUrl, { scroll: false });
}, [searchText]); // Run when searchText changes`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
