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
          <li><Link className="btn__outline" to="/">Impressum</Link></li>
          <li><Link className="btn__outline" to="/">AGB</Link></li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
