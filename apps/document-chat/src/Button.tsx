import { ButtonHTMLAttributes } from 'react'
import { cn } from './utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    type="submit"
    className={cn("bg-primary text-loud-foreground px-5 py-2 rounded font-bold hover:bg-[oklch(from_var(--color-primary)_calc(l_+_0.05)_c_h)] transition-colors hover:cursor-pointer", className)}
    {...props}
  >
    {children}
  </button>

)

export default Button
