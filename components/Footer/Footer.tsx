import FooterLinks from './FooterLinks';
import Link from 'next/link';
import { FaBlog } from 'react-icons/fa';
import s from './style.module.css';

const txt = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis molestiae dolorum,\ 
odio voluptas a vel non repellendus laboriosam. Itaque amet voluptatibus vel sunt neque reiciendis.`;


function Footer() {
  const links = ['Home', 'Blog', 'About', 'Contact'];
  const tags = ['Style', 'Fashion', 'Coding', 'Travel'];
  const socials = ['Facebook', 'Instagram', 'Linkedin', 'Twitter'];
  return (
    <footer className={s.footer}>
      <div className={`${s.wrapper} wrapper`}>
        <header>
          <Link href={'/'} className={`${s.logo} logo`}>
            <h5>NEXT</h5>
            <FaBlog size={25} />
            <h5>LOG</h5>
          </Link>
          <p className='leading-none'>
            <small>{txt}</small>
          </p>
        </header>
        <div className={s.linksWrp}>
          <FooterLinks links={links} title='Links'/>
          <FooterLinks links={tags} title='Tags'/>
          <FooterLinks links={socials} title='Social'/>
        </div>
      </div>
    </footer>
  )
}

export default Footer