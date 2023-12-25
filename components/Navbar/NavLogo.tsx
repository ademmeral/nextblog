import Link from "next/link"
import { FaBlog } from 'react-icons/fa';
import s from './style.module.css';

function NavLogo() {
  return (
    <Link href={'/'} className={`${s.logo} logo`}>
      <h3>NEXT</h3>
      <FaBlog size={30} />
      <h3>LOG</h3>
    </Link>
  )
}

export default NavLogo