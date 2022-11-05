import RoutesApp from './routes/RoutesApp'
import theme from './utils/theme'
import store, { persistor } from './redux/store/store'
import { AuthProvider } from './context/Auth'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { PersistGate } from 'redux-persist/integration/react'

function App () {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RoutesApp />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  )
}

export default App
