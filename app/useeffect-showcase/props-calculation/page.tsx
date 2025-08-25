'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Example components that derive state from props

interface UserCardProps {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

// ✅ CORRECT: Derive state directly during render
function UserCard({ firstName, lastName, age, email }: UserCardProps) {
  // ❌ WRONG: Don't use useEffect for simple calculations
  // const [fullName, setFullName] = useState('');
  // useEffect(() => {
  //   setFullName(`${firstName} ${lastName}`);
  // }, [firstName, lastName]);

  // ✅ CORRECT: Calculate during render
  const fullName = `${firstName} ${lastName}`;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const isAdult = age >= 18;
  const emailDomain = email.split('@')[1];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold">{fullName}</h3>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <p>
          Age: {age} ({isAdult ? 'Adult' : 'Minor'})
        </p>
        <p>Domain: {emailDomain}</p>
      </div>
    </div>
  );
}

interface ShoppingCartProps {
  items: Array<{ name: string; price: number; quantity: number }>;
}

// ✅ CORRECT: Use useMemo for expensive calculations
function ShoppingCart({ items }: ShoppingCartProps) {
  // ❌ WRONG: Don't use useEffect for calculations
  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  //   setTotal(newTotal);
  // }, [items]);

  // ✅ CORRECT: Calculate during render (or use useMemo for expensive operations)
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const averagePrice = itemCount > 0 ? total / itemCount : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Shopping Cart</h3>
      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Items: {itemCount}</span>
              <span>Avg: ${averagePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function PropsCalculation() {
  const [userForm, setUserForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'john.doe@example.com',
  });

  const [cartItems, setCartItems] = useState([
    { name: 'Laptop', price: 999.99, quantity: 1 },
    { name: 'Mouse', price: 29.99, quantity: 2 },
    { name: 'Keyboard', price: 79.99, quantity: 1 },
  ]);

  const updateQuantity = (index: number, newQuantity: number) => {
    setCartItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(0, newQuantity) } : item))
    );
  };

  const removeItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
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

        <h1 className="text-3xl font-bold mb-6">❌ Don't Use useEffect for Props Calculations</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-red-800">
            Why useEffect is NOT needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            <li>Calculations based on props/state can happen during render</li>
            <li>React re-renders when props change, so calculations stay in sync</li>
            <li>Using useEffect adds unnecessary complexity and extra renders</li>
            <li>For expensive calculations, use useMemo instead of useEffect</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* User Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">User Information</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">First Name:</label>
                <input
                  type="text"
                  value={userForm.firstName}
                  onChange={e => setUserForm(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name:</label>
                <input
                  type="text"
                  value={userForm.lastName}
                  onChange={e => setUserForm(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age:</label>
                <input
                  type="number"
                  value={userForm.age}
                  onChange={e =>
                    setUserForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={e => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* User Card Display */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Derived Display</h2>
            <UserCard {...userForm} />
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">
                ✅ Full name, initials, adult status, and domain are calculated during render!
              </p>
            </div>
          </div>
        </div>

        {/* Shopping Cart Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart with Calculations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cart Controls */}
            <div className="space-y-4">
              <h3 className="font-medium">Manage Items</h3>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.name}</span>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>${item.price}</span>
                      <span>×</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Display */}
            <div className="space-y-4">
              <h3 className="font-medium">Cart Summary</h3>
              <ShoppingCart items={cartItems} />
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm text-green-800">
                  ✅ Total, item count, and average price calculated with useMemo for performance!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Code Examples:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200">
                ❌ WRONG (unnecessary effect):
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// DON'T DO THIS!
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(\`\${firstName} \${lastName}\`);
}, [firstName, lastName]);`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-600 bg-green-50 px-3 py-1 rounded border border-green-200">
                ✅ CORRECT:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// Simple calculation during render
const fullName = \`\${firstName} \${lastName}\`;
const isAdult = age >= 18;

// For expensive calculations, use useMemo
const total = useMemo(() => {
  return items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
}, [items]);`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
