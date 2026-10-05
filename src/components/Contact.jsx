import { contactEmail, gmailComposeUrl, mailtoUrl } from "../config/contact";
import { assetUrl } from "../config/media";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact section"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <div className="footer-top">
          <a
            href="#home"
            className="footer-wordmark"
            aria-label="Chinmoy Pathak home"
          >
            CHINMOY
            <br />P<span className="logo-square">A</span>THAK
          </a>
          <div className="footer-contact">
            <h2 id="contact-title">Ready to start?</h2>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compose a project enquiry in Gmail (opens a new tab)"
            >
              {contactEmail}
            </a>
            <a className="email-app-fallback" href={mailtoUrl}>
              Or use your email app ↗
            </a>
            <a href="tel:+916001700949">+91 60017 00949</a>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <span className="eyebrow">SITE</span>
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#archive">Archive</a>
            <a href={assetUrl("files/chinmoy-pathak-resume.pdf")} download>
              Résumé
            </a>
          </div>
          <div>
            <span className="eyebrow">FOLLOW</span>
            <a
              href="https://www.linkedin.com/in/chinmoy-pathak-714128433"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/pathak.cpp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://github.com/ChinmoyPathak2001"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="footer-tiles">
            <span className="info-tile">
              <span>
                PIXELS ARE
                <br />
                SMALL.
              </span>
            </span>
            <span className="info-tile">
              <span>
                DETAILS ARE
                <br />
                NOT.
              </span>
            </span>
          </div>
        </div>
        <footer>
          <span>
            © <span id="year">{new Date().getFullYear()}</span> CHINMOY PATHAK
          </span>
          <span>GUWAHATI, ASSAM</span>
          <a href="#home">Back to top</a>
        </footer>
      </div>
    </section>
  );
}
