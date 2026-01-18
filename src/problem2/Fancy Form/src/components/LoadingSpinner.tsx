export default function LoadingSpinner({
  size = 'medium',
  text,
}: Readonly<{
  size?: 'small' | 'medium' | 'large'
  text?: string
}>) {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <output
        className={`${sizeClasses[size]} animate-spin rounded-full border-blue-500 border-t-transparent`}
        aria-label="Loading"
      />
      {text && <p className="text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  )
}
