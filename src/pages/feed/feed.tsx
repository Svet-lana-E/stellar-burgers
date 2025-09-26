import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedSelectors } from '../../services/slices/feed';
import { fetchFeeds } from '../../services/thunk/feedThunk';
import { getFeedsApi } from '@api';
import { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelectors.selectOrdersList);

  const dispatch = useDispatch();

  // const handleGetFeeds = useCallback(
  //   () => {
  //     dispatch(fetchFeeds()).then((result) => ),
  //   [dispatch]
  // );

  // useEffect(() => {
  //   handleGetFeeds();
  // }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
