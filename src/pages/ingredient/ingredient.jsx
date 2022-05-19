import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import cl from "./ingredient.module.css";

const Ingredient = () => {
  return (
    <div className={cl.container}>
      <IngredientDetails />
    </div>
  );
};

export default Ingredient;
