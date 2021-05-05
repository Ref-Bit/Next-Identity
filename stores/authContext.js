import { createContext, useEffect, useState } from 'react';
import NetlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    NetlifyIdentity.on('login', (user) => {
      setUser(user);
      NetlifyIdentity.close();
    });

    NetlifyIdentity.init();
  }, []);

  const login = () => {
    NetlifyIdentity.open();
  };

  const context = {
    user,
    login,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
