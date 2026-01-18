import { useFormattedWalletBalances } from './hook';
import type { FormattedWalletBalance } from './types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const { formattedBalances } = useFormattedWalletBalances();
  const prices = usePrices();

  const rows = useMemo(() => {
    // Empty state
    if (!formattedBalances.length)
      return (
        <div class="flex items-center align-center">No data available</div>
      );

    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      const key = `${balance.currency}-${balance.blockchain}`;
      return (
        <WalletRow
          className={classes.row}
          key={key}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
