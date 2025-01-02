import React from 'react'
import { auth } from '@/auth'
import { prisma } from "@/prisma";
import SignIn from '../components/Sign-in'
import Link from 'next/link';


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
      <>
        <ul>
          {favorites.map((favorite) => (
              <li key={favorite.id}>
                <div className='bg-slate-300 border'>
                  <Link href={`/Favorites/${favorite.id}`}>
                    {favorite.title}
                  </Link>
                </div>
              </li>
          ))}
        </ul>
      </>
    )
  }
  return (
    <main className='flex flex-col items-center justify-start min-h-screen pt-7 gap-4'>
      <CheckSession/>
    </main>
  )
}

export default page