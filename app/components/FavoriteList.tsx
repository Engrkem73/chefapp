"use client"
import React, { useState } from 'react'
import { Delete } from 'lucide-react'
import Link from 'next/link';

interface Props{
    id: string;
    title: string;
    content: string;
    isPublic: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Favorites {
    favorites : Props[]
}

const FavoriteList: React.FC<Favorites> = (favorites) => {
    const [favoritesList, setFavoritesList] = useState<Favorites>(favorites) 
    const handleDelete = async (id:string) => {
        const response = await fetch(`/api/favorites/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
            setFavoritesList((prevFavoriteList) => ({
                favorites: prevFavoriteList.favorites.filter(favorite => favorite.id !== id)
        })
        )}
    }
  return (
    <>
        <ul className='flex flex-col gap-4'>
          {favoritesList.favorites.map((favorite) => (
              <li key={favorite.id}>
                <div className='bg-slate-300 border p-4 rounded-lg hover:bg-slate-400 transition-colors flex flex-row justify-between items-center gap-7'>
                  <Link href={`/Favorites/${favorite.id}`}>
                    {favorite.title}
                  </Link>
                  <button onClick={() => handleDelete(favorite.id)}><Delete/></button>
                </div>
              </li>
          ))}
        </ul>
      </>
  )
}

export default FavoriteList