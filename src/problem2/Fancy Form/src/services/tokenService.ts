import type { TokenPriceResponse } from '@/types/token';
import { TOKEN_API_CONFIG } from '@/utils/constants';
import { BaseApiService } from './base';

export class TokenService extends BaseApiService {
  constructor() {
    super();
  }

  static async fetchTokenPrices(
    page: number = 1,
    options?: RequestInit
  ): Promise<TokenPriceResponse> {
    // Simulate a slow network for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 500));

    return this.fetchApi<TokenPriceResponse>(
      TOKEN_API_CONFIG.PRICES_ENDPOINT,
      {
        page: page.toString(),
        sort_by: 'popularity.desc',
        include_adult: 'false'
      },
      options
    );
  }

  static async postExchangeToken(
    fromToken: string,
    toToken: string,
    amount: number
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      const isSuccess = Math.random() > 0.2;

      if (!isSuccess) {
        setTimeout(() => {
          reject(new Error('Exchange failed due to network error.'));
        }, 1000);
        return;
      }

      setTimeout(() => {
        resolve({
          success: true,
          message: `Exchanged ${amount} ${fromToken} to ${toToken} successfully!`
        });
      }, 1000);
    });
  }
}
