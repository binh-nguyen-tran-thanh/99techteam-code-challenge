import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(<Card>Content</Card>);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('dark:bg-gray-800');
    expect(cardElement).toHaveClass('rounded-lg');
    expect(cardElement).toHaveClass('shadow-md');
    expect(cardElement).toHaveClass('p-6');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('custom-class');
  });

  it('merges custom className with default classes', () => {
    const { container } = render(<Card className="mt-4 border">Content</Card>);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('mt-4');
    expect(cardElement).toHaveClass('border');
  });

  it('renders complex children', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
