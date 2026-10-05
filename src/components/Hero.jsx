import Media from "./Media";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="portrait-backdrop has-portrait" aria-hidden="true">
        <Media
          file="hero.webp"
          alt=""
          width="1086"
          height="1448"
          fetchPriority="high"
        />
      </div>
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="hero-composition shell">
        <h1 id="hero-title" className="sr-only">
          Websites &amp; digital products
        </h1>
        <div className="headline-row row-one" aria-hidden="true">
          <span className="word-mask">
            <span className="headline word">WEBSITES</span>
          </span>
          <span className="info-tile">
            <span>
              CREATIVE
              <br />
              FRONTEND
              <br />
              DEVELOPER
            </span>
          </span>
          <span className="word-mask amp-mask">
            <span className="headline ampersand word">&amp;</span>
          </span>
        </div>
        <div className="headline-row row-two">
          <p className="hero-intro">
            Hey, I’m Chinmoy. I build websites
            <br className="desktop-break" /> and interactive experiences with
            <br className="desktop-break" /> React, JavaScript, and motion.
          </p>
          <span className="word-mask" aria-hidden="true">
            <span className="headline word">DIGITAL</span>
          </span>
        </div>
        <div className="headline-row row-three">
          <span className="word-mask" aria-hidden="true">
            <span className="headline word">PRODUCTS</span>
          </span>
          <span className="info-tile">
            <span>
              04 SELECTED
              <br />
              PROJECTS
            </span>
          </span>
          <a
            className="down-link"
            href="#projects"
            aria-label="Explore selected projects"
          >
            <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <path
                d="M50 5v78M15 52l35 35 35-35"
                stroke="currentColor"
                strokeWidth="13"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-bottom shell">
        <span>Pixel by pixel</span>
        <a href="#projects">Scroll</a>
      </div>
    </section>
  );
}
