import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useDispatch } from "react-redux";
import { apiIngredients } from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import cl from './app.module.css'
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchIngredients()
  }, [])

  async function fetchIngredients() {
    try {
      const ingredient = await apiIngredients
      dispatch({ type: "SET_INGREDIENTS", payload: ingredient.data.data })
    } catch {
      console.log("Ошибка взаимодействия с сервером")
    }
  }

  return (
    <div className={cl.app}>
      <AppHeader />
      <div className={cl.app__burgerMakingSection} >
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
