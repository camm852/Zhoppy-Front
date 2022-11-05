import { useAuth } from '../../context/Auth'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material'

export const AccountProfile = () => {
  const { user } = useAuth()

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            sx={{ fontWeight: '200' }}
          >
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  )
}
