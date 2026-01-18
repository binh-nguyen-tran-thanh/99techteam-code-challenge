import { useToast } from '@/features/Toast/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExchangeSchema } from '../validation/exchange';
import { useState } from 'react';
import { TokenService } from '@/services/tokenService';

interface ExchangeFormData {
  fromToken: string;
  toToken: string;
  amount: string;
}

export default function useExchangeForm() {
  const [isPending, setIsPending] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<ExchangeFormData>({
    resolver: zodResolver(ExchangeSchema),
    defaultValues: {
      fromToken: '',
      toToken: '',
      amount: ''
    }
  });
  const { showToast } = useToast();

  const onSubmit = handleSubmit(async (data: ExchangeFormData) => {
    setIsPending(true);
    try {
      await TokenService.postExchangeToken(
        data.fromToken,
        data.toToken,
        Number(data.amount)
      );
      showToast('Exchange submitted successfully!', 'success');
    } catch (error) {
      console.info(error);
      showToast((error as Error).message, 'error');
    } finally {
      setIsPending(false);
    }
  });

  return {
    handleSubmit: onSubmit,
    register,
    isPending,
    control,
    errors
  };
}
