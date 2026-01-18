import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TokenOptionItem from './TokenOptionItem';

describe('TokenOptionItem', () => {
  it('renders label text', () => {
    const option = { label: 'Bitcoin', value: 'BTC' };
    render(<TokenOptionItem option={option} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });

  it('renders icon when iconUrl is provided', () => {
    const option = {
      label: 'Ethereum',
      value: 'ETH',
      iconUrl: 'https://example.com/eth.png'
    };
    render(<TokenOptionItem option={option} />);

    const image = screen.getByAltText('Ethereum');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/eth.png');
    expect(image).toHaveClass('w-5', 'h-5', 'rounded-full');
  });

  it('does not render icon when iconUrl is not provided', () => {
    const option = { label: 'Bitcoin', value: 'BTC' };
    render(<TokenOptionItem option={option} />);

    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    const option = { label: 'Cardano', value: 'ADA' };
    const { container } = render(<TokenOptionItem option={option} />);

    const div = container.firstChild;
    expect(div).toHaveClass('flex', 'items-center', 'space-x-2');
  });
});
