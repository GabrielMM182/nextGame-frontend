import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-full max-w-xs z-50" />
    </ToastPrimitive.Provider>
  );
};

export const Toast: React.FC<ToastProps> = ({
  open,
  setOpen,
  title,
  description,
  variant = 'success',
  duration = 4000,
}) => {
  const variantStyles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
  };

  const titleStyles = {
    success: 'text-green-800 dark:text-green-300',
    error: 'text-red-800 dark:text-red-300',
    warning: 'text-yellow-800 dark:text-yellow-300',
    info: 'text-blue-800 dark:text-blue-300',
  };

  const descriptionStyles = {
    success: 'text-green-700 dark:text-green-200',
    error: 'text-red-700 dark:text-red-200',
    warning: 'text-yellow-700 dark:text-yellow-200',
    info: 'text-blue-700 dark:text-blue-200',
  };

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      duration={duration}
      className={`rounded-lg shadow-lg p-4 border ${variantStyles[variant]} animate-slide-in`}
    >
      {title && (
        <ToastPrimitive.Title className={`font-medium text-sm ${titleStyles[variant]}`}>
          {title}
        </ToastPrimitive.Title>
      )}
      {description && (
        <ToastPrimitive.Description className={`mt-1 text-sm ${descriptionStyles[variant]}`}>
          {description}
        </ToastPrimitive.Description>
      )}
      <ToastPrimitive.Close className="absolute top-2 right-2 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
          />
        </svg>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

export const useToast = () => {
  const [open, setOpen] = React.useState(false);
  const [toastProps, setToastProps] = React.useState<Omit<ToastProps, 'open' | 'setOpen'>>({
    title: '',
    description: '',
    variant: 'success',
    duration: 4000,
  });

  const toast = React.useCallback(
    (props: Omit<ToastProps, 'open' | 'setOpen'>) => {
      setToastProps(props);
      setOpen(true);
    },
    []
  );

  return {
    toast,
    toastProps,
    open,
    setOpen,
  };
}; 