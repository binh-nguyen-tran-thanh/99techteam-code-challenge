/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useTokenPrices from './useTokenPrices';
import { TokenService } from '@/services/tokenService';
import * as mapper from '../utils/mapper';

vi.mock('@/services/tokenService');
vi.mock('../utils/mapper');
vi.mock('@/utils/uniqBy', () => ({
  uniqBy: vi.fn((arr, fn) => {
    const seen = new Set();
    return arr.filter((item: any) => {
      const key = fn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })
}));

describe('useTokenPrices', () => {
  const mockTokenData = [
    { currency: 'BTC', price: 50000 },
    { currency: 'ETH', price: 3000 },
    { currency: 'BTC', price: 50000 },
    { currency: 'USDT', price: 1 }
  ];

  const mockTokenOptions = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' }
  ];

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false }
      }
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(TokenService.fetchTokenPrices).mockResolvedValue(
      mockTokenData as any
    );
    vi.mocked(mapper.mappingTokenResponseToTokenOptions).mockReturnValue(
      mockTokenOptions as any
    );
  });

  it('should fetch and return unique token data', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.tokens).toHaveLength(3);
      expect(result.current.tokens).toEqual([
        { currency: 'BTC', price: 50000 },
        { currency: 'ETH', price: 3000 },
        { currency: 'USDT', price: 1 }
      ]);
    });
  });

  it('should return mapped token options', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.tokenOptions).toEqual(mockTokenOptions);
    });
  });

  it('should calculate token rate correctly', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      const rate = result.current.getTokenRate('BTC', 'ETH');
      expect(rate).toBe(0.06);
    });
  });

  it('should return null when fromToken is not found', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      const rate = result.current.getTokenRate('INVALID', 'ETH');
      expect(rate).toBeNull();
    });
  });

  it('should return null when toToken is not found', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      const rate = result.current.getTokenRate('BTC', 'INVALID');
      expect(rate).toBeNull();
    });
  });

  it('should return null when both tokens are not found', async () => {
    const { result } = renderHook(() => useTokenPrices(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      const rate = result.current.getTokenRate('INVALID1', 'INVALID2');
      expect(rate).toBeNull();
    });
  });
});
