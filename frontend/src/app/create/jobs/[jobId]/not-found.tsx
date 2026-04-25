import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-8">
          The job posting you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link 
          href="/create/jobs"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Jobs
        </Link>
      </div>
    </div>
  );
} 