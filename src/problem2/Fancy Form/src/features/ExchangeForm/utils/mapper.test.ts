/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { mappingTokenResponseToTokenOptions } from './mapper';
import type { TokenPriceResponse } from '@/types/token';
import * as getIconUrlModule from '@/utils/getIconUrl';

vi.mock('@/utils/getIconUrl', () => ({
  getIconUrl: vi.fn(
    (currency: string) => `https://example.com/icons/${currency}.png`
  )
}));

describe('mappingTokenResponseToTokenOptions', () => {
  it('should return empty array when token is null or undefined', () => {
    expect(mappingTokenResponseToTokenOptions(null as any)).toEqual([]);
    expect(mappingTokenResponseToTokenOptions(undefined as any)).toEqual([]);
  });

  it('should return empty array when token array is empty', () => {
    expect(mappingTokenResponseToTokenOptions([])).toEqual([]);
  });

  it('should call getIconUrl for each token', () => {
    const getIconUrlSpy = vi.spyOn(getIconUrlModule, 'getIconUrl');
    const mockTokens: TokenPriceResponse = [
      { currency: 'BTC', date: '2024-01-01', price: 50000 },
      { currency: 'ETH', date: '2024-01-01', price: 3000 }
    ];

    mappingTokenResponseToTokenOptions(mockTokens);

    expect(getIconUrlSpy).toHaveBeenCalledTimes(2);
    expect(getIconUrlSpy).toHaveBeenCalledWith('BTC');
    expect(getIconUrlSpy).toHaveBeenCalledWith('ETH');
  });

  it('should map single token correctly', () => {
    const mockToken: TokenPriceResponse = [
      { currency: 'BTC', date: '2024-01-01', price: 50000 }
    ];

    const result = mappingTokenResponseToTokenOptions(mockToken);

    expect(result).toEqual([
      {
        label: 'BTC',
        value: 'BTC',
        iconUrl: 'https://example.com/icons/BTC.png'
      }
    ]);
  });

  it('should map multiple tokens correctly', () => {
    const mockTokens: TokenPriceResponse = [
      { currency: 'BTC', date: '2024-01-01', price: 50000 },
      { currency: 'ETH', date: '2024-01-01', price: 3000 },
      { currency: 'USDT', date: '2024-01-01', price: 1 }
    ];

    const result = mappingTokenResponseToTokenOptions(mockTokens);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        label: 'BTC',
        value: 'BTC',
        iconUrl: 'https://example.com/icons/BTC.png'
      },
      {
        label: 'ETH',
        value: 'ETH',
        iconUrl: 'https://example.com/icons/ETH.png'
      },
      {
        label: 'USDT',
        value: 'USDT',
        iconUrl: 'https://example.com/icons/USDT.png'
      }
    ]);
  });
});
