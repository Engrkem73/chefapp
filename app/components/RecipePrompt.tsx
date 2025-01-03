import React, { useState, useContext } from 'react'
import { generateRecipe } from './ai'
import { RecipeContext } from '../context/RecipeContext'
import toast, { Toaster } from 'react-hot-toast';


interface Ingredients {
    value: string,
}
const RecipePrompt: React.FC<{ ingredientsList: Ingredients[]}> = ({ingredientsList: value}) => {
    const [isLoading, setIsLoading] = useState(false)
    const  recipeContext = useContext(RecipeContext)
    
    const getRecipe = async () => {
        try{
        setIsLoading(true)
        const generatedRecipe = await generateRecipe(value);
        setIsLoading(false)
        if (!recipeContext) {
            toast("No Recipe Context Available")
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
    }catch (error: unknown) {  // Add the error parameter here
        if (error instanceof Error) {

            toast.error(error.message)  // Use toast.error for error messages
        } else {
            toast.error('An unexpected error occurred')  // Fallback message
        }
        setIsLoading(false)
    }
}
    
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
                {isLoading ? (
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Creating your recipe...</span>
                        </div>
                        ) : (
                        <span>Get recipe</span>
                        )}
            </button>
            <Toaster/>
    </div>
  )
}

export default RecipePrompt