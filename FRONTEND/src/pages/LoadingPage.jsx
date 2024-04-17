import React from 'react'

export const LoadingPage = () => {
  return (
    <div className='flex items-center flex-col text-cust-white font-[arial]'>
        <div className="loader h-[30px] w-[30px]"></div>
        <p className='mt-5'>Processing...</p>
    </div>
  )
}

