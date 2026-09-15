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

  const ariaInvalid = error ? true : childProps['aria-invalid'];
  const ariaRequired = required || childProps['aria-required'] ? true : undefined;

  // Checkbox/Radio render their own internal <label htmlFor>. If this
  // FormField also renders one for the same id, the control ends up with two
  // conflicting labels (screen readers announce them inconsistently). When
  // the child already self-labels, FormField's caption becomes a plain span
  // instead — still visible, just not a second label for the same control.
  const childSelfLabels = typeof childProps.label === 'string' && childProps.label.trim().length > 0;

  const control = element
    ? React.cloneElement(element, {
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': ariaInvalid,
        'aria-required': ariaRequired,
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
      {(() => {
        const captionStyle: React.CSSProperties = {
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
        };
        const captionContent = (
          <>
            {label}
            {required && (
              <>
                <span aria-hidden="true" style={{ color: theme.destructiveStrong }}>
                  {glyphs.required}
                </span>
                <span style={visuallyHidden}>(required)</span>
              </>
            )}
          </>
        );
        // A self-labeling child (Checkbox/Radio) already owns a <label
        // htmlFor> for controlId — a second one here would give the control
        // two conflicting labels, so the caption becomes a plain span instead.
        return childSelfLabels ? (
          <span style={captionStyle}>{captionContent}</span>
        ) : (
          <label htmlFor={controlId} style={captionStyle}>
            {captionContent}
          </label>
        );
      })()}

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
