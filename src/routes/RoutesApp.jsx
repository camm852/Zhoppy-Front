import Home from '../views/Home/MainHome'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Profile from '../views/Profile'
import Users from '../views/Users'
import Providers from '../views/Providers'
import Shoes from '../views/Shoes'
import Checkout from '../views/Checkout'
import { useAuth } from '../context/Auth'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
  Navigate
} from 'react-router-dom'

export default function RoutesApp () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Users />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/providers"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Providers />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/shoes"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Shoes />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

function RequireAuth ({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return (
      <>
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    )
  }

  return children
}

function RequireAdmin ({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (user.idRol !== 1) {
    return (
      <>
        <Navigate to="/profile" state={{ from: location }} replace />
      </>
    )
  }
  return children
}
