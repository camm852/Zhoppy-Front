import React from 'react'
import CardShoe from '../../components/Card/CardShoe'
import { Box } from '@mui/material'

export default function ShowShoes ({ shoes }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: '600.1px'
      }}
    >
      {shoes.map((shoe, i) => {
        return (
          <CardShoe
            key={i}
            code={shoe.code}
            image={shoe.image}
            alt={shoe.alt}
            description={shoe.description}
            price={shoe.price}
            shoe={shoe}
          />
        )
      })}
    </Box>
  )
}
