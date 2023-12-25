'use client';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '@/contexts/ThemeContext';
import './themeToggle.css';

function ThemeToggle() {
  const {theme, setTheme} = useTheme();

  return (
    <div
      className={'frame'}
      role='button'
      onClick={() => setTheme( p => p === 'light' ? 'dark' : 'light')}
    >
      <button className={`btn ${theme}`}></button>
      <figure className={`moon ${theme}`} role='button'>
        <BsFillMoonFill />
      </figure>
      <figure className={`sun ${theme}`} role='button'>
        <BsFillSunFill />
      </figure>
    </div>
  )
}

export default ThemeToggle