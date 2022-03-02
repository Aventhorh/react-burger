import cl from "./ingredient.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';


const Ingredient = (props) => {

    return (
        <a className={cl.link}>
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

Ingredient.propTypes = {
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
}; 

export default Ingredient;