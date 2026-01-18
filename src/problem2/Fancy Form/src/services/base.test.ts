/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseApiService, ApiError } from './base';
import { TOKEN_API_CONFIG } from '@/utils/constants';

describe('ApiError', () => {
  it('should create an error with message and statusCode', () => {
    const error = new ApiError('Test error', 404);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('ApiError');
  });

  it('should create an error without statusCode', () => {
    const error = new ApiError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBeUndefined();
  });
});

describe('BaseApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('should successfully fetch data', async () => {
    const mockData = { id: 1, name: 'Test' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const result = await (BaseApiService as any).fetchApi('/test');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${TOKEN_API_CONFIG.BASE_URL}/test`,
      {}
    );
    expect(result).toEqual(mockData);
  });

  it('should append query parameters', async () => {
    const mockData = { data: 'test' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    await (BaseApiService as any).fetchApi('/test', { page: '1', limit: '10' });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('page=1'),
      {}
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('limit=10'),
      {}
    );
  });

  it('should throw ApiError when response is not ok', async () => {
    const errorData = { status_message: 'Not Found' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      clone: () => ({
        json: async () => errorData
      })
    });

    await expect((BaseApiService as any).fetchApi('/test')).rejects.toThrow(
      ApiError
    );
    await expect((BaseApiService as any).fetchApi('/test')).rejects.toThrow(
      'API request failed: Not Found'
    );
  });

  it('should use statusText when status_message is not available', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      clone: () => ({
        json: async () => ({})
      })
    });

    await expect((BaseApiService as any).fetchApi('/test')).rejects.toThrow(
      'API request failed: Internal Server Error'
    );
  });

  it('should throw network error for fetch failures', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network failed'));

    await expect((BaseApiService as any).fetchApi('/test')).rejects.toThrow(
      'Network error. Please check your connection.'
    );
  });

  it('should pass options to fetch', async () => {
    const mockData = { data: 'test' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    await (BaseApiService as any).fetchApi('/test', undefined, options);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(options)
    );
  });
});
