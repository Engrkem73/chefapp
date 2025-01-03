import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-[100px] bg-gray-300 shadow ">
            <p className="text-sm text-gray-500">
                © 2024 MyNotebook. All rights reserved.
            </p>
            <p>
                Created by <span className="font-bold">Engrkem73</span>
            </p>
            <p>
                Email: <span className="font-bold"><a href="mailto:kjbb73@gmail.com">kjbb73@gmail.com</a></span>
            </p>
        </footer>
    );
}

export default Footer