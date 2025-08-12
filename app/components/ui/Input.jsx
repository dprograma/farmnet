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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={inputType}
          className={cn(
            'input',
            Icon && 'pl-10',
            isPassword && 'pr-10',
            error && 'input-error',
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
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
            <p className="text-sm text-error">{error}</p>
          ) : (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;