import type { TokenOption, TokenPriceResponse } from '@/types/token';
import { getIconUrl } from '@/utils/getIconUrl';

export const mappingTokenResponseToTokenOptions = (
  token: TokenPriceResponse
): TokenOption[] => {
  if (!token || token.length === 0) return [];
  return token.map((item) => ({
    label: item.currency,
    value: item.currency,
    iconUrl: getIconUrl(item.currency)
  }));
};
