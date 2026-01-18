import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  onRetry
}: Readonly<ErrorMessageProps>) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
