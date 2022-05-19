import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import cl from "./ingredient.module.css";

const Ingredient = () => {
  const details = useSelector((state) => state.details.details);
  return (
    <div className={cl.container}>
      <IngredientDetails props={details} />
    </div>
  );
};

export default Ingredient;
