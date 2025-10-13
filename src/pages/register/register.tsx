import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '@store';
import { registerUser } from '../../services/thunk/userThunk';
import { userActions } from '../../services/slices/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userName && email && password) {
      setErrorText('');
    }
  }, [userName, email, password]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      setErrorText(error);
      return;
    }
    dispatch(
      userActions.registerUser({
        email: email,
        name: userName,
        password: password
      })
    )
      .unwrap()
      .catch((err) => {
        setErrorText(err.message);
        console.warn('REGISTER ERROR', err.message);
      });
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
