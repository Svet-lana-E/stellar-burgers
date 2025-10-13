import { useDispatch, useSelector } from '@store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { userActions, userSelectors } from '../../services/slices/user';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userData = useSelector(userSelectors.selectUser);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const user = userData
    ? {
        name: userData.name,
        email: userData.email
      }
    : { name: '', email: '' };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setError(''), [user.email, user.name];
  });

  useEffect(() => {
    if (userData) {
      setFormValue((prevState) => ({
        ...prevState,
        name: userData.name,
        email: userData.email
      }));
    }
  }, [userData]);

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedData: { name: string; email: string; password?: string } =
      Object.assign({}, user);
    updatedData.password = '';

    if (formValue.name !== user.name && formValue.name) {
      updatedData.name = formValue.name;
    }

    if (formValue.email !== user.email && formValue.email) {
      updatedData.email = formValue.email;
    }

    if (formValue.password) {
      updatedData.password = formValue.password;
    }

    dispatch(userActions.updateUser(updatedData))
      .unwrap()
      .then((data) => {
        if (data && data.email && data.name) {
          setFormValue({
            name: data.name,
            email: data.email,
            password: ''
          });
        }
      })
      .catch((err) => {
        setError(err.message);
        console.warn('USER UPGRADE ERROR', err.message);
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user.name && user.email) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
