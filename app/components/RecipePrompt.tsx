import React, { useState, useContext } from 'react'
import { generateRecipe } from './ai'
import { RecipeContext } from '../context/RecipeContext'


interface Ingredients {
    value: string,
}
const RecipePrompt: React.FC<{ ingredientsList: Ingredients[]}> = ({ingredientsList: value}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const  recipeContext = useContext(RecipeContext)
    
    const getRecipe = async () => {
        try{
        setIsLoading(true)
        const generatedRecipe = await generateRecipe(value);
        setIsLoading(false)
        if (!recipeContext) {
            console.log("No Recipe Context available")
            return ""
        }
        if(!generatedRecipe){
            console.log("No Recipe Available")
            return ""
        }
        const cleanRecipe = generatedRecipe
        .replace(/\n{3,}/g, '\n\n')
        .trim();
        const { updateRecipe } = recipeContext
        updateRecipe({recipe:cleanRecipe})
    }catch {
        setError(error)
    }}
    
    
  return (
    <div className=' text-white flex flex-row items-center justify-between p-5 h-auto bg-blue-600 rounded-2xl min-w-[28rem] max-w-[28rem]'>
            <div className='flex flex-col justify-between gap-3 w-52'>
                <h4 className='text-lg font-bold'>Ready for a recipe?</h4>
                <p>Generate a recipe from your list of ingredients</p>
            </div>
            <button 
                className='rounded bg-purple-700 p-1 pr-6 pl-6 text-center hover:bg-purple-900'
                onClick={getRecipe}
                disabled={isLoading}
            >
                {isLoading ? 'Generating recipe...' : 'Get a recipe'}
            </button>
    </div>
  )
}

export default RecipePrompt