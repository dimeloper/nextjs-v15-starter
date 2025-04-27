'use client';

import { useOptimistic, useState } from 'react';

// This would typically be in a separate file
const submitTitle = async (formData: FormData) => {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newTitle = formData.get('title') as string;
  if (newTitle === 'error') {
    throw new Error('Title cannot be "error"');
  }
  return newTitle;
};

export default function OptimisticComponent() {
  const [title, setTitle] = useState('Title');
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(title);
  const [error, setError] = useState<string | null>(null);
  const [titleHistory, setTitleHistory] = useState<string[]>([]);
  const pending = title !== optimisticTitle;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const newTitle = formData.get('title') as string;
    setOptimisticTitle(newTitle);
    try {
      const updatedTitle = await submitTitle(formData);
      setTitle(updatedTitle);
      setTitleHistory(prev => [updatedTitle, ...prev]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">useOptimistic Example</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl mb-2 font-semibold">Current Title:</h2>
        <div className="flex items-center gap-4">
          <p className={`text-2xl ${pending ? 'text-blue-500' : 'text-gray-800 dark:text-white'}`}>
            {optimisticTitle}
          </p>
          {pending && <span className="text-sm text-blue-500 animate-pulse">Updating...</span>}
        </div>
      </div>

      <form action={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            name="title"
            placeholder="Enter new title"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={pending}
          >
            Update
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-md mb-6">{error}</div>
      )}

      {titleHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Title History</h3>
          <ul className="space-y-2">
            {titleHistory.map((title, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
                <span className="font-medium">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
