import { useEffect,  useState } from "react";
import { apiIngredients } from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import cl from './app.module.css'


function App() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchIngredients()
  }, [])

 async function fetchIngredients(){
   const ingredient = await apiIngredients
   setIngredients(ingredient.data.data)
 }
  
  return (
    <div className={cl.app}>
      <AppHeader />
      <div className={cl.app__burgerMakingSection} >
        <BurgerIngredients ingredientsData={ingredients}/>
        <BurgerConstructor ingredientsData={ingredients}/>
      </div>
    </div>
  );
}

export default App;
