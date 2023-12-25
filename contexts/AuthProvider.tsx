'use client';

import XRSpinner from '@/XReact/components/XRSpinner/XRSpinner';
import XFetch from '@/XFetch/api';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  auth: UserType | null,
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>,
}
type Props = {
  children: React.ReactNode
}
const AuthContext = createContext<ContextType | null>(null)

function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<UserType | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return;
    const checkUserByToken = async () => {
      XFetch.resume();
      try {
        const resp = await XFetch.get('/users/single/auth');
        if (resp.status === 200) {
          const result = await resp.json();
          setAuth( () => ({ ...result }) )
        };
      } catch (err) {
        console.log(err);
      } finally {
        setChecked(() => true) 
        XFetch.cancel();
      }
    }
    checkUserByToken();
  }, [])

  if (!checked) return <XRSpinner size={100} thickness={5} color='var(--textClr)' />
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;

export const useAuth = () => useContext(AuthContext) as ContextType;
