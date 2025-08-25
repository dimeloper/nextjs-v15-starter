'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ButtonClickState() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // ❌ WRONG: Don't use useEffect for simple state updates
  // useEffect(() => {
  //   setCount(count + 1);  // This would cause infinite re-renders!
  // }, [count]);

  // ✅ CORRECT: Update state directly in event handlers
  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  // ✅ CORRECT: Handle form state directly
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const clearName = () => {
    setName('');
  };

  // ✅ CORRECT: Update arrays directly in event handlers
  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

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

        <h1 className="text-3xl font-bold mb-6">❌ Don't Use useEffect for Button Clicks</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-red-800">
            Why useEffect is NOT needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            <li>Button clicks and form interactions are synchronous user events</li>
            <li>State updates can happen directly in event handlers</li>
            <li>No side effects or async operations are involved</li>
            <li>Using useEffect would cause unnecessary re-renders or infinite loops</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Counter Example */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Simple Counter
            </h2>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
              <div className="space-x-3">
                <button
                  onClick={decrement}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={increment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  +1
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                ✅ State updates happen directly in onClick handlers - no useEffect needed!
              </p>
            </div>
          </div>

          {/* Form Input Example */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Form Input
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="text-center">
                {name && (
                  <p className="text-lg mb-3">
                    Hello, <strong>{name}</strong>!
                  </p>
                )}
                <button
                  onClick={clearName}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
              <p className="text-sm text-green-800">
                ✅ Form state updates directly in onChange - no useEffect needed!
              </p>
            </div>
          </div>
        </div>

        {/* List Management Example */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            List Management
          </h2>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add a new item"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                onKeyDown={e => e.key === 'Enter' && addItem()}
              />
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Items:</h3>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                ✅ Array updates happen directly in event handlers - no useEffect needed!
              </p>
            </div>
          </div>
        </div>

        {/* Visibility Toggle Example */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            Toggle Visibility
          </h2>
          <div className="space-y-4">
            <button
              onClick={toggleVisibility}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isVisible ? 'Hide' : 'Show'} Content
            </button>

            {isVisible && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="font-medium text-purple-800">Hidden Content</h3>
                <p className="text-purple-700">
                  This content is conditionally rendered based on state. No useEffect needed for
                  simple show/hide logic!
                </p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                ✅ Boolean state toggles directly in onClick - no useEffect needed!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Code Examples:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200">
                ❌ WRONG (causes infinite loops):
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// DON'T DO THIS!
useEffect(() => {
  setCount(count + 1); // Infinite re-renders!
}, [count]);

const handleClick = () => {
  // This will trigger the useEffect above
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-600 bg-green-50 px-3 py-1 rounded border border-green-200">
                ✅ RIGHT (direct state update):
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// Simple and clean!
const handleClick = () => {
  setCount(prev => prev + 1); // Direct state update
};

const handleInputChange = (e) => {
  setName(e.target.value); // Direct state update
};`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
