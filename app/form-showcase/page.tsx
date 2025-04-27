import Form from "next/form";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Next v15 Form Component</h1>
      <p className="mb-4">Which saves us from a lot of boilerplate code.</p>
      <Form action="/search" className="flex flex-col space-y-4">
        {/* On submission, the input value will be appended to 
            the URL, e.g. /search?query=abc */}
        <input
          name="query"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          placeholder="Enter your search query"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
