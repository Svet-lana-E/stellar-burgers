import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '@store';
import { userActions } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (email && password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorText('Необходимо заполнить данные');
      return;
    }
    dispatch(
      userActions.loginUser({
        email,
        password
      })
    )
      .unwrap()
      .catch((err) => {
        setErrorText(err.message);
        console.warn('LOGIN ERROR', err.message);
      });
  };
  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
