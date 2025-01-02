import React from 'react'
import { auth } from '@/auth'
import { prisma } from "@/prisma";
import SignIn from '../components/Sign-in'
import FavoriteList from '../components/FavoriteList';



const page = async () => {
  const session = await auth()

  async function CheckSession() {
    if(!session) {
      return (
        <div>
          <p>Please sign in to see you favorites</p>
          <SignIn/>
        </div>
      )
    }
    const favorites = await prisma.favorites.findMany({
      where: {
        userId: session?.user?.id,
      }
    })
  
    return (
      <FavoriteList favorites={favorites}/>
    )
  }
  return (
    <main className='flex flex-col items-center justify-start pt-7'>
      <CheckSession/>
    </main>
  )
}

export default page;