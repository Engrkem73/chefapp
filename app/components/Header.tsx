import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='flex flex-row gap-5 items-center justify-center h-[80px] w-screen bg-gray-300 shadow sticky top-0 left-0'>
      <Image className='text-white w-[40px] h-auto' 
          src='/chefhat.png' 
          alt='chefhat-logo'
          width={40}
          height={40}/>
      <h1 className='text-2xl text-gray-900'>Chef Mistral</h1>
    </header>
  )
}

export default Header