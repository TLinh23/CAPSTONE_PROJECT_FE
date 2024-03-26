import React from "react";

function UnauthorizedPage({ className = "" }) {
  return (
    <div className={`flex items-center justify-center h-screen ${className}`}>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">401</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you don&apos;t have permission.
        </p>
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let&apos;s get you back{" "}
          <a href="/" className="text-blue-500 underline">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
