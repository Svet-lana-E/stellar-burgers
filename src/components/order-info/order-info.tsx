import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../../components/ui/preloader';
import { OrderInfoUI } from '../../components/ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { feedActions, feedSelectors } from '../../services/slices/feed';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { ordersSelectors, ordersActions } from '../../services/slices/orders';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const dispatch = useDispatch();
  const feedData = useSelector(feedSelectors.selectOrdersList);
  const ordersData = useSelector(ordersSelectors.selectOrders);
  const ingredientsData = useSelector(ingredientsSelectors.selectIngredients);

  useEffect(() => {
    dispatch(ordersActions.getOrders());
  }, [dispatch]);

  const orderData =
    feedData.find((element) => element.number.toString() === number) ||
    ordersData.find((element) => element.number.toString() === number);

  const ingredients: TIngredient[] = orderData
    ? ingredientsData.filter((item) =>
        orderData?.ingredients.includes(item._id)
      )
    : [];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
