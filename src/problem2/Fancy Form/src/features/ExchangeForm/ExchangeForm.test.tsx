import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '../Toast/Toast';
import ExchangeForm from './ExchangeForm';

vi.mock('./hooks/useTokenPrices', () => ({
  default: () => ({
    tokenOptions: [],
    tokens: [],
    getTokenRate: () => 1
  })
}));

const mockTokenOptions = [
  { value: 'ETH', label: 'Ethereum' },
  { value: 'BTC', label: 'Bitcoin' }
];

const mockTokens = [
  { currency: 'ETH', price: 2000 },
  { currency: 'BTC', price: 40000 }
];

vi.mock('./hooks/useTokenPrices', () => ({
  default: () => ({
    tokenOptions: mockTokenOptions,
    tokens: mockTokens,
    getTokenRate: (from: string, to: string) => {
      if (from === 'ETH' && to === 'BTC') return 0.05;
      if (from === 'BTC' && to === 'ETH') return 20;
      return 1;
    }
  })
}));

const renderExchangeForm = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ExchangeForm />
      </ToastProvider>
    </QueryClientProvider>
  );
};

describe('ExchangeForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('should render form title', () => {
    renderExchangeForm();
    expect(screen.getByText('Exchange Form')).toBeInTheDocument();
  });

  it('should render token selection dropdowns', () => {
    renderExchangeForm();
    const selects = screen.getAllByRole('button');
    expect(selects).toHaveLength(3);
  });

  it('should render amount input field', () => {
    renderExchangeForm();
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('should update amount when user types', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '10');

    expect(input.value).toBe('10');
  });

  it('should calculate exchange rate when tokens are selected', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const [fromSelect, toSelect] = screen.getAllByRole('button');
    const input = screen.getByRole('spinbutton');

    await user.click(fromSelect);
    await user.click(screen.getByText('Ethereum'));
    await user.click(toSelect);
    await user.click(screen.getByText('Bitcoin'));
    await user.clear(input);
    await user.type(input, '2');

    await waitFor(() => {
      expect(screen.getByText(/0.1000/)).toBeInTheDocument();
    });
  });

  it('should have a submit button', () => {
    renderExchangeForm();
    const button = screen.getByRole('button', { name: /exchange|submit/i });
    expect(button).toBeInTheDocument();
  });

  it('should disable form fields while submitting', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const [fromSelect, toSelect] = screen.getAllByRole('button');
    const input = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /exchange/i });

    await user.click(fromSelect);
    await user.click(screen.getByText('Ethereum'));
    await user.click(toSelect);
    await user.click(screen.getByText('Bitcoin'));
    await user.type(input, '1');

    await user.click(submitButton);

    await waitFor(() => {
      expect(input).toBeDisabled();
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const [fromSelect, toSelect] = screen.getAllByRole('button');
    const input = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /exchange/i });

    await user.click(fromSelect);
    await user.click(screen.getByText('Ethereum'));
    await user.click(toSelect);
    await user.click(screen.getByText('Bitcoin'));
    await user.type(input, '1');

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/exchanging/i)).toBeInTheDocument();
    });
  });

  it('should not submit form with empty fields', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const submitButton = screen.getByRole('button', { name: /exchange/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/exchanging/i)).not.toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const [fromSelect, toSelect] = screen.getAllByRole('button');
    const input = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /exchange/i });

    await user.click(fromSelect);
    await user.click(screen.getByText('Ethereum'));
    await user.click(toSelect);
    await user.click(screen.getByText('Bitcoin'));
    await user.type(input, '5');

    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('should display error message for invalid amount', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const input = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /exchange/i });

    await user.type(input, '-1');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/amount must be a positive number/i)
      ).toBeInTheDocument();
    });
  });

  it('should reset button state after submission', async () => {
    const user = userEvent.setup();
    renderExchangeForm();

    const [fromSelect, toSelect] = screen.getAllByRole('button');
    const input = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', { name: /exchange/i });

    await user.click(fromSelect);
    await user.click(screen.getByText('Ethereum'));
    await user.click(toSelect);
    await user.click(screen.getByText('Bitcoin'));
    await user.type(input, '1');

    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(/exchange$/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
