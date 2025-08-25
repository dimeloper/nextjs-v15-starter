'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RenderLogic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Sample data
  const products = [
    { id: 1, name: 'Laptop Pro', price: 1299, rating: 4.8, inStock: true, category: 'Electronics' },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 49,
      rating: 4.2,
      inStock: false,
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      price: 149,
      rating: 4.6,
      inStock: true,
      category: 'Electronics',
    },
    { id: 4, name: 'Monitor 4K', price: 399, rating: 4.4, inStock: true, category: 'Electronics' },
    { id: 5, name: 'Office Chair', price: 249, rating: 4.1, inStock: false, category: 'Furniture' },
    { id: 6, name: 'Desk Lamp', price: 79, rating: 4.0, inStock: true, category: 'Furniture' },
  ];

  // ❌ WRONG: Don't use useEffect for filtering/sorting
  // const [filteredProducts, setFilteredProducts] = useState(products);
  // useEffect(() => {
  //   let filtered = products.filter(product =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   if (showOnlyInStock) {
  //     filtered = filtered.filter(product => product.inStock);
  //   }
  //   setFilteredProducts(filtered);
  // }, [searchTerm, showOnlyInStock]);

  // ✅ CORRECT: Calculate during render
  const filteredAndSortedProducts = (() => {
    // Filter by search term
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by stock status
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  })();

  // ✅ CORRECT: Simple transformations during render
  const stats = {
    total: filteredAndSortedProducts.length,
    inStock: filteredAndSortedProducts.filter(p => p.inStock).length,
    outOfStock: filteredAndSortedProducts.filter(p => !p.inStock).length,
    averagePrice:
      filteredAndSortedProducts.length > 0
        ? filteredAndSortedProducts.reduce((sum, p) => sum + p.price, 0) /
          filteredAndSortedProducts.length
        : 0,
    averageRating:
      filteredAndSortedProducts.length > 0
        ? filteredAndSortedProducts.reduce((sum, p) => sum + p.rating, 0) /
          filteredAndSortedProducts.length
        : 0,
  };

  // ✅ CORRECT: Generate CSS classes based on state
  const getStockBadgeClass = (inStock: boolean) => {
    return inStock
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs';
  };

  // ✅ CORRECT: Format values during render
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatRating = (rating: number) => `⭐ ${rating.toFixed(1)}`;

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto enhanced-text-visibility">
        <div className="mb-8">
          <Link
            href="/useeffect-showcase"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to useEffect Showcase
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">❌ Don't Use useEffect for Render Logic</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-red-800">
            Why useEffect is NOT needed here:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            <li>Filtering, sorting, and transforming data can happen during render</li>
            <li>React will re-calculate when dependencies (state/props) change</li>
            <li>Simple calculations are fast and don't need optimization</li>
            <li>Using useEffect would cause unnecessary extra renders</li>
          </ul>
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            Product Filters & Search
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Products:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort By:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyInStock}
                  onChange={e => setShowOnlyInStock(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show only in stock</span>
              </label>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            Statistics (Calculated on Render)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.inStock}</div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
              <div className="text-sm text-gray-600">Out of Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatPrice(stats.averagePrice)}
              </div>
              <div className="text-sm text-gray-600">Avg Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatRating(stats.averageRating)}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
            <p className="text-sm text-green-800">
              ✅ All statistics calculated during render - no useEffect needed!
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
            Products ({filteredAndSortedProducts.length} found)
          </h2>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found matching your criteria
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedProducts.map(product => (
                <div key={product.id} className="border border-gray-300 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <span className={getStockBadgeClass(product.inStock)}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Category: {product.category}</p>
                    <p>Price: {formatPrice(product.price)}</p>
                    <p>Rating: {formatRating(product.rating)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded p-3 mt-6">
            <p className="text-sm text-green-800">
              ✅ Products filtered and sorted during render - no useEffect needed!
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Code Examples:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200">
                ❌ WRONG:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// DON'T DO THIS!
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  const filtered = products.filter(product =>
    product.name.includes(searchTerm)
  );
  setFilteredProducts(filtered);
}, [products, searchTerm]); // Extra re-render!`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-600 bg-green-50 px-3 py-1 rounded border border-green-200">
                ✅ CORRECT:
              </h4>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`// Simple and efficient!
const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const sortedProducts = filteredProducts.sort((a, b) => {
  return sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name);
});

// For expensive operations, use useMemo:
const expensiveCalculation = useMemo(() => {
  return heavyProcessing(data);
}, [data]);`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
