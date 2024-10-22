"use client";

import { useState } from "react";
import { use } from "react";

// This would typically be in a separate file
const fetchData = async () => {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "Data fetched successfully!";
};

const DataContainer = ({ dataPromise }: { dataPromise: Promise<string> }) => {
  const data = use(dataPromise);
  return <div>{data}</div>;
};

export default function UseHookWithPromise() {
  const [dataPromise, setDataPromise] = useState<Promise<string> | null>(null);

  const handleClick = () => {
    setDataPromise(fetchData());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">use Hook Example</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleClick}
      >
        Get Data
      </button>
      {dataPromise && <DataContainer dataPromise={dataPromise} />}
    </div>
  );
}
