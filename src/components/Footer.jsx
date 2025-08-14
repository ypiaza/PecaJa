import React from 'react'

import { FiShoppingBag } from "react-icons/fi";

const Footer = ({ totalItens, totalPrecos, setIsActive }) => {
  return (
    <div className='fixed w-full bottom-0 flex items-center justify-between p-3 bg-black'>
      <div>
        <h1 className='font-bold text-[1.1rem] text-white'>Total: <span className='text-yellow-400'>R$ {totalPrecos.toFixed(2).replace('.', ',')}</span></h1>
      </div>
      <div onClick={() => setIsActive(true)} className='flex items-center justify-center gap-1'>
        <FiShoppingBag className='text-white text-[2.5rem]' />
        <span className='text-red-600 bg-yellow-500 w-full flex items-center justify-center font-bold rounded-full'>{totalItens}</span>
      </div>
    </div>
  )
}

export default Footer
