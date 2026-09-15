import React, { useId, useState } from 'react';
import { theme, spacing, fontFamilies, fontWeights, glyphs } from '../../../tokens';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Heading } from '../../atoms/Typography';
import { ButtonGroup } from '../../molecules/ButtonGroup';
import { FormField } from '../../molecules/FormField';

export interface VotePanelOption {
  id: string;
  label: string;
  variant: 'primary' | 'secondary';
}

export interface VotePanelProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onChange' | 'title'> {
  /** Exactly two. Three or more belongs to a `RadioGroup`, not this. */
  options: VotePanelOption[];
  /** Controlled name value. Uncontrolled (internal state) when omitted. */
  name?: string;
  /** Trimmed before it reaches `onVote`. */
  onNameChange?: (value: string) => void;
  /** Required. Fires on the half, not on a separate submit. */
  onVote: (id: string, name: string) => void;
  /** When true the halves are disabled until the field has content. */
  requireName?: boolean;
  /** Replaces the hint, in destructive-strong. Never an `alert()`. */
  error?: string;
  /** Locks both halves while the write is in flight; label switches to SAVING. */
  pending?: boolean;
  /** The panel's accessible name — also its visible title. */
  title?: string;
}

export const VotePanel: React.FC<VotePanelProps> = ({
  options,
  name,
  onNameChange,
  onVote,
  requireName = true,
  error,
  pending = false,
  title = 'Cast your vote',
  style,
  ...props
}) => {
  const titleId = useId();
  const [internalName, setInternalName] = useState('');
  const currentName = name ?? internalName;
  const trimmedName = currentName.trim();

  if (import.meta.env?.DEV && options.length !== 2) {
    console.warn(
      `VotePanel: expects exactly 2 options — got ${options.length}. Three or more belongs to RadioGroup, not this.`,
    );
  }

  const handleNameChange = (value: string) => {
    if (name === undefined) setInternalName(value);
    onNameChange?.(value);
  };

  const locked = pending || (requireName && trimmedName.length === 0);

  const hint = pending
    ? 'Locked while your vote saves.'
    : requireName && trimmedName.length === 0
      ? 'Enter your name to unlock both halves.'
      : 'One tap casts the vote. There is no separate submit.';

  return (
    <Card variant="elevated" padding="lg" style={{ maxWidth: '520px', ...style }}>
      <form
        aria-labelledby={titleId}
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}
        {...props}
      >
        <Heading id={titleId} level={3}>
          {title}
        </Heading>

        <FormField
          label="Your name"
          required={requireName}
          error={error}
          hint={error ? undefined : 'Shown next to your vote'}
        >
          <Input
            value={currentName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Type here..."
            style={{ width: '100%' }}
          />
        </FormField>

        <ButtonGroup orientation="horizontal" style={{ gap: 0, flexWrap: 'wrap' }}>
          {options.map((option, index) => (
            <Button
              key={option.id}
              type="button"
              variant={option.variant}
              disabled={locked}
              onClick={() => onVote(option.id, trimmedName)}
              aria-label={pending ? `Saving vote for ${option.label}` : undefined}
              style={{
                flex: '1 1 180px',
                minHeight: '112px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                // The gradient-translation seam: the two halves share one 4px
                // line (2px contributed by each side) instead of a gap.
                borderRightWidth: index === 0 ? '2px' : undefined,
                borderLeftWidth: index === options.length - 1 ? '2px' : undefined,
              }}
            >
              <span
                aria-hidden="true"
                style={{ fontFamily: fontFamilies.subheading, fontSize: '34px', lineHeight: 1 }}
              >
                {glyphs.diamond}
              </span>
              {pending ? 'SAVING' : option.label}
            </Button>
          ))}
        </ButtonGroup>

        {!error && (
          <span
            style={{
              fontFamily: fontFamilies.body,
              fontWeight: fontWeights.normal,
              fontSize: '15px',
              lineHeight: 1.6,
              color: theme.mutedForeground,
            }}
          >
            {hint}
          </span>
        )}
      </form>
    </Card>
  );
};
