'use client';
import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { cn } from '../../lib/utils';

const Input = forwardRef(({
  className,
  type = 'text',
  label,
  error,
  helperText,
  icon: Icon,
  required = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </span>
        )}
        <motion.input
          ref={ref}
          type={inputType}
          className={cn(
            'w-full rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 py-3 text-gray-900 font-medium bg-white placeholder:text-gray-500',
            Icon ? 'pl-11' : 'pl-4',
            'pr-4',
            isPassword && 'pr-12',
            error && 'border-error focus:border-error',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{
            scale: focused ? 1.01 : 1,
          }}
          transition={{ duration: 0.1 }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-neutral-400 hover:text-primary-600 transition-colors" />
            ) : (
              <FiEye className="h-5 w-5 text-neutral-400 hover:text-primary-600 transition-colors" />
            )}
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1"
        >
          {error ? (
            <p className="text-sm text-error font-medium">{error}</p>
          ) : (
            <p className="text-sm text-neutral-500">{helperText}</p>
          )}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;