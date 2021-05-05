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
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    NetlifyIdentity.on('login', user => {
      setUser(user);
      NetlifyIdentity.close();
    });

    NetlifyIdentity.on('logout', () => {
      setUser(null);
    });

    NetlifyIdentity.on('init', user => {
      setAuthReady(true);
      setUser(user);
    });

    NetlifyIdentity.init();

    return () => {
      NetlifyIdentity.off('login');
      NetlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    NetlifyIdentity.open();
  };

  const logout = () => {
    NetlifyIdentity.logout();
  };

  const context = {
    user,
    login,
    logout,
    authReady
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
