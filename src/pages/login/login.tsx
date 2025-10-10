import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '@store';
import { userActions } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
//import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(
        userActions.loginUser({
          email,
          password
        })
      )
        .unwrap()
        .catch((error) => {
          setErrorText(error);
          console.warn('LOGIN ERROR', error);
        });
    } else if (!email || !password) {
      setErrorText('Необходимо заполнить данные');
      return;
    }
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
