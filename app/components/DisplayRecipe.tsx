import React, { useContext }from 'react'
import ReactMarkdown from 'react-markdown';
import { RecipeContext  } from '../context/RecipeContext';


const DisplayRecipe = () => {
  const  recipeContext = useContext(RecipeContext)

  if (!recipeContext) {
    return ("No Recipe Context available")
  }

  const { recipe } = recipeContext
  console.log("form display", recipe?.recipe)
  return (
    <div>
         <div className="">
            <ReactMarkdown>{recipe?.recipe}</ReactMarkdown>
        </div>
    </div>
  )
}

export default DisplayRecipe