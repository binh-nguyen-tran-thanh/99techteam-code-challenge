/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TokenReceive from './TokenReceive';
import useTokenPrices from '../hooks/useTokenPrices';

vi.mock('../hooks/useTokenPrices');

describe('TokenReceive', () => {
  const mockGetTokenRate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTokenPrices as any).mockReturnValue({
      getTokenRate: mockGetTokenRate
    });
  });

  it('should return null when fromToken is not provided', () => {
    mockGetTokenRate.mockReturnValue(1.5);
    const { container } = render(<TokenReceive toToken="ETH" amount="100" />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when toToken is not provided', () => {
    mockGetTokenRate.mockReturnValue(1.5);
    const { container } = render(<TokenReceive fromToken="BTC" amount="100" />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when amount is not provided', () => {
    mockGetTokenRate.mockReturnValue(1.5);
    const { container } = render(
      <TokenReceive fromToken="BTC" toToken="ETH" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should return null when rate is null', () => {
    mockGetTokenRate.mockReturnValue(null);
    const { container } = render(
      <TokenReceive fromToken="BTC" toToken="ETH" amount="100" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should calculate and display receive amount correctly', () => {
    mockGetTokenRate.mockReturnValue(2.5);
    render(<TokenReceive fromToken="BTC" toToken="ETH" amount="10" />);
    expect(
      screen.getByText(/You will receive approximately 25.0000 ETH/)
    ).toBeInTheDocument();
  });

  it('should format receive amount to 4 decimal places', () => {
    mockGetTokenRate.mockReturnValue(1.23456789);
    render(<TokenReceive fromToken="BTC" toToken="ETH" amount="5" />);
    expect(
      screen.getByText(/You will receive approximately 6.1728 ETH/)
    ).toBeInTheDocument();
  });

  it('should call getTokenRate with correct parameters', () => {
    mockGetTokenRate.mockReturnValue(1.5);
    render(<TokenReceive fromToken="BTC" toToken="ETH" amount="100" />);
    expect(mockGetTokenRate).toHaveBeenCalledWith('BTC', 'ETH');
  });
});
