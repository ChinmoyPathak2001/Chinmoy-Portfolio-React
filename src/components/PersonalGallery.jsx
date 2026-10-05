import { assetUrl } from "../config/media";
const photos = [1, 2, 3, 4, 5, 6, 7];
export default function PersonalGallery() {
  return (
    <div className="personal-gallery">
      <div className="personal-caption">
        <span className="eyebrow">[ BEYOND THE SCREEN ]</span>
        <p>
          A few moments,
          <br />a little more personal.
        </p>
        <span className="personal-hint">Scroll to explore ↗</span>
      </div>
      <div
        className="personal-window"
        tabIndex={0}
        role="region"
        aria-label="Personal photo gallery"
      >
        <div className="personal-track">
          {photos.map((number) => (
            <figure key={number}>
              <img
                src={assetUrl(
                  `personal/photo-${String(number).padStart(2, "0")}.webp`,
                )}
                alt={`Personal portrait ${number} of 7, taken in a colorful café`}
                width="900"
                height="1200"
                loading="lazy"
              />
              <figcaption>
                PERSONAL / {String(number).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
