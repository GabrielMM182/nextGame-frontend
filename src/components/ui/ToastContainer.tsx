import { Toast, useToast } from './Toast';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const ToastContainer = () => {
  const { toast, toastProps, open, setOpen } = useToast();
  const { toastMessage } = useAuthStore();

  // Efeito para mostrar o toast quando o estado global de autenticação indicar
  useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        variant: toastMessage.variant || 'success',
        duration: toastMessage.duration || 4000,
      });
    }
  }, [toastMessage, toast]);

  return (
    <Toast
      open={open}
      setOpen={setOpen}
      title={toastProps.title}
      description={toastProps.description}
      variant={toastProps.variant}
      duration={toastProps.duration}
    />
  );
};

export default ToastContainer; 