"use client";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-red-500 bg-white z-50">
      <h2 className="text-2xl font-bold mb-4">Something went wrong in Auth!</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm max-w-full overflow-auto mb-4 border border-red-200">
        {error.message}
        {"\n\n"}
        {error.stack}
      </pre>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}
