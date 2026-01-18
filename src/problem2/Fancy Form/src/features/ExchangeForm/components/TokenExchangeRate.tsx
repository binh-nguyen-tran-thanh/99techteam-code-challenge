import { memo } from 'react';
import useTokenPrices from '../hooks/useTokenPrices';

interface TokenExchangeRateProps {
  fromToken?: string;
  toToken?: string;
}

function TokenExchangeRate({ fromToken, toToken }: TokenExchangeRateProps) {
  const { getTokenRate } = useTokenPrices();

  const rate = fromToken && toToken ? getTokenRate(fromToken, toToken) : null;

  if (rate === null) {
    return null;
  }

  return (
    <div className="my-4 md:my-0 md:mx-0 text-gray-500 dark:text-gray-400 flex flex-col items-end gap-2 bg-amber-50/50 dark:bg-amber-900/20 px-2 py-1 rounded-2xl md:self-end-safe font-bold">
      1 {fromToken} = {rate?.toFixed(4)} {toToken}
    </div>
  );
}

export default memo(TokenExchangeRate);
