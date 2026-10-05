import Media from "./Media";

export default function Pointer() {
  return (
    <>
      <div className="cursor" aria-hidden="true" />
      <div className="project-preview" aria-hidden="true">
        <Media file="project-obys.webp" alt="" width="420" height="420" />
        <span>VIEW PROJECT ↗</span>
      </div>
    </>
  );
}
