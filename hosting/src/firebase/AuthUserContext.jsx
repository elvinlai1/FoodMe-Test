import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStateListener, SignOutUser } from './firebase';

export const AuthUserContext = createContext({
    currentUser: {},
    setCurrentUser: (_user) => { },
    signOut: () => { },
});

export const AuthUserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
          if (user) {
            setCurrentUser(user)
          }
        });
        return unsubscribe
      }, [setCurrentUser]);

    const signOut = () => {
        SignOutUser()
        setCurrentUser(null)
        navigate('/')
      }
  
    const value = {
        currentUser, 
        setCurrentUser,
        signOut
      }

    return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>

}