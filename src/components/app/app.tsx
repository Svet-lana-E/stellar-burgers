import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/thunk/ingredientsThunk';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { fetchFeeds } from '../../services/thunk/feedThunk';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(fetchIngredients());
  dispatch(fetchFeeds());
  // const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  // const isLoading = useSelector(ingredientsSelectors.selectIngredientsStatus);

  // const handleRequest = () => {
  // }
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* общие маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        {/* защищенные маршруты */}
        <Route
          path='/login'
          element={
            <ProtectedRoute isProtected>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isProtected>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isProtected>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isProtected>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isProtected>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isProtected>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {/* модалки */}
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={''}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title={''}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        {/* защищенные модалки */}
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute isProtected>
              <Modal
                title={''}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
