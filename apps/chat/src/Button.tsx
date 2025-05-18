import { ButtonHTMLAttributes } from 'react'
import { cn } from './utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isBusy?: boolean
}

const Button = ({ children, className, isBusy, disabled, ...props }: ButtonProps) => (
  <button
    type="submit"
    className={cn("bg-primary text-loud-foreground px-5 py-2 rounded font-bold hover:bg-[oklch(from_var(--color-primary)_calc(l_+_0.05)_c_h)] transition-colors hover:cursor-pointer disabled:text-loud-forground/10", className)}
    disabled={isBusy || disabled}
    {...props}
  >
    {isBusy ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="animate-spin opacity-50"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
    ) : children}
  </button>
)

export default Button
