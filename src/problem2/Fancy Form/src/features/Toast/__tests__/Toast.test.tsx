import { render, screen, act } from '@testing-library/react';
import { ToastProvider } from '../Toast';
import { useToast } from '../hooks/useToast';

const TestComponent = () => {
  const { showToast } = useToast();
  return <button onClick={() => showToast('Message', 'success')}>Show</button>;
};

describe('Toast Feature', () => {
  it('should show toast', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await act(async () => {
      screen.getByText('Show').click();
    });

    expect(screen.getByText('Message')).toBeInTheDocument();
  });
});
