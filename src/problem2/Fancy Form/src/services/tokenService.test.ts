import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TokenService } from './tokenService';

describe('TokenService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('fetchTokenPrices should call fetch', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [{ currency: 'ETH', price: 2000 }]
    });
    const result = await TokenService.fetchTokenPrices();
    expect(result).toHaveLength(1);
    expect(fetch).toHaveBeenCalled();
  });

  it('postExchangeToken should resolve with success message', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    vi.useFakeTimers();

    const promise = TokenService.postExchangeToken('ETH', 'BTC', 100);
    vi.advanceTimersByTime(1000);

    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.message).toBe('Exchanged 100 ETH to BTC successfully!');

    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('postExchangeToken should reject with error on failure', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    vi.useFakeTimers();

    const promise = TokenService.postExchangeToken('ETH', 'BTC', 100);
    vi.advanceTimersByTime(1000);

    await expect(promise).rejects.toThrow(
      'Exchange failed due to network error.'
    );

    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('fetchTokenPrices should wait 500ms before fetching', async () => {
    vi.useFakeTimers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [{ currency: 'BTC', price: 50000 }]
    });

    const promise = TokenService.fetchTokenPrices(2);
    vi.advanceTimersByTime(500);

    await promise;
    expect(fetch).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
