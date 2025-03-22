import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, token } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    const verifySession = async () => {
      try {
        if (!isAuthenticated || !token) {
          setIsValid(false);
          setIsVerifying(false);
          return;
        }
        
        // Token está presente e o usuário está autenticado no store
        setIsValid(true);
        setIsVerifying(false);
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setIsValid(false);
        setIsVerifying(false);
      }
    };
    
    verifySession();
  }, [isAuthenticated, token]);
  
  if (isVerifying) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  return isValid ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute; 