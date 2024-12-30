import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';


const DisplayRecipe = () => {
    
  return (
    <div>
         <div className="recipe-content">
            <ReactMarkdown>{cleanRecipe}</ReactMarkdown>
        </div>
    </div>
  )
}

export default DisplayRecipe