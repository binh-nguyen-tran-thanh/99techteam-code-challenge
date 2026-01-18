/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@/features/Toast/hooks/useToast';
import { TokenService } from '@/services/tokenService';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import useExchangeForm from './useExchangeForm';

vi.mock('@/services/tokenService');
vi.mock('@/features/Toast/hooks/useToast');

describe('useExchangeForm', () => {
  const mockShowToast = vi.fn();
  const mockPostExchangeToken = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as any).mockReturnValue({ showToast: mockShowToast });
    (TokenService.postExchangeToken as any) = mockPostExchangeToken;
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useExchangeForm());

    expect(result.current.isPending).toBe(false);
    expect(result.current.register).toBeDefined();
    expect(result.current.control).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
  });

  it('should handle successful form submission', async () => {
    mockPostExchangeToken.mockResolvedValue({});
    const { result } = renderHook(() => useExchangeForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn()
      } as any);
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });
});
