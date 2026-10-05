import ScrollCopy from "./ScrollCopy";
import { assetUrl } from "../config/media";
const panels = [
  "thirtysix-full.webp",
  "obys-full.webp",
  "vyra-full.webp",
  "arock-hero.webp",
  "arock-menu.webp",
];
export default function IntroGallery() {
  return (
    <section className="intro-gallery" aria-label="Creative development">
      <div className="intro-stage">
        <div className="intro-section shell">
          <span className="eyebrow">[ WHAT I DO ]</span>
          <div>
            <ScrollCopy
              className="editorial-copy scroll-copy"
              text="Thoughtful websites and interactive experiences, built for people who care about every detail."
            />
            <span className="quiet">
              Creative frontend development from Assam, India.
            </span>
          </div>
        </div>
        <div className="gallery-floats" aria-hidden="true">
          {panels.map((file, index) => (
            <img
              key={file}
              className={`float-image float-${index + 1}`}
              src={assetUrl(`work/${file}`)}
              alt=""
              width="420"
              height="500"
              loading="eager"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
