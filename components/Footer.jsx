import Image from 'next/image';
import logo from '../images/wknd-logo-dk.svg';

const NavMenu = () => (
  <nav>
    <ul className="menu">
      <li><a href={`/${window.location.search}`}>Home</a></li>
      <li><a href={`/adventures${window.location.search}`}>Adventures</a></li>
      <li><a href={`/articles${window.location.search}`}>Magazine</a></li>
      <li><a href={`/about-us${window.location.search}`}>About Us</a></li>
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
