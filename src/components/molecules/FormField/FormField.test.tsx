import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders the label and its child control', () => {
    render(
      <FormField label="Email">
        <input aria-label="Email" />
      </FormField>,
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows a required asterisk when required', () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('omits the asterisk when not required', () => {
    render(
      <FormField label="Name">
        <input />
      </FormField>,
    );
    expect(screen.queryByText('*')).toBeNull();
  });

  it('renders a hint when there is no error', () => {
    render(
      <FormField label="Name" hint="As it appears on ID">
        <input />
      </FormField>,
    );
    expect(screen.getByText('As it appears on ID')).toBeInTheDocument();
  });

  it('renders the error and hides the hint when both are set', () => {
    render(
      <FormField label="Name" hint="hidden hint" error="Required field">
        <input />
      </FormField>,
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.queryByText('hidden hint')).toBeNull();
  });

  it('uses the destructive-strong token for error text', () => {
    render(
      <FormField label="Guess the weight" required error="Numbers only, please">
        <input inputMode="numeric" />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveStyle({
      color: 'var(--pk-destructive-strong, #99002a)',
    });
  });

  it('colours the label with the destructive token when in error', () => {
    render(
      <FormField label="Broken" error="bad">
        <input />
      </FormField>,
    );
    const label = screen.getByText('Broken');
    expect(label).toHaveStyle({ color: 'var(--pk-destructive-strong, #99002a)' });
  });

  it('associates the label with the control and wires aria-describedby to the hint', () => {
    render(
      <FormField label="Nickname" hint="Shown next to your vote">
        <input />
      </FormField>,
    );
    const input = screen.getByLabelText('Nickname');
    const hint = screen.getByText('Shown next to your vote');
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('points aria-describedby at the error and marks the control invalid', () => {
    render(
      <FormField label="Weight" error="Numbers only, please">
        <input />
      </FormField>,
    );
    const input = screen.getByLabelText('Weight');
    const error = screen.getByRole('alert');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps an id the caller already set on the control', () => {
    render(
      <FormField label="Email" required>
        <input id="custom-email" />
      </FormField>,
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).toHaveAttribute('id', 'custom-email');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('does not duplicate the label when the child carries its own `label` prop', () => {
    const Checkbox = ({ label, ...props }: { label: string } & Record<string, unknown>) => (
      <span>
        <input type="checkbox" {...props} />
        <label htmlFor={props.id as string}>{label}</label>
      </span>
    );
    const { container } = render(
      <FormField label="Accept Terms" required>
        <Checkbox label="I accept the terms and conditions" />
      </FormField>,
    );
    const labels = container.querySelectorAll('label');
    expect(labels).toHaveLength(1);
    expect(labels[0]).toHaveTextContent('I accept the terms and conditions');
    expect(screen.getByText('Accept Terms').tagName).toBe('SPAN');
  });

  it('merges caller style overrides', () => {
    render(
      <FormField label="X" style={{ maxWidth: '400px' }} data-testid="field">
        <input />
      </FormField>,
    );
    expect(screen.getByTestId('field')).toHaveStyle({ maxWidth: '400px' });
  });
});
