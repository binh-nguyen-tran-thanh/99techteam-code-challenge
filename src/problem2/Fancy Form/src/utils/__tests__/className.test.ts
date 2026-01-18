import { describe, expect, it } from 'vitest';
import { cn } from '../className';

describe('cn', () => {
  it('should merge multiple classes', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('should handle conditional classes', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });

  it('should handle undefined and null', () => {
    expect(cn('a', undefined, null, 'b')).toBe('a b');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });
});
