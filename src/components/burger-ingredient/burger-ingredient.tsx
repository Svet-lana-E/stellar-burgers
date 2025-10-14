import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '../../components/ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '@store';
import { burgerConstructorActions } from '../../services/slices/burgerConstructor';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      const id = uuidv4();
      dispatch(burgerConstructorActions.addToNewBurger({ ingredient, id }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
