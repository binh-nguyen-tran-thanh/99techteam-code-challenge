/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Select from './Select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
];

describe('Select Component', () => {
  it('renders with placeholder when no value is selected', () => {
    render(<Select options={mockOptions} placeholder="Choose option" />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<Select options={mockOptions} value="2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', () => {
    render(<Select options={mockOptions} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('selects an option and calls onChange', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));

    expect(handleChange).toHaveBeenCalledWith('2');
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('closes dropdown after selecting an option', () => {
    render(<Select options={mockOptions} />);

    fireEvent.click(screen.getByRole('button'));
    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<Select options={mockOptions} />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('renders with label in vertical position', () => {
    render(<Select options={mockOptions} label="Select Label" />);
    expect(screen.getByText('Select Label')).toBeInTheDocument();
  });

  it('renders with label in horizontal position', () => {
    render(
      <Select
        options={mockOptions}
        label="Select Label"
        labelPosition="horizontal"
      />
    );
    expect(screen.getByText('Select Label')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Select options={mockOptions} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('disables the select when disabled prop is true', () => {
    render(<Select options={mockOptions} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not open dropdown when disabled', () => {
    render(<Select options={mockOptions} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('uses custom optionRenderer when provided', () => {
    const customRenderer = (option: any) => `Custom: ${option.label}`;
    render(<Select options={mockOptions} optionRenderer={customRenderer} />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Custom: Option 1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Select options={mockOptions} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('rotates arrow icon when dropdown is open', () => {
    render(<Select options={mockOptions} />);
    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');

    expect(svg).not.toHaveClass('rotate-180');

    fireEvent.click(button);
    expect(svg).toHaveClass('rotate-180');
  });
});
