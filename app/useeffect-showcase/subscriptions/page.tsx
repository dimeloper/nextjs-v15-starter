'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Subscriptions() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // ✅ CORRECT: Use useEffect for setting up intervals/timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to prevent memory leaks
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array - runs once on mount

  // ✅ CORRECT: Use useEffect for conditional subscriptions
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setCounter(prev => prev + 1);
      }, 100);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]); // Depends on isActive

  const toggleCounter = () => {
    setIsActive(!isActive);
  };

  const resetCounter = () => {
    setCounter(0);
    setIsActive(false);
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

        <h1 className="text-3xl font-bold mb-6">✅ Subscriptions & Intervals</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            Why useEffect is needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>Intervals and timeouts are side effects that need cleanup</li>
            <li>We need to prevent memory leaks by clearing intervals on unmount</li>
            <li>Setting up subscriptions happens outside of React's rendering cycle</li>
            <li>Cleanup prevents multiple intervals running simultaneously</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Real-time Clock */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Real-time Clock
            </h2>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-gray-600">{currentTime.toLocaleDateString()}</div>
            </div>
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-3">
              <p className="text-sm text-gray-700">
                This clock updates every second using setInterval in useEffect. The interval is
                automatically cleaned up when the component unmounts.
              </p>
            </div>
          </div>

          {/* Counter with Start/Stop */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Interval Counter
            </h2>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-green-600 mb-4">{counter}</div>
              <div className="space-x-3">
                <button
                  onClick={toggleCounter}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isActive ? 'Stop' : 'Start'}
                </button>
                <button
                  onClick={resetCounter}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-3">
              <p className="text-sm text-gray-700">
                Status: <span className="font-medium">{isActive ? 'Running' : 'Stopped'}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                The interval is created/destroyed based on the isActive state.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Code Examples:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-900 bg-gray-100 px-3 py-1 rounded">
                Clock Timer:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  // Cleanup function prevents memory leaks
  return () => {
    clearInterval(timer);
  };
}, []); // Empty deps = run once on mount`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 bg-gray-100 px-3 py-1 rounded">
                Conditional Interval:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`useEffect(() => {
  let interval = null;

  if (isActive) {
    interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 100);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [isActive]); // Re-run when isActive changes`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
