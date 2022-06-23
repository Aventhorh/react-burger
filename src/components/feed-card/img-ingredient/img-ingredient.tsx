import cl from "./img-ingredient.module.css";

interface IIngredientImage {
  src: string;
  style?: React.CSSProperties;
}

const ImgIngredient = ({ src, style }: IIngredientImage) => {
  return (
    <div style={style} className={cl.ingredient}>
      <img className={cl.ingredientImage} src={src} alt="ингредиент" />
    </div>
  );
};

export default ImgIngredient;
