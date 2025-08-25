import Link from 'next/link';

export default function UseEffectShowcase() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto enhanced-text-visibility">
        <h1 className="text-4xl font-bold mb-8 text-center">useEffect Showcase</h1>

        <div className="mb-12">
          <p className="text-lg text-gray-600 mb-6 text-center">
            Learn when to use useEffect and when you don't need it with practical examples
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* When you SHOULD use useEffect */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              ✅ When you SHOULD use useEffect
            </h2>
            <div className="space-y-3">
              <Link
                href="/useeffect-showcase/api-fetching"
                className="block p-3 bg-white rounded border border-green-300 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-medium">Fetching data from an API</h3>
                <p className="text-sm text-gray-600">
                  Example: Loading user data on component mount
                </p>
              </Link>

              <Link
                href="/useeffect-showcase/subscriptions"
                className="block p-3 bg-white rounded border border-green-300 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-medium">Setting up subscriptions or intervals</h3>
                <p className="text-sm text-gray-600">Example: Real-time clock and cleanup</p>
              </Link>

              <Link
                href="/useeffect-showcase/browser-events"
                className="block p-3 bg-white rounded border border-green-300 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-medium">Listening for browser events</h3>
                <p className="text-sm text-gray-600">Example: Scroll and resize event listeners</p>
              </Link>

              <Link
                href="/useeffect-showcase/external-state"
                className="block p-3 bg-white rounded border border-green-300 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-medium">Syncing external state</h3>
                <p className="text-sm text-gray-600">Example: LocalStorage and URL params sync</p>
              </Link>
            </div>
          </div>

          {/* When you DON'T need useEffect */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-800">
              ❌ When you DON'T need useEffect
            </h2>
            <div className="space-y-3">
              <Link
                href="/useeffect-showcase/button-click-state"
                className="block p-3 bg-white rounded border border-red-300 hover:bg-red-100 transition-colors"
              >
                <h3 className="font-medium">Updating local state after button click</h3>
                <p className="text-sm text-gray-600">Example: Counter and form state updates</p>
              </Link>

              <Link
                href="/useeffect-showcase/props-calculation"
                className="block p-3 bg-white rounded border border-red-300 hover:bg-red-100 transition-colors"
              >
                <h3 className="font-medium">Responding to props with calculation</h3>
                <p className="text-sm text-gray-600">Example: Derived state from props</p>
              </Link>

              <Link
                href="/useeffect-showcase/render-logic"
                className="block p-3 bg-white rounded border border-red-300 hover:bg-red-100 transition-colors"
              >
                <h3 className="font-medium">Triggering logic on render</h3>
                <p className="text-sm text-gray-600">
                  Example: Simple calculations and transformations
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
