import { getIconUrl } from '../getIconUrl';

describe('getIconUrl', () => {
  it('should return valid url for token symbol', () => {
    expect(getIconUrl('ETH')).toContain('ETH.svg');
  });

  it('should return placeholder for null', () => {
    expect(getIconUrl(null)).toBe('/placeholder-token-image.png');
  });

  it('should return placeholder for undefined', () => {
    expect(getIconUrl(undefined)).toBe('/placeholder-token-image.png');
  });

  it('should handle different token symbols', () => {
    expect(getIconUrl('BTC')).toContain('BTC.svg');
    expect(getIconUrl('USDC')).toContain('USDC.svg');
  });
});
