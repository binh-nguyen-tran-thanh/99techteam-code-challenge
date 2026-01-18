import { WalletBalance } from './types';
import { getPriority } from './utils';

export const useFormattedWalletBalances = () => {
  const balances = useWalletBalances();

  const sortedBalances = useMemo(() => {
    const walletWithValidPriority = balances.filter(
      (balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          // ? Not sure what is the bussiness logic here
          // If it only show the empty balance, keep the condition
          // If it should show the balance with amount <= 0, update the condition to balance.amount > 0
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      }
    );

    const sortedWallet = walletWithValidPriority.toSorted(
      (lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      }
    );

    return sortedWallet;
  }, [balances]);

  const formattedBalances = useMemo(
    () =>
      sortedBalances.map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed()
        };
      }),
    [sortedBalances]
  );

  return {
    formattedBalances
  };
};
