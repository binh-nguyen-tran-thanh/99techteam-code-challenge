import { describe, it, expect } from 'vitest';
import { ExchangeSchema } from './exchange';

describe('ExchangeSchema', () => {
  it('should validate valid data', () => {
    const result = ExchangeSchema.safeParse({ fromToken: 'ETH', toToken: 'USDT', amount: '1' });
    expect(result.success).toBe(true);
  });

  it('should fail on empty amount', () => {
    const result = ExchangeSchema.safeParse({ fromToken: 'ETH', toToken: 'USDT', amount: '' });
    expect(result.success).toBe(false);
  });

  it('should fail on negative amount', () => {
    const result = ExchangeSchema.safeParse({ fromToken: 'ETH', toToken: 'USDT', amount: '-1' });
    expect(result.success).toBe(false);
  });
});
