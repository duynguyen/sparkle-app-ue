import Image from 'next/image';
import logo from '../images/wknd-logo-dk.svg';

const NavMenu = () => (
  <nav>
    <ul className="menu">
      <li><a href={`/`}>Home</a></li>
      <li><a href={`/adventures`}>Adventures</a></li>
      <li><a href={`/articles`}>Magazine</a></li>
      <li><a href={`/about-us`}>About Us</a></li>
    </ul>
  </nav>
);

export default function Footer() {
  return <footer className="footer">
    <Image src={logo} className="logo" alt="WKND Logo" />
    <NavMenu />
    <small>Copyright &copy; 2023 Adobe. All rights reserved</small>
  </footer>
}
