import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectorBurgerCostructor
} from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  orderBurgerThunk,
  selectorOrder,
  selectorOrderRequest
} from '../../services/slices/orderSlice';
import { selectorUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: - DONE взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectorBurgerCostructor);
  const orderRequest = useSelector(selectorOrderRequest);
  const orderModalData = useSelector(selectorOrder);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurgerThunk(newOrder));
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
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
