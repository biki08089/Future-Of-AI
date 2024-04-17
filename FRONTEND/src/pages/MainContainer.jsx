import React from 'react'
import { Outlet } from 'react-router-dom'

const MainContainer = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default MainContainer