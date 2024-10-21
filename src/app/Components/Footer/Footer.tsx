import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} თქვენი კომპანია. ყველა უფლებები დაცულია.
        </p>
        <nav>
          <ul className="footer-nav">
            <li>
              <a href="/about">ჩვენს შესახებ</a>
            </li>
            <li>
              <a href="/contact">კონტაქტი</a>
            </li>
            <li>
              <a href="/privacy">კონფიდენციალობის პოლიტიკა</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
