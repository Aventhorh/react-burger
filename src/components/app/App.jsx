import React from 'react';
import { ingredients } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import cl from './app.module.css'

function App() {
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
