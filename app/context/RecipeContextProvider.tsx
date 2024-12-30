import { Recipe, RecipeContext } from "./RecipeContext";
import { useState,  PropsWithChildren  } from 'react';


const RecipeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
  
    const updateRecipe = (newRecipe: Recipe) => {
      setRecipe(newRecipe);
    };
  
    return (
      <RecipeContext.Provider value={{ recipe, updateRecipe }}>
        {children}
      </RecipeContext.Provider>
    );
  };
  
  export { RecipeProvider, RecipeContext };
  