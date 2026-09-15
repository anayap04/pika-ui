import React from 'react';
import { theme, spacing, fontFamilies, letterSpacings } from '../../../tokens';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Typography';

export interface QRBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Required. Drives both the code and the fallback Button. */
  url: string;
  /** The question above the code. It is the block's accessible name. */
  caption?: string;
  /** The plain-language destination, shown below the code. */
  destination?: string;
  /** 64px and 132px — both whole multiples of the module grid. */
  size?: 'sm' | 'md';
  actionLabel?: string;
  /** Dims the code, removes the action, shows the message instead. */
  expired?: boolean | string;
}

// NOTE: this is the documented placeholder pattern, not a scannable code —
// a real code needs `qrcode.react` (or equivalent), which would be this
// library's first runtime dependency. Flagged for the maintainer, not
// silently added here.
const patternStyle = (moduleSize: number): React.CSSProperties => ({
  backgroundColor: theme.card,
  backgroundImage: `conic-gradient(${theme.border} 0 25%, transparent 0 50%, ${theme.border} 0 75%, transparent 0)`,
  backgroundSize: `${moduleSize}px ${moduleSize}px`,
});

export const QRBlock: React.FC<QRBlockProps> = ({
  url,
  caption = 'Scan to continue',
  destination,
  size = 'md',
  actionLabel = 'OPEN LINK',
  expired = false,
  style,
  ...props
}) => {
  const isExpired = Boolean(expired);
  const expiredMessage = typeof expired === 'string' ? expired : 'This code is no longer active.';
  const accessibleLabel = `QR code to ${destination || caption}`;

  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (size === 'sm') {
    return (
      <figure
        style={{ display: 'flex', alignItems: 'center', gap: spacing.md, margin: 0, ...style }}
        {...props}
      >
        <div
          role="img"
          aria-label={accessibleLabel}
          style={{
            ...patternStyle(16),
            width: '64px',
            height: '64px',
            flex: '0 0 64px',
            border: `4px solid ${theme.border}`,
            opacity: isExpired ? 0.6 : 1,
          }}
        />
        <figcaption
          style={{
            fontFamily: isExpired ? fontFamilies.body : fontFamilies.subheading,
            fontSize: isExpired ? '15px' : '19px',
            lineHeight: 1.3,
            letterSpacing: isExpired ? undefined : letterSpacings.caps,
            textTransform: isExpired ? 'none' : 'uppercase',
            color: isExpired ? theme.destructiveStrong : theme.primaryStrong,
          }}
        >
          {isExpired ? expiredMessage : caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <Card variant="elevated" padding="lg" style={{ maxWidth: '340px', ...style }}>
      <figure
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.md,
          textAlign: 'center',
        }}
        {...props}
      >
        <figcaption
          style={{
            fontFamily: fontFamilies.subheading,
            fontSize: '21px',
            letterSpacing: letterSpacings.caps,
            textTransform: 'uppercase',
            color: theme.primaryStrong,
          }}
        >
          {caption}
        </figcaption>

        {/* Quiet zone: a 12px border of the code's own background, required
            for reliable scanning — never tinted or shrunk. */}
        <div style={{ border: `4px solid ${theme.border}`, background: theme.card, padding: '12px' }}>
          <div
            role="img"
            aria-label={accessibleLabel}
            style={{ ...patternStyle(22), width: '132px', height: '132px', opacity: isExpired ? 0.6 : 1 }}
          />
        </div>

        {isExpired ? (
          <Text variant="body" size="md" color="destructive">
            {expiredMessage}
          </Text>
        ) : (
          <>
            {destination && (
              <Text variant="body" size="md" color="muted">
                {destination}
              </Text>
            )}
            <Button type="button" variant="primary" size="sm" onClick={handleOpen}>
              {actionLabel}
            </Button>
          </>
        )}
      </figure>
    </Card>
  );
};
