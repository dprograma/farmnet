'use client';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  success: 'bg-success text-white hover:bg-success/90 focus:ring-success',
  warning: 'bg-warning text-white hover:bg-warning/90 focus:ring-warning',
  error: 'bg-error text-white hover:bg-error/90 focus:ring-error'
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

const Button = forwardRef(({ 
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  ...props 
}, ref) => {
  const baseClasses = 'btn';
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;
  const sizeClasses = sizeVariants[size] || sizeVariants.md;
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {loading && (
        <div className="spinner mr-2" />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;