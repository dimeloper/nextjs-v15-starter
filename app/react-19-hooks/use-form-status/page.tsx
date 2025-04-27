'use client';

import { useFormStatus } from 'react-dom';

// This would typically be in a separate file
const submitAction = async () => {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000));
};

const Form = () => {
  const { pending, data } = useFormStatus();

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="Enter your name"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800 mr-4"
      />
      <button
        className={`text-white px-4 py-2 rounded-md transition duration-300 ease-in-out ${
          pending ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={pending}
        type="submit"
      >
        Submit
      </button>
      {pending && <p className="mt-2">Submitting {data?.get('username') as string}...</p>}
    </div>
  );
};

const UseFormStatusComponent = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">useFormStatus Example</h1>
      <form
        action={async () => {
          await submitAction();
        }}
        className="mb-4"
      >
        <Form />
      </form>
    </div>
  );
};

export default UseFormStatusComponent;
