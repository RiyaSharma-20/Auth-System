import React, { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { HomePage } from './components/HomePage';
import { useAuth } from './hooks/useAuth';
import { AuthView, User } from './types/auth';

function App() {
  const { authState, register, login, logout, updateUser } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('register');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const success = register(userData);
    if (success) {
      setSuccessMessage('Account created successfully! Please sign in.');
      setCurrentView('login');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      alert('Registration failed. User may already exist.');
    }
  };

  const handleLogin = (email: string, password: string): boolean => {
    return login(email, password);
  };

  const handleLogout = () => {
    logout();
    setCurrentView('login');
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    updateUser(updatedData);
  };

  const switchView = (view: AuthView) => {
    setCurrentView(view);
    setSuccessMessage('');
  };

  // Show home page if authenticated
  if (authState.isAuthenticated && authState.currentUser) {
    return (
      <HomePage 
        user={authState.currentUser} 
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  // Show success message on login page after registration
  const loginFormWithMessage = (
    <div>
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {successMessage}
        </div>
      )}
      <LoginForm onLogin={handleLogin} onSwitchView={switchView} />
    </div>
  );

  // Render based on current view
  switch (currentView) {
    case 'register':
      return <RegistrationForm onRegister={handleRegister} onSwitchView={switchView} />;
    case 'login':
      return loginFormWithMessage;
    case 'forgot-password':
      return <ForgotPasswordForm onSwitchView={switchView} />;
    case 'home':
      return authState.currentUser ? (
        <HomePage 
          user={authState.currentUser} 
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      ) : (
        <LoginForm onLogin={handleLogin} onSwitchView={switchView} />
      );
    default:
      return <RegistrationForm onRegister={handleRegister} onSwitchView={switchView} />;
  }
}

export default App;