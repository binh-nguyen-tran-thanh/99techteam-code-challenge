import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TokenExchangeRate from './TokenExchangeRate';
import useTokenPrices from '../hooks/useTokenPrices';

vi.mock('../hooks/useTokenPrices');

describe('TokenExchangeRate', () => {
  const mockGetTokenRate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTokenPrices as ReturnType<typeof vi.fn>).mockReturnValue({
      getTokenRate: mockGetTokenRate
    });
  });

  it('should render nothing when fromToken is not provided', () => {
    const { container } = render(<TokenExchangeRate toToken="USD" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when toToken is not provided', () => {
    const { container } = render(<TokenExchangeRate fromToken="BTC" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when both tokens are not provided', () => {
    const { container } = render(<TokenExchangeRate />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when rate is null', () => {
    mockGetTokenRate.mockReturnValue(null);
    const { container } = render(
      <TokenExchangeRate fromToken="BTC" toToken="USD" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render exchange rate when both tokens are provided', () => {
    mockGetTokenRate.mockReturnValue(50000.1234);
    render(<TokenExchangeRate fromToken="BTC" toToken="USD" />);

    expect(screen.getByText(/1 BTC = 50000.1234 USD/)).toBeInTheDocument();
  });

  it('should format rate to 4 decimal places', () => {
    mockGetTokenRate.mockReturnValue(1.23456789);
    render(<TokenExchangeRate fromToken="ETH" toToken="BTC" />);

    expect(screen.getByText(/1 ETH = 1.2346 BTC/)).toBeInTheDocument();
  });

  it('should call getTokenRate with correct parameters', () => {
    mockGetTokenRate.mockReturnValue(100);
    render(<TokenExchangeRate fromToken="ETH" toToken="USD" />);

    expect(mockGetTokenRate).toHaveBeenCalledWith('ETH', 'USD');
    expect(mockGetTokenRate).toHaveBeenCalledTimes(1);
  });
});
