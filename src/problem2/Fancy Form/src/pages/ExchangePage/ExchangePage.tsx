import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import ExchangeForm from '@/features/ExchangeForm/ExchangeForm';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function ExchangePage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        const onRerun = () => {
          reset();
          location.reload();
        };
        const renderFallback = (errorMessage: string) => {
          return (
            <ErrorMessage
              message={
                errorMessage ||
                'Something went wrong while loading configuration.'
              }
              onRetry={onRerun}
            />
          );
        };

        return (
          <ErrorBoundary fallback={renderFallback}>
            <Suspense
              fallback={
                <LoadingSpinner
                  size="large"
                  text={'Loading configuration...'}
                />
              }
            >
              <ExchangeForm />
            </Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}
