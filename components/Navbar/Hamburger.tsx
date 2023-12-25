'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import s from './style.module.css';

export function Hamburger({children} : {children:React.ReactNode}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('#burger li a');
    const handleChildClick = (e:Event) => setChecked(() => false);
    if (anchors.length)
      for (const a of anchors)
        a.addEventListener('click', handleChildClick, {once : true});

    /* return () => {        // just in case
      if (anchors.length)
        for (const a of anchors)
          a.removeEventListener('click', handleChildClick);
    } */
  }, [checked])

  return (
    <>
    <div className={s.sticks} onClick={() => setChecked(!checked)}>
      <div className={s.stick}></div>
      <div className={s.stick}></div>
      <div className={s.stick}></div>
    </div>
      <ul className={checked ? `wrapper ${s.brgMenu}` : 'hidden'} id='burger'>
        <li className={s.link}>
          <Link href={'/'}>HOME</Link>
        </li>
        <li>
          <Link href={'/about'}>ABOUT</Link>
        </li>
        <li>
          <Link href={'/contact'}>CONTACT</Link>
        </li>
        {children}
      </ul>
    </>
  )
}

export default Hamburger