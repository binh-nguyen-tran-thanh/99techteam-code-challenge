import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message text', () => {
    render(<ErrorMessage message="Test error message" />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Test error" />);

    expect(
      screen.queryByRole('button', { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={onRetry} />);

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={onRetry} />);

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should render with different error messages', () => {
    const { rerender } = render(<ErrorMessage message="First error" />);
    expect(screen.getByText('First error')).toBeInTheDocument();

    rerender(<ErrorMessage message="Second error" />);
    expect(screen.getByText('Second error')).toBeInTheDocument();
  });
});
