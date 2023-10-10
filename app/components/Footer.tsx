import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";


const Footer = () => {
  var date = new Date();
  var year:any = date.getFullYear().toString();
  return (
    <>
      <footer className="footer">
        <h5>Kopfsache © {year}</h5>
        <ul className="footer-links">
          <li><Link className="btn__outline" to="/Datenschutz">Datenschutz</Link></li>
          <li><Link className="btn__outline" to="/Impressum">Impressum</Link></li>
          <li><Link className="btn__outline" to="/AGB">AGB</Link></li>
        </ul>
        <div className="w-full flex justify-center items-center flex-col">
          <div className="flex justify-center flex-col my-2">
        <p className=' text-center'>Erreichen kannst du uns über:</p>
              <div className='socials flex justify-between flex-row w-full py-5'>
                <Link to="https://www.facebook.com/people/Kopfsache-by-Stephan/100070527370504/" className="max-h-4"><FontAwesomeIcon  icon={faFacebookF} /></Link>
                <Link to="https://www.instagram.com/kopfsache.by.stephan/" className="max-h-4"><FontAwesomeIcon  icon={faInstagram} /></Link>
                <Link to="mailto:stephan.muller4@aol.de" className="max-h-4"><FontAwesomeIcon  icon={faEnvelope} /></Link>
                <Link to="tel:+49152 23024555" className="max-h-4"><FontAwesomeIcon  icon={faPhoneSquare} /></Link>
              </div>
              </div>
              </div>
      </footer>
    </>
  );
};

export default Footer;
