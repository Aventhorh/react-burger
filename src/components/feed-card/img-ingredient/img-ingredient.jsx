import cl from "./img-ingredient.module.css";

const ImgIngredient = ({ src, style }) => {
  return (
    <div style={style} className={cl.ingredient}>
      <img className={cl.ingredientImage} src={src} alt="ингредиент" />
    </div>
  );
};

export default ImgIngredient;
