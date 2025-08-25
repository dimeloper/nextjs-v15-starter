'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BrowserEvents() {
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOnline, setIsOnline] = useState(true);

  // ✅ CORRECT: Use useEffect for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ CORRECT: Use useEffect for resize events
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ✅ CORRECT: Use useEffect for mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ✅ CORRECT: Use useEffect for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial state
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

        <h1 className="text-3xl font-bold mb-6">✅ Browser Events</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            Why useEffect is needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>Event listeners are side effects that attach to the DOM</li>
            <li>We need to remove listeners on unmount to prevent memory leaks</li>
            <li>Browser events happen outside of React's rendering cycle</li>
            <li>Cleanup prevents duplicate event listeners</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Scroll Position */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Scroll Position
            </h2>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{Math.round(scrollY)}px</div>
              <div className="text-gray-600">Scroll distance from top</div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-75"
                  style={{
                    width: `${Math.min((scrollY / 1000) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Window Size */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Window Size
            </h2>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 mb-2">
                {windowSize.width} × {windowSize.height}
              </div>
              <div className="text-gray-600">Width × Height (pixels)</div>
              <div className="mt-4 text-sm text-gray-500">Try resizing your browser window</div>
            </div>
          </div>

          {/* Mouse Position */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Mouse Position
            </h2>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 mb-2">
                X: {mousePosition.x}, Y: {mousePosition.y}
              </div>
              <div className="text-gray-600">Cursor coordinates</div>
              <div className="mt-4 text-sm text-gray-500">Move your mouse around the page</div>
            </div>
          </div>

          {/* Online Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Connection Status
            </h2>
            <div className="text-center">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isOnline ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <div className="mt-4 text-sm text-gray-500">Try disconnecting your internet</div>
            </div>
          </div>
        </div>

        {/* Scroll content to demonstrate scroll tracking */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Scroll down to see the scroll tracker in action!
          </h3>
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-white rounded border">
                <h4 className="font-medium">Content Block {i + 1}</h4>
                <p className="text-gray-600">
                  This is some content to make the page scrollable. The scroll position is being
                  tracked in real-time using a scroll event listener set up with useEffect.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Code Example:</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
            {`useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  // Add event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Cleanup function removes listeners
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty deps = setup once on mount`}
          </pre>
        </div>
      </main>
    </div>
  );
}
