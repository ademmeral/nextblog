import Link from 'next/link';
import s from './style.module.css';

function NavLinks({children} : {children:React.ReactNode}) {
  return (
    <ul className={s.links}>
      <li className={s.link}>
        <Link href={''}>HOME</Link>
      </li>
      <li>
        <Link href={''}>ABOUT</Link>
      </li>
      <li>
        <Link href={''}>CONTACT</Link>
      </li>
      {children}
    </ul>
  )
}

export default NavLinks