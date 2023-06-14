export default function Loading({ val }) {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div
        className={`h-5 bg-gray-100 rounded-full dark:bg-gray-200 mb-2.5 max-w-full`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
