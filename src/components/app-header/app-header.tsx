import { FC } from 'react';
import { AppHeaderUI } from '../../components/ui/app-header';
import { useSelector } from '@store';
import { userSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(userSelectors.selectUser)?.name} />
);
