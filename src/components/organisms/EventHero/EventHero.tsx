import React from 'react';
import { theme, spacing, fontFamilies, fontWeights, letterSpacings, shadows, glyphs, decorativeTints } from '../../../tokens';
import { Badge } from '../../atoms/Badge';
import { Heading, Paragraph, Text } from '../../atoms/Typography';

export interface EventHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Required. Renders as the page `h1`. `\n` breaks the line by hand — the display face is wide. */
  title: string;
  /** The ◆ diamonds are added by the component, not the caller. */
  kicker?: string;
  /** One sentence. It wraps; it is never truncated. */
  tagline?: string;
  /** Renders the accent Badge. Omit to hide it. */
  level?: string | number;
  /** Facts, not navigation. Anything past the fourth warns in dev. */
  tags?: string[];
  /** Two grounds only. No image, no gradient. */
  ground?: 'pink' | 'paper';
  /** Right-hand slot; in production it holds QRBlock. */
  aside?: React.ReactNode;
}

const MAX_TAGS = 4;

export const EventHero: React.FC<EventHeroProps> = ({
  title,
  kicker,
  tagline,
  level,
  tags = [],
  ground = 'pink',
  aside,
  style,
  ...props
}) => {
  if (import.meta.env?.DEV && tags.length > MAX_TAGS) {
    console.warn(`EventHero: renders at most ${MAX_TAGS} tags — received ${tags.length}, extras are dropped.`);
  }
  const visibleTags = tags.slice(0, MAX_TAGS);
  const titleLines = title.split('\n');

  return (
    <header
      style={{
        background: ground === 'pink' ? decorativeTints.pixelPink : theme.background,
        border: `4px solid ${theme.border}`,
        boxShadow: shadows.pixelElevated,
        padding: `${spacing.xl} ${spacing.lg}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: spacing.lg,
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.sm,
          textAlign: 'center',
          flex: '1 1 320px',
          minWidth: 0,
        }}
      >
        {level != null && (
          <Badge variant="accent" size="md">
            LEVEL {level}
          </Badge>
        )}
        {kicker && (
          <Text variant="subheading" size="lg" color="primary" style={{ letterSpacing: '0.2em' }}>
            {glyphs.diamond} {kicker} {glyphs.diamond}
          </Text>
        )}
        <Heading
          level={1}
          style={{
            // Neither Heading's colour enum nor a `*-strong` token clears AAA
            // body-text contrast reliably against the decorative pink ground —
            // `border` (pure black / neon gold at night) does, with margin.
            color: theme.border,
            textShadow: `4px 4px 0 ${theme.primary}`,
          }}
        >
          {titleLines.map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </Heading>
        {tagline && (
          <Paragraph weight="medium" style={{ maxWidth: '36ch', color: theme.border }}>
            {tagline}
          </Paragraph>
        )}
        {visibleTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' }}>
            {visibleTags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: fontFamilies.subheading,
                  fontWeight: fontWeights.normal,
                  textTransform: 'uppercase',
                  letterSpacing: letterSpacings.caps,
                  background: theme.background,
                  border: `2px solid ${theme.border}`,
                  padding: `${spacing.xs} ${spacing.md}`,
                  fontSize: '16px',
                  color: theme.border,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {aside && <div style={{ flex: '0 0 auto' }}>{aside}</div>}
    </header>
  );
};
