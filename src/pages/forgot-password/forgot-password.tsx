import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setError('');
    }
  }, [email]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Необходимо заполнить email');
      return;
    }
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password');
      })
      .catch((err) => {
        setError(err.message);
        console.warn('PASSWORD SENDING ERROR', err.message);
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
