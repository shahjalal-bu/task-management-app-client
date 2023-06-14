import React from "react";

const LoadingSingle = () => {
  return (
    <div
      id="toast-success"
      className="flex items-center p-2 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400"
      role="alert"
    >
      <div className="ml-3 text-sm font-normal">Processing!</div>
    </div>
  );
};

export default LoadingSingle;
