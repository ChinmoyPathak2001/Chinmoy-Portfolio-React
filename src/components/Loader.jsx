import Media from "./Media";

export default function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-veil"></div>
      <div className="loader-stack">
        <div className="loader-square"></div>
        <Media file="project-obys.webp" alt="" width="420" height="420" />
        <Media file="project-thirtysix.webp" alt="" width="420" height="420" />
        <Media file="project-arock.webp" alt="" width="420" height="420" />
        <Media file="project-vyra.webp" alt="" width="420" height="420" />
      </div>
    </div>
  );
}
