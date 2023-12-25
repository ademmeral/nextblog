import Link from 'next/link'
import { AiFillInstagram, AiFillFacebook, AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai'
import s from './style.module.css';

function Socials() {
  return (
    <figure className={s.socials}>
      <Link href={''}>
        <AiFillInstagram size={25} />
      </Link>
      <Link href={''}>
        <AiFillFacebook size={25} />
      </Link>
      <Link href={''}>
        <AiFillTwitterSquare size={25} />
      </Link>
      <Link href={''}>
        <AiFillLinkedin size={25} />
      </Link>
    </figure>
  )
}

export default Socials