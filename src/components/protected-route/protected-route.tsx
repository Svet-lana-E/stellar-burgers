import { useSelector } from '@store';
import { userSelectors } from '../../services/slices/user';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({
  children,
  isPublic = false
}: ProtectedRouteProps) => {
  const user = useSelector(userSelectors.selectUser);
  const userCheck = useSelector(userSelectors.selectUserCheck);
  const location = useLocation();

  if (!userCheck) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  if (!isPublic && !user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  return children;
};
