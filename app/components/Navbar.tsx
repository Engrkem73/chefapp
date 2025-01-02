import React from 'react'
import SignIn from './Sign-in'
import SignOut from './Sign-out'
import { auth } from '@/auth'
import Link from 'next/link'

const Navbar = async () => {
  const session = await auth()

  
  return (
    <nav className='flex flex-row items-center justify-between bg-gray-200 sticky top-[80px] left-0'>
      <div >
        <ul className='flex flex-row gap-4 pl-7 text-black'>
          <Link href='/'><li>Home</li></Link>
          <Link href='Favorites'><li>Favorites</li></Link>
          <Link href='About'><li>About</li></Link>
        </ul>
      </div>
      <div className='flex flex-row justify-end items-center pr-5'>
        {session ? <SignOut/> : <SignIn/>}
      </div>
    </nav>
  )
}

export default Navbar