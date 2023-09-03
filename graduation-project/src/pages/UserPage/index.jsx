import React from 'react'
import { Outlet } from 'react-router-dom'

function UserPage() {
  return (
    <div>
      用户者界面
      <Outlet />
    </div>
  )
}

export default UserPage
