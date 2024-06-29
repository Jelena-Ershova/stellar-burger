import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectorUserOrders,
  userOrderThunk
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: - DONE взять переменную из стора */

  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorUserOrders);

  useEffect(() => {
    dispatch(userOrderThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
