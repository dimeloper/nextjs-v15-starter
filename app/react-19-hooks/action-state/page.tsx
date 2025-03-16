"use client";

import { useActionState } from "react";

// This would typically be in a separate file
const submitActionWithCurrentState = async (
  prevState: any,
  formData: FormData,
) => {
  const username = formData.get("username") as string;
  const age = Number(formData.get("age"));

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (prevState.users.some((user: any) => user.username === username)) {
    return { ...prevState, error: `User "${username}" already exists` };
  }

  return {
    users: [...prevState.users, { username, age }],
    error: null,
  };
};

export default function ActionStateComponent() {
  const [state, formAction] = useActionState(submitActionWithCurrentState, {
    users: [],
    error: null,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">useActionState Example</h1>
      <form action={formAction} id="action-hook-form" className="mb-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-red-500">{state?.error}</div>
      {state?.users?.map((user: any) => (
        <div key={user.username} className="mt-2">
          Name: {user.username} Age: {user.age}
        </div>
      ))}
    </div>
  );
}
