import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl font-extrabold mb-6 bg-theme-gradient-primary bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md text-center transition-colors"
        >
          Go to Homepage
        </Link>
        <Link href="/contact" 
          className="bg-theme-surface-1 text-blue-600 font-medium px-8 py-3 rounded-md border border-blue-200 text-center transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
