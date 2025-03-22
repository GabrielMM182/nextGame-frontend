import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../hooks/useAuthApi';
import { loginSchema, registerSchema, LoginFormValues, RegisterFormValues } from '../validations/authValidations';
import { Toast, useToast } from '../components/ui/Toast';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { useLoginMutation, useRegisterMutation } = useAuthApi();
  const { toast, toastProps, open, setOpen } = useToast();
  
  // Mutations
  const { mutate: login, isPending: isLoggingIn, error: loginError } = useLoginMutation();
  const { mutate: register, isPending: isRegistering, error: registerError } = useRegisterMutation();
  
  // Form para login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Form para registro
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const handleLoginSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: (userData) => {
        // Exibir toast de boas-vindas se o usuário possuir um nome
        if (userData?.user?.name) {
          toast({
            title: `Bem-vindo ${userData.user.name}!`,
            description: 'Login realizado com sucesso',
            variant: 'success',
            duration: 4000,
          });
          
          // Pequeno delay antes do redirecionamento para garantir que o toast seja visualizado
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          // Caso não tenha nome, apenas redireciona
          navigate('/');
        }
      },
    });
  };
  
  const handleRegisterSubmit = (data: RegisterFormValues) => {
    register(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (userData) => {
          // Após o registro, faz login automaticamente
          login(
            { 
              email: registerForm.getValues('email'), 
              password: registerForm.getValues('password') 
            },
            {
              onSuccess: () => {
                // Exibir toast de boas-vindas após o registro
                toast({
                  title: `Bem-vindo ${data.name}!`,
                  description: 'Sua conta foi criada com sucesso',
                  variant: 'success',
                  duration: 4000,
                });
                navigate('/');
              },
            }
          );
        },
      }
    );
  };
  
  const togglePasswordVisibility = (field: 'login' | 'register' | 'confirm') => {
    if (field === 'login') setShowLoginPassword(!showLoginPassword);
    else if (field === 'register') setShowRegisterPassword(!showRegisterPassword);
    else if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          <button
            className={`py-4 text-center font-medium transition-colors duration-300 ${
              isLogin 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-4 text-center font-medium transition-colors duration-300 ${
              !isLogin 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>
        
        <div className="p-8">
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Bem-vindo de volta!
              </h2>
              
              <div className="mb-4">
                <input
                  id="email"
                  type="email"
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="seu@email.com"
                  {...loginForm.register('email')}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6 relative">
                <input
                  id="password"
                  type={showLoginPassword ? "text" : "password"}
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••"
                  {...loginForm.register('password')}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('login')}
                >
                  {showLoginPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              {loginError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  Erro ao fazer login: verifique suas credenciais
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 font-medium transition-colors duration-300 relative"
              >
                {isLoggingIn ? (
                  <>
                    <span className="opacity-0">Entrar</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </>
                ) : 'Entrar'}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-6">
                Ao fazer login, você concorda com nossos <a href="#" className="text-indigo-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>.
              </p>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Crie sua conta
              </h2>
              
              <div className="mb-4">
                <input
                  id="name"
                  type="text"
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Seu nome"
                  {...registerForm.register('name')}
                />
                {registerForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <input
                  id="reg-email"
                  type="email"
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="seu@email.com"
                  {...registerForm.register('email')}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="mb-4 relative">
                <input
                  id="reg-password"
                  type={showRegisterPassword ? "text" : "password"}
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Mínimo 6 caracteres"
                  {...registerForm.register('password')}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('register')}
                >
                  {showRegisterPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6 relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Confirmar senha"
                  {...registerForm.register('confirmPassword')}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              {registerError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  Erro ao criar conta: este email já pode estar em uso
                </div>
              )}
              
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 font-medium transition-colors duration-300 relative"
              >
                {isRegistering ? (
                  <>
                    <span className="opacity-0">Criar conta</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </>
                ) : 'Criar conta'}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-6">
                Ao criar uma conta, você concorda com nossos <a href="#" className="text-indigo-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Toast component */}
      <Toast
        open={open}
        setOpen={setOpen}
        title={toastProps.title}
        description={toastProps.description}
        variant={toastProps.variant}
        duration={toastProps.duration}
      />
    </div>
  );
};

export default AuthPage; 