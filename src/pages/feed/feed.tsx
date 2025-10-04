import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { feedSelectors } from '../../services/slices/feed';
import { fetchFeeds } from '../../services/thunk/feedThunk';
import { getFeedsApi } from '@api';
import { useDispatch, useSelector } from '@store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelectors.selectOrdersList);

  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), [dispatch]);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
