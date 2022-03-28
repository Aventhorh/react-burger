import { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./burger-ingredients.module.css";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import multiCl from "classnames"
import { useDispatch, useSelector } from "react-redux";

const BurgerIngredients = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state => state.ingredientsBurger.ingredients)
    const [current, setCurrent] = useState('Булки');
    const [modal, setModal] = useState(false);
    const [scroll, setScroll] = useState([0, 0, 0]);
    const [offSet, setOffSet] = useState(0);

    const containerRef = useRef(null)
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);
    const headsRef = useRef(null);

    const details = useSelector(state => state.details.details)

    const openIngredientDetails = (item) => {
        dispatch({ type: "ADD_DETAILS", payload: item })
        setModal(true)
    }

    useEffect(() => {
        if (modal === false) {
            dispatch({ type: "REMOVE_DETAILS", payload: {} })
        }
    }, [modal])

    const renderIngredient = (item) => (
        <li className={cl.ingredients__item} key={item._id} onClick={() => openIngredientDetails(item)} >
            <Ingredient props={item} />
        </li>
    );

    const ingredientsBun = ingredients.filter((ingredient) => {
        return ingredient.type === "bun";
    });
    const ingredientsSauce = ingredients.filter((ingredient) => {
        return ingredient.type === "sauce";
    });
    const ingredientsMain = ingredients.filter((ingredient) => {
        return ingredient.type === "main";
    });

    useEffect(() => {
        setOffSet(Number(containerRef.current?.getBoundingClientRect().y));
        headsRef.current = Array.from(document.querySelectorAll(".ing-type-header"));
        setScroll(headsRef.current.map(
            (item) => item.getBoundingClientRect().y - offSet
        )
        );
    }, [offSet])

    useEffect(() => {
        if (scroll[2] < 1) {
            setCurrent('Начинки');
        } else if (scroll[1] < 1) {
            setCurrent('Соусы');
        } else if (scroll[0] <= 0) {
            setCurrent('Булки');
        }
    }, [scroll]);


    const handleScroll = () => {
        setScroll(
            headsRef.current.map(
                (item) => item.getBoundingClientRect().y - offSet
            )
        );
    };

    return (
        <>
            <Modal visible={modal} setVisible={setModal}>
                {details === undefined ? <></> : <IngredientDetails props={details} />}
            </Modal>

            <section className={cl.ingredients__section}>
                <h1 className={multiCl(cl.title, "text text_type_main-large")}>Соберите бургер</h1>

                <div className={multiCl(cl.ingredient__links, "mb-8")}>
                    <Tab className={cl.ingredient__tab} value="Булки" active={current === 'Булки'} onClick={() => {
                        bunsRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}>Булки</Tab>
                    <Tab className={cl.ingredient__tab} value="Соусы" active={current === 'Соусы'} onClick={() => {
                        saucesRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}>Соусы</Tab>
                    <Tab className={cl.ingredient__tab} value="Начинки" active={current === 'Начинки'} onClick={() => {
                        mainsRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}>Начинки</Tab>
                </div>

                <div onScroll={handleScroll} ref={containerRef} className={cl.ingredients__container}>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={bunsRef}>Булки</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsBun.map(item => renderIngredient(item))}
                    </ul>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={saucesRef}>Соусы</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsSauce.map(item => renderIngredient(item))}
                    </ul>
                    <h2 className="ing-type-header text text_type_main-medium mb-6" ref={mainsRef}>Начинки</h2>
                    <ul className={cl.ingredient__list}>
                        {ingredientsMain.map(item => renderIngredient(item))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default BurgerIngredients;