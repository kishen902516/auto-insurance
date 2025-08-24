import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders label when provided', () => {
    render(<TextField label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<TextField label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays help text when provided', () => {
    render(<TextField helpText="This is help text" />);
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('displays error message when error is provided', () => {
    render(<TextField error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<TextField error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<TextField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is present', () => {
    render(<TextField error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error message with input via aria-describedby', () => {
    render(<TextField name="test" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-error');
  });
});