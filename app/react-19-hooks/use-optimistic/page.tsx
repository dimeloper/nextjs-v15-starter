"use client";

import { useOptimistic, useState } from "react";

// This would typically be in a separate file
const submitTitle = async (formData: FormData) => {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newTitle = formData.get("title") as string;
  if (newTitle === "error") {
    throw new Error('Title cannot be "error"');
  }
  return newTitle;
};

export default function OptimisticComponent() {
  const [title, setTitle] = useState("Title");
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(title);
  const [error, setError] = useState<string | null>(null);
  const pending = title !== optimisticTitle;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setOptimisticTitle(formData.get("title") as string);
    try {
      const updatedTitle = await submitTitle(formData);
      setTitle(updatedTitle);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">useOptimistic Example</h1>
      <h2 className="text-xl mb-2">{optimisticTitle}</h2>
      <p className="mb-2"> {pending && "Updating..."} </p>
      <form action={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Change Title"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ml-4"
          type="submit"
          disabled={pending}
        >
          Submit
        </button>
      </form>
      <div className="text-red-500">{error && error}</div>
    </div>
  );
}
