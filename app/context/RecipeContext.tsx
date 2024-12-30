import { createContext, useContext } from 'react';

// Define the shape of the recipe state
export interface Recipe {
  recipe:  string | null | undefined;
}

// Define the context value type
interface RecipeContextValue {
  recipe: Recipe;
  updateRecipe: (newRecipe: Recipe) => void;
}

// Create the context
const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);


export const useRecipe = () => {
    const context = useContext(RecipeContext);
    if (!context) {
      throw new Error('useRecipe must be used within a RecipeProvider');
    }
    return context;
  };
  