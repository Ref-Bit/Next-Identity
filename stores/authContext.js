import { createContext, useEffect, useState } from 'react';
import NetlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    NetlifyIdentity.init();
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;