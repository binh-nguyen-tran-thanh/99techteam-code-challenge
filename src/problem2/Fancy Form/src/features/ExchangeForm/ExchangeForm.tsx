import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Loader2 } from 'lucide-react';
import { Controller, Watch } from 'react-hook-form';
import TokenExchangeRate from './components/TokenExchangeRate';
import TokenOptionItem from './components/TokenOptionItem';
import TokenReceive from './components/TokenReceive';
import useExchangeForm from './hooks/useExchangeForm';
import useTokenPrices from './hooks/useTokenPrices';

export default function ExchangeForm() {
  const { tokenOptions } = useTokenPrices();
  const { handleSubmit, register, control, errors, isPending } =
    useExchangeForm();

  return (
    <div className="w-full max-w-2xl">
      <Card className="p-6 md:p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center mt-4">
          Exchange Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Controller
              name="fromToken"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="flex-1"
                  options={tokenOptions}
                  label="You pay"
                  placeholder="e.g., USDT"
                  error={errors.fromToken?.message}
                  disabled={isPending}
                  optionRenderer={(token) => {
                    return <TokenOptionItem option={token} />;
                  }}
                />
              )}
            />

            <Watch
              name={['fromToken', 'toToken']}
              control={control}
              render={([fromToken, toToken]) => (
                <TokenExchangeRate fromToken={fromToken} toToken={toToken} />
              )}
            />

            <Controller
              name="toToken"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tokenOptions}
                  label="You receive"
                  placeholder="e.g., USDT"
                  error={errors.toToken?.message}
                  disabled={isPending}
                  optionRenderer={(token) => {
                    return <TokenOptionItem option={token} />;
                  }}
                />
              )}
            />
          </div>
          <Input
            {...register('amount')}
            label="Amount"
            type="number"
            step="0.01"
            placeholder="Enter amount"
            error={errors.amount?.message}
            disabled={isPending}
          />

          <Watch
            name={['fromToken', 'toToken', 'amount']}
            control={control}
            render={([fromToken, toToken, amount]) => (
              <TokenReceive
                fromToken={fromToken}
                toToken={toToken}
                amount={amount}
              />
            )}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-8"
            disabled={isPending}
          >
            <span className="flex items-center gap-2 justify-center">
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? 'Exchanging...' : 'Exchange'}
            </span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
