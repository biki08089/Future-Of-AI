import React from 'react'
import { useNavigate } from 'react-router-dom'

const FutureAI = () => {

  const navigate=useNavigate();
   const creatorPage=()=>{
   navigate("/login/creatorspage")
   }


  return (
    <div>
    <div data-aos="zoom-in" className='sm:w-[30rem] sm:mx-auto filter h-[3rem] bg-cust-black rounded-3xl mb-2 mx-2 flex justify-center items-center'>
         <div  onClick={creatorPage} className='h-[2.7rem] w-[99%] bg-black rounded-3xl flex justify-center items-center'>
            <h1  className='animate-pulseeb text-cust-white font-semibold'>Explore More From Creators</h1>
         </div>
    </div>
</div>
  )
}

export default FutureAI