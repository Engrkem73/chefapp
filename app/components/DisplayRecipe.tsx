import React, { useContext }from 'react'
import ReactMarkdown from 'react-markdown';
import { RecipeContext  } from '../context/RecipeContext';
import SaveRecipe from './SaveRecipe';


const DisplayRecipe = () => {
  const  recipeContext = useContext(RecipeContext)

  if (!recipeContext) {
    return ("No Recipe Context available")
  }

  const { recipe } = recipeContext

  const title = recipe?.recipe?.split('\n')[0]
  const content = recipe?.recipe?.split('\n').slice(1).join('\n')

  const HaveRecipe = () => {
  if (recipe) {
    return (
      <div className='flex flex-col gap-4 p-10 bg-slate-100 rounded-xl shadow-2xl'>
        <div className='flex justify-end'>
          <SaveRecipe title={title} content={content}/>
        </div>
        <div className=''>
          <div className="">
            <ReactMarkdown className='text-xl pb-3'>{title}</ReactMarkdown>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }}
  return (
    <HaveRecipe/>
  )
}

export default DisplayRecipe