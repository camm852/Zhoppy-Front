import React from 'react'
import DashBoardSidebar from '../components/DashBoardSidebar'
import { ProductListResults } from '../components/Shoes/shoeListResults'
import { ProductListToolbar } from '../components/Shoes/shoetListToolbar'

export default function Shoes () {
  React.useEffect(() => {
    document.title = 'Shoes'
  }, [])

  return (
    <DashBoardSidebar>
      <ProductListToolbar />
      <ProductListResults />
    </DashBoardSidebar>
  )
}
