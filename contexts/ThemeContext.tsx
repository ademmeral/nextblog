'use client';

import {useContext,useLayoutEffect, createContext, useState, useEffect} from 'react';

type ContextType = {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}
type Props = {
  children : React.ReactNode
}

const ThemeContext = createContext<ContextType|null>(null)

function ThemeProvider({children} : Props) {
  const [theme, setTheme] = useState<string>('dark');
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    if (checked) return;
    if (window != undefined){
      const getTheme = window.localStorage.getItem('$__theme__$') as string
      if ( getTheme ) setTheme(getTheme)
    }
    setChecked(true);
  }, [])

  useEffect(() => {
    if ( window != undefined )
      window.localStorage.setItem('$__theme__$', theme);
  }, [theme])

  return (
    <div className={`_container ${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </div>
  )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext) as ContextType;
