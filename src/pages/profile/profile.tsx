import { useDispatch, useSelector } from '@store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { userActions, userSelectors } from '../../services/slices/user';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userData = useSelector(userSelectors.selectUser);
  const dispatch = useDispatch();

  const user = {
    name: userData?.name,
    email: userData?.email
  };

  const [formValue, setFormValue] = useState({
    name: user.name || '',
    email: user.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, []); // изменить на [user] когда const user будет браться из store (чтобы не было бесконечной загрузки)

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userActions.updateUser(formValue))
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
      .catch((err) => console.warn(err));
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
