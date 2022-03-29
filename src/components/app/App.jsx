import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import cl from './app.module.css'
import { HTML5Backend } from "react-dnd-html5-backend";
import { fetchIngredients } from "../../services/actions/api-thunk";
import { apiIngredientsConfig } from "../../utils/api";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIngredients(apiIngredientsConfig))
  }, [])

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
