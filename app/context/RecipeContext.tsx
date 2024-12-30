import { createContext } from 'react';

// Define the shape of the recipe state
export interface Recipe {
  recipe:  string | undefined;
}

// Define the context value type
export interface RecipeContextValue {
  recipe: Recipe | null | undefined;
  updateRecipe: (newRecipe: Recipe) => void;
}

// Create the context
export const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

