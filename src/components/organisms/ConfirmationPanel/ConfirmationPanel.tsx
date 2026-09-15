import React, { useEffect, useRef } from 'react';
import { theme, spacing, fontFamilies, fontWeights, letterSpacings } from '../../../tokens';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { Paragraph, Text } from '../../atoms/Typography';

export interface ConfirmationPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Drives the band colour and the ARIA role. */
  status?: 'saved' | 'failed';
  /** Rendered verbatim. Empty falls back to a nameless line. */
  voterName?: string;
  /** The words of the team that was chosen. */
  choiceLabel?: string;
  /** The fill of the team that was chosen. */
  variant?: 'primary' | 'secondary';
  /** One extra sentence — what happens next. Omit for none. */
  nextStepsMessage?: string;
  /** Omit it and the button is not rendered — never a dead button. */
  onReset?: () => void;
  resetLabel?: string;
  /** `status="failed"` only. Omit it and no retry button renders. */
  onRetry?: () => void;
  retryLabel?: string;
  retryMessage?: string;
  bandLabel?: string;
}

const STRONG: Record<'primary' | 'secondary', string> = {
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
};
const FOREGROUND: Record<'primary' | 'secondary', string> = {
  primary: theme.primaryForeground,
  secondary: theme.secondaryForeground,
};

export const ConfirmationPanel: React.FC<ConfirmationPanelProps> = ({
  status = 'saved',
  voterName = '',
  choiceLabel,
  variant = 'primary',
  nextStepsMessage,
  onReset,
  resetLabel = 'VOTE AGAIN',
  onRetry,
  retryLabel = 'RETRY',
  retryMessage = 'The vote did not reach the server. Nothing was lost — try once more.',
  bandLabel,
  style,
  ...props
}) => {
  const headingRef = useRef<HTMLParagraphElement>(null);
  const trimmedName = voterName.trim();
  const failed = status === 'failed';

  // The panel replaces VotePanel in place, so a screen-reader user is told
  // the vote landed (or didn't) without hunting for it.
  useEffect(() => {
    headingRef.current?.focus();
  }, [status]);

  const bandBackground = failed ? theme.destructiveStrong : STRONG[variant];
  const bandForeground = failed ? theme.destructiveForeground : FOREGROUND[variant];

  let resolvedBandLabel = bandLabel ?? 'VOTE SAVED';
  if (failed) {
    resolvedBandLabel = bandLabel ?? 'NOT SAVED';
  }

  let greeting = 'Vote saved';
  if (failed) {
    greeting = resolvedBandLabel;
  } else if (trimmedName) {
    greeting = `Thanks, ${trimmedName}`;
  }

  return (
    <Card
      variant="elevated"
      padding="sm"
      role={failed ? 'alert' : 'status'}
      style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', ...style }}
      {...props}
    >
      <div
        style={{
          background: bandBackground,
          color: bandForeground,
          padding: `${spacing.md} ${spacing.lg}`,
          textAlign: 'center',
        }}
      >
        <Text variant="body" style={{ fontFamily: fontFamilies.display, color: 'inherit' }}>
          {resolvedBandLabel}
        </Text>
      </div>

      <div
        style={{
          padding: spacing.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Text/Heading are plain function components (no ref forwarding), so
            the focus target that must take DOM focus on mount is a native
            element carrying the same subheading styling by hand. */}
        <p
          ref={headingRef}
          tabIndex={-1}
          style={{
            margin: 0,
            fontFamily: fontFamilies.subheading,
            fontWeight: fontWeights.normal,
            fontSize: '26px',
            letterSpacing: letterSpacings.caps,
            textTransform: 'uppercase',
            color: theme.foreground,
            outline: 'none',
          }}
        >
          {greeting}
        </p>

        {failed ? (
          <>
            <Paragraph size="md" color="muted">
              {retryMessage}
            </Paragraph>
            {onRetry && (
              <Button type="button" variant="destructive" size="sm" onClick={onRetry}>
                {retryLabel}
              </Button>
            )}
          </>
        ) : (
          <>
            {choiceLabel && (
              <Paragraph size="lg" style={{ maxWidth: '38ch' }}>
                You picked <strong style={{ color: STRONG[variant] }}>{choiceLabel}</strong>
                {nextStepsMessage ? `. ${nextStepsMessage}` : '.'}
              </Paragraph>
            )}
            {onReset && (
              <Button type="button" variant="secondary" size="sm" onClick={onReset}>
                {resetLabel}
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
};
