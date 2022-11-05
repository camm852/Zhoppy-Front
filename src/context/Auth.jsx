import React from 'react'

const currentUser = () => {
  const user = JSON.parse(localStorage.getItem('session'))
  return user ?? null
}
export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(currentUser)

  const signOut = () => {
    localStorage.removeItem('session')
    window.location.reload()
  }

  const updateUser = ({ values }) => {
    window.localStorage.remove('session')
    window.localStorage.set('session', JSON.stringify(values))
    setUser(JSON.parse(window.localStorage.get('session')))
  }

  const value = { user, setUser, signOut, updateUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext

export function useAuth () {
  return React.useContext(AuthContext)
}
