import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { feedThunk, selectorFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: - DONE взять переменную из стора - DONE */
  const orders: TOrder[] = useSelector(selectorFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(feedThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
