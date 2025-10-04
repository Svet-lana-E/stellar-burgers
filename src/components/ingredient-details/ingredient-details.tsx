import { FC } from 'react';
import { Preloader } from '../../components/ui/preloader';
import { IngredientDetailsUI } from '../../components/ui/ingredient-details';
import { useSelector } from '@store';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredientData = useSelector(
    ingredientsSelectors.selectIngredients
  ).find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
