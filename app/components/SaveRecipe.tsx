import React, { useState } from 'react'
import { Star } from 'lucide-react';

interface Recipe {
  title: string | undefined,
  content: string | undefined,
}
const SaveRecipe: React.FC<Recipe> = ({title, content}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [id, setId] = useState('')


  async function handleSubmit() {
    if(isFavorite === false){
      setIsFavorite(true)
      const response = await fetch('api/favorites', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      
      if(response.ok){
        setIsFavorite(true)
        const data = await response.json()
        setId(data.id)
      }
      if(!response.ok) {
        setIsFavorite(false)
      }
    }
    if(isFavorite === true) {
      setIsFavorite(false)
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        setIsFavorite(false)
        setId('')
      }
    }
}
  console.log(id)
  return (
    <div>
      <button onClick={() => {handleSubmit()}}><Star  fill={isFavorite ? 'yellow' : 'white' }/></button>
    </div>
  )
}

export default SaveRecipe