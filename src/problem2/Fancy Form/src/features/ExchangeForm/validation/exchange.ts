import * as z from 'zod';

export const ExchangeSchema = z.object({
  fromToken: z.string().nonempty('From Token is required'),
  toToken: z.string().nonempty('To Token is required'),
  amount: z
    .string()
    .nonempty('Amount is required')
    .refine((value) => {
      const numberValue = Number.parseFloat(value);
      return !Number.isNaN(numberValue) && numberValue > 0;
    }, {
      message: 'Amount must be a positive number',
    })
});
