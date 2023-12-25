

import ThemeToggle from './ThemeToggle';
import Socials from './Socials';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import Hamburger from './Hamburger';
import AuthLink from './AuthLink';
import s from './style.module.css';

function Navbar() {
  return (
    <header>
      <nav className={`${s.nav} wrapper`}>
        <Socials />
        <NavLogo />
        <ThemeToggle />
        <NavLinks>
          <AuthLink />
        </NavLinks>
        <Hamburger>
          <AuthLink  />
        </Hamburger>
      </nav>
    </header>
  )
}

export default Navbar