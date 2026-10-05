import { useEffect, useRef } from "react";
import { assetUrl } from "../config/media";
export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    if (project && !el.open) el.showModal();
    else if (!project && el.open) el.close();
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      data-lenis-prevent
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="project-dialog-title"
    >
      {project && (
        <div className="project-dialog-content">
          <button
            className="dialog-close"
            onClick={() => dialog.current.close()}
            autoFocus
            aria-label="Close project"
          >
            Close <span aria-hidden="true">×</span>
          </button>
          <span className="eyebrow">PROJECT OVERVIEW / {project.type}</span>
          <h2 id="project-dialog-title">{project.name}</h2>
          <p>{project.summary}</p>
          <div className="project-dialog-links">
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Visit website ↗
            </a>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              Source code ↗
            </a>
          </div>
          <video
            controls
            playsInline
            preload="metadata"
            poster={assetUrl(`work/${project.poster}`)}
            src={assetUrl(`videos/${project.id}.mp4`)}
            aria-label={`${project.name} recorded website walkthrough`}
          />
          <div className="project-dialog-gallery">
            {project.gallery.map((file) => (
              <img
                key={file}
                src={assetUrl(`work/${file}`)}
                alt={`${project.name} supplied project screenshot`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
