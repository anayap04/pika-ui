import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { theme, spacing, fontFamilies, fontWeights, letterSpacings } from '../../../tokens';
import { Card } from '../../atoms/Card';
import { Heading, Text } from '../../atoms/Typography';

export type CountdownUnit = 'd' | 'h' | 'm' | 's';

export interface CountdownPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Required. ISO strings are parsed in the visitor's zone. */
  target: Date | string;
  /** Two or three words; it is set in VT323. */
  label?: string;
  /** Drop days on same-day events rather than showing `00`. */
  units?: CountdownUnit[];
  /** The absolute date. Strongly recommended — a relative countdown alone
   *  fails a visitor who arrives late (SC 3.3.2). */
  caption?: string;
  /** Seconds remaining at which the blocks switch to the destructive border. */
  urgentAt?: number;
  /** Fires once, the instant the countdown reaches zero. */
  onExpire?: () => void;
  /** What replaces the blocks at zero. Never leave four zeroes on screen. */
  expiredSlot?: React.ReactNode;
}

const UNIT_LABELS: Record<CountdownUnit, string> = { d: 'Days', h: 'Hrs', m: 'Min', s: 'Sec' };
const UNIT_ORDER: CountdownUnit[] = ['d', 'h', 'm', 's'];
const SECONDS_PER_UNIT: Record<CountdownUnit, number> = { d: 86400, h: 3600, m: 60, s: 1 };
const DEFAULT_UNITS = UNIT_ORDER;

const pad2 = (n: number) => String(Math.max(0, n)).padStart(2, '0');

export const CountdownPanel: React.FC<CountdownPanelProps> = ({
  target,
  label = 'Until kick-off',
  units = DEFAULT_UNITS,
  caption,
  urgentAt = 3600,
  onExpire,
  expiredSlot,
  style,
  ...props
}) => {
  const labelId = useId();
  const targetMs = useMemo(
    () => (target instanceof Date ? target.getTime() : new Date(target).getTime()),
    [target],
  );
  const hasFiredExpireRef = useRef(false);
  const [remainingMs, setRemainingMs] = useState(() => targetMs - Date.now());

  useEffect(() => {
    hasFiredExpireRef.current = false;
    // The interval callback — not the effect body — is where `Date.now()`
    // is read and fed into state; a `target` change resyncs on the next
    // tick rather than needing a second, synchronous setState here.
    const id = setInterval(() => setRemainingMs(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  // An unparsable target is treated as already-expired rather than ever
  // rendering "NaN" in a digit block.
  const expired = !Number.isFinite(remainingMs) || remainingMs <= 0;

  useEffect(() => {
    if (expired && !hasFiredExpireRef.current) {
      hasFiredExpireRef.current = true;
      onExpire?.();
    }
  }, [expired, onExpire]);

  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const orderedUnits = UNIT_ORDER.filter((unit) => units.includes(unit));
  const values: Record<CountdownUnit, number> = { d: 0, h: 0, m: 0, s: 0 };
  let rest = totalSeconds;
  for (const unit of orderedUnits) {
    values[unit] = Math.floor(rest / SECONDS_PER_UNIT[unit]);
    rest -= values[unit] * SECONDS_PER_UNIT[unit];
  }
  const isUrgent = !expired && totalSeconds <= urgentAt;

  return (
    <Card
      variant="elevated"
      role="group"
      aria-labelledby={labelId}
      // Announcing every second is unusable; the panel flips to a single
      // polite announcement only for the expiry handover.
      aria-live={expired ? 'polite' : 'off'}
      aria-atomic="true"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.md,
        textAlign: 'center',
        ...style,
      }}
      {...props}
    >
      <Text id={labelId} variant="subheading" size="lg" color="primary" style={{ letterSpacing: '0.12em' }}>
        {label}
      </Text>

      {expired ? (
        (expiredSlot ?? (
          <Heading level={4} variant="display" color="primary">
            TIME&rsquo;S UP
          </Heading>
        ))
      ) : (
        <>
          <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
            {orderedUnits.map((unit) => (
              <div
                key={unit}
                // Reduced motion clamps every animation/transition duration to
                // 0.01ms globally (base.css) — the blink still exists here, it
                // just stops moving.
                className={unit === 's' ? 'animate-blink' : undefined}
                style={{
                  border: `4px solid ${isUrgent ? theme.destructiveStrong : theme.border}`,
                  background: theme.background,
                  padding: `${spacing.sm} ${spacing.xs}`,
                  minWidth: '74px',
                  textAlign: 'center',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontFamily: fontFamilies.display,
                    fontWeight: fontWeights.normal,
                    fontSize: '20px',
                    lineHeight: 1.4,
                    color: isUrgent ? theme.destructiveStrong : theme.primaryStrong,
                  }}
                >
                  {pad2(values[unit])}
                </strong>
                <span
                  style={{
                    display: 'block',
                    fontFamily: fontFamilies.subheading,
                    fontSize: '17px',
                    letterSpacing: letterSpacings.caps,
                    textTransform: 'uppercase',
                    color: theme.mutedForeground,
                  }}
                >
                  {UNIT_LABELS[unit]}
                </span>
              </div>
            ))}
          </div>
          <div className="animate-pixel-pulse" aria-hidden="true" style={{ display: 'flex', gap: spacing.xs }}>
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  display: 'block',
                  background: i % 2 === 0 ? theme.primaryStrong : theme.secondaryStrong,
                }}
              />
            ))}
          </div>
        </>
      )}

      {caption && (
        <Text variant="body" size="md" color="muted">
          {caption}
        </Text>
      )}
    </Card>
  );
};
