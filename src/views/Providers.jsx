import React from 'react'
import DashBoardSidebar from '../components/DashBoardSidebar'
import ProviderListResults from '../components/Providers/ProviderListResults'
import ProviderListToolbar from '../components/Providers/ProviderListToolbar'

export default function Providers () {
  React.useEffect(() => {
    document.title = 'Providers'
  }, [])

  return (
    <DashBoardSidebar>
      <ProviderListToolbar />
      <ProviderListResults />
    </DashBoardSidebar>
  )
}
