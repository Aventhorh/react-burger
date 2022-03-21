import cl from "./ingredient.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

const Ingredient = ({ props }) => {

    return (
        <a>
            <div className={cl.burger__ingredient}>
                {props._id > 0 && (<Counter count={props._id} />)}
                <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
                <p>
                    <span className="text text_type_digits-default mr-2">{props.price}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className={"text text_type_main-default"}>
                    {props.name}
                </h3>
            </div>
        </a>
    );
};
Ingredient.propTypes = {
    props: ingredientType.isRequired
}

export default Ingredient;