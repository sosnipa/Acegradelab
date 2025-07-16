"use client";

import { useState } from "react";

export default function TestUploadAPI() {
  const [response, setResponse] = useState(null);

  const handleTest = async () => {
    const testData = {
      uploads: [
        {
          url: "https://res.cloudinary.com/dzgiaekwh/image/upload/vexample/test1.jpg",
          public_id: "test1",
          type: "image",
        },
      ],
      caption: "Test caption for this upload",
    };

    const res = await fetch("/api/proof/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data = await res.json();
    setResponse(data);
    console.log(data);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleTest}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Test Upload API
      </button>

      {response && (
        <pre className="mt-4 p-4 bg-gray-100 text-sm overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
