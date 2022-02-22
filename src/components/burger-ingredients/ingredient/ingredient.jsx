import cl from "./ingredient.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const Ingredient = (props) => {

    return (
        <a key={props._id} className={cl.link}>
            <div className={cl.burgerIngredient}>
                {props._id > 0 && (<Counter count={props._id} />)}
                <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
                <p className={cl.ingredientCost}>
                    <span className="text text_type_digits-default mr-2">{props.price}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className={(cl.ingredientTitle, "text text_type_main-default")}>
                    {props.name}
                </h3>
            </div>
        </a>
    );
};

export default Ingredient;