import { forwardRef } from 'react'
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from 'react'
import loadingIconAsset from '../../assets/loading-out-line.svg'
import './Button.css'

export type ButtonColor = 'primary' | 'neutral' | 'success' | 'error'
export type ButtonVariant = 'solid' | 'outline' | 'fill' | 'text'
export type ButtonSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type ButtonState =
  | 'normal'
  | 'hover'
  | 'active'
  | 'disabled'
  | 'loading'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'color'
>

type SharedButtonProps = NativeButtonProps & {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  loadingIcon?: ReactNode
}

type ContentButtonProps = {
  iconOnly?: false
  children: ReactNode
  icon?: never
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type IconButtonProps = {
  iconOnly: true
  icon: ReactNode
  children?: never
  leftIcon?: never
  rightIcon?: never
  'aria-label': string
}

export type ButtonProps = SharedButtonProps &
  (ContentButtonProps | IconButtonProps)

type FigmaIconStyle = CSSProperties & {
  '--figma-icon-source': string
}

export type FigmaIconProps = {
  className?: string
  src: string
}

export function FigmaIcon({ className, src }: FigmaIconProps) {
  const style: FigmaIconStyle = {
    '--figma-icon-source': `url("${src}")`,
  }

  return (
    <span
      aria-hidden="true"
      className={['ds-figma-icon', className].filter(Boolean).join(' ')}
      style={style}
    />
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      'aria-label': ariaLabel,
      children,
      className,
      color = 'primary',
      disabled: nativeDisabled,
      icon,
      iconOnly = false,
      leftIcon,
      loadingIcon,
      rightIcon,
      size = 'xl',
      state = 'normal',
      type = 'button',
      variant = 'solid',
      ...buttonProps
    },
    ref,
  ) {
    const resolvedState: ButtonState =
      state === 'loading'
        ? 'loading'
        : nativeDisabled || state === 'disabled'
          ? 'disabled'
          : state
    const isLoading = resolvedState === 'loading'
    const isDisabled = resolvedState === 'disabled' || isLoading
    const spinner = loadingIcon ?? <FigmaIcon src={loadingIconAsset} />

    return (
      <button
        {...buttonProps}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel}
        className={['ds-button', className].filter(Boolean).join(' ')}
        data-color={color}
        data-icon-only={iconOnly}
        data-size={size}
        data-state={resolvedState}
        data-variant={variant}
        disabled={isDisabled}
        ref={ref}
        type={type}
      >
        {isLoading ? (
          <>
            <span className="ds-button__icon ds-button__loading-icon">
              {spinner}
            </span>
            {!iconOnly && <span className="ds-button__label">{children}</span>}
          </>
        ) : iconOnly ? (
          <span className="ds-button__icon">{icon}</span>
        ) : (
          <>
            {leftIcon && <span className="ds-button__icon">{leftIcon}</span>}
            <span className="ds-button__label">{children}</span>
            {rightIcon && <span className="ds-button__icon">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  },
)
