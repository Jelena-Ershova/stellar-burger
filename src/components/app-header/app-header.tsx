import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectorUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectorUser)?.name;
  return <AppHeaderUI userName={userName} />;
};
