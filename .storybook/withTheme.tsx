import React, { useEffect } from 'react'
import type { Decorator } from '@storybook/react-vite'

/**
 * Paints the active theme's ground behind every story and flips the
 * `data-theme` attribute on <html> so the `--pk-*` custom properties (and the
 * `::placeholder` / `:focus-visible` rules in src/tokens/base.css) resolve to
 * the right theme. Wired up in preview.tsx.
 */
const ThemeSurface = ({
  theme,
  docs,
  children,
}: {
  theme: 'light' | 'dark'
  docs: boolean
  children: React.ReactNode
}) => {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    return () => root.removeAttribute('data-theme')
  }, [theme])

  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--pk-background)',
        color: 'var(--pk-foreground)',
        fontFamily: "'Nunito', system-ui, sans-serif",
        padding: docs ? 0 : '2rem',
        minHeight: docs ? undefined : '100vh',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}

export const withTheme: Decorator = (Story, context) => (
  <ThemeSurface
    theme={context.globals.theme === 'dark' ? 'dark' : 'light'}
    docs={context.viewMode === 'docs'}
  >
    <Story />
  </ThemeSurface>
)
