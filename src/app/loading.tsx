export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="space-y-8 w-full max-w-5xl px-4">
        {/* Animated logo placeholder */}
        <div className="flex justify-center">
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        </div>

        {/* Hero section placeholder */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Cards placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
          ))}
        </div>

        <div className="flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
