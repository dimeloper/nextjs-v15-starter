import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const params = await searchParams;

  const query = params.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {query ? (
        <p className="mb-4">
          You searched for: <strong>{query}</strong>
        </p>
      ) : (
        <p className="mb-4">No search query provided.</p>
      )}
      {/* Here you would typically display search results */}
      <p className="mb-8 max-w-[380px]">
        In this compoennt we are asynchronously accessing the searchParams.
      </p>
      <div className="flex gap-4">
        <Link
          href="/form-showcase"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Back to Search
        </Link>
        <Link
          href="/"
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Take me Home
        </Link>
      </div>
    </div>
  );
}
