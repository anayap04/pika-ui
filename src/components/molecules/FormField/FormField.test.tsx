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

  it('colours the label with the destructive token when in error', () => {
    render(
      <FormField label="Broken" error="bad">
        <input />
      </FormField>,
    );
    const label = screen.getByText('Broken');
    expect(label).toHaveStyle({ color: 'var(--pk-destructive-strong, #99002a)' });
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
