import PersonalGallery from "./PersonalGallery";
import ScrollCopy from "./ScrollCopy";
import Media from "./Media";
import { assetUrl } from "../config/media";

export default function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="shell">
        <div className="about-heading">
          <span className="eyebrow">[ ABOUT ME ]</span>
          <ScrollCopy
            as="h2"
            className="editorial-copy scroll-copy"
            id="about-title"
            text={
              "A creative developer turning ideas into interactive digital experiences."
            }
          />
        </div>
        <div className="about-profile">
          <span className="eyebrow">[ MY JOURNEY ]</span>
          <Media
            className="about-photo reveal"
            file="chinmoy-about.png"
            alt="Chinmoy Pathak smiling, seated at a table"
            width="1086"
            height="1448"
            loading="lazy"
          />
          <div className="about-bio reveal">
            <p>
              I’m Chinmoy Pathak, a frontend developer based in Assam, India. I
              build responsive websites with React, JavaScript, and a focus on
              motion and interaction.
            </p>
            <p>
              From animation-led landing pages to reusable interfaces, I care
              about the details that make a website feel natural to use.
            </p>
            <p>I completed my BCA in 2024 and am pursuing an MCA, 2026–2028.</p>
            <a
              className="text-link"
              href={assetUrl("files/chinmoy-pathak-resume.pdf")}
              download
            >
              Download résumé
            </a>
          </div>
        </div>
        <PersonalGallery />
        <div className="focus-section">
          <div>
            <span className="eyebrow">[ THE FOCUS ]</span>
            <ScrollCopy
              as="h3"
              className="focus-copy scroll-copy"
              text="Building websites that feel considered, respond naturally, and work as well as they look."
            />
          </div>
          <Media
            className="focus-photo"
            file="hero.webp"
            alt="Chinmoy Pathak"
            width="1086"
            height="1448"
            loading="lazy"
          />
        </div>
        <div className="services-heading">
          <span className="eyebrow">[ WHAT I WORK WITH ]</span>
        </div>
        <div className="skills-grid">
          <div className="skill-group reveal">
            <h4>Development</h4>
            <p>
              React, JavaScript, TypeScript, Svelte,
              <br />
              HTML, CSS, Tailwind CSS, Recoil.
            </p>
          </div>
          <div className="skill-group reveal">
            <h4>Motion &amp; interaction</h4>
            <p>
              GSAP, Three.js, Anime.js, Barba.js,
              <br />
              Locomotive Scroll, Shery.js.
            </p>
          </div>
          <div className="skill-group reveal">
            <h4>Interface craft</h4>
            <p>
              Responsive web design, accessible interfaces,
              <br />
              reusable components, frontend performance.
            </p>
          </div>
          <div className="skill-group reveal">
            <h4>Learning &amp; practice</h4>
            <p>
              Front End &amp; Back End Domination — Sheryians.
              <br />
              Data Structures and Algorithms — Code Help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
