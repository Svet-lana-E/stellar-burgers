import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '../../components/ui/burger-constructor';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '@store';
import { orderActions, orderSelectors } from '../../services/slices/order';
import { ordersActions } from '../../services/slices/orders';
import { TNewOrderResponse } from '@api';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/slices/user';
import { feedActions } from '../../services/slices/feed';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const bun = useSelector(burgerConstructorSelectors.selectBurgerBun);
  const ingredients = useSelector(
    burgerConstructorSelectors.selectBurgerIngredients
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelectors.selectUser);

  const constructorItems = {
    bun,
    ingredients
  };
  const orderRequest = useSelector(orderSelectors.selectNewOrderRequest);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = () => {
    if (
      constructorItems.bun &&
      constructorItems.bun._id &&
      constructorItems.ingredients &&
      constructorItems.ingredients.length > 0
    ) {
      if (user) {
        dispatch(orderActions.setNewOrderRequest(true));
        const newOrder = constructorItems.ingredients.map((e) => e._id);
        if (constructorItems.bun && constructorItems.bun._id) {
          newOrder.push(constructorItems.bun._id);
          newOrder.unshift(constructorItems.bun._id);
        }
        dispatch(
          orderActions.placeNewOrder(
            newOrder.filter((item) => typeof item === 'string') as string[]
          )
        )
          .unwrap()
          .then((data) => {
            dispatch(orderActions.setNewOrderRequest(false));
            setOrderModalData(data);
            dispatch(ordersActions.addOrder(data));
            dispatch(burgerConstructorActions.deleteBurger());
            dispatch(orderActions.deleteOrderInfo());
            dispatch(feedActions.fetchFeeds());
          });
      } else {
        navigate('/login');
      }
    }
  };
  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
