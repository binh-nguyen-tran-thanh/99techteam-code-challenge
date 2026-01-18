import { memo } from 'react';
import useTokenPrices from '../hooks/useTokenPrices';

interface TokenReceiveProps {
  fromToken?: string;
  toToken?: string;
  amount?: string;
}

function TokenReceive({ fromToken, toToken, amount }: TokenReceiveProps) {
  const { getTokenRate } = useTokenPrices();

  const rate = fromToken && toToken ? getTokenRate(fromToken, toToken) : null;

  if (rate === null || !amount) {
    return null;
  }

  const payAmount = amount ? Number.parseFloat(amount) : 0;
  const receiveAmount = (payAmount * rate).toFixed(4);

  return (
    <div className="my-4 md:my-2 text-gray-500 dark:text-gray-400  font-bold">
      You will receive approximately {amount && receiveAmount} {toToken}
    </div>
  );
}

export default memo(TokenReceive);
