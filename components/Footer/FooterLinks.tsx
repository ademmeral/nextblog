import Link from "next/link"
import s from './style.module.css';

function FooterLinks({links, title} : {links:string[], title: string}) {
  return (
    <div className={s.linksWrapper}>
      <h6 className='text-base'>{title}</h6>
      <ul className={s.links}>
        {
          links.map((link,i) => (
            <li key={i}>
              <Link href={`/${link}`}>
                <small>{link}</small>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FooterLinks