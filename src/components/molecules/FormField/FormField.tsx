import { theme, spacing, fontFamilies, fontWeights, letterSpacings, glyphs } from '../../../tokens';
import React, { useId } from 'react';

export interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactElement;
}

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  hint,
  children,
  style,
  ...props
}) => {
  const generatedId = useId();
  const element = React.isValidElement(children)
    ? (children as React.ReactElement<Record<string, unknown>>)
    : null;
  // Respect an id the caller already set on the control; otherwise generate one
  // so the <label>, hint and error can all point at it (SC 1.3.1 / 3.3.2).
  const childProps: Record<string, unknown> = element ? element.props : {};
  const controlId = (childProps.id as string) || generatedId;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;

  const ownDescribedBy = error ? errorId : hint ? hintId : undefined;
  const describedBy =
    [childProps['aria-describedby'], ownDescribedBy].filter(Boolean).join(' ') || undefined;

  const control = element
    ? React.cloneElement(element, {
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : childProps['aria-invalid'],
        'aria-required': required || childProps['aria-required'] ? true : undefined,
      })
    : children;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // 8px label-to-control; the field-to-field 16px is the caller's stack.
        gap: spacing.sm,
        ...style,
      }}
      {...props}
    >
      <label
        htmlFor={controlId}
        style={{
          fontFamily: fontFamilies.subheading,
          fontSize: '14px',
          // VT323 ships a single 400 weight — a bold request here is faux-bold
          // and smears the pixels. Caps + tracking carry the emphasis instead.
          fontWeight: fontWeights.normal,
          textTransform: 'uppercase',
          letterSpacing: letterSpacings.caps,
          color: error ? theme.destructiveStrong : theme.foreground,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs,
        }}
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" style={{ color: theme.destructiveStrong }}>
              {glyphs.required}
            </span>
            <span style={visuallyHidden}>(required)</span>
          </>
        )}
      </label>

      {control}

      {error && (
        <span
          id={errorId}
          role="alert"
          style={{
            // Errors are plain and kind — lower-stakes than the pixel chrome, so
            // they sit in Nunito, not a shouting pixel face.
            fontFamily: fontFamilies.body,
            fontSize: '12px',
            color: theme.destructiveStrong,
            marginTop: '-4px',
          }}
        >
          {error}
        </span>
      )}

      {hint && !error && (
        <span
          id={hintId}
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '12px',
            color: theme.mutedForeground,
            marginTop: '-4px',
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
};
