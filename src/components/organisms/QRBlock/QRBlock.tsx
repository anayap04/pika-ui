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

const getExpiredMessage = (expired: QRBlockProps['expired']) =>
  typeof expired === 'string' ? expired : 'This code is no longer active.';

const getLabelText = (isExpired: boolean, caption: string, expiredMessage: string) =>
  isExpired ? expiredMessage : caption;

const renderSmallQR = ({
  accessibleLabel,
  caption,
  expiredMessage,
  isExpired,
  style,
  ...props
}: {
  accessibleLabel: string;
  caption: string;
  expiredMessage: string;
  isExpired: boolean;
  style?: React.CSSProperties;
  props?: React.HTMLAttributes<HTMLElement>;
}) => (
  <figure
    style={{ display: 'flex', alignItems: 'center', gap: spacing.md, margin: 0, ...style }}
    {...props}
  >
    <img
      alt={accessibleLabel}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="${theme.card}"/><path d="M0 0h16v16H0zm16 0h16v16H16zm32 0h16v16H48zM0 16h16v16H0zm16 16h16v16H16zm32-16h16v16H48zm0 16h16v16H48zM0 48h16v16H0zm16 0h16v16H16z" fill="${theme.border}" fill-opacity="0.25"/></svg>`
      )}`}
      style={{
        width: '64px',
        height: '64px',
        flex: '0 0 64px',
        border: `4px solid ${theme.border}`,
        opacity: isExpired ? 0.6 : 1,
        display: 'block',
        backgroundColor: theme.card,
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
      {getLabelText(isExpired, caption, expiredMessage)}
    </figcaption>
  </figure>
);

const renderStandardQR = ({
  accessibleLabel,
  caption,
  destination,
  actionLabel,
  expiredMessage,
  isExpired,
  style,
  url,
  ...props
}: {
  accessibleLabel: string;
  caption: string;
  destination?: string;
  actionLabel: string;
  expiredMessage: string;
  isExpired: boolean;
  style?: React.CSSProperties;
  url: string;
  props?: React.HTMLAttributes<HTMLElement>;
}) => {
  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

        <div style={{ border: `4px solid ${theme.border}`, background: theme.card, padding: '12px' }}>
          <img
            alt={accessibleLabel}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132"><rect width="132" height="132" fill="${theme.card}"/><path d="M0 0h33v33H0zm33 0h33v33H33zm66 0h33v33H99zM0 33h33v33H0zm33 33h33v33H33zm66-33h33v33H99zm0 33h33v33H99zM0 99h33v33H0zm33 0h33v33H33z" fill="${theme.border}" fill-opacity="0.25"/></svg>`
            )}`}
            style={{ width: '132px', height: '132px', opacity: isExpired ? 0.6 : 1, display: 'block' }}
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
  const expiredMessage = getExpiredMessage(expired);
  const accessibleLabel = `QR code to ${destination || caption}`;

  return size === 'sm'
    ? renderSmallQR({
        accessibleLabel,
        caption,
        expiredMessage,
        isExpired,
        style,
        ...props,
      })
    : renderStandardQR({
        accessibleLabel,
        caption,
        destination,
        actionLabel,
        expiredMessage,
        isExpired,
        style,
        url,
        ...props,
      });
};
