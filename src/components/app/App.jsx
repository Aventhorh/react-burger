import { useEffect, useState } from "react";
import { apiIngredients } from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { ApiIngredientsContext } from "../../services/appContext";
import cl from './app.module.css'


function App() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchIngredients()
  }, [])

  async function fetchIngredients() {
    try {
      const ingredient = await apiIngredients
      setIngredients(ingredient.data.data)
    } catch {
      console.log("Ошибка взаимодействия с сервером")
    }
  }

  return (
    <div className={cl.app}>
      <AppHeader />
      <div className={cl.app__burgerMakingSection} >
        <ApiIngredientsContext.Provider value={ingredients}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ApiIngredientsContext.Provider>
      </div>
    </div>
  );
}

export default App;
