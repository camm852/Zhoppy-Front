import React from 'react'
import DashBoardSidebar from '../components/DashBoardSidebar'
import { UserListResults } from '../components/UserListResults'

export default function Users () {
  React.useEffect(() => {
    document.title = 'Users'
  }, [])

  return (
    <DashBoardSidebar>
      <UserListResults />
    </DashBoardSidebar>
  )
}
