import { TokenService } from '@/services/tokenService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { mappingTokenResponseToTokenOptions } from '../utils/mapper';
import { uniqBy } from '@/utils/uniqBy';
import { useCallback } from 'react';

export default function useTokenPrices() {
  const { data } = useSuspenseQuery({
    queryKey: ['exchange-currencies'],
    queryFn: async () => {
      return TokenService.fetchTokenPrices();
    }
  });

  const uniqueData = uniqBy(data, (item) => item.currency);

  const getTokenRate = useCallback(
    (fromToken: string, toToken: string) => {
      const fromTokenData = uniqueData.find(
        (item) => item.currency === fromToken
      );
      const toTokenData = uniqueData.find((item) => item.currency === toToken);

      if (fromTokenData && toTokenData) {
        const rate = toTokenData.price / fromTokenData.price;
        return Number(rate);
      }
      return null;
    },
    [uniqueData]
  );

  return {
    tokens: uniqueData,
    tokenOptions: mappingTokenResponseToTokenOptions(uniqueData),
    getTokenRate
  };
}
