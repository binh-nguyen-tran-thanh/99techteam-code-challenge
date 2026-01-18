import { TOKEN_API_CONFIG } from '@/utils/constants';

export class ApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class BaseApiService {
  protected static readonly baseUrl: string = TOKEN_API_CONFIG.BASE_URL;

  protected static async fetchApi<T>(
    endpoint: string,
    params?: Record<string, string>,
    options?: RequestInit
  ): Promise<T> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        ...options
      });

      if (!response.ok) {
        const errorData = await response.clone().json();
        const errorMessage = errorData.status_message || response.statusText;
        throw new ApiError(
          `API request failed: ${errorMessage}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      console.info(error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error. Please check your connection.');
    }
  }
}
