import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import wkndCard from '../images/wknd-card.jpeg';

function About() {
  return (<>
    <Header isAuthorVersion='false' />
    <section className="main">
      <div style={{ maxWidth: "1280px" , margin: "0 auto" }}>
          <h1>About Us</h1>
          <Image
            src={wkndCard}
            alt="Sample"
          />
          <p>The WKND is a fictional online magazine and adventure company that focuses
              on outdoor activities and trips across the globe. The WKND site is designed
              to demonstrate functionality for Adobe Experience Manager. There is also a
              corresponding tutorial that walks a developer through the development.
              Special thanks to Lorenzo Buosi and Kilian Amendola who created the
              beautiful design for the WKND site.
          </p>
      </div>
    </section>
    <Footer />
  </>);
}

export default About;
