"use client"
import React, { useState, FormEvent } from 'react'
import RecipePrompt from './RecipePrompt'
import EnterMore from './EnterMore'
import DisplayRecipe from './DisplayRecipe'
import { RecipeProvider } from '../context/RecipeContextProvider'
interface Ingredients {
    value: string,
}



const Form = () => {
    const [ingredientsList, setIngredientsList] = useState<Ingredients[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
        setIngredientsList([...ingredientsList, {value: inputValue.trim()}]);
        setInputValue("");
    }}

    const handleDelete = (index: number) => {
        const newList = ingredientsList.filter((_, i) => i !== index);
        setIngredientsList(newList);
    }

    const clearAll = () => {
        setIngredientsList([]);
    }

    const ingredientsLength: number = ingredientsList.length

  return (
    <main className='flex flex-col justify-start items-center pt-5'>
        <div className='flex flex-col justify-start items-center'>
            <div className='min-w-9/12 max-w-9/12'>
                <div>
                    <form className='flex flex-row items-center gap-5' 
                        onSubmit={handleSubmit}>
                        <input className='border border-zinc-400 border-solid h-9 w-[300px] m-3 p-3 rounded'
                            placeholder='e.g. beef'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}/>
                        <button className='bg-blue-600 text-white p-1 m-1 pl-4 pr-4 mr-1 ml-1 rounded hover:bg-blue-700'>
                            + Add ingredients
                        </button>
                    </form>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-2xl p-2 m-2'>{ingredientsLength > 0 ? "Your ingredients on hand:" : null}</h1>
                    {ingredientsLength > 0 ? <button className='text-gray-500 text-sm underline decoration-solid hover:text-red-300'
                                                    onClick={clearAll}>Clear all</button> : null}
                </div>
                <div className='pt-5 pl-5 pr-3'>
                    <ul className='self-start p-2 m-2'>
                        {ingredientsList.map((ingredient: Ingredients, index: number) => (
                            <li className='list-disc' key={index}>
                                <div className='flex flex-row items-center justify-between'>
                                {ingredient.value}
                                <button 
                                    onClick={() => handleDelete(index)}
                                    className='border border-solid border-black pr-2 pl-2 rounded'>x</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> 
            <div>
            <RecipeProvider>
                <div className='pt-24 flex flex-col justify-start items-center'>
                    {ingredientsList.length > 3 ? 
                    <RecipePrompt ingredientsList={ingredientsList}/>
                    : <EnterMore ingredientsLength={ingredientsLength}/>}
                </div>
                <div className='pt-7 p-2 m-2 sm:w-[1000px] w-screen'>
                    <DisplayRecipe/>
                </div>
                </RecipeProvider>
            </div>
        </div>
    </main>
  )
}

export default Form