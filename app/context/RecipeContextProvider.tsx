import { Recipe } from "./RecipeContext";
import { useState } from 'react';

const RecipeProvider: React.FC = ({ children }) => {
    const [recipe, setRecipe] = useState<Recipe>(null);
  
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
  