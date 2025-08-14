import React from 'react'

const Header = () => {
  return (
    <div className='fixed w-full top-0 flex items-center justify-center p-4 bg-black'>
      <div>
        <h1 className='font-bold text-[1.1rem] text-white'>Peça<span className='text-yellow-400'>Já</span></h1>
      </div>
    </div>
  )
}

export default Header
