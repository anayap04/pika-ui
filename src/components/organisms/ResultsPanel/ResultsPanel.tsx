import React, { useEffect, useRef, useState } from 'react';
import { theme, spacing, letterSpacings, transitions, glyphs } from '../../../tokens';
import { CardSection } from '../../molecules/CardSection';
import { Text } from '../../atoms/Typography';

export interface ResultsTally {
  id: string;
  label: string;
  count: number;
  variant: 'primary' | 'secondary' | 'accent' | 'destructive';
}

export interface ResultsPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Two to four rows. Percentages are derived, never passed in. */
  tallies: ResultsTally[];
  /** Sits in the CardSection header with the total. */
  title?: string;
  /** Below this the leader line is suppressed. */
  minSample?: number;
  /** Empty keeps both tracks visible so the panel does not resize on the first vote. */
  emptyLabel?: string;
  /** Batched polite announcements for realtime updates, at most once every 5s. */
  announce?: boolean;
}

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

const FILL: Record<ResultsTally['variant'], string> = {
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
  accent: theme.accentStrong,
  destructive: theme.destructiveStrong,
};

// Standalone text near (not on) the fill uses the AAA "as page text" twin —
// `accentText`, not `accentForeground` (that one is for text ON the gold fill).
const TEXT: Record<ResultsTally['variant'], string> = {
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
  accent: theme.accentText,
  destructive: theme.destructiveStrong,
};

const ANNOUNCE_INTERVAL_MS = 5000;

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  tallies,
  title = 'Results',
  minSample = 3,
  emptyLabel = 'No votes yet',
  announce = true,
  style,
  ...props
}) => {
  if (import.meta.env?.DEV && (tallies.length < 2 || tallies.length > 4)) {
    console.warn(`ResultsPanel: expects 2 to 4 tallies — got ${tallies.length}.`);
  }

  const total = tallies.reduce((sum, t) => sum + t.count, 0);
  const maxCount = Math.max(0, ...tallies.map((t) => t.count));
  const leaders = tallies.filter((t) => t.count === maxCount);
  const leaderLine =
    total === 0
      ? ''
      : leaders.length > 1
        ? "It's a tie"
        : `${leaders[0].label} leads`;
  const showLeaderLine = total >= minSample && total > 0;

  const [announced, setAnnounced] = useState('');
  const lastAnnouncedAtRef = useRef(0);

  useEffect(() => {
    if (!announce) return;
    const elapsed = Date.now() - lastAnnouncedAtRef.current;
    const commit = () => {
      lastAnnouncedAtRef.current = Date.now();
      setAnnounced(`${total} votes cast`);
    };
    if (elapsed >= ANNOUNCE_INTERVAL_MS) {
      commit();
      return;
    }
    const id = setTimeout(commit, ANNOUNCE_INTERVAL_MS - elapsed);
    return () => clearTimeout(id);
  }, [total, announce]);

  return (
    <CardSection
      variant="elevated"
      style={{ maxWidth: '560px', ...style }}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: spacing.sm, flexWrap: 'wrap' }}>
          <Text variant="subheading" size="lg" style={{ fontSize: '24px' }}>
            {title}
          </Text>
          <Text variant="subheading" size="md" color="muted">
            {total} votes cast
          </Text>
        </div>
      }
      {...props}
    >
      <span style={visuallyHidden} aria-live="polite" aria-atomic="true">
        {announced}
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        {total === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, alignItems: 'center', textAlign: 'center' }}>
            <Text variant="subheading" size="lg" color="muted">
              {emptyLabel}
            </Text>
            {tallies.map((tally) => (
              <div key={tally.id} style={{ width: '100%', height: '20px', border: `4px solid ${theme.border}`, background: theme.background }} />
            ))}
          </div>
        ) : (
          tallies.map((tally) => {
            const pct = Math.round((tally.count / total) * 100);
            return (
              <div key={tally.id} style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm }}>
                  <Text
                    variant="subheading"
                    size="lg"
                    style={{ letterSpacing: letterSpacings.caps, color: TEXT[tally.variant] }}
                  >
                    {glyphs.diamond} {tally.label}
                  </Text>
                  <Text variant="subheading" size="lg" style={{ color: TEXT[tally.variant] }}>
                    {tally.count} &middot; {pct}%
                  </Text>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext={`${tally.count} of ${total} votes`}
                  aria-label={tally.label}
                  style={{ border: `4px solid ${theme.border}`, background: theme.background, height: '28px' }}
                >
                  <div style={{ height: '100%', width: `${pct}%`, background: FILL[tally.variant], transition: transitions.slow }} />
                </div>
              </div>
            );
          })
        )}

        {showLeaderLine && (
          <div style={{ borderTop: `4px dashed ${theme.border}`, paddingTop: spacing.md, textAlign: 'center' }}>
            <Text variant="subheading" size="lg" style={{ letterSpacing: letterSpacings.caps, color: theme.primaryStrong }}>
              {leaderLine}
            </Text>
          </div>
        )}
      </div>
    </CardSection>
  );
};
