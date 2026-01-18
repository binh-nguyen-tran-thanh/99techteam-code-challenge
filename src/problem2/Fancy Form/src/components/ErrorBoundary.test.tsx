import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { userEvent } from '@testing-library/user-event';

const ThrowError = ({ error }: { error: string }) => {
  throw new Error(error);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render ErrorMessage when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError error="Test error message" />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    const fallback = (errorMessage: string) => (
      <div>Custom fallback: {errorMessage}</div>
    );

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError error="Custom error" />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Custom fallback: Custom error')
    ).toBeInTheDocument();
  });

  it('should call console.error when error is caught', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError error="Test error" />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should reload page when retry is clicked', async () => {
    const user = userEvent.setup();
    const reloadSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true
    });

    render(
      <ErrorBoundary>
        <ThrowError error="Test error" />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    await user.click(retryButton);

    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should update state with error message', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError error="Specific error message" />
      </ErrorBoundary>
    );

    expect(container.textContent).toContain('Specific error message');
  });
});
