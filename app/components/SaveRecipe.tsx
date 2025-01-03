'use client'

import React, { useState } from 'react'
import { Star } from 'lucide-react';
import { useSession } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';



interface Recipe {
  title: string | undefined,
  content: string | undefined,
}

const SaveRecipe: React.FC<Recipe> = ({title, content}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [id, setId] = useState('')
  const { data: session } = useSession()



  async function handleSubmit() {
    if(!session){
      toast("Please log in to save favorites")
      return;
    }

    try{
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
        toast("Recipe added to favorites")
      }
      if(!response.ok) {
        setIsFavorite(false)
        toast("Unable to save recipe. Please try again")
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
        toast("Removed from favorites")
      }
    }}
      catch (error: unknown) {  
        if (error instanceof Error) {
            toast.error(error.message)
        } else {
            toast.error('An unexpected error occurred')
        }
    }
}

  return (
      <div>
        <button onClick={() => {handleSubmit()}} title={isFavorite? "Remove from favorites" : "Save to favorites"}><Star  fill={isFavorite ? 'yellow' : 'white'}/></button>
        <Toaster/>
      </div>
  )
}

export default SaveRecipe